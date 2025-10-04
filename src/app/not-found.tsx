"use client";
import React from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";

export default function NotFound() {
  const primaryColor = "#48595B";

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
      <Card   style={{
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
            color: "#ff4d4f",
            marginBottom: "16px",
          }}
        >
          404
        </h1>

        <h2
          style={{
            fontSize: "24px",
            fontWeight: "600",
            marginBottom: "12px",
          }}
        >
          La página que buscas no existe
        </h2>

        <p
          style={{
            fontSize: "14px",
            color: "#555",
            marginBottom: "20px",
          }}
        >
          No te preocupes, puedes navegar utilizando las opciones disponibles o
          hacer clic en el botón de inicio.
        </p>

        <Tag
          value="SEDEPROJECTS 2025"
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
            label="Ir al inicio"
            icon="pi pi-home"
            onClick={() => (window.location.href = "/home")}
            style={{
              backgroundColor: primaryColor,
              borderColor: primaryColor,
              color: "#fff",
              width: "160px",
              height: "36px",
              fontWeight: "600",
            }}
          />
        </div>
      </Card>
    </div>
  );
}
