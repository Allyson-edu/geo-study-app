import { useLocation } from 'react-router-dom'
import { Sun, Moon, Flame, Zap } from 'lucide-react'
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
      className="flex items-center justify-between px-6 sticky top-0 z-30"
      style={{
        height: 56,
        background: 'var(--bg-sidebar)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--border-color)',
      }}
    >
      <h1 className="text-base font-bold text-[var(--text-primary)]">{title}</h1>

      <div className="flex items-center gap-3">
        {/* Badge streak */}
        <div
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold"
          style={{
            background: 'rgba(255,159,10,0.15)',
            border: '1px solid rgba(255,159,10,0.35)',
            color: '#FF9F0A',
          }}
        >
          <Flame size={15} className="fire-icon" />
          <span>0 dias</span>
        </div>

        {/* Badge XP */}
        <div
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold"
          style={{
            background: 'rgba(10,132,255,0.15)',
            border: '1px solid rgba(10,132,255,0.35)',
            color: '#0A84FF',
          }}
        >
          <Zap size={15} />
          <span>0 XP</span>
        </div>

        {/* Toggle dark/light */}
        <motion.button
          onClick={toggle}
          className="p-2 rounded-xl transition-colors"
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
