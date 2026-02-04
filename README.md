# 🍕 Pizza Shop – Frontend (Vue 3 + Vuetify)

![Pizza Shop Preview](./public/imagenbase.png)

Este proyecto es el **frontend de una aplicación web de tienda de pizzas**, desarrollada con **Vue 3**, que consume una **API REST construida en FastAPI**.

La aplicación permite:

- A **usuarios públicos** visualizar el menú de pizzas disponibles, con sus ingredientes, imágenes y precios.
- A **usuarios administradores** autenticados gestionar el menú mediante operaciones CRUD (crear, editar y eliminar pizzas e ingredientes).

El sistema está diseñado con una arquitectura moderna, reutilizable y escalable, ideal como proyecto real o portafolio profesional.

---

## 📁 Estructura y Flujo del Proyecto

El proyecto está desarrollado utilizando **Vue 3 con Composition API** y una estructura organizada por responsabilidades:

- **`src/assets/`**  
  Estilos globales (`main.css`) e imágenes estáticas.

- **`src/layouts/`**  
  Plantillas generales:
  - `PublicLayout.vue`: Layout para la tienda pública.
  - `AdminLayout.vue`: Layout para el panel administrativo.

- **`src/views/`**  
  Componentes de página (vistas):
  - `public/Home.vue`: Menú principal de pizzas (tienda).
  - `admin/`: Vistas para gestión de pizzas, ingredientes y dashboard.

- **`src/components/`**  
  Componentes reutilizables (cards, formularios, tablas, etc.).

- **`src/stores/`**  
  Gestión de estado global con **Pinia**:
  - Persistencia del token JWT
  - Estado reactivo de pizzas e ingredientes

- **`src/services/api.js`**  
  Configuración centralizada de **Axios**, con interceptores que:
  - Añaden automáticamente el token JWT a peticiones protegidas
  - Manejan errores de autenticación

- **`src/router/`**  
  Definición de rutas y **guardias de navegación** para proteger el acceso al panel administrativo.

---

## 🛠️ Herramientas Principales

### 🎨 Vuetify 3 (Sistema de Diseño)

Vuetify proporciona componentes basados en **Material Design**, acelerando el desarrollo de interfaces modernas.

- **Uso**: Componentes como `<v-btn>`, `<v-card>`, `<v-data-table>`.
- **Ventaja**: Menos CSS manual, uso de utilidades como:
  - Espaciados: `pa-4`, `ma-2`
  - Colores: `color="primary"`

---

### 🧠 Pinia (Gestión de Estado)

Pinia actúa como el almacén global de la aplicación.

- **Token JWT**: Se guarda de forma reactiva.
- **Persistencia**: Sincronización con `localStorage` para mantener la sesión al refrescar.
- **Seguridad**: El router consulta el store para permitir o bloquear rutas privadas.

---

## 📐 Patrón de Diseño y Arquitectura

- **Composition API**  
  Uso de `<script setup>` para una lógica más limpia y mantenible (`ref`, `computed`, `watch`).

- **Componentes Atómicos**  
  La UI se divide en componentes pequeños y reutilizables para evitar duplicación de código.

- **Servicios de API**  
  Toda la comunicación con el backend (FastAPI) está centralizada en `services/api.js`.

---

## 💻 Desarrollo Local

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build
```

## Licencia

Este proyecto está licenciado bajo la **MIT License**. - consulta el archivo `LICENSE` para más detalles.

## Autor

Desarrollado por **Edison Guaichico** – [Perfil de GitHub](https://github.com/EdisonGP)
