import { createRoot } from 'react-dom/client'
import App from './App.jsx'
// Fonts are bundled with the app (not loaded from Google), so visitors' IP addresses aren't sent to Google.
import '@fontsource-variable/bricolage-grotesque/opsz.css'
import '@fontsource-variable/dm-sans/opsz.css'
import '@fontsource-variable/dm-sans/opsz-italic.css'
import '@fontsource/dm-mono/400.css'
import '@fontsource/dm-mono/500.css'
import './styles.css'

createRoot(document.getElementById('root')).render(<App />)
