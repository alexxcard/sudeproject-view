"use client";

import { useEffect, useState } from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import { PiFolderBold, PiCheckCircleBold } from "react-icons/pi";
import { useRouter } from "next/navigation";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface ChartDataInput {
  name: string;
  value: number;
  [key: string]: any;
}

interface Stats {
  incidencias: number;
  proyectos: number;
  tareas: number;
}

export default function Dashboard() {
  const router = useRouter();
  const primaryColor = "#48595B";
  const COLORS = ["#0088FE", "#FF8042"];

  const [stats, setStats] = useState<Stats>({ incidencias: 0, proyectos: 0, tareas: 0 });
  const [dataIncidencias, setDataIncidencias] = useState<ChartDataInput[]>([
    { name: "Resueltas", value: 0 },
    { name: "Pendientes", value: 0 },
  ]);
  const [dataProyectos, setDataProyectos] = useState<ChartDataInput[]>([
    { name: "Activos", value: 0 },
    { name: "Finalizados", value: 0 },
  ]);
  const [dataTareas, setDataTareas] = useState<ChartDataInput[]>([
    { name: "Completadas", value: 0 },
    { name: "Pendientes", value: 0 },
  ]);

  // 🔹 Función para hacer fetch con token
  const fetchWithToken = async (url: string, options: RequestInit = {}) => {
    const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
    const headers = {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
      ...options.headers,
    };
    return fetch(url, { ...options, headers });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 🔹 Stats generales
        const resStats = await fetchWithToken("http://localhost:8000/api/dashboard/");
        if (resStats.ok) {
          const data: Stats = await resStats.json();
          setStats(data);
        } else if (resStats.status === 401) {
          console.warn("Token inválido o expirado");
          router.push("/login");
          return;
        } else {
          console.error("Error fetching stats:", resStats.status);
        }

        // 🔹 Incidencias
        const resInc = await fetchWithToken("http://localhost:8000/api/incidents/");
        if (resInc.ok) {
          const data: any = await resInc.json();
          if (Array.isArray(data)) {
            const resolved = data.filter((i) => i.status === "Resolved").length;
            const pending = data.length - resolved;
            setDataIncidencias([
              { name: "Resueltas", value: resolved },
              { name: "Pendientes", value: pending },
            ]);
          }
        }

        // 🔹 Proyectos
        const resProj = await fetchWithToken("http://localhost:8000/api/projects/");
        if (resProj.ok) {
          const data: any = await resProj.json();
          if (Array.isArray(data)) {
            const activos = data.filter((p) => !p.completed).length;
            const finalizados = data.filter((p) => p.completed).length;
            setDataProyectos([
              { name: "Activos", value: activos },
              { name: "Finalizados", value: finalizados },
            ]);
          }
        }

        // 🔹 Tareas
        const resTasks = await fetchWithToken("http://localhost:8000/api/tasks/");
        if (resTasks.ok) {
          const data: any = await resTasks.json();
          if (Array.isArray(data)) {
            const completadas = data.filter((t) => t.status === "Done").length;
            const pendientes = data.length - completadas;
            setDataTareas([
              { name: "Completadas", value: completadas },
              { name: "Pendientes", value: pendientes },
            ]);
          }
        }
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchData();
  }, []);

  const statsCards = [
    { title: "Incidencias", value: stats.incidencias, color: "#f87171", icon: <PiFolderBold size={24} /> },
    { title: "Proyectos", value: stats.proyectos, color: "#3b82f6", icon: <PiFolderBold size={24} /> },
    { title: "Tareas", value: stats.tareas, color: "#fbbf24", icon: <PiCheckCircleBold size={24} /> },
  ];

  const handleVerMas = (title: string) => router.push(`/${title.toLowerCase()}`);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px", padding: "32px", backgroundColor: "#f0f4f8" }}>
      <h1 style={{ color: "#1e293b", fontWeight: 800, fontSize: "28px" }}>Panel de Inicio</h1>

      {/* Tarjetas */}
      <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
        {statsCards.map((stat) => (
          <Card
            key={stat.title}
            style={{
              flex: "1 1 200px",
              minWidth: "200px",
              background: `linear-gradient(135deg, ${stat.color}33, ${stat.color}55)`,
              color: "#1e293b",
              transition: "transform 0.2s, box-shadow 0.2s",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              const card = e.currentTarget;
              card.style.transform = "translateY(-25px)";
              card.style.boxShadow = "0 10px 20px rgba(0,0,0,0.2)";
            }}
            onMouseLeave={(e) => {
              const card = e.currentTarget;
              card.style.transform = "translateY(0)";
              card.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)";
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
              <div style={{ fontSize: "32px", color: stat.color }}>{stat.icon}</div>
              <h3 style={{ margin: 0, fontSize: "20px" }}>{stat.title}</h3>
            </div>
            <h2 style={{ fontSize: "36px", fontWeight: 700, margin: "0 0 12px 0" }}>{stat.value}</h2>
            <Button
              label="Ver más"
              style={{ backgroundColor: stat.color, border: "none", width: "25%", borderRadius: "10px", fontWeight: 600, alignItems: "center" }}
              onClick={() => handleVerMas(stat.title)}
            />
          </Card>
        ))}
      </div>

      {/* Gráficos */}
      <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
        {[
          { title: "Incidencias", data: dataIncidencias },
          { title: "Proyectos", data: dataProyectos },
          { title: "Tareas", data: dataTareas },
        ].map((chart) => (
          <Card key={chart.title} style={{ flex: "1 1 250px", minWidth: "250px" }}>
            <h3>{chart.title}</h3>
            <div style={{ width: "100%", height: 200 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={chart.data} dataKey="value" nameKey="name" outerRadius={70} label>
                    {chart.data.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        ))}
      </div>

      {/* Footer */}
      <div style={{ textAlign: "center", marginTop: "32px" }}>
        <Tag
          value="SUDEPROJECTS 2025"
          severity="info"
          style={{
            backgroundColor: primaryColor,
            color: "#fff",
            fontSize: "12px",
            padding: "6px 12px",
            borderRadius: "8px",
          }}
        />
      </div>
    </div>
  );
}
