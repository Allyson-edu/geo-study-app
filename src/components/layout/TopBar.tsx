import { useLocation } from 'react-router-dom'
import { LogOut } from 'lucide-react'
import { useStudyStore } from '@/store/studyStore'

interface TopBarProps {
  onLogout?: () => void
}

const ROUTE_TITLES: Record<string, string> = {
  '/': 'Dashboard',
  '/pre-curso': 'Pré-Curso',
  '/graduacao': 'Graduação',
  '/diario': 'Diário de Estudos',
  '/foco': 'Modo Foco',
  '/mapa': 'Mapa de Progresso',
}

export default function TopBar({ onLogout }: TopBarProps) {
  const { pathname } = useLocation()
  const title = ROUTE_TITLES[pathname] ?? 'GeoStudy'
  const streak = useStudyStore((s) => s.getCurrentStreak())

  return (
    <header
      className="topbar flex items-center justify-between px-6 sticky top-0 z-30"
      style={{ height: 56 }}
    >
      <h1 className="text-base font-bold uppercase tracking-widest" style={{ color: '#1A1A1A' }}>
        {title}
      </h1>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {/* Streak badge — preto com texto branco */}
        <div
          className="flex items-center gap-2 px-3 py-1.5"
          style={{
            background: '#1A1A1A',
            border: '2px solid #1A1A1A',
            color: '#FFFFFF',
            fontSize: 13,
            fontWeight: 700,
          }}
        >
          <span>🔥</span>
          <span>{streak > 0 ? `${streak} ${streak === 1 ? 'dia' : 'dias'}` : 'Comece hoje!'}</span>
        </div>

        {/* Logout — discreto */}
        {onLogout && (
          <button
            onClick={onLogout}
            title="Sair"
            style={{
              background: 'none',
              border: '2px solid #1A1A1A',
              padding: '6px 8px',
              cursor: 'pointer',
              color: '#5C5C5C',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <LogOut size={16} />
          </button>
        )}
      </div>
    </header>
  )
}