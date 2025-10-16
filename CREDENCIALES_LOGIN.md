# 🔐 CREDENCIALES DE ACCESO

## ✅ Usuario Actualmente en la Base de Datos

| Email                    | Contraseña  | Nombre       |
|--------------------------|-------------|--------------|
| `emiliosoad@gmail.com`   | `123456`    | emilio rrr   |

---

## 👤 Usuarios Sugeridos (del README)

Estos usuarios están documentados en el README, pero necesitan ser creados:

| Rol          | Email                      | Contraseña  |
|--------------|----------------------------|-------------|
| Admin        | `admin@inventario.com`     | `admin123`  |
| Usuario      | `usuario@inventario.com`   | `user123`   |
| Desarrollador| `juan@inventario.com`      | `juan123`   |

---

## 🚀 Cómo Crear los Usuarios

Si los usuarios no existen en la base de datos, necesitas crearlos. He creado un script para eso:

### Opción 1: Usar el script automático

1. Asegúrate de tener el backend corriendo y los inventarios creados:
   ```bash
   cd Backend
   python poblar_datos.py
   ```

2. Ejecuta el script de creación de usuarios:
   ```bash
   python crear_usuarios.py
   ```

Este script creará 5 usuarios de prueba:
- admin@inventario.com / admin123
- usuario@inventario.com / user123
- juan@inventario.com / juan123
- maria@inventario.com / maria123
- carlos@inventario.com / carlos123

---

### Opción 2: Crear usuarios manualmente desde Django Admin

1. Inicia el servidor Django:
   ```bash
   cd Backend
   python manage.py runserver
   ```

2. Accede al panel de administración:
   ```
   http://127.0.0.1:8000/admin/
   ```

3. Crea un superusuario si no existe:
   ```bash
   python manage.py createsuperuser
   ```

4. Desde el admin, crea usuarios manualmente en la sección "Usuarios"

---

### Opción 3: Registro desde el Frontend

1. Inicia el frontend:
   ```bash
   cd Frontend
   ng serve
   ```

2. Accede a:
   ```
   http://localhost:4200/registro
   ```

3. Completa el formulario de registro con:
   - DNI
   - Nombre
   - Apellido
   - Email
   - Teléfono
   - Contraseña
   - Referido (opcional)

---

## 📝 Notas Importantes

- **Email:** Debe ser único en el sistema
- **DNI:** Debe ser único y numérico
- **Contraseña:** Se guarda en texto plano (⚠️ no recomendado para producción)
- **Inventario:** Se asigna automáticamente al registrarse sin referido
- **Referido:** Si ingresas el email de otro usuario, compartirás su inventario

---

## 🔍 Verificar si existen usuarios

Puedes verificar usando la API REST:

```bash
# Obtener todos los usuarios
curl http://127.0.0.1:8000/api/usuarios/
```

O desde el navegador:
```
http://127.0.0.1:8000/api/usuarios/
```

---

## 🌐 URLs del Sistema

- **Frontend:** http://localhost:4200
- **Login:** http://localhost:4200/login
- **Registro:** http://localhost:4200/registro
- **Dashboard:** http://localhost:4200/dashboard
- **Backend API:** http://127.0.0.1:8000/api/
- **Django Admin:** http://127.0.0.1:8000/admin/

---

## ⚡ Inicio Rápido

```bash
# Terminal 1 - Backend
cd Backend
python poblar_datos.py
python crear_usuarios.py
python manage.py runserver

# Terminal 2 - Frontend
cd Frontend
ng serve
```

Luego accede a http://localhost:4200/login y usa:
- **Email:** admin@inventario.com
- **Password:** admin123

---

**Última actualización:** 15 de octubre de 2025
