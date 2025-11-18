import { useState } from "react";
import Swal from "sweetalert2";
import { retirar } from "../api";

export default function Retiro({ cuentas, reload }) {
  const [idCuenta, setIdCuenta] = useState("");
  const [monto, setMonto] = useState("");

  const handleRetiro = async (e) => {
    e.preventDefault();
    const res = await retirar(Number(idCuenta), Number(monto));

    const mensaje = res.error || res.mensaje || "Retiro procesado";

    Swal.fire({
      title: res.error ? "Error en retiro" : "Retiro exitoso",
      text: mensaje,
      icon: res.error ? "error" : "success",
      confirmButtonText: "Aceptar",
    });

    reload();
  };

  return (
    <div className="card p-4 shadow-sm mt-3">
      <h3 className="text-center mb-3">Retiro</h3>

      <form onSubmit={handleRetiro} className="d-flex flex-column gap-3">
        <select
          className="form-select"
          value={idCuenta}
          onChange={(e) => setIdCuenta(e.target.value)}
          required
        >
          <option value="">Seleccionar cuenta</option>
          {cuentas.map((c) => (
            <option key={c.id} value={c.id}>
              {c.numeroCuenta} - saldo: {c.saldo}
            </option>
          ))}
        </select>

        <input
          type="number"
          className="form-control"
          placeholder="Monto"
          value={monto}
          onChange={(e) => setMonto(e.target.value)}
          required
        />

        <button type="submit" className="btn btn-warning">
          Retirar
        </button>
      </form>
    </div>
  );
}
