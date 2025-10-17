# 📊 Guía de Logs - Render Console

## 🎯 Qué verás en la consola de Render

### Al iniciar el servidor:

```
==================================================
🚀 Servidor corriendo en puerto 10000
📅 Iniciado: 2024-01-15T10:30:45.123Z
🌍 Entorno: production
🔗 Health check: http://localhost:10000/api/health
==================================================
✅ Conectado a MongoDB
📊 Base de datos: cluster0.rvrn2ng.mongodb.net/impertula
```

---

## 🔐 Logs de Login

### ✅ Login exitoso:
```
[2024-01-15T10:31:22.456Z] POST /api/auth/login
🔐 [LOGIN] Intento de login para: admin@impertula.com
✅ [LOGIN] Login exitoso para: admin@impertula.com (admin) - 234ms
```

### ❌ Login fallido (usuario no existe):
```
[2024-01-15T10:32:10.789Z] POST /api/auth/login
🔐 [LOGIN] Intento de login para: usuario@noexiste.com
❌ [LOGIN] Usuario no encontrado: usuario@noexiste.com
```

### ❌ Login fallido (contraseña incorrecta):
```
[2024-01-15T10:33:45.123Z] POST /api/auth/login
🔐 [LOGIN] Intento de login para: admin@impertula.com
❌ [LOGIN] Contraseña incorrecta para: admin@impertula.com
```

### ❌ Login fallido (campos faltantes):
```
[2024-01-15T10:34:20.456Z] POST /api/auth/login
🔐 [LOGIN] Intento de login para: sin email
❌ [LOGIN] Error: Campos faltantes
```

---

## 🔍 Logs de Verificación de Token

### ✅ Token válido:
```
[2024-01-15T10:35:30.789Z] GET /api/auth/verify
🔍 [VERIFY] Verificando usuario: admin@impertula.com
✅ [VERIFY] Usuario verificado: admin@impertula.com (admin)
```

### ❌ Token inválido o expirado:
```
[2024-01-15T10:36:15.123Z] GET /api/auth/verify
⚠️  [AUTH] Token no proporcionado en la petición
```

O:

```
[2024-01-15T10:37:00.456Z] GET /api/auth/verify
❌ [AUTH] Token inválido o expirado: jwt expired
```

---

## 💚 Logs de Health Check

```
[2024-01-15T10:38:45.789Z] GET /api/health
💚 [HEALTH] Health check solicitado
```

---

## 💥 Logs de Errores

### Error de base de datos:
```
💥 [LOGIN] Error en login para admin@impertula.com: MongoNetworkError
Stack trace: 
  at Connection.onError (/app/node_modules/mongodb/...)
  ...
```

### Error no manejado:
```
💥 Unhandled Rejection at: Promise { <rejected> ... }
Reason: Error: Something went wrong
```

---

## 📈 Interpretación de Logs

### Símbolos y su significado:

| Símbolo | Significado | Tipo |
|---------|-------------|------|
| ✅ | Operación exitosa | Success |
| ❌ | Error o fallo | Error |
| ⚠️  | Advertencia | Warning |
| 🔐 | Autenticación/Login | Info |
| 🔍 | Verificación | Info |
| 💚 | Health check | Info |
| 💥 | Error crítico | Critical |
| 📊 | Información de datos | Info |
| 🌱 | Seed/Inicialización | Info |

### Tiempos de respuesta:

- **< 100ms**: Excelente ⚡
- **100-300ms**: Bueno ✅
- **300-500ms**: Aceptable ⚠️
- **> 500ms**: Revisar optimización 🐌

---

## 🔧 Comandos útiles en Render

### Ver logs en tiempo real:
En el dashboard de Render, ve a **Logs** y verás el stream en vivo.

### Filtrar logs:
```bash
# Buscar todos los login exitosos
Busca: "✅ [LOGIN]"

# Buscar errores
Busca: "❌"

# Buscar por usuario específico
Busca: "admin@impertula.com"

# Buscar por tiempo de respuesta lento
Busca: "ms" y revisa los números
```

---

## 🚨 Alertas importantes

### Si ves esto, hay problemas:

```
❌ Error conectando a MongoDB
```
**Solución**: Revisa las variables de entorno y la conexión a MongoDB.

```
💥 Uncaught Exception
```
**Solución**: Hay un error crítico no manejado. Revisa el stack trace.

```
❌ ERROR: Faltan variables de entorno requeridas
```
**Solución**: Configura `MONGODB_URI` y `JWT_SECRET` en Render.

---

## 📊 Métricas a monitorear

### Tráfico normal:
```
[10:30:22] GET /api/health
[10:30:45] POST /api/auth/login
[10:31:10] GET /api/auth/verify
[10:32:15] POST /api/auth/login
```

### Posible ataque o error:
```
[10:30:01] POST /api/auth/login
[10:30:02] POST /api/auth/login
[10:30:03] POST /api/auth/login
[10:30:04] POST /api/auth/login
[10:30:05] POST /api/auth/login
... (muchas peticiones en poco tiempo)
```

---

## 💡 Tips de debugging

1. **Siempre busca el timestamp** para ordenar eventos
2. **Sigue el flujo** de una petición específica buscando el email
3. **Revisa los tiempos** de respuesta para detectar problemas de performance
4. **Filtra por tipo** de operación (LOGIN, VERIFY, HEALTH)
5. **Guarda logs críticos** si encuentras errores recurrentes

---

## 📱 Ejemplo de sesión completa

```
# Usuario inicia sesión
[10:30:00] POST /api/auth/login
🔐 [LOGIN] Intento de login para: admin@impertula.com
✅ [LOGIN] Login exitoso para: admin@impertula.com (admin) - 156ms

# Frontend verifica el token
[10:30:15] GET /api/auth/verify
🔍 [VERIFY] Verificando usuario: admin@impertula.com
✅ [VERIFY] Usuario verificado: admin@impertula.com (admin)

# Health checks automáticos
[10:35:00] GET /api/health
💚 [HEALTH] Health check solicitado

[10:40:00] GET /api/health
💚 [HEALTH] Health check solicitado
```

Esta es una sesión saludable y normal. ✅