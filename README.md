# VQ School — frontend con microfrontends

Monorepositorio React + TypeScript. **Este repositorio contiene la implementación frontend activa.** Backend Java y Docker Compose integrado: [Vq-school-backend](https://github.com/vmorenov/Vq-school-backend/tree/feat/platform-foundation).

## Aplicaciones
| Workspace | Puerto local | Responsabilidad |
|---|---:|---|
| `@vq/shell` | 4173 | Navegación, sesión, integración y fallback |
| `@vq/academic` | 4174 | Remoto Académico |
| `@vq/learning` | 4175 | Remoto Aprendizaje |
| `@vq/public` | 4176 | Web pública React prerenderizada |

`packages/contracts` define entrada/sesión/API; `packages/ui` contiene componentes sin reglas de negocio. Module Federation comparte React/ReactDOM singleton. El shell no copia el código de los remotos.

## Desarrollo y validación
Node 24 LTS y npm; versiones exactas en package.json/lockfile.

```sh
npm ci
npm run dev
npm run check
npx playwright install chromium
npm run test:e2e
```

El modo dev sirve vistas en puertos separados y proxy de API al stack en 8080. Para validar **login real**, usar el portal integrado http://localhost:8080: los redirects OIDC registrados corresponden a ese origen. Preview/E2E de federación usan mocks explícitos de API, no demuestran SSO real.

```sh
npm run build -w @vq/learning
docker build --build-arg APP=learning -t vq-learning:local .
```

El Dockerfile admite APP=shell/academic/learning/public y argumentos VQ_BASE/VQ_ACADEMIC_URL/VQ_LEARNING_URL. Defaults de los remotos para desarrollo: 4174/4175; Compose fija las rutas del origen 8080. Consulte [laboratorio](docs/laboratorio-microfrontends.md).

## Estado
Base de interfaz, remotos y contrato de sesión implementados. Las pantallas escolares muestran estados vacíos reales; no hay notas, horarios ni pruebas simuladas presentadas como funcionales. Administración e inspectoría se implementarán en siguientes HU. El sitio público es una base prerenderizada, no un CMS terminado.

- [Distribución de HU](docs/distribucion-hu.md).
- [Tareas frontend legibles por herramientas](docs/frontend-backlog.json).
- [Validación y limitaciones](docs/estado-implementacion.md).

No guardar tokens en localStorage ni credenciales en variables Vite. No colocar datos reales de menores en evidencias públicas. Las ramas de integración aún requieren protección efectiva.
