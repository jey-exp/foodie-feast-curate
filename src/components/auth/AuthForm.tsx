import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { UserRole } from "@/types";
import SupaBase from "@/lib/zustand";
import ConfirmationModal from "../ui/Modal";

interface AuthFormProps {
  mode: "login" | "register";
}

const AuthForm = ({ mode }: AuthFormProps) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("customer");
  const [submitting, isSubmitting] = useState<boolean>(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState<boolean>(false);
  const [wrongRoleModal, setWrongRoleModal] = useState<boolean>(false);
  const [roleOption1, setRoleOption1] = useState<string>();
  const [roleOption2, setRoleOption2] = useState<string>();
  const SupaBaseObj = SupaBase((state)=> state.supaObj)

  useEffect(()=>{
    try {
      const checkSession = async()=>{
        const {data : {session}} = await SupaBaseObj.auth.getSession();
        if(session && wrongRoleModal === false){
          setConfirmModalOpen(true);
        }
      }
      checkSession();
    } catch (error) {
      console.error("Error in checking session : ", error);
    }

  },[])
  useEffect(() => {
  console.log("wrongRoleModal updated:", wrongRoleModal);
  console.log(roleOption1);
  console.log(roleOption2);
}, [wrongRoleModal]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    isSubmitting(true);
    
    try {
      if(mode === "register"){
          const { data, error } = await SupaBaseObj.auth.signUp({
            email: email,
            password: password,
            options: {
              data : {
                role :role
              },
              emailRedirectTo: 'http://localhost:8080/customer/home',
            },
          })
          if(error){
            console.error("Error in registering : ", error);
            toast.error(error.message);
            return;
          }
          navigate("/auth/login");
      }
      else{
          const { data, error } = await SupaBaseObj.auth.signInWithPassword({
            email: email,
            password: password,
          });
          if(error){
            toast.error(error.message);
            return;
          }
          else if(data?.user?.user_metadata?.role != role){
            console.log("Wrong user");
            setWrongRoleModal(true);
            setConfirmModalOpen(false);
            setRoleOption1("Login again");
            setRoleOption2(`Continue as ${data.user.user_metadata.role}`);
            return;
          }
          else if (role === "caterer") {
              navigate("/caterer/dashboard");
          } else {
              navigate("/customer/home");
          }
      }
      toast.success(`${mode === "login" ? "Login" : "Registration"} successful!`);
      
    } catch (error) {
      console.error("Authentication error:", error);
      toast.error("Authentication failed. Please try again.");
    }
    finally{
      isSubmitting(false);
    }
  };

  const handleOptionSelect = async(option:string)=>{
    if(option === "option2"){
      SupaBaseObj.auth.signOut().then(()=>{
        toast.info("Login to continue");
        console.log("Logged out");
      }).catch((err)=>{
        toast.error(err.message);
        console.log("Error in logging out : ", err);
      })
    }
    else{
      SupaBaseObj.auth.getUser().then(({data : {user}})=> {
        const role = user?.user_metadata?.role;
        if(role === "customer"){
          navigate("/customer/home");
        }
        else{
          navigate("/caterer/dashboard");
        }
      }
      ).catch((err)=>{
        console.log("Error in redirecting : ", err);
        toast.error(err.message);
      })
    }
  }

  const handleRoleModalAction = async(option : string)=>{
    if(option === "option1"){
      const {error} = await SupaBaseObj.auth.signOut();
      if(error){
        console.log("Error in signout : ", error);
      }
    }
    else{
      if(role === "caterer"){
        navigate("/customer/home");
      }
      else{
        navigate("/caterer/dashboard");
      }
    }
    setWrongRoleModal(false);
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center">
          {mode === "login" ? "Welcome Back" : "Create Your Account"}
        </CardTitle>
        <CardDescription className="text-center">
          {mode === "login" 
            ? "Sign in to continue to your account" 
            : "Register to join our foodie community"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email"
              type="email" 
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password"
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          
          <div className="pt-2">
            <Label>I am a:</Label>
            <RadioGroup 
              defaultValue="customer" 
              className="flex gap-4 mt-2"
              value={role}
              onValueChange={(value) => setRole(value as UserRole)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="customer" id="customer" />
                <Label htmlFor="customer">Customer</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="caterer" id="caterer" />
                <Label htmlFor="caterer">Caterer</Label>
              </div>
            </RadioGroup>
          </div>
          
          <Button type="submit" className="w-full" disabled={submitting}>
            {mode === "login" ? "Sign In" : "Create Account"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        {mode === "login" ? (
          <p className="text-sm text-muted-foreground">
            Don't have an account?{" "}
            <a href="/auth/register" className="text-primary hover:underline">
              Sign up
            </a>
          </p>
        ) : (
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <a href="/auth/login" className="text-primary hover:underline">
              Sign in
            </a>
          </p>
        )}
      </CardFooter>
      {confirmModalOpen && (
        <ConfirmationModal modalTitle="Already logged In" description="You are already  logged in, do you need to continue?" onSelect={handleOptionSelect} option1="Redirect" options2="Logout"/>
      )}
      {/* {wrongRoleModal && (
        <ConfirmationModal modalTitle="Role Mismatch" description={`You are a ${role==="caterer" ? "customer" : "caterer"} but tring to login as ${role}`} option1={roleOption1} options2={roleOption2} onSelect={handleRoleModalAction} />
      )} */}
    </Card>
  );
};

export default AuthForm;
