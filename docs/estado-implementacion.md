# Estado frontend

Implementados shell, remotos Académico/Aprendizaje, contratos de sesión, estados de error, componentes compartidos, aplicación pública con prerender, Dockerfile por aplicación y CI inicial. Administración/inspectoría y pantallas funcionales aún pendientes.

## Validaciones
- TypeScript estricto y builds de cuatro aplicaciones correctos.
- 8 pruebas unitarias correctas.
- 4 E2E correctos con bundles federados reales: navegación entre remotos, caída de Aprendizaje sin bloquear Académico, visitante sin sesión y viewport móvil.
- Interfaz inspeccionada en escritorio y móvil con usuario sintético.
- npm audit --omit=dev: 0 vulnerabilidades reportadas en esta ejecución. Esto no es una certificación ni un escaneo de imágenes/dev dependencies.

E2E simula la sesión/API para aislar federación: **no valida login real con Keycloak**. La descarga estándar de Chromium no estuvo disponible en el entorno; se utilizó un binario de pruebas de @sparticuz/chromium mediante CHROMIUM_EXECUTABLE. En CI se usa `npx playwright install --with-deps chromium`.

Docker no está disponible en este entorno: imágenes, arranque completo y SSO real quedan pendientes de ejecutar. No se desplegó producción. El contenido público es una base estática prerenderizada, no un CMS funcional; no hay datos escolares ni controles de membresía implementados en esta entrega.

Consultar [distribución](distribucion-hu.md) y [laboratorio](laboratorio-microfrontends.md). Ninguna HU se considera completa sólo por integrar esta base.
