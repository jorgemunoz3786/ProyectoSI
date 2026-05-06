# Reglas de Desarrollo: TowerArena

Este documento establece las normas operativas para el mantenimiento y evolución del proyecto. Es de lectura obligatoria para la IA antes de procesar cualquier solicitud.

---

## 1. Sincronización con el Memory Bank
Cada respuesta debe fundamentarse en el estado actual de la carpeta memory-bank/. Es obligatorio consultar:
*   activeContext.md: Estado de la fase actual y tareas en curso.
*   productContext.md: Definición de mecánicas, visión y sistema de persistencia.
*   systemPatterns.md: Patrones de arquitectura y reglas lógicas de combate.
*   progress.md: Seguimiento de hitos y tareas pendientes.

Cualquier propuesta que contradiga estos documentos debe ser notificada antes de su ejecución.

---

## 2. Arquitectura MVC
Se prohíbe la mezcla de responsabilidades entre los archivos de la carpeta src/js/. La estructura debe ser:

*   Modelo (state.js): Gestiona exclusivamente los datos, la lógica de negocio (subida de niveles, cálculos de HP) y la comunicación con localStorage. No tiene acceso al DOM.
*   Vista (components.js): Contiene funciones puras que reciben datos y devuelven cadenas de texto en formato HTML o SVG. No realiza cálculos ni almacena estado.
*   Controlador (app.js): Actúa como mediador. Captura eventos, solicita actualizaciones al Modelo y ordena el renderizado a la Vista para actualizar el DOM.

---

## 3. Estándares Técnicos
*   Gestión del DOM: El controlador debe usar un método de caché (cacheDOM) al inicio para evitar consultas repetitivas al documento.
*   Rutas Relativas: Los enlaces a scripts dentro del HTML deben respetar la jerarquía de carpetas (ejemplo: ../js/app.js para archivos en la carpeta pages/).
*   Lógica de Dados: El sistema de combate debe regirse por las probabilidades establecidas: Precisión (2d6 > 5) y Daño (1d6 con incrementos programados por nivel).

---

## 4. Flujo de Trabajo Obligatorio
1.  Análisis: Revisión de los archivos del Memory Bank.
2.  Planificación: Explicación de los cambios en relación a los componentes MVC afectados.
3.  Implementación: Generación de código o documentación técnica.
4.  Actualización: Modificación de activeContext.md y progress.md para reflejar el avance.
