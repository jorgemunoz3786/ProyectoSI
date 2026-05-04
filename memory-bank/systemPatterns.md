# System Patterns

## Arquitectura del Sistema
El proyecto adopta una arquitectura basada en la **separación estricta de responsabilidades** (Separation of Concerns). Esto garantiza un desarrollo estructurado, un código mantenible y facilita la depuración.

## Reglas Técnicas Obligatorias

### 1. Capa de Presentación (`components.js`)
- **Naturaleza:** Este archivo debe contener única y exclusivamente **funciones puras**.
- **Salida:** Toda función definida aquí debe recibir los datos necesarios como parámetros (props) y devolver estructuras que representen HTML de forma determinista.
- **Restricción Estricta:** Queda terminantemente prohibido incluir lógica de negocio, manejo de estado interno o llamadas a APIs/eventos dentro de estos componentes.

### 2. Capa de Lógica y Orquestación (`app.js`)
- **Naturaleza:** Controlador principal y gestor del ciclo de vida de la aplicación.
- **Responsabilidades:**
  - Manejo de la lógica de negocio y del estado de la aplicación.
  - Captura y gestión de eventos de usuario.
  - Inyección de datos en las funciones de `components.js` e inserción del HTML resultante en el DOM.
  - Orquestación general del flujo de navegación y evaluación.

### 3. Diseño de Componentes
- **Modularidad:** Los componentes deben ser altamente modulares, diseñados para cumplir una única función específica.
- **Encapsulamiento:** Ningún componente debe depender del estado global directamente; todo contexto necesario será inyectado por el orquestador (`app.js`).
