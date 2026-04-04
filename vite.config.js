import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // 1. Listen on all network interfaces (essential for tunnels)
    host: '0.0.0.0', 
    port: 5173,
    // 2. Tell Vite to trust your Packet Riot domain
    allowedHosts: [
      'objective-flower-00277.pktriot.net'
    ],
    // 3. Fixes "Hot Module Replacement" (auto-refresh) over HTTPS
    hmr: {
      clientPort: 443,
    },
  },
})