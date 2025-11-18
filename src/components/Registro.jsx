import { useState } from "react";
import Swal from "sweetalert2";
import { registrar } from "../api";

export default function Registro({ goLogin }) {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegistro = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Llamada al backend
      const res = await registrar({ nombre, email, password: pass });

      if (res.idUsuario) {
        // Éxito
        Swal.fire({
          title: "Registro exitoso",
          text: `Usuario creado correctamente (ID: ${res.idUsuario})`,
          icon: "success",
          confirmButtonText: "Continuar",
        }).then(() => {
          // Limpiar campos
          setNombre("");
          setEmail("");
          setPass("");
          // Volver a login
          goLogin();
        });
      } else {
        // Error devuelto por backend
        Swal.fire({
          title: "Error",
          text: res.error || "Error desconocido",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      }
    } catch (err) {
      // Error de conexión o inesperado
      Swal.fire({
        title: "Error",
        text: err.message || "Error de conexión",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div
        className="card p-4 shadow"
        style={{ maxWidth: "450px", width: "100%" }}
      >
        <h2 className="text-center mb-4">Registro</h2>

        <form onSubmit={handleRegistro} className="d-flex flex-column gap-3">
          <input
            type="text"
            className="form-control"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            disabled={loading}
          />

          <input
            type="email"
            className="form-control"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />

          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            required
            disabled={loading}
          />

          <button type="submit" className="btn btn-success" disabled={loading}>
            {loading ? "Procesando..." : "Crear cuenta"}
          </button>
        </form>

        <button
          className="btn btn-secondary mt-3 w-100"
          onClick={goLogin}
          disabled={loading}
        >
          Volver
        </button>
      </div>
    </div>
  );
}
