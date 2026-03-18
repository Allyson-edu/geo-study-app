import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { User } from '@supabase/supabase-js'
import App from './App'
import LoginPage from './components/auth/LoginPage'
import { supabase } from './lib/supabase'
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
  const isLight = useThemeStore((s) => s.isLight)
  React.useEffect(() => {
    document.documentElement.classList.toggle('light', isLight)
  }, [isLight])
  return <>{children}</>
}

function Root() {
  const [user, setUser] = React.useState<User | null | undefined>(undefined)

  React.useEffect(() => {
    // Verifica sessão ativa ao inicializar
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null)
    })

    // Reage a mudanças de auth (login/logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  // Ainda verificando sessão — tela em branco enquanto carrega
  if (user === undefined) return null

  if (user === null) return <LoginPage />

  return <App user={user} />
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeInitializer>
          <Root />
        </ThemeInitializer>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
)
