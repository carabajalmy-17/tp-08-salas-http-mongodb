function prepararAreaReservas(req, res, next) {
  res.locals.seccion = "Reservas de Sala";
  next();
}
function validarReserva(req, res, next) {
  const valores = req.body ?? {};
  const estudiante =
    typeof valores.estudiante === "string" ? valores.estudiante.trim() : "";
  const email = typeof valores.email === "string" ? valores.email.trim() : "";
  const sala = typeof valores.sala === "string" ? valores.sala.trim() : "";
  const salasPermitidas = ["Sala Norte", "Sala Sur", "Sala Multimedia"];
  const fecha = typeof valores.fecha === "string" ? valores.fecha.trim() : "";
  const turno = typeof valores.turno === "string" ? valores.turno.trim() : "";
  const turnosPermitidos = ["Mañana", "Tarde", "Noche"];
  const personasRecibidas = valores.personas;

  const tipoPersonasValido =
    typeof personasRecibidas === "number" ||
    (typeof personasRecibidas === "string" && personasRecibidas.trim() !== "");

  const personas = tipoPersonasValido ? Number(personasRecibidas) : NaN;

  if (
    estudiante === "" ||
    email === "" ||
    !email.includes("@") ||
    !salasPermitidas.includes(sala) ||
    fecha === "" ||
    !turnosPermitidos.includes(turno) ||
    !Number.isInteger(personas) ||
    personas < 1 ||
    personas > 6
  ) {
    if (req.baseUrl === "/api/reservas") {
      return res.status(400).json({
        error: "Completá los campos correctamente.",
      });
    }
    return res.status(400).render("reservas/nueva", {
      titulo: "Nueva reserva",
      error: "Completá los campos correctamente.",
      valores,
    });
  }

  req.reservaValidada = {
    estudiante,
    email,
    sala,
    fecha,
    turno,
    personas,
  };

  next();
}
module.exports = { prepararAreaReservas, validarReserva };
