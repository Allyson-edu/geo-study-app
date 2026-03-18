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

/* Elementos decorativos Bauhaus — retângulos e círculo sólidos nos cantos */
function BauhausBackground() {
  return (
    <div aria-hidden="true" style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
      {/* Retângulo vermelho — canto superior direito */}
      <div style={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: 180,
        height: 12,
        background: '#D62B2B',
      }} />
      {/* Retângulo azul — canto superior direito vertical */}
      <div style={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: 12,
        height: 160,
        background: '#1A4DAB',
      }} />
      {/* Círculo amarelo — canto inferior esquerdo */}
      <div style={{
        position: 'absolute',
        bottom: -60,
        left: -60,
        width: 200,
        height: 200,
        borderRadius: '50%',
        background: '#F5C400',
        opacity: 0.35,
      }} />
      {/* Retângulo preto fino — divisor inferior */}
      <div style={{
        position: 'absolute',
        bottom: 80,
        left: 0,
        width: '30%',
        height: 3,
        background: '#1A1A1A',
        opacity: 0.08,
      }} />
    </div>
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
