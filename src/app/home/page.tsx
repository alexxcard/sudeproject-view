"use client";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import { PiFolderBold, PiCheckCircleBold, PiUsersThreeBold } from "react-icons/pi";
import { useRouter } from "next/navigation"; // Importamos useRouter

export default function Dashboard() {
  const router = useRouter();
  const primaryColor = "#48595B";

  // Datos de ejemplo
  const stats = [
    { title: "Incidencias", value: 5, color: "#f87171", icon: <PiFolderBold size={24} /> },
    { title: "Proyectos", value: 12, color: "#3b82f6", icon: <PiFolderBold size={24} /> },
    { title: "Tareas", value: 24, color: "#fbbf24", icon: <PiCheckCircleBold size={24} /> },
    
  ];

  // Función para navegar
  const handleVerMas = (title: string) => {
    // Convertimos el título a la ruta (minusculas y sin espacios)
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
