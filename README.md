# TP-06 – Sistema de Reservas de Salas

## Descripción del proyecto

Aplicación web desarrollada con Node.js, Express, EJS y MongoDB mediante Mongoose, que permite gestionar reservas de salas de estudio.

El sistema permite registrar reservas, consultar las existentes, visualizar sus detalles y realizar búsquedas mediante filtros.

## Tecnologías utilizadas

- **Node.js:** entorno de ejecución de JavaScript.
- **Express:** framework para gestionar rutas y solicitudes HTTP.
- **EJS:** motor de plantillas para generar vistas dinámicas.
- **MongoDB:** base de datos NoSQL.
- **Mongoose:** ODM para modelar y validar los documentos de MongoDB.
- **Morgan:** registro de solicitudes HTTP.
- **express-ejs-layouts:** gestión de layouts para las vistas.

## Instalación

1. Clonar o descargar el repositorio.
2. Abrir una terminal en la carpeta del proyecto.
3. Instalar las dependencias:

terminal: npm install

4. Crear un archivo `.env` en la raíz del proyecto y configurar las variables de entorno:

```env
MONGODB_URI=tu_uri_de_mongodb
PORT=3000
```

5. Iniciar la aplicación:

terminal: npm start

También se puede ejecutar en modo local mediante:

terminal: npm run start:local

La aplicación estará disponible en: http://localhost:3000


## Modelo de datos

Cada reserva contiene los siguientes campos:

| estudiante | Nombre del estudiante. |
| email | Correo electrónico del estudiante. |
| sala | Sala seleccionada. |
| fecha | Fecha de la reserva. |
| turno | Turno seleccionado. |
| personas | Cantidad de personas. |
| disponible | Disponibilidad de la reserva. |

### Validaciones

- El nombre del estudiante es obligatorio.
- El correo electrónico es obligatorio y debe contener `@`.
- La sala debe ser una de las opciones permitidas:
  - Sala Norte.
  - Sala Sur.
  - Sala Multimedia.
- El turno debe ser válido:
  - Mañana.
  - Tarde.
  - Noche.
- La cantidad de personas debe ser un número entero entre 1 y 6.
- El campo disponible tiene como valor predeterminado `true`.

## Rutas de la aplicación

### Vistas web

| GET | `/` | Página de inicio. |
| GET | `/reservas` | Listar reservas. |
| GET | `/reservas/nueva` | Mostrar formulario de nueva reserva. |
| GET | `/reservas/:id` | Consultar una reserva. |
| POST | `/reservas` | Registrar una nueva reserva. |
| GET | `/estado` | Consultar el estado de la aplicación. |

### API 

| GET | `/api/reservas` | Obtener todas las reservas. |
| GET | `/api/reservas?sala=Sala%20Sur` | Filtrar reservas por sala. |


## Estructura del proyecto

```text
tp-06-salas-modular/
│
├── src/
│   ├── index.js
│   ├── app.js
│   │
│   ├── controllers/
│   ├── services/
│   ├── routes/
│   ├── middlewares/
│   ├── models/
│   └── config/
│
├── views/
│   ├── layouts/
│   └── reservas/
│
├── public/
│
├── scripts/
│
├── reservas/
│   └── reservas.json
│
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## Pruebas

Las solicitudes de la API pueden probarse utilizando Thunder Client o cualquier cliente HTTP.

Se recomienda comprobar:

- Listado general de reservas.
- Filtrado por sala.
- Consulta de reservas por identificador.
- Registro de nuevas reservas.
- Validación de datos incorrectos.
- Persistencia de los registros en MongoDB.

**Proyecto:** TP-06 – Salas Modular  
**Entorno:** Node.js / Express  
**Base de datos:** MongoDB