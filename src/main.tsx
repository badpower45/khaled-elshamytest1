
  import { createRoot } from "react-dom/client";
  import App from "./App.tsx";
  import "./index.css";
  import { AuthProvider } from './context/AuthContext';

  // Development: normal React errors are shown by Vite overlay.
  // Production: add a small global error overlay so a white screen shows an error message.
  if (!import.meta.env.DEV) {
    window.addEventListener('error', (ev: ErrorEvent) => {
      try {
        const msg = ev.message || String(ev.error || ev);
        const el = document.createElement('div');
        el.id = 'global-error-overlay';
        el.style.position = 'fixed';
        el.style.left = '0';
        el.style.top = '0';
        el.style.width = '100%';
        el.style.background = 'rgba(200,20,20,0.95)';
        el.style.color = 'white';
        el.style.zIndex = '999999';
        el.style.padding = '12px 16px';
        el.style.fontFamily = 'Inter, system-ui, sans-serif';
        el.style.fontSize = '14px';
        el.style.whiteSpace = 'pre-wrap';
        el.textContent = 'Runtime error: ' + msg;
        document.body && document.body.appendChild(el);
      } catch (e) {
        // ignore overlay errors
      }
    });

    window.addEventListener('unhandledrejection', (ev: PromiseRejectionEvent) => {
      try {
        const reason = ev.reason && (ev.reason.message || String(ev.reason)) || String(ev.reason || ev);
        const el = document.createElement('div');
        el.id = 'global-unhandledrejection-overlay';
        el.style.position = 'fixed';
        el.style.left = '0';
        el.style.top = '0';
        el.style.width = '100%';
        el.style.background = 'rgba(180,30,30,0.95)';
        el.style.color = 'white';
        el.style.zIndex = '999999';
        el.style.padding = '12px 16px';
        el.style.fontFamily = 'Inter, system-ui, sans-serif';
        el.style.fontSize = '14px';
        el.style.whiteSpace = 'pre-wrap';
        el.textContent = 'Unhandled rejection: ' + reason;
        document.body && document.body.appendChild(el);
      } catch (e) {
        // ignore
      }
    });
  }

  createRoot(document.getElementById("root")!).render(
    <AuthProvider>
      <App />
    </AuthProvider>
  );
  