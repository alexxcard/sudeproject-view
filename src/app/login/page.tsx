"use client";

import LoginForm from "@/components/features/LoginForm";

export default function LoginPage() {
  return (
    <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center mb-6">Iniciar Sesión</h1>
      <LoginForm />
    </div>
  );
}
