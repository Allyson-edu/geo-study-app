import { motion } from 'framer-motion'
import { getGreeting } from '@/lib/utils'
import AvatarCard from '@/components/dashboard/AvatarCard'
import XPBar from '@/components/dashboard/XPBar'
import StreakCounter from '@/components/dashboard/StreakCounter'
import CountdownToCourse from '@/components/dashboard/CountdownToCourse'

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
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
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
        <h2 className="text-2xl font-bold text-[var(--text-primary)]">
          {greeting}, Allyson! 👋
        </h2>
        <p className="text-[var(--text-secondary)] text-sm mt-1">
          Pronto para mais um dia de conquistas?
        </p>
      </motion.div>

      {/* Avatar + XP + Streak */}
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

      {/* Countdown */}
      <motion.div variants={item}>
        <CountdownToCourse />
      </motion.div>

      {/* Cards de acesso rápido */}
      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Pré-Curso */}
        <a href="/pre-curso" className="glass rounded-2xl p-5 hover:ring-2 hover:ring-bigsur-blue/40 transition-all block group">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl">📚</span>
            <div>
              <h3 className="font-bold text-[var(--text-primary)]">Pré-Curso</h3>
              <p className="text-xs text-[var(--text-secondary)]">6 disciplinas · 0% concluído</p>
            </div>
          </div>
          <div className="h-1.5 bg-[var(--bg-tertiary)] rounded-full overflow-hidden">
            <div className="h-full w-0 bg-bigsur-blue rounded-full" />
          </div>
        </a>

        {/* Graduação */}
        <a href="/graduacao" className="glass rounded-2xl p-5 hover:ring-2 hover:ring-bigsur-purple/40 transition-all block group opacity-70">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl">🏛️</span>
            <div>
              <h3 className="font-bold text-[var(--text-primary)]">Graduação</h3>
              <p className="text-xs text-[var(--text-secondary)]">UFPE Geologia · Em breve</p>
            </div>
          </div>
          <div className="h-1.5 bg-[var(--bg-tertiary)] rounded-full overflow-hidden">
            <div className="h-full w-0 bg-bigsur-purple rounded-full" />
          </div>
        </a>
      </motion.div>
    </motion.div>
  )
}
