// const path = require("node:path");

// const { leerReservas } = require("./archivos");
// const { leerConfiguracion } = require("./config/entorno");

// const { crearServicioReservas } = require("./servicios/reservas");
// const { crearApp } = require("./app");

// const ruta = path.join(__dirname, "..", "reservas", "reservas.json");

// async function main() {
//   console.log("Iniciando aplicación...");

//   const { puerto, formatoRegistro } = leerConfiguracion();
//   const reservasIniciales = await leerReservas(ruta);
//   const servicioReservas = crearServicioReservas(reservasIniciales);
//   const app = crearApp({ servicioReservas, formatoRegistro });

//   app.listen(puerto, () => {
//     console.log(`servidor funcionando en http://localhost:${puerto}`);
//   });
// }
// main().catch((error) => {
//   console.error("no se pudo inciar la aplicacion", error);
//   process.exitCode = -1;
// });

const { leerConfiguracion } = require("./config/entorno");
const {
  conectarBaseDatos,
  desconectarBaseDatos,
} = require("./config/base-datos");
const { crearServicioReservasMongo } = require("./servicios/reservas-mongo");
const { crearApp } = require("./app");
async function main() {
  const { puerto, formatoRegistro } = leerConfiguracion();
  await conectarBaseDatos();
  const servicioReservas = crearServicioReservasMongo();
  const app = crearApp({ servicioReservas, formatoRegistro });
  const servidor = app.listen(puerto, () => {
    console.log(`Aplicación disponible en http://localhost:${puerto}`);
  });
  let cerrando = false;
  function cerrar() {
    if (cerrando) return;
    cerrando = true;
    servidor.close(async () => {
      try {
        await desconectarBaseDatos();
      } catch (error) {
        console.error("Error al cerrar:", error.name);
        process.exitCode = 1;
      }
    });
  }
  process.once("SIGINT", cerrar);
  process.once("SIGTERM", cerrar);
  servidor.on("error", (error) => {
    console.error("No se pudo escuchar el puerto:", error.code);
    process.exitCode = 1;
    desconectarBaseDatos().catch((fallo) => {
      console.error("Error al cerrar:", fallo.name);
    });
  });
}
main().catch(async (error) => {
  console.error("No se pudo iniciar la aplicación:", error.name);
  console.error("Revisar entorno, DNS, red, acceso de Atlas y puerto.");
  process.exitCode = 1;
  try {
    await desconectarBaseDatos();
  } catch (fallo) {
    console.error("Error al cerrar:", fallo.name);
  }
});
