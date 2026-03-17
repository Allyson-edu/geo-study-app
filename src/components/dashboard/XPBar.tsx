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

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="glass rounded-2xl p-5"
    >
      <div className="flex items-baseline justify-between mb-3">
        <span className="text-sm font-semibold text-[var(--text-secondary)]">Experiência</span>
        <span className="text-xs text-[var(--text-tertiary)]">
          {currentLevelXP} / {xpToNextLevel - xpForCurrentLevel} XP
        </span>
      </div>

      {/* Barra de progresso */}
      <div className="relative h-3 bg-[var(--bg-tertiary)] rounded-full overflow-hidden mb-2">
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{
            background: 'linear-gradient(90deg, #0A84FF, #BF5AF2)',
          }}
          initial={{ width: 0 }}
          animate={{ width: inView ? `${progressPercent}%` : 0 }}
          transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
        >
          {/* Shimmer */}
          <div className="absolute inset-0 shimmer rounded-full" />
        </motion.div>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-xs text-[var(--text-tertiary)]">Nível {level}</span>
        <span className="text-xs text-[var(--text-tertiary)]">Nível {level + 1}</span>
      </div>
    </motion.div>
  )
}
