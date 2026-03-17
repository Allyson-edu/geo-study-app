import { motion } from 'framer-motion'
import { getGreeting } from '@/lib/utils'
import AvatarCard from '@/components/dashboard/AvatarCard'
import XPBar from '@/components/dashboard/XPBar'
import StreakCounter from '@/components/dashboard/StreakCounter'
import EventCalendar from '@/components/calendar/EventCalendar'

const DEMO = {
  level: 1,
  totalXP: 0,
  progressPercent: 0,
  xpToNextLevel: 500,
  currentStreak: 0,
  longestStreak: 0,
}

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
      style={{ background: 'var(--bg-primary)' }}
    >
      {/* Saudação com gradiente */}
      <motion.div variants={item}>
        <h2 className="text-2xl font-bold text-grad">
          {greeting}, Allyson! 👋
        </h2>
        <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
          Pronto para mais um dia de conquistas?
        </p>
      </motion.div>

      {/* Grid principal: Avatar + XP/Streak */}
      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <AvatarCard
          level={DEMO.level}
          xp={DEMO.totalXP}
          preCoursePercent={PRE_COURSE.percent}
          preCourseCompleted={PRE_COURSE.completed}
          preCourseTotal={PRE_COURSE.total}
        />
        <div className="md:col-span-2 flex flex-col gap-4">
          <XPBar
            level={DEMO.level}
            totalXP={DEMO.totalXP}
            progressPercent={DEMO.progressPercent}
            xpToNextLevel={DEMO.xpToNextLevel}
          />
          <StreakCounter
            currentStreak={DEMO.currentStreak}
            longestStreak={DEMO.longestStreak}
          />
        </div>
      </motion.div>

      {/* Calendário de Eventos (largura total) */}
      <motion.div variants={item}>
        <EventCalendar />
      </motion.div>

      {/* Cards de acesso rápido */}
      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Pré-Curso */}
        <a href="/pre-curso" className="card-btn variant-jade rounded-2xl p-5 block">
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
              style={{ background: 'rgba(46,204,113,0.18)' }}
            >
              📚
            </div>
            <div>
              <h3 className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>Pré-Curso</h3>
              <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                {PRE_COURSE.total} disciplinas · {PRE_COURSE.percent}% concluído
              </p>
            </div>
          </div>
          <div className="progress-track">
            <div className="progress-fill jade" style={{ width: `${PRE_COURSE.percent}%` }} />
          </div>
        </a>

        {/* Graduação */}
        <a href="/graduacao" className="card-btn variant-purple rounded-2xl p-5 block opacity-75">
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
              style={{ background: 'rgba(155,89,182,0.18)' }}
            >
              🏛️
            </div>
            <div>
              <h3 className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>Graduação</h3>
              <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>UFPE Geologia · Em breve</p>
            </div>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: '0%' }} />
          </div>
        </a>
      </motion.div>
    </motion.div>
  )
}
