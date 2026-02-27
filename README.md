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

Base URL:
- `http://localhost:3000/api/v1`

Formato general de respuestas:
- Éxito en listados/detalle: `{ "status": ... }`
- Éxito en creación/actualización/borrado: `{ "status": "... Successfully ..." }`
- Error de validación o ID inválido: HTTP 400 con `{ "status": error }`
- No encontrado: HTTP 404 con `{ "status": "... not found" }`

Nota:
- Existe compatibilidad hacia atrás para películas usando `/movies` además de `/cards`.

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
API is in /api/v1/cards/
```

---

### 3.2 Cards (y Movies por compatibilidad)

Modelo `Card` (campos requeridos):
- `name` (string)
- `collection` (string)
- `rarity` (string)
- `type` (string)
- `price` (number >= 0)
- `stock` (number >= 0)
- `language` (string)
- `condition` (string)
- `imageUrl` (string, URL de imagen de la carta)

#### GET /api/v1/cards
Lista todas las cartas.

Ejemplo:
```bash
curl -X GET http://localhost:3000/api/v1/cards
```

Respuesta ejemplo (200):
```json
{
	"status": [
		{
			"_id": "65f0c1a2b3c4d5e6f7a8b9c0",
			"name": "Lightning Bolt",
			"collection": "Revised",
			"rarity": "Common",
			"type": "Instant",
			"price": 4.5,
			"stock": 12,
			"language": "EN",
			"condition": "NM",
			"imageUrl": "https://example.com/images/lightning-bolt.jpg",
			"createdAt": "2026-02-20T10:00:00.000Z",
			"updatedAt": "2026-02-20T10:00:00.000Z"
		}
	]
}
```

#### GET /api/v1/cards?page=1&limit=10
Lista cartas con paginación.

Ejemplo:
```bash
curl -X GET "http://localhost:3000/api/v1/cards?page=1&limit=10"
```

Respuesta ejemplo (200):
```json
{
	"status": [],
	"page": 1,
	"limit": 10,
	"total": 42,
	"pages": 5
}
```

#### GET /api/v1/cards/:id
Obtiene una carta por ID.

Ejemplo:
```bash
curl -X GET http://localhost:3000/api/v1/cards/65f0c1a2b3c4d5e6f7a8b9c0
```

#### GET /api/v1/cards/card/:id
Ruta legacy para obtener una carta por ID.

Ejemplo:
```bash
curl -X GET http://localhost:3000/api/v1/cards/card/65f0c1a2b3c4d5e6f7a8b9c0
```

#### GET /api/v1/cards/movie/:id
Ruta legacy alternativa para obtener una carta por ID.

Ejemplo:
```bash
curl -X GET http://localhost:3000/api/v1/cards/movie/65f0c1a2b3c4d5e6f7a8b9c0
```

#### GET /api/v1/cards/collections
Devuelve colecciones distintas (`collection`).

Nota técnica actual:
- Este endpoint está definido en el backend, pero puede devolver `400` en el estado actual por el orden de rutas (`/:id` está antes de `/collections`).

Ejemplo:
```bash
curl -X GET http://localhost:3000/api/v1/cards/collections
```

Respuesta ejemplo (200):
```json
{
	"status": ["Revised", "Alpha", "Modern Horizons"]
}
```

#### POST /api/v1/cards
Crea una carta.

Ejemplo:
```bash
curl -X POST http://localhost:3000/api/v1/cards \
	-H "Content-Type: application/json" \
	-d '{
		"name": "Counterspell",
		"collection": "Ice Age",
		"rarity": "Common",
		"type": "Instant",
		"price": 2.2,
		"stock": 20,
		"language": "EN",
		"condition": "EX",
		"imageUrl": "https://example.com/images/counterspell.jpg"
	}'
```

Respuesta esperada (201):
```json
{
	"status": "Card Successfully Inserted"
}
```

#### PUT /api/v1/cards/:id
Actualiza una carta por ID (campos parciales o completos).

Ejemplo:
```bash
curl -X PUT http://localhost:3000/api/v1/cards/65f0c1a2b3c4d5e6f7a8b9c0 \
	-H "Content-Type: application/json" \
	-d '{
		"price": 3.0,
		"stock": 18
	}'
```

Respuesta esperada (200):
```json
{
	"status": "Card Successfully Updated"
}
```

#### DELETE /api/v1/cards/:id
Elimina una carta por ID.

Ejemplo:
```bash
curl -X DELETE http://localhost:3000/api/v1/cards/65f0c1a2b3c4d5e6f7a8b9c0
```

Respuesta esperada (200):
```json
{
	"status": "Card Successfully Deleted"
}
```

#### Compatibilidad `/movies`
Las mismas operaciones anteriores existen también sobre `/api/v1/movies`.

Ejemplos rápidos:
```bash
curl -X GET http://localhost:3000/api/v1/movies
curl -X GET http://localhost:3000/api/v1/movies/65f0c1a2b3c4d5e6f7a8b9c0
curl -X POST http://localhost:3000/api/v1/movies -H "Content-Type: application/json" -d '{"name":"...","collection":"...","rarity":"...","type":"...","price":1,"stock":1,"language":"EN","condition":"NM","imageUrl":"https://example.com/image.jpg"}'
curl -X PUT http://localhost:3000/api/v1/movies/65f0c1a2b3c4d5e6f7a8b9c0 -H "Content-Type: application/json" -d '{"stock":99}'
curl -X DELETE http://localhost:3000/api/v1/movies/65f0c1a2b3c4d5e6f7a8b9c0
```

---

### 3.3 Users

Modelo `User` (campos requeridos):
- `name` (string)
- `email` (string, único)

#### GET /api/v1/users
Lista usuarios.
```bash
curl -X GET http://localhost:3000/api/v1/users
```

#### GET /api/v1/users/:id
Obtiene un usuario por ID.
```bash
curl -X GET http://localhost:3000/api/v1/users/65f0c1a2b3c4d5e6f7a8b9c1
```

#### POST /api/v1/users
Crea un usuario.
```bash
curl -X POST http://localhost:3000/api/v1/users \
	-H "Content-Type: application/json" \
	-d '{
		"name": "Hector",
		"email": "hector@example.com"
	}'
```

Respuesta esperada (201):
```json
{ "status": "User Successfully Inserted" }
```

#### PUT /api/v1/users/:id
Actualiza un usuario.
```bash
curl -X PUT http://localhost:3000/api/v1/users/65f0c1a2b3c4d5e6f7a8b9c1 \
	-H "Content-Type: application/json" \
	-d '{
		"name": "Hector Ruiz"
	}'
```

#### DELETE /api/v1/users/:id
Elimina un usuario.
```bash
curl -X DELETE http://localhost:3000/api/v1/users/65f0c1a2b3c4d5e6f7a8b9c1
```

---

### 3.4 Carts

Modelo `Cart`:
- `userId` (ObjectId de `User`, requerido)
- `items` (array)
	- `cardId` (ObjectId de `Card`, requerido)
	- `quantity` (number >= 1)
	- `price` (number >= 0)
- `status` (string, por defecto `open`)

#### GET /api/v1/carts
Lista carritos.
```bash
curl -X GET http://localhost:3000/api/v1/carts
```

#### GET /api/v1/carts/:id
Obtiene un carrito por ID.
```bash
curl -X GET http://localhost:3000/api/v1/carts/65f0c1a2b3c4d5e6f7a8b9d1
```

#### POST /api/v1/carts
Crea un carrito.
```bash
curl -X POST http://localhost:3000/api/v1/carts \
	-H "Content-Type: application/json" \
	-d '{
		"userId": "65f0c1a2b3c4d5e6f7a8b9c1",
		"items": [
			{
				"cardId": "65f0c1a2b3c4d5e6f7a8b9c0",
				"quantity": 2,
				"price": 4.5
			}
		],
		"status": "open"
	}'
```

Respuesta esperada (201):
```json
{ "status": "Cart Successfully Inserted" }
```

#### PUT /api/v1/carts/:id
Actualiza un carrito.
```bash
curl -X PUT http://localhost:3000/api/v1/carts/65f0c1a2b3c4d5e6f7a8b9d1 \
	-H "Content-Type: application/json" \
	-d '{
		"status": "closed"
	}'
```

#### DELETE /api/v1/carts/:id
Elimina un carrito.
```bash
curl -X DELETE http://localhost:3000/api/v1/carts/65f0c1a2b3c4d5e6f7a8b9d1
```

---

### 3.5 Orders

Modelo `Order`:
- `userId` (ObjectId de `User`, requerido)
- `items` (array)
	- `cardId` (ObjectId de `Card`, requerido)
	- `quantity` (number >= 1)
	- `price` (number >= 0)
- `total` (number >= 0, requerido)
- `status` (string, por defecto `pending`)

#### GET /api/v1/orders
Lista pedidos.
```bash
curl -X GET http://localhost:3000/api/v1/orders
```

#### GET /api/v1/orders/:id
Obtiene un pedido por ID.
```bash
curl -X GET http://localhost:3000/api/v1/orders/65f0c1a2b3c4d5e6f7a8b9e1
```

#### POST /api/v1/orders
Crea un pedido.
```bash
curl -X POST http://localhost:3000/api/v1/orders \
	-H "Content-Type: application/json" \
	-d '{
		"userId": "65f0c1a2b3c4d5e6f7a8b9c1",
		"items": [
			{
				"cardId": "65f0c1a2b3c4d5e6f7a8b9c0",
				"quantity": 2,
				"price": 4.5
			}
		],
		"total": 9,
		"status": "pending"
	}'
```

Respuesta esperada (201):
```json
{ "status": "Order Successfully Inserted" }
```

#### PUT /api/v1/orders/:id
Actualiza un pedido.
```bash
curl -X PUT http://localhost:3000/api/v1/orders/65f0c1a2b3c4d5e6f7a8b9e1 \
	-H "Content-Type: application/json" \
	-d '{
		"status": "paid"
	}'
```

#### DELETE /api/v1/orders/:id
Elimina un pedido.
```bash
curl -X DELETE http://localhost:3000/api/v1/orders/65f0c1a2b3c4d5e6f7a8b9e1
```

---

### 3.6 Códigos HTTP usados en la API

- `200 OK`: consulta/actualización/eliminación correcta.
- `201 Created`: creación correcta.
- `400 Bad Request`: validación fallida o ID mal formado.
- `404 Not Found`: recurso no encontrado.

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
