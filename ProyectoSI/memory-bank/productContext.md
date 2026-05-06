# Product Context: TowerArena

## Visión
Un RPG web de progresión vertical donde un héroe derrota monstruos en una torre.

## Mecánicas Core
- **Combate:** Basado en puntos de poder (Integer).
- **Progresión:** Sistema de niveles y XP.
- **Botín (Loot):** Drop de equipo aleatorio.

## Dificultad
El poder de los monstruos crece de forma exponencial por cada piso que se avanza en la torre.

## Persistencia
Guardado automático en `localStorage` (en formato JSON). Se guardan los siguientes datos:
- Piso actual
- Nivel
- Equipo
