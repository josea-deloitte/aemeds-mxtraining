# Modal Block

Modal robusto para AEM EDS con soporte de contenido anidado (texto, botones, tablas, columns, cards y otros blocks).

## 1. Authoring Contract

Cada fila dentro del bloque representa una fila de contenido del modal.

- Si una fila tiene 1 columna: se renderiza como bloque de ancho completo.
- Si una fila tiene 2+ columnas: se renderiza en stack por defecto (1 columna), mobile-first.

Estructura conceptual:

```text
| modal | |
| [logo / heading / copy] | |
| [boton secundario] | [boton primario] |
```

## 2. Variantes del Bloque

### Manual (default)

```text
| modal | |
| ...contenido... | |
```

Se abre desde cualquier trigger externo con:

- Link: `#id-del-modal`
- Atributo: `data-modal-target="id-del-modal"`

### Auto Open (interstitial)

```text
| modal auto-open | |
| ...contenido... | |
```

Se abre automáticamente al cargar la página.

### No cerrar al hacer click fuera

```text
| modal no-overlay-close | |
| ...contenido... | |
```

### Split Desktop (opcional, alineado al proyecto)

Por defecto el bloque usa stack para evitar saltos visuales y simplificar authoring.
Si una experiencia necesita dos columnas en desktop, usar la variante explícita:

```text
| modal split-desktop | |
| ...contenido... | |
```

Esta variante mantiene stack en mobile/tablet y habilita 2 columnas en `>= 900px`.

## 3. Accesibilidad

- `role="dialog"` y `aria-modal="true"`.
- `Esc` cierra el modal.
- Focus trap dentro del modal.
- Devuelve el foco al elemento trigger original.
- Si existe heading, se usa para `aria-labelledby`; si no, usa `aria-label`.

## 4. Contenido Anidado

Los blocks anidados dentro del modal se detectan, decoran y cargan al abrir el modal.

Esto permite incluir:

- `columns`
- `cards`
- `accordion`
- tablas y contenido enriquecido

## 5. Local Testing

```sh
npx -y @adobe/aem-cli up --no-open --html-folder drafts
```

Abrir:

- `http://localhost:3000/drafts/modal-test`

Validar:

- apertura/cierre por botón, `Esc` y overlay
- focus trap con teclado
- carga correcta de blocks anidados
- layout mobile y desktop
