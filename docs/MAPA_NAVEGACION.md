# Mapa de navegación y flujo funcional

## Sitio público

```mermaid
flowchart TD
    H[UNISITE / Home] --> A[Inicio - Hero]
    H --> B[Oferta académica]
    H --> C[Nosotros - Beneficios]
    H --> D[Modalidades - Franja informativa]
    H --> E[Contacto - Formulario de informes]
    H --> F[Avisos y novedades]
    H --> G[Admisiones /admisiones]
    B --> E
    F --> AV[Avisos /avisos]
    G --> PA[Formulario de pre-registro]
    E --> T[Cloudflare Turnstile]
    PA --> T
    T --> W[Webhook n8n]
    W --> S[Google Sheets - Prospectos]
```

El menú público contiene **6 opciones**: Inicio, Oferta académica, Nosotros, Modalidades, Admisiones y Contacto. Avisos tiene acceso dentro de su propia sección y una vista de listado, sin añadir innecesariamente otra opción al menú principal.

## Avisos sin build

```mermaid
flowchart TD
    F[Formulario privado n8n] --> V[Validar imagen y campos]
    V --> I[SFTP - Imágenes del aviso]
    V --> G[Google Sheets - Avisos]
    I --> G
    G --> P[Construir JSON vigente]
    P --> J[SFTP - /unisite/data/avisos.json]
    J --> C[Carrusel Vue]
    CR[Cron 00:05 Ciudad de México] --> G
```

La Home y la vista `/avisos` leen `data/avisos.json`, sin dependencias PHP ni compilación en cada anuncio.
