"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await signIn("credentials", {
      username,
      password,
      redirect: true,
      callbackUrl: "/",
    });
  };

  return (
    <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center mb-6">Iniciar Sesión</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Usuario */}
        <div>
          <label className="block text-sm font-medium">Usuario</label>
          <input
            type="text"
            placeholder="Ingrese su usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        {/* Contraseña */}
        <div>
          <label className="block text-sm font-medium">Contraseña</label>
          <input
            type="password"
            placeholder="Ingrese su contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        {/* Botón Login */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
        >
          Iniciar Sesión
        </button>
      </form>

      {/* Link a registro */}
      <p className="mt-4 text-center text-sm">
        ¿No tienes cuenta?{" "}
        <Link href="/login/register" className="text-blue-600 hover:underline">
          Regístrate
        </Link>
      </p>
    </div>
  );
}
