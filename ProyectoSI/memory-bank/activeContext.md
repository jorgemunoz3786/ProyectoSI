# Active Context

**Fase Actual:** Refactorizando a arquitectura MVC (Modelo-Vista-Controlador).

Estamos migrando la estructura del proyecto a un patrón MVC estricto para asegurar la modularidad y el cumplimiento de la rúbrica.

**Próximos Pasos:**
1. Separar el estado global y lógica de datos en `state.js` (Modelo).
2. Limpiar `components.js` para asegurar que solo contenga funciones puras sin cálculos (Vista).
3. Convertir `app.js` en el orquestador principal (Controlador).
