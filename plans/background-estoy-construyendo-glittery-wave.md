# Caribe Game Jam 2026 — Expansión completa de la landing

## Contexto

La landing actual (`src/App.tsx`, un solo archivo) tiene 5 secciones: Nav, Hero, ¿Qué es? (3 pilares), Categorías, Aliados y Footer. El spec adjunto (`caribe-game-jam-2026-design.md`) define una landing mucho más rica de 12 bloques con ritmo de color alternado (Oscuro → Claro → Púrpura → Claro → Oscuro): ribbon de métricas, tarjeta de inscripción tipo "event pass", GameJamPlus, agenda por días, CrackVibes/mentores, aliados en 3 niveles, FAQ acordeón e institucional CracktiveLab.

El usuario pidió **conservar la sección Categorías existente** e integrar todo lo nuevo del spec. Los tokens de color (`void` `#0D0314`, `grape` `#590C8B`, `mint` `#22E19D`, `lavender`), las tres fuentes (Space Grotesk / Inter / Press Start 2P) y los logos locales (`cracktivelab-logo-light.png`, `cracktivelab-blanco-verde.png`) ya están cableados en `src/index.css` y coinciden con el spec — no requieren cambios de configuración.

## Enfoque

Extender `src/App.tsx` en su lugar, reutilizando los componentes/estilos existentes (`PixelBadge`, `PrimaryButton`, `CountdownCard`, `FloatingSticker`, la paleta y las animaciones `float`). Añadir nuevos componentes de sección y recomponer el árbol en `App()`.

### Archivo único a modificar: `src/App.tsx`

**Orden final de secciones en `App()`** (conservando Categorías):
1. `Nav` — actualizar `NAV_LINKS` a: Inicio, ¿Qué es?, Beneficios, Agenda, GameJamPlus, Preguntas; CTA "Inscríbete · $35.000".
2. `Hero` — badge "16, 17 y 18 DE OCTUBRE 2026 · UNIVERSIDAD DE LA COSTA · BARRANQUILLA"; H1 "CARIBE GAME JAM 2026" con "GAME JAM" en mint; subtítulo de 48 horas; badge de precio "$35.000 COP · Cupos Limitados"; botón "INSCRÍBETE AQUÍ"; microtexto "Asegura tu cupo en HolaFOMO". Conservar collage + stickers + `CountdownCard`.
3. `MetricsRibbon` (**nuevo**, dark) — 4 tarjetas: 3 Días, 48 Horas de Creación, Mentorías, Premios.
4. `WhatIs` (reestructurar, light `#F8F9FA`) — 2 columnas: narrativa izquierda + grid de tarjetas info (¿Cuándo?, ¿Dónde?, ¿A quién?, ¿Cuál es el reto?).
5. `Inscription` (**nuevo**, white) — tarjeta "event pass": Área A alimentación (Vie cena; Sáb desayuno/almuerzo/cena; Dom desayuno/almuerzo) + Área B checklist de 8 beneficios con checks mint; CTA secundario.
6. `GameJamPlus` (**nuevo**, deep purple `#590C8B` → gradiente a void) — badge, título "De la Jam al Siguiente Nivel", copy, diagrama Crea → Valida → Conecta → Continúa en tarjetas glass con flechas.
7. `Agenda` (**nuevo**, púrpura oscurecido, `id="agenda"`) — 3 columnas/pestañas por día con estado `useState` para día activo en móvil; contenido de los 3 días del spec.
8. `Categories` (**conservar tal cual**), mover `id` de navegación si aplica.
9. `CrackVibes` (**nuevo**, white) — tarjeta CrackVibes + subsección "Mentores Confirmados": grid de 4–6 tarjetas de avatar (foto Unsplash, nombre, rol, estudio).
10. `Partners` (mejorar, light `#F8F9FA`) — título del spec + 3 niveles: Patrocinadores (grande), Aliados (mediano), Aliados de Difusión (compacto monocromático con hover a color). Conservar la tarjeta de organizador principal con el logo.
11. `Faq` (**nuevo**, dark, `id="preguntas"`) — acordeón con `useState` (9 preguntas del spec); en la de menores incluir botón pill con ícono de descarga "Descargar Formato de Consentimiento Informado (PDF)".
12. `Institutional` (**nuevo**, grape/void) — "CracktiveLab · Epicentro de industrias digitales" + 3 pilares (Emprendimiento, Aprendizaje, Comunidad).
13. `FinalCta` (actualizar copy) — "48 horas para hacer historia. ¿Estás listo para crear tu videojuego?" + botón mint a HolaFOMO.
14. `Footer` (**conservar**, con los 4 sociales incl. LinkedIn ya añadido) — ajustar el `id` (mover `#preguntas` al FAQ) y copyright.

### Notas de implementación
- Reutilizar `PixelBadge`, `PrimaryButton`, patrón de tarjeta (`rounded-2xl border`), y sombras mint existentes para coherencia.
- Acordeón FAQ y pestañas de Agenda: estado local con `useState` (patrón ya usado en `useCountdown`). Sin librerías nuevas.
- Íconos: mantener el estilo pixel-SVG inline ya presente (rects) o checks simples; sin dependencias externas.
- Imágenes de mentores/stock: usar Unsplash con `alt` descriptivo, igual que el Hero actual. Logos de aliados: placeholders con borde punteado como el bloque actual.
- Respetar el ritmo de color alternado y las esquinas redondeadas (cards 16px / `rounded-2xl`, botones `rounded-xl`/pill) del spec.
- No tocar `index.css` salvo agregar keyframes menores si un nuevo efecto lo requiere (dentro de las capas existentes; sin resets universales).

## Verificación
- El dev server de Vite ya corre en `$PORT` con hot reload; revisar el preview.
- Comprobar visualmente: ritmo de color por bloque, anclas del nav (`#agenda`, `#gamejamplus`, `#preguntas`, etc.) hacen scroll correcto, acordeón FAQ abre/cierra, pestañas de Agenda cambian de día, countdown sigue vivo, responsive (móvil colapsa columnas).
