"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  { key: "incidencias", label: "Incidencias", href: "/incidencias" },
  { key: "proyectos", label: "Proyectos", href: "/proyectos" },
  { key: "sprints", label: "Sprints", href: "/sprints" },
  { key: "tareas", label: "Tareas", href: "/tareas" },
  { key: "usuarios", label: "Usuarios", href: "/usuarios" },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <div
      className={`flex flex-col h-screen bg-white border-r shadow-md transition-all duration-300 ${
        collapsed ? "w-16" : "w-56"
      }`}
    >
      {/* LOGO */}
      <div className="flex items-center justify-center h-16 border-b">
        <span className="font-bold text-lg text-gray-800">Logo</span>
      </div>

      {/* BOTÓN TOGGLE */}
      <div className="flex justify-end p-2">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded hover:bg-gray-100"
        >
          {collapsed ? "➡️" : "⬅️"}
        </button>
      </div>

      {/* MENU */}
      <nav className="flex-1 overflow-y-auto">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.key}>
                <Link
                  href={item.href}
                  className={`flex items-center px-4 py-2 rounded-md transition-colors duration-200 ${
                    isActive
                      ? "bg-blue-500 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {collapsed ? (
                    <span className="text-lg">•</span>
                  ) : (
                    <span>{item.label}</span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
