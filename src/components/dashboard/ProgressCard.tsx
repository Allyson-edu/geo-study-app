import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface ProgressCardProps {
  label: string
  completed: number
  total: number
  percent: number
  accentColor?: string
}

export default function ProgressCard({
  label,
  completed,
  total,
  percent,
}: ProgressCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="w-full rounded-2xl p-6"
      style={{
        background: 'rgba(21, 25, 35, 0.7)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: `1px solid rgba(56, 191, 161, 0.15)`,
        boxShadow: '0 2px 20px rgba(0,0,0,0.4)',
      }}
    >
      {/* Label acima */}
      <p
        className="text-xs font-semibold uppercase tracking-widest mb-2"
        style={{ color: 'var(--text-secondary)' }}
      >
        {label}
      </p>

      {/* Porcentagem grande */}
      <div className="flex items-end gap-4 mb-4">
        <span
          className="text-5xl font-bold leading-none"
          style={{
            background: 'linear-gradient(135deg, #38BFA1 0%, #5B8DEF 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {percent}%
        </span>
        <span className="text-sm pb-1" style={{ color: 'var(--text-secondary)' }}>
          concluído
        </span>
      </div>

      {/* Barra de progresso animada */}
      <div className="progress-bar mb-3" style={{ height: 8 }}>
        <motion.div
          className="h-full rounded-full"
          style={{
            background: 'linear-gradient(135deg, #38BFA1 0%, #5B8DEF 100%)',
            minWidth: 4,
          }}
          initial={{ width: 0 }}
          animate={{ width: inView ? `${Math.max(percent, 2)}%` : 0 }}
          transition={{ duration: 1.2, ease: [0.34, 1.56, 0.64, 1], delay: 0.2 }}
        />
      </div>

      {/* Contagem de disciplinas */}
      <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
        {completed} de {total} disciplinas concluídas
      </p>
    </motion.div>
  )
}
