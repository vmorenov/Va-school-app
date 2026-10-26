import type { RemoteProps } from '@vq/contracts';
import { Panel, ConnectionStatus } from '@vq/ui';
export default function App({ apiBase = '/api/v1' }: RemoteProps) {
  return <div data-testid="academic-remote"><p className="eyebrow">VIDA ACADÉMICA</p><h1>Tu espacio académico</h1><p className="intro">Horarios, asignaturas, calificaciones y asistencia en un solo lugar.</p>
    <div className="cards"><Panel title="Horario de clases"><p>Sin información disponible. Primero se debe configurar el colegio y tu matrícula.</p></Panel><Panel title="Calificaciones"><p>Sin información disponible. Primero se debe configurar el colegio y tu matrícula.</p></Panel><Panel title="Asistencia"><p>Sin información disponible. Primero se debe configurar el colegio y tu matrícula.</p></Panel></div>
    <Panel title="Conexión con el colegio"><ConnectionStatus url={`${apiBase}/platform/school`}/></Panel>
  </div>;
}
