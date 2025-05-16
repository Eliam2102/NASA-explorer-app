# 🌌 NASA Explorer App

Aplicación web interactiva que explora distintos datos públicos proporcionados por la NASA, utilizando su conjunto de APIs. Permite al usuario acceder a imágenes astronómicas, eventos solares, datos de Marte y proyectos tecnológicos financiados por la agencia.

---

## 🚀 Descripción General

Esta aplicación proporciona una experiencia informativa y visual sobre el espacio, dividida en secciones temáticas. Los datos son obtenidos desde múltiples endpoints públicos de la NASA (APIs) y se gestionan localmente para ofrecer una experiencia rápida y eficiente. Se ha estructurado el proyecto en **6 módulos principales**.

---

## 🧭 Módulos Principales

### 1. **Inicio**
- Pantalla principal donde se resumen las secciones.
- Representa el punto de entrada del usuario a las diferentes experiencias visuales y de datos.

### 2. **Astronomía**
- **Imagen del Día (APOD)**: visualiza la fotografía astronómica diaria proporcionada por NASA.
- **Asteroides Cercanos (NEO)**: lista de asteroides cercanos a la Tierra con detalles como tamaño, fecha de aproximación, y velocidad.

### 3. **Multimedia**
- Sección multimedia separada que presenta:
  - Galería de imágenes.
  - Galería de videos oficiales de la NASA.
- Uso de APIs para contenidos visuales espaciales.

### 4. **Marte**
- **Mars Rover Photos**: galería interactiva con imágenes tomadas por los rovers de la NASA (Curiosity, Spirit, Opportunity, Perseverance).
- Filtro por rover y fecha.
- Visualización enriquecida de cada imagen.

### 5. **Explorar Más (DONKI)**
- Módulo con alertas y eventos del clima espacial, obtenidos desde la **API DONKI (Space Weather Database Of Notifications, Knowledge, Information)**.
- Incluye:
  - ⚠️ Alertas de Clima Espacial.
  - 🌪 Tormentas Geomagnéticas.
  - ☢️ Eventos de Radiación.
  - 🌞 Llamaradas Solares (Solar Flares).
  - 🌋 Eyecciones de Masa Coronal (CMEs).
- Los datos son cacheados localmente para mejorar el rendimiento.

### 6. **TechPort**
- Módulo dedicado a los **proyectos financiados por NASA**.
- Información detallada sobre iniciativas tecnológicas, sus objetivos, presupuestos y avances.
- Búsqueda por título o palabras clave.

---

## 🛠️ Tecnologías Utilizadas

### Frontend
- **TypeScript**
- **React**
- **TailwindCSS** (para diseño moderno y responsivo)
- **Framer Motion** (animaciones fluidas)
- **MUI (Material UI)** (componentes visuales accesibles y estilizados)

### Manejo de Datos y Lógica
- **StorageService**: persistencia de datos cacheados en `localStorage`.
- **API Services** personalizados para cada endpoint de la NASA.
- **Mappers** para transformar modelos de datos en entidades del dominio.

### Arquitectura
- Arquitectura por capas:
  - `domain`: entidades y contratos.
  - `data`: servicios y almacenamiento.
  - `common`: mapeadores y utilidades compartidas.
  - `presentation`: componentes de UI y vistas.
- Separación clara entre modelo de datos (`Model`) y entidad (`Entity`).

---

## 🔌 APIs y Servicios Externos

### APIs de NASA utilizadas:
- [APOD (Astronomy Picture of the Day)](https://api.nasa.gov/)
- [NeoWs (Asteroids Near Earth)](https://api.nasa.gov/)
- [Mars Rover Photos](https://api.nasa.gov/)
- [NASA Image and Video Library](https://images.nasa.gov/)
- [DONKI (Space Weather)](https://kauai.ccmc.gsfc.nasa.gov/DONKI/)
- [TechPort (NASA-funded technologies)](https://techport.nasa.gov/)

### Otros servicios:
- `localStorage` para cacheo de datos (implementado vía `StorageService`)
- `NetworkService` (desactivado por ahora) planeado para detección de conexión offline.
- `sweetalert2` para modales de confirmación atractivos.
- `react-modal` para modales personalizados.
- `react-icons` para iconografía moderna.

---

## 📁 Estructura de Carpetas

```plaintext
📦src
 ┣ 📂domain
 ┃ ┣ 📂entidades
 ┃ ┣ 📂repository
 ┣ 📂data
 ┃ ┣ 📂models
 ┃ ┣ 📂service
 ┃ ┣ 📂storage
 ┣ 📂common
 ┃ ┗ 📂mappers
 ┣ 📂presentation
 ┃ ┣ 📂components
 ┃ ┣ 📂pages
 ┃ ┗ 📂views
 ```