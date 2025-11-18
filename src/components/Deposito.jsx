import { useState } from "react";
import Swal from "sweetalert2";
import { depositar } from "../api";

export default function Deposito({ cuentas, reload }) {
  const [idCuenta, setIdCuenta] = useState("");
  const [monto, setMonto] = useState("");

  const handleDep = async (e) => {
    e.preventDefault();
    const res = await depositar(Number(idCuenta), Number(monto));

    const mensaje = res.error || res.mensaje || "Depósito procesado";

    Swal.fire({
      title: res.error ? "Error en depósito" : "Depósito exitoso",
      text: mensaje,
      icon: res.error ? "error" : "success",
      confirmButtonText: "Aceptar",
    });

    reload();
  };

  return (
    <div className="card p-4 shadow-sm mt-3">
      <h3 className="text-center mb-3">Depósito</h3>

      <form onSubmit={handleDep} className="d-flex flex-column gap-3">
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

        <button type="submit" className="btn btn-success">
          Depositar
        </button>
      </form>
    </div>
  );
}
