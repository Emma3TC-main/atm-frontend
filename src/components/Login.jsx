import { useState } from "react";
import Swal from "sweetalert2";
import { login } from "../api";

export default function Login({ setUsuario, goRegistro }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await login(email, pass);

    if (res.id && res.nombre) {
      setUsuario(res); // guardamos el objeto completo

      Swal.fire({
        title: "Bienvenido",
        text: `Hola ${res.nombre}`,
        icon: "success",
        confirmButtonText: "Continuar",
      });
    } else {
      const mensaje = res.error || "Error desconocido";
      setError(mensaje);

      Swal.fire({
        title: "Error",
        text: mensaje,
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div
        className="card p-4 shadow"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <h2 className="text-center mb-4">Login ATM</h2>

        <form onSubmit={handleLogin} className="d-flex flex-column gap-3">
          <input
            type="email"
            className="form-control"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="form-control"
            placeholder="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-primary">
            Ingresar
          </button>
        </form>

        {error && <p className="text-danger text-center mt-3">{error}</p>}

        <button className="btn btn-secondary mt-3 w-100" onClick={goRegistro}>
          Registrarse
        </button>
      </div>
    </div>
  );
}
