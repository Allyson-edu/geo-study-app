import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface ProgressCardProps {
  label: string
  completed: number
  total: number
  percent: number
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
        borderLeft: '6px solid #1A4DAB',
      }}
    >
      {/* Label */}
      <p
        className="text-xs font-bold uppercase tracking-widest mb-3"
        style={{ color: '#9A9A9A' }}
      >
        {label}
      </p>

      {/* Porcentagem grande — tipografia Bauhaus agressiva */}
      <div className="flex items-end gap-4 mb-5">
        <span
          className="font-bold leading-none"
          style={{ fontSize: 72, color: '#1A1A1A' }}
        >
          {percent}%
        </span>
        <span
          className="pb-3 font-bold uppercase tracking-widest"
          style={{ fontSize: 11, color: '#5C5C5C' }}
        >
          concluído
        </span>
      </div>

      {/* Barra de progresso — mais alta, mais bold */}
      <div
        className="mb-3"
        style={{ height: 12, background: '#EBEBEB', border: '2px solid #1A1A1A' }}
      >
        <motion.div
          style={{
            height: '100%',
            background: '#1A4DAB',
          }}
          initial={{ width: 0 }}
          animate={{ width: inView ? `${Math.max(percent, 1.5)}%` : 0 }}
          transition={{ duration: 1.2, ease: [0.34, 1.56, 0.64, 1], delay: 0.2 }}
        />
      </div>

      {/* Contagem */}
      <p className="text-xs font-medium" style={{ color: '#9A9A9A' }}>
        {completed} de {total} disciplinas concluídas
      </p>
    </motion.div>
  )
}