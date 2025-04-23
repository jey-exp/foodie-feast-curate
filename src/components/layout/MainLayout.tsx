
import { ReactNode } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { User, UserRole } from "@/types";

interface MainLayoutProps {
  children: ReactNode;
  user?: User | null;
}

const MainLayout = ({ children, user }: MainLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    // This will be implemented with Supabase auth
    console.log("Logging out");
    navigate("/");
  };

  const getNavLinks = (role?: UserRole) => {
    if (role === "caterer") {
      return [
        { href: "/caterer/dashboard", label: "Dashboard" },
        { href: "/caterer/profile", label: "My Profile" },
        { href: "/caterer/orders", label: "Orders" },
      ];
    }
    
    if (role === "customer") {
      return [
        { href: "/customer/home", label: "Home" },
        { href: "/customer/order-history", label: "My Orders" },
      ];
    }
    
    return [];
  };

  const navLinks = getNavLinks(user?.role);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <span className="logo-text">FoodieFeast</span>
          </Link>
          
          <div className="flex items-center space-x-6">
            {user ? (
              <>
                <nav>
                  <ul className="flex space-x-6">
                    {navLinks.map((link) => (
                      <li key={link.href}>
                        <Link 
                          to={link.href}
                          className={`text-base hover:text-primary transition-colors ${
                            location.pathname === link.href ? "text-primary font-medium" : ""
                          }`}
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
                <Button variant="ghost" onClick={handleLogout}>
                  Log Out
                </Button>
              </>
            ) : (
              <div className="flex space-x-4">
                <Button variant="ghost" onClick={() => navigate("/auth/login")}>
                  Sign In
                </Button>
                <Button onClick={() => navigate("/auth/register")}>
                  Sign Up
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      
      <footer className="bg-secondary py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">FoodieFeast Curate</h3>
              <p className="text-muted-foreground">
                Curate your perfect meal from the best caterers in your area.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/auth/register?role=caterer" className="text-muted-foreground hover:text-foreground transition-colors">
                    Become a Caterer
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <p className="text-muted-foreground">
                support@foodiefeast.com
              </p>
            </div>
          </div>
          
          <div className="border-t border-muted mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} FoodieFeast Curate. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
