import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Theme, ThemePanel } from "@radix-ui/themes";
import App from './App.tsx'
import AppProvider from './context/trcp.context.tsx';
import "./styles/index.css";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Theme>
      <AppProvider>
        <App />
        {/* <ThemePanel/> */}
      </AppProvider>
    </Theme>
  </StrictMode>,
)
