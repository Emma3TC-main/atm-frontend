import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { getTransacciones } from "../api";

export default function Transacciones({ cuentas }) {
  const [idCuenta, setIdCuenta] = useState("");
  const [trxs, setTrxs] = useState([]);

  const load = async () => {
    if (!idCuenta) return;
    const res = await getTransacciones(Number(idCuenta));
    setTrxs(res);

    if (res.length === 0) {
      Swal.fire({
        title: "Sin transacciones",
        text: "Esta cuenta no tiene movimientos.",
        icon: "info",
        confirmButtonText: "Entendido",
      });
    }
  };

  useEffect(() => {
    load();
  }, [idCuenta]);

  return (
    <div className="card p-4 shadow-sm mt-3">
      <h3 className="text-center mb-3">Transacciones</h3>

      <select
        className="form-select mb-3"
        value={idCuenta}
        onChange={(e) => setIdCuenta(e.target.value)}
      >
        <option value="">Elegir cuenta</option>
        {cuentas.map((c) => (
          <option key={c.id} value={c.id}>
            {c.numeroCuenta}
          </option>
        ))}
      </select>

      <ul className="list-group">
        {trxs.map((t) => (
          <li
            key={t.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div>
              <strong>{t.tipo}</strong> — S/ {t.monto}
              <br />
              <small className="text-muted">{t.fecha}</small>
            </div>

            <span
              className={
                t.estado === "EXITOSO"
                  ? "badge bg-success"
                  : "badge bg-secondary"
              }
            >
              {t.estado}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
