import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface XPBarProps {
  level: number
  totalXP: number
  progressPercent: number
  xpToNextLevel: number
}

export default function XPBar({ level, totalXP, progressPercent, xpToNextLevel }: XPBarProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })

  const xpForCurrentLevel = (level - 1) * 500
  const currentLevelXP = totalXP - xpForCurrentLevel
  const xpNeeded = xpToNextLevel - xpForCurrentLevel
  const isAlmostFull = progressPercent >= 80

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="glass rounded-2xl p-5"
      style={
        isAlmostFull
          ? { boxShadow: '0 0 20px rgba(10, 132, 255, 0.25), var(--shadow-card)' }
          : {}
      }
    >
      <div className="flex items-baseline justify-between mb-3">
        <span className="text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>
          ⚡ Experiência
        </span>
        <span className="text-xs font-medium" style={{ color: 'var(--text-tertiary)' }}>
          {currentLevelXP} / {xpNeeded} XP
        </span>
      </div>

      {/* Barra de progresso grossa com shimmer */}
      <div
        className="relative h-3 rounded-full overflow-hidden mb-2 xp-shimmer"
        style={{ background: 'var(--bg-tertiary)' }}
      >
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{
            background: 'linear-gradient(90deg, #0A84FF, #BF5AF2)',
          }}
          initial={{ width: 0 }}
          animate={{ width: inView ? `${Math.max(progressPercent, 0)}%` : 0 }}
          transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
        />
      </div>

      <div className="flex items-center justify-between">
        <span
          className="text-xs font-semibold"
          style={{ color: 'var(--accent-blue)' }}
        >
          Nível {level}
        </span>
        <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
          Nível {level + 1}
        </span>
      </div>
    </motion.div>
  )
}
