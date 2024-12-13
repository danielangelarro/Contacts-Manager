import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Theme, ThemePanel } from "@radix-ui/themes";
import App from './App.tsx'
import AppProvider from './context/trcp.context.tsx';
import "./styles/index.css";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Theme className='h-full w-full bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10'>
      <AppProvider>
        <App />
        {/* <ThemePanel/> */}
      </AppProvider>
    </Theme>
  </StrictMode>,
)
