# Va-school-app

## Arquitectura acordada como base del MVP

La propuesta de VQ School usa un **monorepositorio React + Java + infraestructura** alojado en [Vq-school-backend](https://github.com/vmorenov/Vq-school-backend/tree/docs/mvp-base).

El frontend se implementará en `apps/web` del monorepositorio. Este repositorio se conserva como referencia; no se elimina ni archiva y no mantiene una segunda implementación del frontend.

- [Propuesta completa — PR #41](https://github.com/vmorenov/Vq-school-backend/pull/41)
- [Alcance del MVP](https://github.com/vmorenov/Vq-school-backend/blob/docs/mvp-base/docs/01-alcance-mvp.md)
- [Arquitectura y diagramas](https://github.com/vmorenov/Vq-school-backend/blob/docs/mvp-base/docs/02-arquitectura.md)
- [40 historias de usuario y criterios](https://github.com/vmorenov/Vq-school-backend/blob/docs/mvp-base/docs/05-backlog.md)

**Estado:** base de planificación registrada. La aplicación, los microservicios y el despliegue Docker están pendientes de implementación. Las ramas develop/staging/master existen, pero su protección continúa pendiente. Esta propuesta no cambia la rama por defecto ni fusiona cambios automáticamente.

La elección de un único repositorio resuelve el requisito de monorepositorio; cualquier cambio de esta decisión debe actualizar el ADR de la base.
