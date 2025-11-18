import { useState } from "react";
import Login from "./components/Login";
import Registro from "./components/Registro";
import Dashboard from "./components/Dashboard";

export default function App() {
  const [usuario, setUsuario] = useState(null);
  const [vista, setVista] = useState("login");

  if (!usuario) {
    return (
      <>
        {vista === "login" && (
          <Login
            goRegistro={() => setVista("registro")}
            setUsuario={setUsuario} // pasamos setUsuario
          />
        )}
        {vista === "registro" && <Registro goLogin={() => setVista("login")} />}
      </>
    );
  }

  return (
    <Dashboard
      usuario={usuario} // pasamos objeto completo
      cerrarSesion={() => {
        setUsuario(null);
        setVista("login");
      }}
    />
  );
}
