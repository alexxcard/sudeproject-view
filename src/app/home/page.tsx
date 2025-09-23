"use client";

import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import { PiFolderBold, PiCheckCircleBold } from "react-icons/pi";
import { useRouter } from "next/navigation";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function Dashboard() {
  const router = useRouter();
  const primaryColor = "#48595B";

  // Tarjetas principales
  const stats = [
    { title: "Incidencias", value: 5, color: "#f87171", icon: <PiFolderBold size={24} /> },
    { title: "Proyectos", value: 12, color: "#3b82f6", icon: <PiFolderBold size={24} /> },
    { title: "Tareas", value: 24, color: "#fbbf24", icon: <PiCheckCircleBold size={24} /> },
  ];

  // Datos de ejemplo para gráficos
  const dataIncidencias = [
    { name: "Resueltas", value: 3 },
    { name: "Pendientes", value: 2 },
  ];

  const dataProyectos = [
    { name: "Activos", value: 8 },
    { name: "Finalizados", value: 4 },
  ];

  const dataTareas = [
    { name: "Completadas", value: 20 },
    { name: "Pendientes", value: 4 },
  ];

  const COLORS = ["#0088FE", "#FF8042"];

  const handleVerMas = (title: string) => {
    const route = `/${title.toLowerCase()}`;
    router.push(route);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "32px",
        padding: "32px",
        backgroundColor: "#f0f4f8",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ color: "#1e293b", fontWeight: 800, fontSize: "28px" }}>Panel de Inicio</h1>

      {/* Tarjetas principales */}
      <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
        {stats.map((stat) => (
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
              style={{
                backgroundColor: stat.color,
                border: "none",
                width: "100%",
                borderRadius: "8px",
                fontWeight: 600,
              }}
              onClick={() => handleVerMas(stat.title)}
            />
          </Card>
        ))}
      </div>

      {/* Gráficos debajo de las tarjetas */}
      <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
        {/* Incidencias */}
        <Card style={{ flex: "1 1 250px", minWidth: "250px" }}>
          <h3>Incidencias</h3>
          <div style={{ width: "100%", height: 200 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie data={dataIncidencias} dataKey="value" nameKey="name" outerRadius={70} label>
                  {dataIncidencias.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Proyectos */}
        <Card style={{ flex: "1 1 250px", minWidth: "250px" }}>
          <h3>Proyectos</h3>
          <div style={{ width: "100%", height: 200 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie data={dataProyectos} dataKey="value" nameKey="name" outerRadius={70} label>
                  {dataProyectos.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Tareas */}
        <Card style={{ flex: "1 1 250px", minWidth: "250px" }}>
          <h3>Tareas</h3>
          <div style={{ width: "100%", height: 200 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie data={dataTareas} dataKey="value" nameKey="name" outerRadius={70} label>
                  {dataTareas.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
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
