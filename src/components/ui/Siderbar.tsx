"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  {
    key: "incidencias",
    label: "Incidencias",
    href: "/incidencias",
    icon: "pi pi-exclamation-triangle",
  },
  {
    key: "proyectos",
    label: "Proyectos",
    href: "/proyectos",
    icon: "pi pi-folder",
  },
  {
    key: "tareas",
    label: "Tareas",
    href: "/tareas",
    icon: "pi pi-check-square",
  },
  {
    key: "usuarios",
    label: "Usuarios",
    href: "/usuarios",
    icon: "pi pi-users",
  },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <div
      className={`flex flex-col h-screen border-r shadow-md transition-all duration-300 ${
        collapsed ? "w-18" : "w-56"
      }`}
    >
      <div className="flex justify-end p-4">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded hover:bg-gray-100"
        >
          <i
            className={`pi ${
              collapsed ? "pi-angle-right" : "pi-angle-left"
            } text-grey-600`}
          ></i>
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
                  className={`flex items-center gap-3 px-4 py-2 rounded-md transition-colors duration-200 ${
                    isActive
                      ? "bg-[#021923] text-white"
                      : "text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <i className={`${item.icon} text-lg`} />{" "}
                  {!collapsed && <span>{item.label}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
