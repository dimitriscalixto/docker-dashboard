import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { DockerManagerComponent } from './components/docker-manager.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DockerManagerComponent/>
  </StrictMode>,
)
