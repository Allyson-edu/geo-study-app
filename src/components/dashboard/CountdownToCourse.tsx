import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const COURSE_START = new Date('2026-08-03T08:00:00')

function getTimeLeft() {
  const now = new Date()
  const diff = COURSE_START.getTime() - now.getTime()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)
  return { days, hours, minutes, seconds }
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <motion.span
        key={value}
        initial={{ opacity: 0.5, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-3xl md:text-4xl font-bold text-white tabular-nums"
      >
        {value.toString().padStart(2, '0')}
      </motion.span>
      <span className="text-xs text-white/60 uppercase tracking-wider mt-1">{label}</span>
    </div>
  )
}

export default function CountdownToCourse() {
  const [time, setTime] = useState(getTimeLeft())

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="rounded-2xl overflow-hidden relative"
      style={{
        background: 'linear-gradient(135deg, #0A84FF22, #BF5AF222)',
        border: '1px solid rgba(10, 132, 255, 0.3)',
      }}
    >
      {/* Fundo decorativo */}
      <div className="absolute inset-0 opacity-5"
        style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #0A84FF, transparent 60%), radial-gradient(circle at 80% 50%, #BF5AF2, transparent 60%)' }}
      />

      <div className="relative p-6">
        <p className="text-sm font-semibold text-bigsur-blue mb-1">⚔️ A Grande Jornada Começa Em</p>
        <p className="text-xs text-[var(--text-tertiary)] mb-4">Geologia — UFPE · 03/08/2026</p>

        <div className="flex items-center gap-4 md:gap-8">
          <TimeUnit value={time.days} label="dias" />
          <span className="text-2xl text-white/30 font-light mb-2">:</span>
          <TimeUnit value={time.hours} label="horas" />
          <span className="text-2xl text-white/30 font-light mb-2">:</span>
          <TimeUnit value={time.minutes} label="min" />
          <span className="text-2xl text-white/30 font-light mb-2">:</span>
          <TimeUnit value={time.seconds} label="seg" />
        </div>
      </div>
    </motion.div>
  )
}
