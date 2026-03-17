import { motion } from 'framer-motion'
import { Flame } from 'lucide-react'

interface StreakCounterProps {
  currentStreak: number
  longestStreak: number
}

export default function StreakCounter({ currentStreak, longestStreak }: StreakCounterProps) {
  const isActive = currentStreak > 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.15 }}
      className="glass rounded-2xl p-5"
    >
      <div className="flex items-center gap-3">
        <div className={`p-3 rounded-xl ${isActive ? 'bg-orange-500/20' : 'bg-[var(--bg-tertiary)]'}`}>
          <Flame
            size={24}
            className={isActive ? 'text-orange-500 pulse-fire' : 'text-[var(--text-tertiary)]'}
          />
        </div>
        <div>
          <p className="text-2xl font-bold text-[var(--text-primary)]">
            {currentStreak} {currentStreak === 1 ? 'dia' : 'dias'}
          </p>
          <p className="text-xs text-[var(--text-secondary)]">seguidos de estudo</p>
        </div>
      </div>

      {longestStreak > 0 && (
        <p className="text-xs text-[var(--text-tertiary)] mt-3">
          🏆 Recorde: {longestStreak} {longestStreak === 1 ? 'dia' : 'dias'}
        </p>
      )}
    </motion.div>
  )
}
