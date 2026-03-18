import { motion } from 'framer-motion'
import { BookOpen, GraduationCap } from 'lucide-react'
import { getGreeting } from '@/lib/utils'
import ProgressCard from '@/components/dashboard/ProgressCard'
import EventCalendar from '@/components/calendar/EventCalendar'
import DailyTrail from '@/components/dashboard/DailyTrail'
import { useStudyStore } from '@/store/studyStore'
import { useActiveModuleStore } from '@/store/activeModuleStore'
import { disciplines } from '@/data/disciplinesData'

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
}

export default function Dashboard() {
  const greeting = getGreeting()
  const getDisciplineProgress = useStudyStore((s) => s.getDisciplineProgress)
  const { activeModule, setActiveModule } = useActiveModuleStore()

  const preDisciplines = disciplines.filter((d) => d.semester === 'pre')
  const totalLessons = preDisciplines.reduce((acc, d) => acc + d.lessons.length, 0)
  const completedLessons = preDisciplines.reduce((acc, d) => {
    const pct = getDisciplineProgress(d.id)
    return acc + Math.round((pct / 100) * d.lessons.length)
  }, 0)
  const overallPct = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0

  const gradDisciplines = disciplines.filter((d) => d.semester === 'graduation')
  const gradTotal = gradDisciplines.reduce((acc, d) => acc + d.lessons.length, 0)
  const gradCompleted = gradDisciplines.reduce((acc, d) => {
    const pct = getDisciplineProgress(d.id)
    return acc + Math.round((pct / 100) * d.lessons.length)
  }, 0)
  const gradPct = gradTotal > 0 ? Math.round((gradCompleted / gradTotal) * 100) : 0

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="p-6 max-w-5xl mx-auto space-y-6"
    >
      {/* Saudação — apenas ela, sem subtítulo */}
      <motion.div variants={item}>
        <h2
          className="font-bold"
          style={{ fontSize: 40, color: '#1A1A1A', lineHeight: 1.1 }}
        >
          {greeting}
        </h2>

        {/* Seletor de módulo ativo */}
        <div style={{ display: 'flex', gap: 0, marginTop: 16 }}>
          <button
            onClick={() => setActiveModule('pre')}
            style={{
              padding: '8px 20px',
              background: activeModule === 'pre' ? '#1A1A1A' : '#FFFFFF',
              color: activeModule === 'pre' ? '#FFFFFF' : '#1A1A1A',
              border: '2px solid #1A1A1A',
              borderRadius: 0,
              fontSize: 13,
              fontWeight: 700,
              cursor: 'pointer',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
            }}
          >
            Pré-Curso
          </button>
          <button
            onClick={() => setActiveModule('graduation')}
            style={{
              padding: '8px 20px',
              background: activeModule === 'graduation' ? '#1A1A1A' : '#FFFFFF',
              color: activeModule === 'graduation' ? '#FFFFFF' : '#1A1A1A',
              border: '2px solid #1A1A1A',
              borderLeft: 'none',
              borderRadius: 0,
              fontSize: 13,
              fontWeight: 700,
              cursor: 'pointer',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
            }}
          >
            Graduação
          </button>
        </div>
      </motion.div>

      {/* DailyTrail — recomendação do dia */}
      <motion.div variants={item}>
        <DailyTrail />
      </motion.div>

      {/* ProgressCard — destaque central */}
      <motion.div variants={item}>
        {activeModule === 'pre' ? (
          <ProgressCard
            label="Pré-Curso — Geologia UFPE"
            completed={completedLessons}
            total={totalLessons}
            percent={overallPct}
          />
        ) : (
          <ProgressCard
            label="Graduação — UFPE Geologia · 1º Semestre"
            completed={gradCompleted}
            total={gradTotal}
            percent={gradPct}
          />
        )}
      </motion.div>

      {/* Cards de acesso rápido */}
      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Pré-Curso — borda esquerda azul */}
        <a href="/pre-curso" className="card-btn p-5 block" style={{ borderLeft: '4px solid #1A4DAB' }}>
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-10 h-10 flex items-center justify-center shrink-0"
              style={{ background: '#1A4DAB', border: '2px solid #1A1A1A' }}
            >
              <BookOpen size={18} style={{ color: '#FFFFFF' }} />
            </div>
            <div>
              <h3 className="font-bold text-sm" style={{ color: '#1A1A1A' }}>Pré-Curso</h3>
              <p className="text-xs" style={{ color: '#5C5C5C' }}>
                {preDisciplines.length} disciplinas · {overallPct}% concluído
              </p>
            </div>
          </div>
          <div style={{ height: 10, background: '#EBEBEB', border: '1px solid #D0CCC4' }}>
            <div style={{ height: '100%', background: '#1A4DAB', width: `${Math.max(overallPct, overallPct > 0 ? 2 : 0)}%`, transition: 'width 0.5s ease' }} />
          </div>
        </a>

        {/* Graduação — borda esquerda amarela */}
        <a href="/graduacao" className="card-btn p-5 block" style={{ borderLeft: '4px solid #F5C400' }}>
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-10 h-10 flex items-center justify-center shrink-0"
              style={{ background: '#F5C400', border: '2px solid #1A1A1A' }}
            >
              <GraduationCap size={18} style={{ color: '#1A1A1A' }} />
            </div>
            <div>
              <h3 className="font-bold text-sm" style={{ color: '#1A1A1A' }}>Graduação</h3>
              <p className="text-xs" style={{ color: '#5C5C5C' }}>
                UFPE Geologia · 1º Sem · {gradPct}% concluído
              </p>
            </div>
          </div>
          <div style={{ height: 10, background: '#EBEBEB', border: '1px solid #D0CCC4' }}>
            <div style={{ height: '100%', background: '#F5C400', width: `${Math.max(gradPct, gradPct > 0 ? 2 : 0)}%`, transition: 'width 0.5s ease' }} />
          </div>
        </a>
      </motion.div>

      {/* Calendário de Eventos */}
      <motion.div variants={item}>
        <EventCalendar />
      </motion.div>
    </motion.div>
  )
}