import { useLocation } from 'react-router-dom'
import { Sun, Moon } from 'lucide-react'
import { motion } from 'framer-motion'
import { useThemeStore } from '@/store/themeStore'

const ROUTE_TITLES: Record<string, string> = {
  '/': 'Dashboard',
  '/pre-curso': 'Pré-Curso',
  '/graduacao': 'Graduação',
  '/diario': 'Diário de Estudos',
  '/foco': 'Modo Foco',
  '/mapa': 'Mapa de Progresso',
}

export default function TopBar() {
  const { pathname } = useLocation()
  const { isLight, toggle } = useThemeStore()

  const title = ROUTE_TITLES[pathname] ?? 'GeoStudy'

  return (
    <header
      className="topbar flex items-center justify-between px-6 sticky top-0 z-30"
      style={{ height: 56 }}
    >
      <h1 className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>{title}</h1>

      <div className="flex items-center gap-3">
        {/* Streak badge */}
        <div className="streak-badge">
          <span className="fire-anim">🔥</span>
          <span>0 dias</span>
        </div>

        {/* Toggle dark/light */}
        <motion.button
          onClick={toggle}
          className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors"
          style={{ background: 'var(--bg-tertiary)', color: 'var(--text-secondary)' }}
          whileTap={{ scale: 0.9 }}
          aria-label="Alternar tema"
        >
          <motion.div
            initial={false}
            animate={{ rotate: isLight ? 180 : 0 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            {isLight ? <Moon size={18} /> : <Sun size={18} />}
          </motion.div>
        </motion.button>
      </div>
    </header>
  )
}
