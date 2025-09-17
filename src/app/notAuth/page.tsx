"use client";
import React from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";

export default function NotAuth() {
  const primaryColor = "#48595B"; // color primario consistente

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f9fafb",
      }}
    >
      <Card
        style={{
          textAlign: "center",
          padding: "32px",
          maxWidth: "800px",
          width: "100%",
          borderRadius: "16px",
          boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
        }}
      >
        <h1
          style={{
            fontSize: "72px",
            fontWeight: "bold",
            color: "#fa8c16",
            marginBottom: "16px",
          }}
        >
          403
        </h1>

        <h2
          style={{
            fontSize: "24px",
            fontWeight: "600",
            marginBottom: "12px",
          }}
        >
          Acceso no autorizado, por favor inicie sesión nuevamente
        </h2>

        <p
          style={{
            fontSize: "14px",
            color: "#555",
            marginBottom: "20px",
          }}
        >
          No se pudo validar su usuario, o su acceso ha expirado. Intente
          ingresar nuevamente.
        </p>

        <Tag
          value="SUDEPROJECTS 2025"
          severity="info"
          style={{
            backgroundColor: primaryColor,
            color: "#fff",
            fontSize: "12px",
            padding: "4px 8px",
            borderRadius: "8px",
            marginBottom: "24px",
            display: "inline-block",
          }}
        />

        <div>
          <Button
            label="Volver al Login"
            icon="pi pi-sign-in"
            onClick={() => (window.location.href = "/")}
            style={{
              backgroundColor: primaryColor,
              borderColor: primaryColor,
              color: "#fff",
              width: "200px",
              height: "36px",
              fontWeight: "500",
            }}
          />
        </div>
      </Card>
    </div>
  );
}
