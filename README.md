Mana Market - Tienda de Cartas Online
1.0 Definición de alcance
El proyecto Mana Market consiste en una tienda online especializada en la venta de cartas coleccionables, principalmente del universo Magic: The Gathering y otros juegos de cartas similares. El objetivo principal es ofrecer a los coleccionistas y jugadores una plataforma donde puedan explorar, buscar y adquirir cartas de forma sencilla e intuitiva.

La aplicación permitirá a los usuarios visualizar un catálogo completo de cartas disponibles, cada una con su imagen, nombre, edición, rareza, precio y cantidad en stock. Los usuarios podrán registrarse, iniciar sesión y gestionar un carrito de compras para realizar pedidos. Existirá un panel de administración para gestionar el inventario: agregar nuevas cartas, editar información existente, actualizar precios y stock, y eliminar cartas del catálogo.

Para que el proyecto sea realista y acotado, se definen límites claros: la aplicación se centrará únicamente en la gestión del catálogo de cartas y el proceso de compra básico. No se incluirá pasarela de pago real (se simulará el proceso), sistema de valoraciones o reseñas, foros de discusión, trueque entre usuarios, subasta de cartas, ni envío de notificaciones por correo electrónico. Tampoco habrá roles complejos de usuario más allá de "cliente" y "administrador", ni integración con APIs externas de precios de mercado. Estos límites permiten enfocarse en el núcleo funcional: un CRUD completo de cartas y una experiencia de compra fluida.

Para el desarrollo, utilizaremos el stack MEAN (MongoDB, Express, Angular, Node.js) para la API backend y los dos clientes frontend solicitados. El backend se desarrollará con Node.js, Express y MongoDB, estructurado en capas (modelos, controladores, rutas). Los frontends se desarrollarán con Angular y React respectivamente, ambos consumiendo la misma API. Para el diseño visual utilizaremos Bootstrap, minimizando el CSS personalizado. El entorno de desarrollo incluirá Visual Studio Code como editor, Postman para pruebas de API, y MongoDB Compass para la gestión visual de la base de datos.

En conclusión, la aplicación cubrirá únicamente lo esencial: registro/login, visualización de catálogo de cartas con filtros y paginación, carrito de compras simulado, y un panel administrativo para gestión completa del inventario. Todo esto en una interfaz web responsive, clara y funcional, que cumpla con el objetivo de ser una tienda online de cartas simple pero completamente operativa.

2.0 Análisis de viabilidad
Desde el punto de vista técnico, el proyecto es totalmente viable. El stack MEAN es una arquitectura madura y ampliamente documentada, ideal para desarrollar aplicaciones full-stack basadas en JavaScript. La estructura del sistema es clara: una entidad principal "Carta" que será gestionada mediante operaciones CRUD desde ambos frontends, consumiendo una API REST bien definida. MongoDB como base de datos NoSQL es adecuada para este tipo de proyectos, permitiendo flexibilidad en el modelo de datos y escalabilidad futura si fuese necesaria.

La separación en capas (modelos, controladores, rutas) y la creación de dos frontends independientes (Angular y React) garantizan una arquitectura limpia y mantenible. Además, el uso de Bootstrap para la interfaz reduce significativamente el tiempo de desarrollo frontend, permitiendo centrarse en la lógica de negocio y la funcionalidad. Las herramientas necesarias son todas gratuitas y de código abierto: Node.js, Express, MongoDB, Angular, React, Bootstrap, Visual Studio Code, Postman.

En cuanto a la viabilidad económica, también es favorable. No se requieren licencias de pago, infraestructura costosa ni servicios externos. El esfuerzo principal será el desarrollo del backend y los dos frontends, pero al tratarse de un proyecto académico con alcance bien definido y funcionalidades limitadas a lo esencial, el tiempo estimado es razonable para un equipo de una o dos personas. El despliegue final puede realizarse en servicios gratuitos o de bajo coste como Render, Vercel, Netlify o Atlas (MongoDB).

En conclusión, tanto técnica como económicamente, el proyecto Mana Market es perfectamente realizable, siempre que nos mantengamos dentro del alcance definido y prioricemos correctamente las funcionalidades principales del sistema.

3.0 API Endpoints (Backend)

Base URL del recurso principal de cartas:
- `http://localhost:3000/api/v1/cartas`

Formato general de respuestas:
- Éxito en listados/detalle: `{ "status": ... }`
- Éxito en creación/actualización/borrado: `{ "status": "..." }` (mensajes en español)
- Error de validación o ID inválido: HTTP 400 con `{ "status": "..." }`
- No encontrado: HTTP 404 con `{ "status": "Carta not found" }`

---

### 3.1 Health / raíz

#### GET /
Devuelve un mensaje simple indicando la ruta principal del API.

Ejemplo:
```bash
curl -X GET http://localhost:3000/
```

Respuesta esperada (200):
```text
API is in /api/v1/cartas/
```

---

### 3.2 Cartas

#### Modelo lógico en la API

Para crear una carta desde clientes (Postman, frontends), el endpoint de creación espera **campos en inglés** en el cuerpo de la petición. Estos se mapean internamente al modelo de base de datos.

Campos requeridos en el body (JSON) de creación:
- `name` (string)
- `year` (number)
- `expansion` (string)
- `price` (number >= 0)
- `rarity` (string)
- `text` (string)
- `imageUrl` (string, URL de imagen de la carta)

Internamente se guardan como:
- `nombre`, `year`, `expansion`, `precio`, `rareza`, `texto`, `imagen`.

---

#### GET /api/v1/cartas
Lista todas las cartas.

Ejemplo:
```bash
curl -X GET http://localhost:3000/api/v1/cartas
```

Respuesta ejemplo (200):
```json
{
  "status": [
    {
      "_id": "6650c1a2b3c4d5e6f7a8b9c0",
      "nombre": "Black Lotus",
      "year": 1993,
      "expansion": "dominaria",
      "precio": 3299.99,
      "rareza": "mythic",
      "texto": "Artifact, NM EN, stock 20, etc.",
      "imagen": "https://example.com/images/black-lotus.jpg",
      "createdAt": "2026-02-20T10:00:00.000Z",
      "updatedAt": "2026-02-20T10:00:00.000Z"
    }
  ]
}
```

---

#### GET /api/v1/cartas/carta/:id
Obtiene una carta por su ID de MongoDB.

Ejemplo:
```bash
curl -X GET http://localhost:3000/api/v1/cartas/carta/6650c1a2b3c4d5e6f7a8b9c0
```

Respuestas posibles:
- `200 OK` con `{ "status": { ...documento... } }`
- `404 Not Found` con `{ "status": "Carta not found" }`
- `400 Bad Request` si el ID tiene formato inválido.

---

#### POST /api/v1/cartas/publicar
Crea una carta nueva. **Este endpoint ya espera los campos en inglés**.

Body de ejemplo (JSON):
```json
{
  "name": "Black Lotus",
  "year": 1993,
  "expansion": "dominaria",
  "price": 3299.99,
  "rarity": "mythic",
  "text": "Artifact, NM EN, stock 20, etc.",
  "imageUrl": "https://assets.moxfield.net/cards/card-Yn1Gp-normal.webp?203543493"
}
```

Ejemplo cURL:
```bash
curl -X POST http://localhost:3000/api/v1/cartas/publicar \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Black Lotus",
    "year": 1993,
    "expansion": "dominaria",
    "price": 3299.99,
    "rarity": "mythic",
    "text": "Artifact, NM EN, stock 20, etc.",
    "imageUrl": "https://assets.moxfield.net/cards/card-Yn1Gp-normal.webp?203543493"
  }'
```

Respuestas posibles:
- `200 OK` con `{ "status": "Se ha añadido la carta correctamente", "data": { ...cartaGuardada } }`
- `400 Bad Request` con `{ "status": "Faltan campos" }` si falta alguno de los campos requeridos.
- `400 Bad Request` con `{ "status": "Carta ya existe" }` si ya hay una carta con el mismo `name`.
- `500 Internal Server Error` con `{ "status": "..." }` si ocurre un error de servidor/BD.

---

#### PUT /api/v1/cartas/editar/:id
Actualiza una carta por ID. Acepta cuerpo parcial; solo los campos enviados se actualizan.

Ejemplo de body (JSON):
```json
{
  "rarity": "mythic",
  "text": "Reimpresión de la carta original."
}
```

Ejemplo cURL:
```bash
curl -X PUT http://localhost:3000/api/v1/cartas/editar/6650c1a2b3c4d5e6f7a8b9c0 \
  -H "Content-Type: application/json" \
  -d '{
    "rarity": "mythic",
    "text": "Reimpresión de la carta original."
  }'
```

Respuestas posibles:
- `200 OK` con `{ "status": "Carta Successully Updated" }`
- `404 Not Found` con `{ "status": "Carta not found" }` si el ID no existe.
- `400 Bad Request` con `{ "status": "..." }` si hay error de validación o ID inválido.

---

#### DELETE /api/v1/cartas/eliminar/:id
Elimina una carta por ID.

Ejemplo cURL:
```bash
curl -X DELETE http://localhost:3000/api/v1/cartas/eliminar/6650c1a2b3c4d5e6f7a8b9c0
```

Respuestas posibles:
- `200 OK` con `{ "status": "Carta Successully Deleted" }`
- `404 Not Found` con `{ "status": "Carta not found" }`.
- `400 Bad Request` con `{ "status": "..." }` si el ID tiene formato inválido.

---

### 3.3 Códigos HTTP usados en la API

- `200 OK`: consulta/actualización/eliminación correcta.
- `400 Bad Request`: validación fallida o ID mal formado.
- `404 Not Found`: recurso no encontrado.
- `500 Internal Server Error`: error interno de servidor o base de datos.

4.0 Modelo de datos, relaciones y reglas de negocio

Esta sección define las entidades del sistema, sus campos, restricciones y las reglas que gobiernan la integridad de la aplicación.

## 4.1 Entidades del modelo

### 4.1.1 Entidad `User` (colección `users2026`)

Campos:
- `_id`: `ObjectId` (autogenerado por MongoDB, clave primaria).
- `name`: `String`, **requerido**, se guarda con `trim`.
- `email`: `String`, **requerido**, **único**, se guarda con `trim`.
- `createdAt`: `Date` (automático por `timestamps`).
- `updatedAt`: `Date` (automático por `timestamps`).

Restricciones:
- No se permiten usuarios sin `name` ni `email`.
- `email` no puede repetirse entre usuarios.

---

### 4.1.2 Entidad `Card` (colección `cards2026`)

Campos:
- `_id`: `ObjectId` (autogenerado).
- `name`: `String`, **requerido**, `trim`.
- `collection`: `String`, **requerido**, `trim`.
- `rarity`: `String`, **requerido**, `trim`.
- `type`: `String`, **requerido**, `trim`.
- `price`: `Number`, **requerido**, `min: 0`.
- `stock`: `Number`, **requerido**, `min: 0`.
- `language`: `String`, **requerido**, `trim`.
- `condition`: `String`, **requerido**, `trim`.
- `createdAt`: `Date` (automático).
- `updatedAt`: `Date` (automático).

Restricciones:
- No se permiten cartas sin datos obligatorios.
- `price` y `stock` no pueden ser negativos.

---

### 4.1.3 Entidad `Cart` (colección `carts2026`)

Campos:
- `_id`: `ObjectId` (autogenerado).
- `userId`: `ObjectId`, **requerido**, referencia lógica a `User`.
- `items`: `Array` de elementos con estructura:
  - `cardId`: `ObjectId`, **requerido**, referencia lógica a `Card`.
  - `quantity`: `Number`, **requerido**, `min: 1`.
  - `price`: `Number`, **requerido**, `min: 0`.
- `status`: `String`, valor por defecto `open`.
- `createdAt`: `Date` (automático).
- `updatedAt`: `Date` (automático).

Restricciones:
- Cada ítem debe tener cantidad mínima de 1.
- El precio por ítem no puede ser negativo.

---

### 4.1.4 Entidad `Order` (colección `orders2026`)

Campos:
- `_id`: `ObjectId` (autogenerado).
- `userId`: `ObjectId`, **requerido**, referencia lógica a `User`.
- `items`: `Array` de elementos con estructura:
  - `cardId`: `ObjectId`, **requerido**, referencia lógica a `Card`.
  - `quantity`: `Number`, **requerido**, `min: 1`.
  - `price`: `Number`, **requerido**, `min: 0`.
- `total`: `Number`, **requerido**, `min: 0`.
- `status`: `String`, valor por defecto `pending`.
- `createdAt`: `Date` (automático).
- `updatedAt`: `Date` (automático).

Restricciones:
- No se puede crear pedido sin `userId`, `items` y `total`.
- Ningún ítem puede tener cantidad menor que 1 ni precio negativo.
- `total` no puede ser negativo.

## 4.2 Relaciones entre colecciones

Relaciones definidas por referencia (`ObjectId`):

1. `User (1) -> (N) Cart`
	- Un usuario puede tener múltiples carritos.
	- Cada carrito pertenece a un único usuario (`cart.userId`).

2. `User (1) -> (N) Order`
	- Un usuario puede generar múltiples pedidos.
	- Cada pedido pertenece a un único usuario (`order.userId`).

3. `Card (1) -> (N) Cart.items`
	- Una carta puede aparecer en múltiples ítems de carrito.
	- Cada ítem referencia una carta (`items.cardId`).

4. `Card (1) -> (N) Order.items`
	- Una carta puede aparecer en múltiples ítems de pedido.
	- Cada ítem de pedido referencia una carta (`items.cardId`).

Modelo conceptual simplificado:
- `User` se relaciona con `Cart` y `Order`.
- `Cart` y `Order` contienen líneas (`items`) que apuntan a `Card`.

## 4.3 Reglas de negocio

### 4.3.1 Reglas implementadas actualmente (backend)

Validaciones de esquema (Mongoose):
- Campos marcados como `required` son obligatorios.
- Restricciones numéricas `min` para precios, stock y cantidades.
- `email` de usuario es único.
- `trim` en campos de texto para limpiar espacios.
- `timestamps` para auditoría básica (`createdAt`, `updatedAt`).

Integridad básica por operación:
- En operaciones `GET/PUT/DELETE` por ID, si no existe recurso se responde `404`.
- Si el ID está mal formado o falla validación de datos, se responde `400`.

### 4.3.2 Reglas funcionales del dominio (a aplicar en capa de negocio)

Reglas para catálogo (`Card`):
- No permitir stock negativo en ninguna operación.
- Precio siempre mayor o igual a cero.

Reglas para carrito (`Cart`):
- Solo aceptar `quantity >= 1` por línea.
- El precio guardado en `items.price` debe corresponder al precio vigente de la carta en el momento de añadirla al carrito.
- El estado del carrito debe transicionar de forma controlada (por ejemplo: `open -> closed`).

Reglas para pedidos (`Order`):
- `total` debe representar la suma de las líneas del pedido:
  - $total = \sum (quantity_i \times price_i)$
- Un pedido no debe crearse vacío (`items.length > 0`).
- Al confirmar pedido, debe verificarse stock disponible de cada carta.
- Si se confirma un pedido, debe descontarse stock de cada carta afectada.

Reglas de integridad referencial:
- `userId` debe existir en `users2026` para crear/actualizar carrito o pedido.
- `cardId` debe existir en `cards2026` para crear/actualizar ítems.
- Evitar borrar usuarios o cartas con referencias activas, o aplicar una estrategia explícita (bloqueo lógico, cascada controlada o re-asignación).

Reglas de consistencia de estados:
- Estados sugeridos de carrito: `open`, `closed`, `abandoned`.
- Estados sugeridos de pedido: `pending`, `paid`, `shipped`, `cancelled`.
- No permitir transiciones inválidas (por ejemplo, `cancelled -> paid`).

## 4.4 Condiciones de integridad de la aplicación

La aplicación debe garantizar, como mínimo:
- Integridad de entidad: cada documento con `_id` único y campos obligatorios completos.
- Integridad de dominio: valores dentro de rango (`min`) y formatos coherentes.
- Integridad referencial: referencias válidas entre usuarios, cartas, carritos y pedidos.
- Integridad transaccional funcional: operaciones de compra/pedido deben mantener consistencia entre `orders` y `cards.stock`.


Con esta definición, el modelo de datos queda documentado y se establece un contrato claro para backend, frontend y pruebas de integración.
