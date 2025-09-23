"use client";

import React from "react";
import Image from "next/image";
import Profile from "@/components/ui/Profile";
import { ProfileProps } from "@/types";

export default function HeaderNavBar({ session, name }: ProfileProps) {
  return (
    <header className="flex items-center justify-between shadow-md px-6 py-3 bg-white">
      
      {/* Logo a la izquierda */}
 <Image src="/logosudeaseg.png" alt="logo Sudeaseg" width={240} height={120}/>
      {/* LOGO */}
      <div className="flex items-center justify-center h-16 border-b">
      </div>

      {/* Profile con saludo a la derecha */}
      <div className="flex items-center gap-3">
        {session && <span className="text-sm text-gray-600">Hola, {name}</span>}
        <Profile session={session} name={name} />
      </div>
    </header>
  );
}
