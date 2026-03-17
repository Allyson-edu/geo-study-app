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
      className="rounded-2xl p-5"
      style={{
        background: isActive ? 'rgba(255,159,10,0.08)' : 'var(--bg-card)',
        border: isActive ? '1px solid rgba(255,159,10,0.3)' : '1px solid var(--border-color)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      }}
    >
      <div className="flex items-center gap-3">
        <div
          className="p-3 rounded-xl"
          style={{
            background: isActive ? 'rgba(255,159,10,0.15)' : 'var(--bg-tertiary)',
          }}
        >
          <Flame
            size={24}
            className={isActive ? 'fire-icon' : ''}
            style={{ color: isActive ? '#FF9F0A' : 'var(--text-tertiary)' }}
          />
        </div>
        <div>
          <p
            className="text-2xl font-bold"
            style={{ color: isActive ? '#FF9F0A' : 'var(--text-primary)' }}
          >
            {currentStreak} {currentStreak === 1 ? 'dia' : 'dias'}
          </p>
          <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
            seguidos de estudo
          </p>
        </div>
      </div>

      {longestStreak > 0 && (
        <p className="text-xs mt-3" style={{ color: 'var(--text-tertiary)' }}>
          🏆 Recorde: {longestStreak} {longestStreak === 1 ? 'dia' : 'dias'}
        </p>
      )}
    </motion.div>
  )
}
