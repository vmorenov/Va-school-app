import { lazy, Suspense, useEffect, useState } from 'react';
import { getJson, parseSession, type Session } from '@vq/contracts';
import { Panel } from '@vq/ui';
import { RemoteBoundary } from './RemoteBoundary';
const Academic = lazy(() => import('academic/App'));
const Learning = lazy(() => import('learning/App'));
const routes = new Set(['home','academic','learning','administration','inspection']);
function currentRoute() { const r = location.hash.replace('#/',''); return routes.has(r) ? r : 'home'; }
export default function App() {
  const [route,setRoute] = useState(currentRoute);
  const [session,setSession] = useState<Session>();
  const [error,setError] = useState('');
  const [attempt,retry] = useState(0);
  useEffect(() => { const onRoute = () => setRoute(currentRoute()); window.addEventListener('hashchange',onRoute); return () => window.removeEventListener('hashchange',onRoute); },[]);
  useEffect(() => {
    const c = new AbortController(); setError('');
    getJson<unknown>('/api/v1/session',c.signal).then(parseSession).then(setSession).catch(e => { if(!c.signal.aborted) setError(e.message); });
    return () => c.abort();
  },[attempt]);
  async function logout() {
    try {
      const csrf = await getJson<{parameterName:string;token:string}>('/api/v1/csrf');
      const form = document.createElement('form'); form.method='POST'; form.action='/logout';
      const input=document.createElement('input'); input.type='hidden';input.name=csrf.parameterName;input.value=csrf.token;
      form.append(input);document.body.append(form);form.submit();
    } catch { setError('No se pudo cerrar la sesión. Inténtalo nuevamente.'); }
  }
  const nav=[['home','Inicio'],['academic','Académico'],['learning','Aprendizaje'],['administration','Administración'],['inspection','Inspectoría']];
  return <div className="layout"><a className="skip" href="#main" onClick={e=>{e.preventDefault();document.getElementById("main")?.focus();}}>Ir al contenido</a><aside className="sidebar"><a className="brand" href="#/home"><span className="brand-icon">VQ</span><span>school<small>Conecta tu comunidad</small></span></a>
    <p className="nav-label">MI ESTABLECIMIENTO</p><nav aria-label="Navegación principal">{nav.map(([key,label]) => <a key={key} href={`#/${key}`} aria-current={route===key?'page':undefined}><span className="nav-dot"/>{label}</a>)}</nav>
    <div className="sidebar-bottom"><span className="status-dot"/> Comunidad escolar <p>Un espacio para aprender juntos.</p></div></aside>
    <div className="workspace"><header><span>Comunidad educativa / <strong>{nav.find(x=>x[0]===route)?.[1]}</strong></span><div>{session?.authenticated ? <><span>{session.displayName}</span><button className="text-button" onClick={logout}>Salir</button></> : <a className="login" href="/oauth2/authorization/keycloak">Iniciar sesión</a>}</div></header>
    <main id="main" tabIndex={-1}>{error && <div className="notice" role="alert">{error} <button onClick={()=>retry(n=>n+1)}>Reintentar</button></div>}
      {!session && !error && <p role="status">Consultando sesión…</p>}
      {route==='home' ? <><p className="eyebrow">BIENVENIDO A VQ SCHOOL</p><h1>Tu comunidad.<br/>Un mismo lugar.</h1><p className="intro">Organiza el día a día y acompaña cada paso del aprendizaje.</p><div className="hero"><div><span className="pill">PORTAL ESCOLAR</span><h2>Todo comienza<br/>con una buena conexión.</h2><p>Accede con tu cuenta del establecimiento para encontrar tus espacios.</p><a className="primary" href={session?.authenticated?"#/academic":"/oauth2/authorization/keycloak"}>{session?.authenticated?"Abrir mi espacio":"Entrar a mi colegio"} <span>→</span></a></div><div className="hero-art" aria-hidden="true"><div className="orb"/><div className="book">VQ<span>Aprender<br/>nos conecta.</span></div><span className="spark">✦</span></div></div><div className="cards"><Panel title="Académico"><p>Tu horario, asignaturas, calificaciones y asistencia.</p><a href="#/academic">Abrir espacio →</a></Panel><Panel title="Aprendizaje"><p>Recursos, práctica y retroalimentación para avanzar.</p><a href="#/learning">Explorar aprendizaje →</a></Panel></div></> :
      route==='administration'||route==='inspection' ? <Panel title={route==='administration'?'Administración':'Inspectoría'}><p>Este espacio estará disponible cuando el establecimiento complete su configuración.</p></Panel> :
      session?.authenticated ? <RemoteBoundary key={route}><Suspense fallback={<p role="status">Cargando módulo…</p>}>{route==='academic'?<Academic apiBase="/api/v1"/>:<Learning apiBase="/api/v1"/>}</Suspense></RemoteBoundary> : session && <Panel title="Accede a tu espacio"><p>Inicia sesión con tu cuenta del establecimiento para continuar.</p><a href="/oauth2/authorization/keycloak">Iniciar sesión</a></Panel>}
    </main><footer>VQ School · Comunidad, organización y aprendizaje.</footer></div></div>;
}
