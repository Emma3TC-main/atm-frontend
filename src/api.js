const API = "https://atm-r9hp.onrender.com:8080/api";

// LOGIN (POST + query params, sin body)
export async function login(email, password) {
  const url = `${API}/login?email=${encodeURIComponent(
    email
  )}&password=${encodeURIComponent(password)}`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
  });

  return res.json();
}

// REGISTRO
export async function registrar(data) {
  const res = await fetch(`${API}/registro`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return res.json();
}

// SALDO
export async function getSaldo(id) {
  const res = await fetch(`${API}/saldo/${id}`);
  return res.json();
}

// CUENTAS
export async function getCuentas(id) {
  const res = await fetch(`${API}/cuentas/${id}`);
  return res.json();
}

// DEPOSITAR
export async function depositar(idCuenta, monto) {
  const res = await fetch(`${API}/depositar`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idCuenta, monto }),
  });
  return res.json();
}

// RETIRAR
export async function retirar(idCuenta, monto) {
  const res = await fetch(`${API}/retirar`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idCuenta, monto }),
  });
  return res.json();
}

// TRANSACCIONES
export async function getTransacciones(idCuenta) {
  const res = await fetch(`${API}/transacciones/${idCuenta}`);
  return res.json();
}
