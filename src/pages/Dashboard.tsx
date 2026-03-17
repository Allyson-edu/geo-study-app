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
      {/* Saudação com gradiente */}
      <motion.div variants={item}>
        <h2
          className="text-2xl font-bold"
          style={{
            background: 'var(--gradient-primary)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {greeting}, Allyson! 👋
        </h2>
        <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
          Pronto para mais um dia de conquistas?
        </p>
      </motion.div>

      {/* Grid principal: Avatar + XP/Streak */}
      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <AvatarCard level={DEMO.level} xp={DEMO.totalXP} />
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
        <a
          href="/pre-curso"
          className="rounded-2xl p-5 block transition-all"
          style={{
            background: 'var(--bg-card)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1.5px solid rgba(10,132,255,0.25)',
            boxShadow: 'var(--shadow-card)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = 'var(--shadow-glow-blue), var(--shadow-card)'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = 'var(--shadow-card)'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
              style={{ background: 'rgba(10,132,255,0.15)' }}
            >
              📚
            </div>
            <div>
              <h3 className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>Pré-Curso</h3>
              <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>6 disciplinas · 0% concluído</p>
            </div>
          </div>
          <div
            className="h-1.5 rounded-full overflow-hidden"
            style={{ background: 'var(--bg-tertiary)' }}
          >
            <div className="h-full w-0 rounded-full" style={{ background: '#0A84FF' }} />
          </div>
        </a>

        {/* Graduação */}
        <a
          href="/graduacao"
          className="rounded-2xl p-5 block opacity-70 transition-all"
          style={{
            background: 'var(--bg-card)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1.5px solid rgba(191,90,242,0.2)',
            boxShadow: 'var(--shadow-card)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = 'var(--shadow-glow-purple), var(--shadow-card)'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = 'var(--shadow-card)'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
              style={{ background: 'rgba(191,90,242,0.15)' }}
            >
              🏛️
            </div>
            <div>
              <h3 className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>Graduação</h3>
              <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>UFPE Geologia · Em breve</p>
            </div>
          </div>
          <div
            className="h-1.5 rounded-full overflow-hidden"
            style={{ background: 'var(--bg-tertiary)' }}
          >
            <div className="h-full w-0 rounded-full" style={{ background: '#BF5AF2' }} />
          </div>
        </a>
      </motion.div>
    </motion.div>
  )
}
