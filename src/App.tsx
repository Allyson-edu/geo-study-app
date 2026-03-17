import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Sidebar from '@/components/layout/Sidebar'
import TopBar from '@/components/layout/TopBar'
import PomodoroWidget from '@/components/pomodoro/PomodoroWidget'
import Dashboard from '@/pages/Dashboard'
import PreCourse from '@/pages/PreCourse'
import Graduation from '@/pages/Graduation'
import DisciplineDetail from '@/pages/DisciplineDetail'

export default function App() {
  const location = useLocation()

  return (
    <div className="flex h-screen overflow-hidden bg-[var(--bg-primary)]">
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
            </Routes>
          </AnimatePresence>
        </main>
      </div>

      {/* Widget Pomodoro sempre presente */}
      <PomodoroWidget />
    </div>
  )
}
