import { motion } from 'framer-motion'
import { BookOpen, GraduationCap } from 'lucide-react'
import { getGreeting } from '@/lib/utils'
import ProgressCard from '@/components/dashboard/ProgressCard'
import EventCalendar from '@/components/calendar/EventCalendar'

const PRE_COURSE = {
  percent: 0,
  completed: 0,
  total: 6,
}

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

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="p-6 max-w-5xl mx-auto space-y-6"
    >
      {/* Saudação */}
      <motion.div variants={item}>
        <h2
          className="text-3xl font-bold"
          style={{ color: '#1A1A1A' }}
        >
          {greeting}, Allyson
        </h2>
        <p className="text-sm mt-1 font-medium" style={{ color: '#5C5C5C' }}>
          Acompanhe seu progresso no Pré-Curso de Geologia.
        </p>
      </motion.div>

      {/* ProgressCard — destaque central */}
      <motion.div variants={item}>
        <ProgressCard
          label="Pré-Curso — Geologia UFPE"
          completed={PRE_COURSE.completed}
          total={PRE_COURSE.total}
          percent={PRE_COURSE.percent}
        />
      </motion.div>

      {/* Cards de acesso rápido */}
      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Pré-Curso */}
        <a href="/pre-curso" className="card-btn variant-jade p-5 block">
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-9 h-9 flex items-center justify-center shrink-0"
              style={{ background: '#1A4DAB', border: '1px solid #1A1A1A' }}
            >
              <BookOpen size={18} style={{ color: '#FFFFFF' }} />
            </div>
            <div>
              <h3 className="font-bold text-sm" style={{ color: '#1A1A1A' }}>Pré-Curso</h3>
              <p className="text-xs" style={{ color: '#5C5C5C' }}>
                {PRE_COURSE.total} disciplinas · {PRE_COURSE.percent}% concluído
              </p>
            </div>
          </div>
          <div className="progress-track">
            <div className="progress-fill jade" style={{ width: `${PRE_COURSE.percent}%` }} />
          </div>
        </a>

        {/* Graduação */}
        <a href="/graduacao" className="card-btn variant-purple p-5 block opacity-75">
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-9 h-9 flex items-center justify-center shrink-0"
              style={{ background: '#EBEBEB', border: '1px solid #1A1A1A' }}
            >
              <GraduationCap size={18} style={{ color: '#5C5C5C' }} />
            </div>
            <div>
              <h3 className="font-bold text-sm" style={{ color: '#1A1A1A' }}>Graduação</h3>
              <p className="text-xs" style={{ color: '#5C5C5C' }}>UFPE Geologia · Em breve</p>
            </div>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: '0%' }} />
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
