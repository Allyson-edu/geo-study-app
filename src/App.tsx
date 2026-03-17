import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Sidebar from '@/components/layout/Sidebar'
import TopBar from '@/components/layout/TopBar'
import PomodoroWidget from '@/components/pomodoro/PomodoroWidget'
import Dashboard from '@/pages/Dashboard'
import PreCourse from '@/pages/PreCourse'
import Graduation from '@/pages/Graduation'
import DisciplineDetail from '@/pages/DisciplineDetail'
import StudyDiary from '@/pages/StudyDiary'
import FocusMode from '@/pages/FocusMode'
import ProgressMap from '@/pages/ProgressMap'

/* Elementos decorativos Bauhaus — formas geométricas de fundo */
function BauhausBackground() {
  return (
    <svg
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'visible',
      }}
    >
      {/* Círculo grande vazado — canto superior direito */}
      <circle
        cx="92%"
        cy="-5%"
        r="220"
        fill="none"
        stroke="rgba(91,141,239,0.06)"
        strokeWidth="1.5"
      />
      <circle
        cx="92%"
        cy="-5%"
        r="340"
        fill="none"
        stroke="rgba(91,141,239,0.03)"
        strokeWidth="1"
      />
      {/* Linha diagonal sutil */}
      <line
        x1="0"
        y1="65%"
        x2="100%"
        y2="35%"
        stroke="rgba(56,191,161,0.04)"
        strokeWidth="1"
      />
      {/* Quadrado rotacionado 45° — canto inferior esquerdo */}
      <rect
        x="-80"
        y="75%"
        width="220"
        height="220"
        fill="none"
        stroke="rgba(139,111,212,0.06)"
        strokeWidth="1.5"
        transform="rotate(45, 30, 0)"
        style={{ transformOrigin: '30px 80%' }}
      />
      {/* Círculo pequeno médio — fundo central esquerdo */}
      <circle
        cx="8%"
        cy="55%"
        r="80"
        fill="none"
        stroke="rgba(232,150,61,0.05)"
        strokeWidth="1"
      />
    </svg>
  )
}

export default function App() {
  const location = useLocation()
  const isFocusMode = location.pathname === '/foco'

  if (isFocusMode) {
    return <FocusMode />
  }

  return (
    <div className="flex h-screen overflow-hidden" style={{ position: 'relative' }}>
      {/* Bauhaus background decorations */}
      <BauhausBackground />

      {/* Sidebar */}
      <Sidebar />

      {/* Conteúdo principal */}
      <div className="flex flex-col flex-1 overflow-hidden" style={{ position: 'relative', zIndex: 1 }}>
        <TopBar />

        <main className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/pre-curso" element={<PreCourse />} />
              <Route path="/graduacao" element={<Graduation />} />
              <Route path="/disciplina/:id" element={<DisciplineDetail />} />
              <Route path="/diario" element={<StudyDiary />} />
              <Route path="/mapa" element={<ProgressMap />} />
            </Routes>
          </AnimatePresence>
        </main>
      </div>

      {/* Widget Pomodoro sempre presente */}
      <PomodoroWidget />
    </div>
  )
}
