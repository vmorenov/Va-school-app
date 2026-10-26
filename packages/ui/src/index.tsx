import { useEffect, useState, type ReactNode } from 'react';
import { getJson, type Capability } from '@vq/contracts';
export function Panel({ title, children }: { title: string; children: ReactNode }) {
  return <section className="panel"><h2>{title}</h2>{children}</section>;
}
export function ConnectionStatus({ url }: { url: string }) {
  const [state, setState] = useState<{ value?: Capability; error?: string }>({});
  const [attempt, retry] = useState(0);
  useEffect(() => {
    const controller = new AbortController(); setState({});
    getJson<Capability>(url, controller.signal).then(value => setState({ value })).catch(error => {
      if (!controller.signal.aborted) setState({ error: error instanceof Error ? error.message : 'Error de conexión' });
    });
    return () => controller.abort();
  }, [url, attempt]);
  if (state.error) return <div role="alert"><p>{state.error}</p><button onClick={() => retry(n => n + 1)}>Reintentar conexión</button></div>;
  if (!state.value) return <p role="status">Comprobando conexión…</p>;
  return <p role="status">Tu conexión está lista. {state.value.businessFeaturesReady ? 'Disponible.' : 'La configuración del colegio estará disponible en la siguiente entrega.'}</p>;
}
