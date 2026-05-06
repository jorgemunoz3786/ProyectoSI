# System Patterns

## Arquitectura (MVC)
- **Modelo (`state.js`)**: Gestionará los datos del juego (HP, nivel, XP, inventario) y la lógica de guardado/carga mediante JSON en localStorage.
- **Vista (`components.js`)**: Contendrá únicamente funciones puras que reciben datos del Modelo y devuelven strings de HTML/SVG. No contiene lógica de cálculo.
- **Controlador (`app.js`)**: Orquestará la interacción del usuario, ejecutará las reglas de negocio (tiradas de dados) y actualizará la Vista cuando el Modelo cambie.

## Combate
- **Dados**: Precisión (2d6 > 5), Daño (1d6 base).
- **Escalado**:
  - Héroe: +1d6 cada 4 niveles, +1d10 cada 12 niveles.
  - Monstruos: +2 HP por nivel/piso.

## Componentes
- `renderHero(heroData)`: Renderiza el héroe.
- `renderMonster(monsterData)`: Renderiza el monstruo.
- `renderCombatLog(data)`: Renderiza el feedback de las tiradas.
