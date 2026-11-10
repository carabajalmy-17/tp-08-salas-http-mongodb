const {
  conectarBaseDatos,
  desconectarBaseDatos,
} = require("../src/config/base-datos");
const { Reserva } = require("../src/modelos/reservas");
async function main() {
  try {
    await conectarBaseDatos();
    const reserva = await Reserva.create({
      estudiante: "malena carabajal",
      email: "malena65@gmail.com",
      sala: "Sala Norte",
      fecha: "17-12-2026",
      turno: "Mañana",
      personas: 2,
    });
    console.log("Reserva registrada. _id:", reserva._id.toString());
  } finally {
    await desconectarBaseDatos();
  }
}
main().catch((error) => {
  console.error("No se pudo registrar la reserva:", error.name);
  if (error.errors) {
    console.error("Campos a revisar:", Object.keys(error.errors).join(", "));
  }
  console.error("Revisar datos, configuración y disponibilidad de MongoDB.");
  process.exitCode = 1;
});
