
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import AuthForm from "@/components/auth/AuthForm";

const Register = () => {
  return (
    <MainLayout>
      <div className="max-w-md mx-auto py-8">
        <AuthForm mode="register" />
      </div>
    </MainLayout>
  );
};

export default Register;
