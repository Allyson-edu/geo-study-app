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

export default function App() {
  const location = useLocation()
  const isFocusMode = location.pathname === '/foco'

  // FocusMode: tela cheia sem sidebar/topbar
  if (isFocusMode) {
    return <FocusMode />
  }

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: 'var(--bg-primary)' }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Conteúdo principal */}
      <div className="flex flex-col flex-1 overflow-hidden">
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
