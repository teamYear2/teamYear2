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

### **🔧 Ejecución en Desarrollo**

El proyecto requiere **2 terminales** ejecutándose simultáneamente:

#### **Terminal 1 - Backend simulado (JSON Server):**
```bash
cd Frontend
npm run api
```
- ✅ Inicia **JSON Server** en puerto **3001**
- ✅ Simula una API REST usando `db.json` como base de datos
- ✅ Proporciona endpoints automáticos para productos, movimientos y usuarios
- ✅ **Tecnología:** JSON Server (herramienta de simulación, no Node.js tradicional)

#### **Terminal 2 - Frontend (Angular):**
```bash
cd Frontend
npm start
```
- ✅ Inicia Angular en puerto **4200**
- ✅ Abre automáticamente http://localhost:4200

### **🔐 Credenciales de Prueba**
Para probar el sistema de login:
- **Admin:** `admin@inventario.com` / `admin123`
- **Usuario:** `usuario@inventario.com` / `user123`
- **Desarrollador:** `juan@inventario.com` / `juan123`

### **📡 Endpoints API**
Una vez iniciado `npm run api`, están disponibles:
- **Productos:** http://localhost:3001/Productos
- **Movimientos:** http://localhost:3001/Movimientos
- **Usuarios:** http://localhost:3001/Usuarios

## �📊 Métricas

El sistema permitirá medir y analizar:
- Niveles de stock bajo.
- Productos más utilizados.
- Frecuencia de pedidos de reposición.

## 👥 Equipo Responsable teamYear2 📦
 **Integrantes:**

- Areosa Ignacio Gastón – Scrum Master – [Mi GitHub](https://github.com/SrLachy) GitUser: SrLachy

- Caucino Carolina – Programmer – [Mi GitHub](https://github.com/ccauci) - GitUser: ccauci

- Argandoña Nahuel – Programmer – [Mi GitHub](https://github.com/Aubar48) - GitUser: Nahuel

- Romero Eduardo Emilio – Programmer – [Mi GitHub](https://github.com/EmilioRome) - GitUser: EmilioR

- Dagatti Christian Edgardo – Programmer – [Mi GitHub](https://github.com/CHRISTIANDAGATTI) - GitUser: CHRISTIANDAGATTI

## 🚧 Estado del Proyecto

En desarrollo.
