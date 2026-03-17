import { motion } from 'framer-motion'
import { getAvatarTitle } from '@/lib/utils'

interface AvatarCardProps {
  level: number
  xp: number
}

function getAvatarEmoji(level: number) {
  if (level <= 3) return '👦'
  if (level <= 6) return '🧑‍🎓'
  if (level <= 9) return '🧑‍🔬'
  return '🏆'
}

function getAuraColor(level: number) {
  if (level <= 3) return 'from-bigsur-blue/30 to-bigsur-blue/10'
  if (level <= 6) return 'from-bigsur-purple/30 to-bigsur-purple/10'
  if (level <= 9) return 'from-bigsur-orange/30 to-bigsur-orange/10'
  return 'from-yellow-400/30 to-yellow-400/10'
}

function getGlowColor(level: number) {
  if (level <= 3) return '#0A84FF'
  if (level <= 6) return '#BF5AF2'
  if (level <= 9) return '#FF9F0A'
  return '#FFD60A'
}

export default function AvatarCard({ level, xp }: AvatarCardProps) {
  const title = getAvatarTitle(level)
  const emoji = getAvatarEmoji(level)
  const aura = getAuraColor(level)
  const glow = getGlowColor(level)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="glass rounded-2xl p-6 flex flex-col items-center gap-3"
    >
      {/* Avatar com aura */}
      <motion.div
        className={`relative w-24 h-24 rounded-full flex items-center justify-center bg-gradient-to-br ${aura}`}
        style={{ boxShadow: `0 0 32px ${glow}40` }}
        animate={{ boxShadow: [`0 0 24px ${glow}30`, `0 0 40px ${glow}50`, `0 0 24px ${glow}30`] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="text-5xl pixel-art">{emoji}</span>
      </motion.div>

      {/* Título */}
      <div className="text-center">
        <p className="font-bold text-[var(--text-primary)] text-lg">Allyson</p>
        <p className="text-sm text-[var(--text-secondary)]">{title}</p>
      </div>

      {/* Level badge */}
      <div
        className="px-4 py-1.5 rounded-full text-sm font-bold text-white"
        style={{ background: glow }}
      >
        Nível {level}
      </div>

      {/* XP total */}
      <p className="text-xs text-[var(--text-tertiary)]">{xp} XP acumulados</p>
    </motion.div>
  )
}
