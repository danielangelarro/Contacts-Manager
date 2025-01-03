import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Theme } from "@radix-ui/themes";
import App from './App.tsx'
import AppProvider from './context/TrcpContext.tsx';
import "./styles/index.css";
import * as Toast from '@radix-ui/react-toast';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Theme className='h-full w-full bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10'>
      <Toast.Provider swipeDirection="right">
        <AppProvider>
          <App />
          <Toast.Viewport />
        </AppProvider>
      </Toast.Provider>
    </Theme>
  </StrictMode>,
)
