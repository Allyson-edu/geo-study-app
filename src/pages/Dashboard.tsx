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
      {/* Saudação — apenas ela, sem subtítulo */}
      <motion.div variants={item}>
        <h2
          className="font-bold"
          style={{ fontSize: 40, color: '#1A1A1A', lineHeight: 1.1 }}
        >
          {greeting}, Allyson
        </h2>
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
                {PRE_COURSE.total} disciplinas · {PRE_COURSE.percent}% concluído
              </p>
            </div>
          </div>
          <div style={{ height: 10, background: '#EBEBEB', border: '1px solid #D0CCC4' }}>
            <div style={{ height: '100%', background: '#1A4DAB', width: `${Math.max(PRE_COURSE.percent, 2)}%` }} />
          </div>
        </a>

        {/* Graduação — borda esquerda amarela */}
        <a href="/graduacao" className="card-btn p-5 block" style={{ borderLeft: '4px solid #F5C400', opacity: 0.75 }}>
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-10 h-10 flex items-center justify-center shrink-0"
              style={{ background: '#F5C400', border: '2px solid #1A1A1A' }}
            >
              <GraduationCap size={18} style={{ color: '#1A1A1A' }} />
            </div>
            <div>
              <h3 className="font-bold text-sm" style={{ color: '#1A1A1A' }}>Graduação</h3>
              <p className="text-xs" style={{ color: '#5C5C5C' }}>UFPE Geologia · Em breve</p>
            </div>
          </div>
          <div style={{ height: 10, background: '#EBEBEB', border: '1px solid #D0CCC4' }}>
            <div style={{ height: '100%', background: '#F5C400', width: '2%' }} />
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