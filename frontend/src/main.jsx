import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { MyContexProvider } from './config/MyContext.jsx'

createRoot(document.getElementById('root')).render(
  <MyContexProvider>

    <App />
  </MyContexProvider>

)
