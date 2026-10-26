# Sistema de Veterinaria — Entrega 2: MVC y CRUD

Continuación de la primera entrega **Modelo del dominio – Sistema de Veterinaria**.

Se conservan las clases **Cliente, Mascota, Doctor, Turno, Producto y Pedido** y sus atributos.
Para esta entrega se implementa el CRUD completo de **Producto** usando **Node.js y Express**.
Las otras entidades permanecen como modelos de dominio (sin endpoints CRUD por ahora).

## Requisitos
- Node.js 18 o superior
- npm

## Ejecutar

```bash
cd backend
npm install
npm start
```

Servidor: `http://localhost:3000`

Para ejecutar pruebas:

```bash
npm test
```

## Estructura y responsabilidades

- `models/`: clases y atributos del dominio.
- `repositories/`: lectura y escritura en arrays en memoria.
- `services/`: validaciones y reglas de negocio.
- `controllers/`: reciben solicitudes y envían respuestas HTTP.
- `routes/`: define los endpoints y los conecta con controladores.
- `middlewares/`: manejo global de errores.
- `responses/`: formato homogéneo de respuestas.
- `exceptions/`: errores con códigos HTTP.
- `enums/`: mensajes centralizados.
- `utils/`: utilidades para IDs y errores asíncronos.

## Endpoints

| Método | Ruta | Función |
|---|---|---|
| GET | `/api/productos` | Listar todos |
| GET | `/api/productos/:id` | Obtener por ID |
| POST | `/api/productos` | Crear |
| PUT | `/api/productos/:id` | Modificar campos proporcionados |
| DELETE | `/api/productos/:id` | Eliminar |

**Crear producto:**

```bash
curl -X POST http://localhost:3000/api/productos \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Alimento para perros","precio":12500,"stock":15}'
```

**Modificar stock:**

```bash
curl -X PUT http://localhost:3000/api/productos/1 \
  -H "Content-Type: application/json" \
  -d '{"stock":10}'
```

**Consultar o eliminar:**

```bash
curl http://localhost:3000/api/productos
curl http://localhost:3000/api/productos/1
curl -X DELETE http://localhost:3000/api/productos/1
```

Las respuestas exitosas siguen `{ "success": true, "data": ... }`; los errores siguen
`{ "success": false, "message": "..." }`.

Códigos HTTP: 200 (consulta/actualización/borrado), 201 (creación),
400 (datos o ID inválidos), 404 (no encontrado), 409 (nombre duplicado),
500 (error no previsto).

**Validaciones:** `nombre` no vacío, `precio` número finito no negativo y
`stock` entero no negativo; nombre único sin distinguir mayúsculas/minúsculas.
La actualización permite modificar uno o varios campos y rechaza el objeto vacío.

**Nota:** Los productos se almacenan exclusivamente en un array y se pierden
al reiniciar el servidor. No utiliza bases de datos ni archivos como persistencia.

> El nombre de la carpeta es el ejemplo usado en la primera entrega.
> Cambialo a `apellido-nombre-veterinaria` si corresponde.
