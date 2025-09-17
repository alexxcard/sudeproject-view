"use client";
import React from "react";
import Profile from "@/components/ui/Profile";
import { ProfileProps } from "@/types";

export default function HeaderNavBar({ session, name }: ProfileProps) {
  return (
    <header className="flex items-center justify-between shadow-md px-6 py-3 bg-white">
      <h1 className="text-base md:text-lg font-bold text-gray-800">
        SUDEPROJECTS
      </h1>

      {/* Profile con saludo al final */}
      <div className="flex items-center gap-3">
        {session && <span className="text-sm text-gray-600">Hola, {name}</span>}
        <Profile session={session} name={name} />
      </div>
    </header>
  );
}
