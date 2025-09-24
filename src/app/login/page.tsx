"use client";

import LoginForm from "@/components/features/LoginForm";
import { signIn } from "next-auth/react";
import { useState } from "react";


export default function LoginPage() {
    const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn('credentials', {
      username,
      password,
      redirect: true,
      callbackUrl: '/'
    });
  };
  return (    
    <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center mb-6">Iniciar Sesión</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
