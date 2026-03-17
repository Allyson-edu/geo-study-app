import { motion } from 'framer-motion'
import { getAvatarTitle } from '@/lib/utils'
import { PixelAvatar } from './PixelAvatar'

interface AvatarCardProps {
  level: number
  xp: number
}

function getBorderColor(level: number): string {
  if (level <= 3) return '#0A84FF'
  if (level <= 6) return '#BF5AF2'
  if (level <= 9) return '#FF9F0A'
  return '#FFD60A'
}

export default function AvatarCard({ level, xp }: AvatarCardProps) {
  const title = getAvatarTitle(level)
  const borderColor = getBorderColor(level)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="glass rounded-2xl p-6 flex flex-col items-center gap-3"
      style={{
        border: `1.5px solid ${borderColor}55`,
        boxShadow: `0 0 32px ${borderColor}20`,
      }}
    >
      {/* Avatar pixel art */}
      <div className="w-32 h-32 flex items-center justify-center">
        <PixelAvatar level={level} />
      </div>

      {/* Título em gradiente */}
      <div className="text-center">
        <p
          className="font-bold text-lg"
          style={{
            background: 'var(--gradient-primary)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Allyson
        </p>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{title}</p>
      </div>

      {/* Badge de nível com glow */}
      <motion.div
        className="px-4 py-1.5 rounded-full text-sm font-bold text-white"
        style={{
          background: borderColor,
          boxShadow: `0 4px 16px ${borderColor}66`,
        }}
        whileHover={{ scale: 1.05 }}
      >
        Nível {level}
      </motion.div>

      {/* XP total */}
      <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{xp} XP acumulados</p>
    </motion.div>
  )
}
