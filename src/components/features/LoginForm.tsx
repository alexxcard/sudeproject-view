"use client";
import { useState, useRef } from "react";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import { Toast } from "primereact/toast";
import { LoginFormValues } from "@/interface/index";
import RegisterForm from "./RegisterForm";

export default function LoginContainer() {
  const [loading, setLoading] = useState<boolean>(false);
  const [values, setValues] = useState<LoginFormValues>({
    username: "",
    password: "",
  });
  const [isLogin, setIsLogin] = useState(true); // <- aquí definimos isLogin

  const toast = useRef<Toast>(null);
  const primaryColor = "#48595B";

  const handleLogin = () => {
    if (!values.username || !values.password) {
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
        summary: "Login exitoso",
        detail: `Bienvenido ${values.username}`,
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
        {isLogin ? (
          <>
            {/* LOGIN FORM */}
            <div style={{ textAlign: "center", marginBottom: "24px" }}>
              <h1
                style={{
                  fontWeight: "800",
                  fontSize: "24px",
                  marginBottom: "8px",
                  color: "#021923",
                }}
              >
                Control de Acceso
              </h1>
              <p style={{ fontSize: "12px", color: "#021923" }}>
                Ingrese sus credenciales para acceder
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
                  Nombre de usuario:
                </label>
                <InputText
                  value={values.username}
                  onChange={(e) =>
                    setValues({ ...values, username: e.target.value })
                  }
                  placeholder="Ingrese su usuario"
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
                  Contraseña:
                </label>
                <Password
                  value={values.password}
                  onChange={(e) =>
                    setValues({ ...values, password: e.target.value })
                  }
                  feedback={false}
                  toggleMask
                  placeholder="Ingrese su contraseña"
                  inputStyle={{
                    width: "250px",
                    height: "32px",
                    borderColor: primaryColor,
                  }}
                />
              </div>

              <div style={{ textAlign: "center", marginBottom: "16px" }}>
                <Button
                  label="Iniciar sesión"
                  icon="pi pi-sign-in"
                  loading={loading}
                  onClick={handleLogin}
                  style={{
                    backgroundColor: "#608c3d",
                    borderColor: primaryColor,
                    width: "180px",
                    height: "36px",
                  }}
                />
              </div>

              {/* BOTÓN PARA IR AL REGISTRO */}
              <div style={{ textAlign: "center" }}>
                <button
                  onClick={() => setIsLogin(false)}
                  style={{
                    color: "#1d4ed8",
                    textDecoration: "underline",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "14px",
                  }}
                >
                  ¿No tienes cuenta? Regístrate
                </button>
              </div>
            </div>
          </>
        ) : (
          <RegisterForm /> 
        )}

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
