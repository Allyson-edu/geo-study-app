import { useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

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

  const title = ROUTE_TITLES[pathname] ?? 'GeoStudy'

  return (
    <header
      className="topbar flex items-center justify-between px-6 sticky top-0 z-30"
      style={{ height: 56 }}
    >
      <h1 className="text-base font-bold uppercase tracking-widest" style={{ color: '#1A1A1A' }}>{title}</h1>

      <div className="flex items-center gap-3">
        {/* Streak badge */}
        <div className="streak-badge">
          <span>🔥</span>
          <span>0 dias</span>
        </div>

        {/* Indicador Bauhaus — bloco vermelho */}
        <motion.div
          className="flex items-center gap-1.5 px-3 py-1.5"
          style={{ background: '#1A4DAB', border: '2px solid #1A1A1A', color: '#FFFFFF', fontSize: 11, fontWeight: 700, letterSpacing: '0.05em' }}
          whileTap={{ scale: 0.95 }}
        >
          GEO
        </motion.div>
      </div>
    </header>
  )
}
