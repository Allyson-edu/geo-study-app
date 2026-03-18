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

/* Elementos decorativos Bauhaus — geometria pura nos cantos */
function BauhausBackground() {
  return (
    <div aria-hidden="true" style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
      {/* Faixa vermelha — borda superior direita */}
      <div style={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: 200,
        height: 8,
        background: '#D62B2B',
      }} />
      {/* Faixa azul vertical — borda direita */}
      <div style={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: 8,
        height: 180,
        background: '#1A4DAB',
      }} />
      {/* Quadrado amarelo — canto inferior direito (geométrico, não círculo) */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 80,
        height: 80,
        background: '#F5C400',
        opacity: 0.25,
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
      <BauhausBackground />
      <Sidebar />
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
      <PomodoroWidget />
    </div>
  )
}