import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App'
import { useThemeStore } from '@/store/themeStore'
import '@/styles/globals.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutos
    },
  },
})

// Aplica o tema salvo imediatamente antes do render
function ThemeInitializer({ children }: { children: React.ReactNode }) {
  const isDark = useThemeStore((s) => s.isDark)
  React.useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
  }, [isDark])
  return <>{children}</>
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeInitializer>
          <App />
        </ThemeInitializer>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
)
