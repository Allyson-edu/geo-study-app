import { useLocation } from 'react-router-dom'

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
      <h1 className="text-base font-bold uppercase tracking-widest" style={{ color: '#1A1A1A' }}>
        {title}
      </h1>

      {/* Streak badge — preto com texto branco, sem "GEO" desnecessário */}
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
        <span>0 dias</span>
      </div>
    </header>
  )
}