import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { getSaldo, getCuentas, getTransacciones } from "../api";
import Deposito from "./Deposito";
import Retiro from "./Retiro";
import Transacciones from "./Transacciones";

export default function Dashboard({ usuario, cerrarSesion }) {
  const [saldo, setSaldo] = useState(0);
  const [cuentas, setCuentas] = useState([]);
  const [vista, setVista] = useState("menu");
  const [trxs, setTrxs] = useState([]);
  const [idCuentaSeleccionada, setIdCuentaSeleccionada] = useState("");

  const loadDatos = async () => {
    if (!usuario) return;

    // saldo
    const s = await getSaldo(usuario.id);
    if (s.saldo !== undefined) setSaldo(s.saldo);

    // cuentas
    const c = await getCuentas(usuario.id);
    setCuentas(c);

    // transacciones
    if (idCuentaSeleccionada) {
      const t = await getTransacciones(Number(idCuentaSeleccionada));
      setTrxs(t);
    }
  };

  useEffect(() => {
    loadDatos();
  }, [idCuentaSeleccionada]);

  const handleVista = (nuevaVista) => {
    setVista(nuevaVista);
    loadDatos(); // recarga datos al cambiar de vista
  };

  return (
    <div className="container mt-4">
      <div className="card shadow p-4">
        <h2 className="text-center mb-3">
          Bienvenido, {usuario ? usuario.nombre : ""}
        </h2>

        <p className="fs-5 text-center">
          <strong>Saldo general:</strong>{" "}
          <span className="badge bg-primary ms-2">{saldo}</span>
        </p>

        <div className="d-flex justify-content-center gap-3 my-3">
          <button
            className="btn btn-success"
            onClick={() => handleVista("deposito")}
          >
            Depositar
          </button>
          <button
            className="btn btn-warning"
            onClick={() => handleVista("retiro")}
          >
            Retirar
          </button>
          <button
            className="btn btn-info text-white"
            onClick={() => handleVista("transacciones")}
          >
            Ver transacciones
          </button>
          <button className="btn btn-danger" onClick={cerrarSesion}>
            Cerrar sesión
          </button>
        </div>

        <div className="mt-4">
          {vista === "deposito" && (
            <Deposito cuentas={cuentas} reload={loadDatos} />
          )}
          {vista === "retiro" && (
            <Retiro cuentas={cuentas} reload={loadDatos} />
          )}
          {vista === "transacciones" && (
            <Transacciones
              cuentas={cuentas}
              trxs={trxs}
              setIdCuentaSeleccionada={setIdCuentaSeleccionada}
            />
          )}
        </div>
      </div>
    </div>
  );
}
