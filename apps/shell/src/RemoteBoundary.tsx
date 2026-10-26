import { Component, type ReactNode } from 'react';
export class RemoteBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() {
    return this.state.failed ? <section role="alert" className="panel"><h1>Este módulo no está disponible</h1><p>Puedes seguir usando el menú y volver a intentarlo más tarde.</p><button onClick={() => window.location.reload()}>Volver a cargar</button></section> : this.props.children;
  }
}
