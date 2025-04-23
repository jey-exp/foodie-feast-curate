
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import AuthForm from "@/components/auth/AuthForm";

const Login = () => {
  return (
    <MainLayout>
      <div className="max-w-md mx-auto py-8">
        <AuthForm mode="login" />
      </div>
    </MainLayout>
  );
};

export default Login;
