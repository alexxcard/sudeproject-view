"use client";
import { useState, useRef } from "react";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import { Toast } from "primereact/toast";

interface RegisterFormValues {
  nombre: string;
  apellido: string;
  correo: string;
}

export default function RegisterContainer() {
  const [loading, setLoading] = useState<boolean>(false);
  const [values, setValues] = useState<RegisterFormValues>({
    nombre: "",
    apellido: "",
    correo: "",
  });

  const toast = useRef<Toast>(null);
  const primaryColor = "#48595B";

  const handleRegister = () => {
    if (!values.nombre || !values.apellido || !values.correo) {
      toast.current?.show({
        severity: "warn",
        summary: "Campos incompletos",
        detail: "Por favor complete todos los campos",
        life: 3000,
      });
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.current?.show({
        severity: "success",
        summary: "Registro exitoso",
        detail: `Bienvenido ${values.nombre} ${values.apellido}`,
        life: 3000,
      });
    }, 1500);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f3f3f3",
      }}
    >
      <Toast ref={toast} />

      <Card
        style={{
          padding: "32px",
          width: "360px",
          borderRadius: "16px",
          boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <h1
            style={{
              fontWeight: "800",
              fontSize: "24px",
              marginBottom: "8px",
              color: "#021923",
            }}
          >
            Registro de Usuario
          </h1>
          <p style={{ fontSize: "12px", color: "#021923" }}>
            Complete los datos para crear su cuenta
          </p>
        </div>

        <div>
          <div style={{ marginBottom: "16px" }}>
            <label
              style={{
                display: "block",
                fontWeight: "600",
                color: primaryColor,
                fontSize: "12px",
                marginBottom: "4px",
              }}
            >
              Nombre:
            </label>
            <InputText
              value={values.nombre}
              onChange={(e) => setValues({ ...values, nombre: e.target.value })}
              placeholder="Ingrese su nombre"
              style={{
                width: "250px",
                height: "32px",
                borderColor: primaryColor,
              }}
            />
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label
              style={{
                display: "block",
                fontWeight: "600",
                color: primaryColor,
                fontSize: "12px",
                marginBottom: "4px",
              }}
            >
              Apellido:
            </label>
            <InputText
              value={values.apellido}
              onChange={(e) =>
                setValues({ ...values, apellido: e.target.value })
              }
              placeholder="Ingrese su apellido"
              style={{
                width: "250px",
                height: "32px",
                borderColor: primaryColor,
              }}
            />
          </div>

          <div style={{ marginBottom: "24px" }}>
            <label
              style={{
                display: "block",
                fontWeight: "600",
                color: primaryColor,
                fontSize: "12px",
                marginBottom: "4px",
              }}
            >
              Correo:
            </label>
            <InputText
              value={values.correo}
              onChange={(e) => setValues({ ...values, correo: e.target.value })}
              placeholder="Ingrese su correo"
              style={{
                width: "250px",
                height: "32px",
                borderColor: primaryColor,
              }}
            />
          </div>

          <div style={{ textAlign: "center", marginBottom: "16px" }}>
            <Button
              label="Registrar"
              loading={loading}
              onClick={handleRegister}
              style={{
                backgroundColor: "#608c3d",
                borderColor: primaryColor,
                width: "180px",
                height: "36px",
              }}
            />
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: "16px" }}>
          <Tag
            value="SUDEPROJECTS 2025"
            severity="info"
            style={{
              backgroundColor: primaryColor,
              color: "#fff",
              fontSize: "10px",
              padding: "4px 8px",
            }}
          />
        </div>
      </Card>
    </div>
  );
}
