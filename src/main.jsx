import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fortawesome/fontawesome-free/css/all.css'
import './index.css'
import App from './App.jsx'
import { HeroUIProvider } from '@heroui/react'
import { Provider } from 'react-redux'
import { store } from './store'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <HeroUIProvider>
        <App />
      </HeroUIProvider>
    </Provider>
  </StrictMode>,
)
