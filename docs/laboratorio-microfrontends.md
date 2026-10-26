# Laboratorio: independencia de microfrontends

1. Ejecutar `npm ci && npm run build` y levantar previews de shell, academic y learning en terminales distintas: `npm run preview -w @vq/<app>`.
2. Con el stack integrado para sesión real, preferir Compose descrito en el backend. Las pruebas E2E aisladas simulan explícitamente sesión y capacidades para estudiar federación.
3. Abrir Académico y Aprendizaje; en Network observar remoteEntry.js desde dos aplicaciones y chunks independientes.
4. Cambiar el título de `apps/learning/src/App.tsx` y reconstruir sólo `npm run build -w @vq/learning`. Recargar: shell y academic no se reconstruyen.
5. Con Docker integrado: `docker compose --env-file infra/.env -f infra/compose.yaml up -d --build --no-deps learning-web` desde backend.
6. Detener el servidor/contenedor learning, abrir esa ruta y comprobar fallback; Académico y navegación siguen disponibles. Volver a iniciar y recargar para recuperar.

## Qué aprender
Host/remotes/exposes/shared, lazy loading, React singleton, boundary de errores, rutas de assets, CORS en puertos separados y mismo origen en Compose. La configuración usa loaded-first para evitar que un remoto caído bloquee la carga inicial de React.

## Qué falta para producción
Manifiesto de releases y compatibilidad, despliegue por digest con retención de chunks anteriores, pruebas entre versiones y rollback por remoto. Compartir paquetes no garantiza compatibilidad: cambios incompatibles de props exigen contrato versionado. No publicar remotos de terceros no confiables dentro del origen de la aplicación.
