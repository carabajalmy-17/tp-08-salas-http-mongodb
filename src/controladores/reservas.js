function crearControladorReservas(servicio) {
  async function listar(req, res) {
    const reservas = await servicio.listar();
    res.render("reservas/lista", {
      titulo: "reservas realizadas",
      reservas,
    });
  }

  function mostrarFormulario(req, res) {
    res.render("reservas/nueva", {
      titulo: "Nueva Reserva",
      error: null,
      valores: {},
    });
  }

  async function mostrarDetalle(req, res) {
    const reserva = await servicio.obtenerPorId(req.params.id);

    if (!reserva) {
      return res.status(404).render("no-encontrado", {
        titulo: "reserva no encontrada",
        mensaje: "no se encontro reserva con ese identificador.",
      });
    }

    res.render("reservas/detalle", {
      titulo: reserva.estudiante,
      reserva,
    });
  }

  async function crear(req, res) {
    await servicio.crear(req.reservaValidada);
    res.redirect("/reservas");
  }

  async function listarApi(req, res) {

    console.log("Filtro recibido:", req.query.sala);
    const reserva = await servicio.listar(req.query.sala);
    res.json(reserva);
  }

  async function obtenerApi(req, res) {
    const reserva = await servicio.obtenerPorId(req.params.id);
    if (!reserva) {
      return res.status(404).json({ error: "Reserva no encontrada" });
    }
    res.json(reserva);

  }
  async function crearApi(req, res) {
      const reserva = await servicio.crear(req.reservaValidada);
      res.location(`/api/reservas${reserva._id}`).status(201).json(reserva);
  }

  return { listar, mostrarFormulario, mostrarDetalle, crear, listarApi, obtenerApi, crearApi };
}

module.exports = { crearControladorReservas };
