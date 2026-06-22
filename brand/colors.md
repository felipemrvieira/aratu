# Aratu Color System

This initial palette is a brand direction, not yet an implementation token contract. UI work should map colors to semantic roles and verify WCAG contrast in actual component states.

## Primary

- **Deep Tide:** `#0B1020`
- **Mangrove Green:** `#1F6F5F`
- **Estuary Teal:** `#2BAE9B`
- **Reef Cyan:** `#66E3D3`
- **Sand Mist:** `#E6EFEA`

### Usage

- **Deep Tide** is the main dark canvas and deepest application surface. Use slightly lighter derived surfaces for hierarchy rather than placing every panel on the same value.
- **Mangrove Green** anchors brand elements, selected navigation, and restrained active states. Do not rely on it alone to mean success.
- **Estuary Teal** is the primary interactive accent for buttons, links, focus emphasis, and data-relationship highlights after contrast validation.
- **Reef Cyan** supports hover/focus, query assistance, graph edges, and technical highlights. Reserve its brightness so high-priority signals remain distinct.
- **Sand Mist** is the light neutral for primary text and light surfaces. Use muted derived neutrals for secondary text to maintain hierarchy.

## Secondary

- **Mud Brown:** `#6B5A4B`
- **Coral Alert:** `#FF6B6B`
- **Amber Signal:** `#F7B955`
- **Cool Gray:** `#93A1B2`

### Usage

- **Mud Brown** adds a restrained natural secondary accent for diagrams, labels, or brand illustration. Avoid using it for low-contrast body text.
- **Coral Alert** denotes destructive actions, policy blocks, failed connections, and high-risk diffs. Pair it with icons and text, never color alone.
- **Amber Signal** denotes warnings, production caution, pending review, or degraded states. It must remain distinct from both error and staged/success states.
- **Cool Gray** supports secondary text, inactive icons, borders, and metadata. Derived values must meet contrast requirements for their role.

## Semantic Guidance

Recommended semantic families for the future token system:

```txt
background / surface / surface-raised
text-primary / text-secondary / text-disabled
border / border-hover / focus-ring
action-primary / action-secondary
status-success / status-warning / status-danger / status-info
environment-development / environment-staging / environment-production
diff-added / diff-modified / diff-removed
```

Environment, connector, and diff states must combine color with labels, icons, patterns, or shape. Production should not reuse the same role as a generic validation error.

## Stitch Compatibility

The Stitch design system uses deep neutral surfaces, electric indigo, cyan, and emerald. Deep Tide, Reef Cyan, and the green/teal family preserve its dark technical character. Before coding tokens, prototype the Aratu palette on Connect Database, Table View, and Review Changes screens and document any retained indigo as a deliberate supporting color.
