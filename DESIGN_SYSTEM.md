# Sistema de Diseño - PrivyCredit Dark Theme

## Paleta de Colores

### Colores Principales
- **Primary (Verde Lima)**: `#c4ff0d` - Botones principales, acentos, CTAs
- **Primary Dark**: `#a8e00b` - Hover states
- **Primary Light**: `#d4ff3d` - Highlights

### Colores de Fondo
- **Dark**: `#0a0a0a` - Fondo principal de la aplicación
- **Dark Card**: `#1a1a1a` - Tarjetas y contenedores
- **Dark Border**: `#2a2a2a` - Bordes y separadores

### Colores de Texto
- **Blanco**: `#ffffff` - Títulos y texto principal
- **Gray-300**: `#d1d5db` - Texto secundario
- **Gray-400**: `#9ca3af` - Texto terciario y descripciones
- **Gray-500**: `#6b7280` - Texto deshabilitado y footnotes

## Componentes Actualizados

### 1. Landing Page
- Fondo negro (#0a0a0a)
- Icono principal con fondo verde lima en rounded-3xl
- Botón CTA con sombra verde (shadow-primary/20)
- Tarjetas con bg-dark-card y bordes sutiles
- Sección de privacidad con gradiente verde oscuro

### 2. Connect Wallet
- Fondo oscuro uniforme
- Tarjeta principal con bordes redondeados (rounded-[2.5rem])
- Checks con color primary en lugar de emerald
- Botón principal: fondo primary, texto dark, rounded-full
- Estados disabled con bg-gray-700

### 3. Generate Proof
- Progress bar con gradiente azul-verde
- Pasos numerados con checks primary
- Fondo dark con tarjetas dark-card
- Spinner con animación suave

### 4. Result Cards (Apto/Casi)
- Badges de bandas con colores ajustados:
  - Banda A: bg-primary/20 text-primary
  - Banda B: bg-amber-500 (sin cambios)
  - Banda C: bg-red-500 (sin cambios)
- Enlaces a Scrollscan con color primary
- Tarjetas con gradientes sutiles para "Apto"

### 5. Share Proof
- Background dark-card
- Botón "Copiar enlace" con estilo primary
- Enlaces de aliados con hover states suaves
- QR code placeholder con iconos primary

### 6. Improvement Checklist
- Cards con bg-dark-card/50
- Badges de impacto con primary para "alto"
- Checkboxes con borde primary
- Botones con sombra primary

### 7. Simulator
- Sliders/toggles con color primary
- Bandas seleccionadas con ring primary
- Resultado simulado con gradientes
- Reset button con estilo secundario

### 8. Reminders
- Calendario con iconos primary
- Selección de días con bg-dark border-2 border-primary
- Botón confirmar con estilo CTA principal

### 9. Verifier Gate (B2B)
- Background gradient dark (slate-800 a slate-900)
- Tarjetas con sombra 2xl
- Campo de input con border-2 y focus:border-primary
- Badge de verificación blockchain con bg-primary/20
- Enlaces externos con ExternalLink icon

## Bordes Redondeados

- **rounded-full**: Botones CTA principales
- **rounded-[2.5rem]** (40px): Tarjetas principales grandes
- **rounded-[2rem]** (32px): Tarjetas secundarias
- **rounded-2xl** (16px): Elementos internos, inputs
- **rounded-xl** (12px): Badges y chips pequeños

## Sombras

### Sombras Estándar
- `shadow-xl`: Tarjetas principales
- `shadow-2xl`: Tarjetas destacadas y modales
- `shadow-lg`: Botones normales

### Sombras con Color
- `shadow-primary/20`: Botones CTA en estado normal
- `shadow-primary/40`: Botones CTA en hover

## Tipografía

### Tamaños
- **Títulos principales**: text-5xl sm:text-6xl (48px/60px)
- **Títulos sección**: text-3xl (30px)
- **Subtítulos**: text-xl (20px)
- **Texto normal**: text-base (16px)
- **Texto pequeño**: text-sm (14px)
- **Footnotes**: text-xs (12px)

### Pesos
- **font-bold**: Títulos y CTAs principales (700)
- **font-semibold**: Subtítulos y labels (600)
- **font-medium**: Texto destacado (500)
- **font-normal**: Texto regular (400)

## Botones

### Botón Primary (CTA Principal)
```tsx
className="bg-primary hover:bg-primary-dark text-dark px-12 py-5 rounded-full text-lg font-bold transition-all shadow-lg shadow-primary/20 hover:shadow-primary/40 transform hover:scale-105"
```

### Botón Secondary
```tsx
className="bg-dark-card hover:bg-dark-border text-white px-8 py-4 rounded-2xl font-semibold transition-colors border border-dark-border"
```

### Botón Disabled
```tsx
className="... disabled:bg-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed"
```

## Estados Interactivos

### Hover
- Botones primary: `hover:scale-105`
- Tarjetas: `hover:border-primary/30`
- Enlaces: `hover:text-primary hover:underline`

### Focus
- Inputs: `focus:border-primary focus:ring-2 focus:ring-primary`
- Botones: `focus:outline-none focus:ring-4 focus:ring-primary/50`

### Disabled
- Background: `bg-gray-700`
- Texto: `text-gray-500`
- Cursor: `cursor-not-allowed`

## Gradientes

### Gradient Card (Privacidad/Destacados)
```css
background: linear-gradient(135deg, #2a4a3a 0%, #1a3a2a 100%);
```

### Gradient Primary (Botones especiales)
```css
background: linear-gradient(135deg, #c4ff0d 0%, #a8e00b 100%);
```

## Iconografía

- **Tamaño estándar**: w-5 h-5 (20px)
- **Tamaño grande**: w-8 h-8 (32px)
- **Tamaño hero**: w-10 h-10 o w-12 h-12 (40px/48px)
- **Color**: Siempre usar `text-primary` o `text-dark` dependiendo del contexto

## Espaciado

- **Padding cards**: p-8 sm:p-12
- **Margin entre secciones**: mb-16
- **Gap entre elementos**: gap-2 (8px), gap-3 (12px), gap-4 (16px)
- **Espaciado interno botones**: px-12 py-5 (principal), px-8 py-4 (secundario)

## Responsive

- Mobile first approach
- Breakpoints: sm:, md:, lg:, xl:
- Grids: `grid md:grid-cols-3` para características
- Max-width containers: `max-w-6xl` (landing), `max-w-2xl` (formularios)

## Accesibilidad

- Contrast ratio mínimo: 4.5:1 entre texto y fondo
- Focus visible en todos los elementos interactivos
- ARIA labels en iconos sin texto
- Estados disabled claramente visibles
- Tamaños mínimos táctiles: 44px x 44px

## Animaciones

### Transiciones Suaves
```tsx
transition-all duration-300 ease-out
```

### Transformaciones
```tsx
transform hover:scale-105 hover:-translate-y-0.5
```

### Spinners
```tsx
animate-spin
```

## Notas de Implementación

1. **Consistencia**: Todos los componentes usan la misma paleta
2. **Contraste**: El verde lima (#c4ff0d) proporciona excelente contraste sobre negro
3. **Legibilidad**: Texto gris claro (gray-300/400) es legible sobre fondos oscuros
4. **Jerarquía Visual**: El verde lima se reserva para CTAs y elementos importantes
5. **Sombras Sutiles**: Las sombras con alpha (shadow-primary/20) dan profundidad sin ser intrusivas

## Inspiración

El diseño está inspirado en aplicaciones fintech modernas con:
- Estética crypto/web3
- UI oscura premium
- Acentos de color vibrantes pero controlados
- Formas redondeadas y suaves
- Microinteracciones sutiles
