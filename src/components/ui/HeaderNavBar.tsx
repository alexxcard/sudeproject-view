"use client";
import React from "react";
import Profile from "@/components/ui/Profile";
import Logo from "@/components/ui/Logo";
import { ProfileProps } from "@/types";

export default function HeaderNavBar({ session, name }: ProfileProps) {
  return (
    <header className="border-b flex items-center justify-between shadow-md px-6 py-3 bg-white">
      <Logo />
      <div className="flex items-center gap-3 cursor-pointer p-2 rounded-md hover:bg-gray-50 duration-200">
        <Profile session={session} name={name} />
      </div>
    </header>
  );
}
