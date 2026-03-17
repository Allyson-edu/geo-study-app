import { useLocation } from 'react-router-dom'
import { Sun, Moon, Flame, Zap } from 'lucide-react'
import { motion } from 'framer-motion'
import { useThemeStore } from '@/store/themeStore'

const ROUTE_TITLES: Record<string, string> = {
  '/': 'Dashboard',
  '/pre-curso': 'Pré-Curso',
  '/graduacao': 'Graduação',
}

export default function TopBar() {
  const { pathname } = useLocation()
  const { isDark, toggle } = useThemeStore()

  const title = ROUTE_TITLES[pathname] ?? 'GeoStudy'

  return (
    <header className="flex items-center justify-between px-6 py-3 border-b border-[var(--border-color)] bg-[var(--bg-secondary)]/80 backdrop-blur-md sticky top-0 z-30">
      <h1 className="text-lg font-bold text-[var(--text-primary)]">{title}</h1>

      <div className="flex items-center gap-3">
        {/* Streak badge */}
        <div className="flex items-center gap-1.5 bg-orange-500/10 text-orange-500 px-3 py-1.5 rounded-full text-sm font-semibold">
          <Flame size={16} className="pulse-fire" />
          <span>0 dias</span>
        </div>

        {/* XP badge */}
        <div className="flex items-center gap-1.5 bg-bigsur-blue/10 text-bigsur-blue px-3 py-1.5 rounded-full text-sm font-semibold">
          <Zap size={16} />
          <span>0 XP</span>
        </div>

        {/* Toggle dark/light */}
        <motion.button
          onClick={toggle}
          className="p-2 rounded-xl bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          whileTap={{ scale: 0.9 }}
          aria-label="Alternar tema"
        >
          <motion.div
            initial={false}
            animate={{ rotate: isDark ? 0 : 180, scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </motion.div>
        </motion.button>
      </div>
    </header>
  )
}
