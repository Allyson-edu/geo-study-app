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
      className="w-full p-6"
      style={{
        background: '#FFFFFF',
        border: '2px solid #1A1A1A',
        boxShadow: '4px 4px 0 #1A1A1A',
      }}
    >
      {/* Faixa de cor superior — acento azul Bauhaus */}
      <div style={{ height: 4, background: '#1A4DAB', marginBottom: 16, marginLeft: -24, marginRight: -24, marginTop: -24, width: 'calc(100% + 48px)' }} />

      {/* Label acima */}
      <p
        className="text-xs font-bold uppercase tracking-widest mb-2"
        style={{ color: '#5C5C5C' }}
      >
        {label}
      </p>

      {/* Porcentagem grande */}
      <div className="flex items-end gap-4 mb-4">
        <span
          className="font-bold leading-none"
          style={{ fontSize: 56, color: '#1A1A1A' }}
        >
          {percent}%
        </span>
        <span className="text-sm pb-2 font-semibold uppercase tracking-wider" style={{ color: '#5C5C5C' }}>
          concluído
        </span>
      </div>

      {/* Barra de progresso flat — sem shimmer, sem arredondamento */}
      <div
        className="mb-3"
        style={{ height: 8, background: '#EBEBEB', border: '1px solid #D0CCC4' }}
      >
        <motion.div
          style={{
            height: '100%',
            background: '#1A4DAB',
            minWidth: 4,
          }}
          initial={{ width: 0 }}
          animate={{ width: inView ? `${Math.max(percent, 2)}%` : 0 }}
          transition={{ duration: 1.2, ease: [0.34, 1.56, 0.64, 1], delay: 0.2 }}
        />
      </div>

      {/* Contagem de disciplinas */}
      <p className="text-xs font-medium" style={{ color: '#9A9A9A' }}>
        {completed} de {total} disciplinas concluídas
      </p>
    </motion.div>
  )
}
