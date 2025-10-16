# 📦 Gestor de Inventario Interno

## 🎯 Objetivo

Facilitar la administración de recursos y materiales dentro de una organización, permitiendo el control eficiente del inventario.

Este sistema tiene como propósito:
- Centralizar la administración del inventario.
- Brindar visibilidad sobre los niveles de stock.
- Optimizar la reposición de materiales.
- Identificar los productos más utilizados.

## � Ejecución del Proyecto

### **📋 Prerrequisitos**
- Node.js (versión 18 o superior)


### **⚙️ Configuración e Instalación**

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/teamYear2/teamYear2.git
   cd teamYear2/Frontend
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```
3. **Instalar requisitos:**
   ```bash
   cd Backend
   pip install -r requirements.txt
   ```
   > [!WARNING]
   > **No ejecutes este comando sin tener activo el entorno virtual.**


### **🔧 Ejecución en Desarrollo**

El proyecto requiere **2 terminales** ejecutándose simultáneamente:

#### **Terminal 1 - Backend Django:**
```bash
cd Backend
python manage.py runserver
```
- ✅ Inicia **Django** en puerto **8000**
- ✅ API REST real con **Django REST Framework**
- ✅ Base de datos **SQLite** persistente
- ✅ **Panel de administración** en http://localhost:8000/admin/

#### **Terminal 2 - Frontend (Angular):**
```bash
cd Frontend
ng serve -o
```
- ✅ Inicia Angular en puerto **4200**
- ✅ Abre automáticamente el navegador en la dirección http://localhost:4200

### **🔐 Credenciales de Prueba**
Para probar el sistema de login:
- **Admin:** `admin@inventario.com` / `admin123`
- **Usuario:** `usuario@inventario.com` / `user123`
- **Desarrollador:** `juan@inventario.com` / `juan123`

### **📡 Endpoints API**
Una vez iniciado Django, están disponibles:
- **Productos:** http://localhost:8000/api/productos/
- **Inventarios:** http://localhost:8000/api/inventarios/
- **Operaciones:** http://localhost:8000/api/detalle-operaciones/
- **Admin Panel:** http://localhost:8000/admin/

## �📊 Métricas

El sistema permitirá medir y analizar:
- Total de Productos.
- Productos Disponibles.
- Productos bajos de stock.
- Productos Agotados.

## 👥 Equipo Responsable teamYear2 📦
 **Integrantes:**

- Areosa Ignacio Gastón – Scrum Master – [Mi GitHub](https://github.com/SrLachy) GitUser: SrLachy

- Caucino Carolina – Programmer – [Mi GitHub](https://github.com/ccauci) - GitUser: ccauci

- Argandoña Nahuel – Programmer – [Mi GitHub](https://github.com/Aubar48) - GitUser: Nahuel

- Romero Eduardo Emilio – Programmer – [Mi GitHub](https://github.com/EmilioRome) - GitUser: EmilioR

- Dagatti Christian Edgardo – Programmer – [Mi GitHub](https://github.com/CHRISTIANDAGATTI) - GitUser: CHRISTIANDAGATTI

## 🚧 Estado del Proyecto

En desarrollo.
