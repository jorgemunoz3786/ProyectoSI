# System Patterns

## Arquitectura
- **Separación total:**
  - `components.js`: Funciones puras que retornan strings de HTML/SVG para representar visualmente al héroe y a los monstruos.
  - `app.js`: Orquestador, lógica de combate, manejo de niveles y estado general de la aplicación.

## Combate
- Crear un módulo de combate desacoplado para que sea fácilmente editable y escalable en el futuro.
- Actualmente la lógica es simple: `heroPower > monsterPower = Victory`.
