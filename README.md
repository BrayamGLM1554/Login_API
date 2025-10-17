# 🔐 API de Login - Impertula

API desarrollada en **Node.js + Express + MongoDB** para el manejo de autenticación mediante **JWT**.  
Diseñada para integrarse con servicios en la nube como **Render** y soportar flujos de login seguros con logs detallados.

---

## 🚀 Tecnologías utilizadas

- **Node.js**
- **Express**
- **MongoDB (Mongoose)**
- **JWT (jsonwebtoken)**
- **bcryptjs**
- **dotenv**
- **CORS**

---

## ⚙️ Instalación y configuración

### 1️⃣ Clona el repositorio
```bash
git clone https://github.com/tuusuario/impertula-login-api.git
cd impertula-login-api
2️⃣ Instala las dependencias
bash
Copiar código
npm install
3️⃣ Configura las variables de entorno
Crea un archivo .env en la raíz del proyecto con el siguiente contenido:

env
Copiar código
MONGODB_URI=tu_cadena_de_conexion_a_mongodb
JWT_SECRET=tu_clave_secreta_jwt
PORT=3001
4️⃣ Inicia el servidor
bash
Copiar código
npm start
Verás algo similar en la consola:

yaml
Copiar código
==================================================
🚀 Servidor corriendo en puerto 3001
📅 Iniciado: 2025-10-17T17:00:00.000Z
🌍 Entorno: development
🔗 Health check: http://localhost:3001/api/health
==================================================
✅ Conectado a MongoDB
📊 Base de datos: cluster0.rvrn2ng.mongodb.net/impertula
📡 Endpoints principales
Método	Endpoint	Descripción
POST	/api/auth/login	Inicia sesión con email y contraseña
GET	/api/auth/verify	Verifica el token JWT (protegido)
GET	/api/health	Verifica el estado del servidor

🧩 Ejemplo de Login exitoso
Request:

bash
Copiar código
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@impertula.com",
  "password": "admin123"
}
Response:

json
Copiar código
{
  "success": true,
  "user": {
    "id": "66a1b4cdef1234567890abcd",
    "email": "admin@impertula.com",
    "role": "admin",
    "name": "Administrador"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5..."
}