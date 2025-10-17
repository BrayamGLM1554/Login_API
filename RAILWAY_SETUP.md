# 🚂 Guía de Despliegue en Railway

## 📦 Archivos que SÍ debes subir a GitHub:

```
✅ server.js
✅ seed.js
✅ package.json
✅ .gitignore
✅ README.md (opcional)
```

## 🚫 Archivos que NO se suben (por .gitignore):

```
❌ node_modules/
❌ .env
❌ package-lock.json
```

---

## 🚀 Pasos para desplegar en Railway:

### 1️⃣ Preparar tu repositorio

```bash
# Inicializar git (si no lo has hecho)
git init

# Agregar archivos
git add .

# Commit
git commit -m "Initial commit - API de autenticación"

# Crear repositorio en GitHub y subir
git remote add origin https://github.com/TU_USUARIO/TU_REPO.git
git branch -M main
git push -u origin main
```

### 2️⃣ Crear proyecto en Railway

1. Ve a [railway.app](https://railway.app)
2. Inicia sesión con GitHub
3. Click en **"New Project"**
4. Selecciona **"Deploy from GitHub repo"**
5. Selecciona tu repositorio

### 3️⃣ Configurar Variables de Entorno en Railway

En el dashboard de Railway, ve a **Variables** y agrega:

| Variable | Valor |
|----------|-------|
| `PORT` | `3001` |
| `JWT_SECRET` | `impertula-production-secret-key-2024-change-this` |
| `MONGODB_URI` | `mongodb+srv://ADMIN:ADMIN12345678@cluster0.rvrn2ng.mongodb.net/impertula?retryWrites=true&w=majority&appName=Cluster0` |

**⚠️ IMPORTANTE:** Cambia el `JWT_SECRET` por algo más seguro en producción.

### 4️⃣ Configurar el Start Command (opcional)

Railway detectará automáticamente el comando `start` de tu `package.json`, pero puedes verificarlo:

- Ve a **Settings** → **Start Command**
- Debería ser: `node server.js`

### 5️⃣ Crear usuarios en la base de datos

Una vez desplegado, necesitas ejecutar el seed **UNA VEZ**:

**Opción A: Desde tu computadora local**
```bash
# Ya con la base de datos en la nube
node seed.js
```

**Opción B: Crear un endpoint temporal en server.js** (solo para desarrollo)
```javascript
// Agregar TEMPORALMENTE en server.js:
app.post('/api/seed-users', async (req, res) => {
  // Código del seed aquí...
  // Eliminar después de ejecutar
});
```

### 6️⃣ Obtener tu URL de producción

Railway te dará una URL como:
```
https://tu-proyecto.up.railway.app
```

### 7️⃣ Actualizar el frontend

En tu React app, actualiza la URL del API:

```env
# .env en tu frontend
REACT_APP_API_URL=https://tu-proyecto.up.railway.app
```

---

## 🔒 Seguridad en Producción

### Actualizar CORS en server.js:

```javascript
// En lugar de:
app.use(cors());

// Usa esto en producción:
app.use(cors({
  origin: ['https://tu-frontend.com', 'http://localhost:5173'], 
  credentials: true
}));
```

### Generar JWT_SECRET seguro:

```javascript
// En Node.js, ejecuta:
require('crypto').randomBytes(64).toString('hex')
```

---

## 🧪 Probar la API desplegada

```bash
# Health check
curl https://tu-proyecto.up.railway.app/api/health

# Login
curl -X POST https://tu-proyecto.up.railway.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@impertula.com","password":"admin123"}'
```

---

## 📊 Monitoreo

Railway te proporciona:
- ✅ Logs en tiempo real
- ✅ Métricas de uso
- ✅ Reinicio automático si hay errores
- ✅ HTTPS automático

---

## 🐛 Troubleshooting

### Error: "Cannot connect to MongoDB"
- Verifica que las variables de entorno estén bien configuradas
- Asegúrate de permitir acceso desde cualquier IP en MongoDB Atlas:
  - Ve a **Network Access** → Add IP → Allow from anywhere (`0.0.0.0/0`)

### Error: "Application failed to start"
- Revisa los logs en Railway
- Verifica que `package.json` tenga el script `start`
- Asegúrate de que todas las dependencias estén en `package.json`

### La API no responde
- Verifica que el PORT esté configurado correctamente
- Railway asigna un puerto dinámico, usa: `process.env.PORT`

---

## ✅ Checklist de Despliegue

- [ ] `.gitignore` creado
- [ ] Código subido a GitHub
- [ ] Proyecto creado en Railway
- [ ] Variables de entorno configuradas
- [ ] Usuarios creados con seed.js
- [ ] API funcionando (health check)
- [ ] Login probado exitosamente
- [ ] Frontend actualizado con nueva URL
- [ ] CORS configurado para producción

¡Listo! Tu API está en producción 🎉