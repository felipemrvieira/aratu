---
name: DataPilot Core
colors:
  surface: '#131315'
  surface-dim: '#131315'
  surface-bright: '#39393b'
  surface-container-lowest: '#0e0e10'
  surface-container-low: '#1c1b1d'
  surface-container: '#201f22'
  surface-container-high: '#2a2a2c'
  surface-container-highest: '#353437'
  on-surface: '#e5e1e4'
  on-surface-variant: '#c7c4d7'
  inverse-surface: '#e5e1e4'
  inverse-on-surface: '#313032'
  outline: '#908fa0'
  outline-variant: '#464554'
  surface-tint: '#c0c1ff'
  primary: '#c0c1ff'
  on-primary: '#1000a9'
  primary-container: '#8083ff'
  on-primary-container: '#0d0096'
  inverse-primary: '#494bd6'
  secondary: '#4cd7f6'
  on-secondary: '#003640'
  secondary-container: '#03b5d3'
  on-secondary-container: '#00424e'
  tertiary: '#4edea3'
  on-tertiary: '#003824'
  tertiary-container: '#00885d'
  on-tertiary-container: '#000703'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e1e0ff'
  primary-fixed-dim: '#c0c1ff'
  on-primary-fixed: '#07006c'
  on-primary-fixed-variant: '#2f2ebe'
  secondary-fixed: '#acedff'
  secondary-fixed-dim: '#4cd7f6'
  on-secondary-fixed: '#001f26'
  on-secondary-fixed-variant: '#004e5c'
  tertiary-fixed: '#6ffbbe'
  tertiary-fixed-dim: '#4edea3'
  on-tertiary-fixed: '#002113'
  on-tertiary-fixed-variant: '#005236'
  background: '#131315'
  on-background: '#e5e1e4'
  surface-variant: '#353437'
typography:
  display-lg:
    fontFamily: Geist
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-md:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.01em
  code-sm:
    fontFamily: jetbrainsMono
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  gutter: 16px
  margin: 24px
  container-max: 1440px
  sidebar-width: 280px
---

## Brand & Style

The design system is engineered for a high-performance, AI-native database environment. The brand personality is rooted in **precision, speed, and intelligence**, targeting developers and data engineers who require a tool that feels as powerful as their local terminal but with the visual sophistication of a premium creative suite.

The style is a synthesis of **Modern Corporate** and **Glassmorphism**, leaning heavily into a "dark-first" philosophy. It utilizes deep layering, subtle translucent surfaces, and crisp, high-contrast typography to ensure data remains the focal point. The emotional response is one of **calculated control**—where the UI feels like a seamless extension of the user's intent.

- **Minimalism:** Use expansive negative space within data grids to prevent cognitive overload.
- **Glassmorphism:** Reserved for floating command palettes and sidebars to establish a clear spatial hierarchy.
- **AI-Native Visuals:** Subtle animated gradients and "active" glow states indicate background AI processing or query optimization.

## Colors

The palette is optimized for long-duration focus sessions. The primary background (Neutral 950) provides a void-like depth, allowing interactive elements and data points to pop with clarity.

- **Primary (Electric Indigo):** Used for primary actions, active selection states, and focus rings.
- **Secondary (Cyan):** Used for AI-related features, suggestion chips, and code syntax highlighting.
- **Tertiary (Emerald):** Denotes success states, "connected" statuses, and healthy database metrics.
- **Base Surfaces:** 
  - `Surface 0`: #09090B (Main background)
  - `Surface 1`: #18181B (Sidebars/Cards)
  - `Surface 2`: #27272A (Input fields/Tooltips)
- **Borders:** Use a consistent #27272A for inactive borders and #3F3F46 for hover states.

## Typography

This design system utilizes a dual-font approach to balance editorial character with technical utility. **Geist** is used for headlines, navigation, and labels to provide a sharp, modern feel. **Inter** handles body text for maximum legibility at smaller sizes. For database schemas and SQL editors, **JetBrains Mono** is specified to ensure character distinction.

- **Contrast:** Maintain a high contrast ratio for text on dark backgrounds. Use `neutral-100` for primary headings and `neutral-400` for secondary descriptions.
- **Scale:** Keep hierarchy strict. Small labels should be uppercase with slightly increased letter spacing (0.05em) for better scanability.

## Layout & Spacing

The layout philosophy follows a **systematic fluid grid** with a 4px base unit. Given the data-heavy nature of the application, spacing is used to create logical groupings without relying on heavy lines.

- **The Workspace Model:** A fixed left sidebar (280px) for navigation and schema browsing, with a fluid main content area for data tables and editors.
- **Data Grids:** Use a "tight" spacing rhythm (8px padding per cell) to maximize information density while maintaining a clear horizontal baseline.
- **Breakpoints:**
  - **Mobile (<768px):** Sidebar collapses into a bottom navigation bar or a hamburger menu. Main content padding reduces to 16px.
  - **Tablet (768px - 1024px):** Sidebar collapses to icons only (min-sidebar).
  - **Desktop (>1024px):** Full layout with optional right-hand property panels.

## Elevation & Depth

Elevation is communicated through **Tonal Layers** and **Glassmorphism**, rather than traditional heavy shadows. This creates a sense of "lightness" even within a dark interface.

- **Level 0 (Floor):** The base background (#09090B).
- **Level 1 (Surface):** Slightly elevated cards or panels (#18181B) with a subtle 1px border (#27272A).
- **Level 2 (Overlay):** Floating menus or command palettes. These use a backdrop blur (12px) and a semi-transparent background (`rgba(24, 24, 27, 0.8)`).
- **Shadows:** Use a single, extra-diffused "Ambient Glow" shadow for active modals: `0 20px 40px rgba(0, 0, 0, 0.4)`. For primary buttons, a subtle outer glow using the Indigo color (`0 0 12px rgba(99, 102, 241, 0.3)`) can be applied on hover.

## Shapes

The design system utilizes **Rounded (2)** corners to soften the technical edge of the data and make the interface feel more approachable.

- **Standard Elements:** Buttons, inputs, and list items use `rounded-md` (0.5rem).
- **Containers:** Main dashboard cards and the SQL editor container use `rounded-lg` (1rem).
- **Large Overlays:** Command palettes and onboarding modals use `rounded-xl` (1.5rem) to signify a distinct layer from the background grid.

## Components

### Buttons
- **Primary:** Background of Electric Indigo, white text, 0.5rem radius. Subtle transition to a brighter indigo on hover.
- **Ghost:** No background, #3F3F46 border. Turns into a solid #27272A background on hover.

### Input Fields
- **Search/Query:** Deep background (#18181B) with a subtle inset shadow and #27272A border. Active state uses a 1px Indigo ring.
- **Monospace Input:** For SQL fragments, use a distinct background color and JetBrains Mono.

### Chips & Badges
- **Status Badges:** Small, caps-lock labels with a low-opacity background of their status color (e.g., Emerald at 10% opacity for "Online").

### Data Tables
- **Header:** Sticky headers with a subtle backdrop blur. Border-bottom only.
- **Rows:** Hover state highlights the entire row with #18181B. Active selection uses a 2px Indigo left-border.

### Command Palette (AI-Native)
- A central component appearing via `Cmd+K`. High glassmorphism effect (blur 20px), centered on screen, with a Cyan-tinted glow to signal AI readiness.

### Progress & Loading
- Use a slim, 2px Indigo line at the top of the viewport or a shimmering skeleton state for data cells while loading.