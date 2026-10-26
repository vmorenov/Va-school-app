import type { RemoteProps } from '@vq/contracts';
import { Panel, ConnectionStatus } from '@vq/ui';
export default function App({ apiBase = '/api/v1' }: RemoteProps) {
  return <div data-testid="learning-remote"><p className="eyebrow">APRENDIZAJE</p><h1>Aprender, practicar y avanzar</h1><p className="intro">Materiales pedagógicos, ensayos y retroalimentación de tus profesores.</p>
    <div className="cards"><Panel title="Material de estudio"><p>Sin información disponible. Primero se debe configurar el colegio y tu matrícula.</p></Panel><Panel title="Pruebas y ensayos"><p>Sin información disponible. Primero se debe configurar el colegio y tu matrícula.</p></Panel><Panel title="Mis resultados"><p>Sin información disponible. Primero se debe configurar el colegio y tu matrícula.</p></Panel></div>
    <Panel title="Conexión con el colegio"><ConnectionStatus url={`${apiBase}/platform/learning`}/></Panel>
  </div>;
}
