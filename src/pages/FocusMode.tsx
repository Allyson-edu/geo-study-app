import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Play, Pause, RotateCcw } from 'lucide-react'
import { usePomodoroStore } from '@/store/pomodoroStore'

const FOCUS_MESSAGES = [
  'Cada minuto conta. Você está crescendo.',
  'Foco total. Seu futuro geólogo agradece.',
  'Sem distrações — só você e o conhecimento.',
  'Pedra por pedra, o castelo se ergue.',
  'Consistência vence o talento que não trabalha.',
  'Você está construindo algo grande hoje.',
  'A geologia é a ciência da paciência. Assim como o estudo.',
  'Mais um passo rumo a agosto de 2026! 🎓',
]

// Partícula flutuante
function Particle({ style }: { style: React.CSSProperties }) {
  return (
    <div
      className="absolute rounded-full"
      style={{
        width: 4,
        height: 4,
        background: 'rgba(255,255,255,0.2)',
        animation: `float-particle ${3 + Math.random() * 4}s ease-in-out infinite`,
        animationDelay: `${Math.random() * 3}s`,
        ...style,
      }}
    />
  )
}

export default function FocusMode() {
  const navigate = useNavigate()
  const { timeLeft, isRunning, isBreak, focusMinutes, start, pause, reset, tick } = usePomodoroStore()

  const [topic, setTopic] = useState('Estudando...')
  const [editingTopic, setEditingTopic] = useState(false)
  const [msgIndex, setMsgIndex] = useState(Math.floor(Math.random() * FOCUS_MESSAGES.length))
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const topicRef = useRef<HTMLInputElement>(null)

  // Timer tick
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(tick, 1000)
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isRunning, tick])

  // Muda mensagem a cada sessão
  useEffect(() => {
    setMsgIndex(Math.floor(Math.random() * FOCUS_MESSAGES.length))
  }, [isBreak])

  // Esc fecha o modo foco
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') navigate('/')
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [navigate])

  // Foco no input ao editar
  useEffect(() => {
    if (editingTopic && topicRef.current) topicRef.current.focus()
  }, [editingTopic])

  const totalSeconds = focusMinutes * 60
  const progress = (totalSeconds - timeLeft) / totalSeconds
  const radius = 100
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference * (1 - progress)

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60
  const timeStr = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`

  // Partículas fixas para não re-renderizar
  const particles = useRef(
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
    }))
  )

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden select-none"
        style={{
          background: 'radial-gradient(ellipse at center, #16073A 0%, #0A0A0F 70%)',
        }}
      >
        {/* Partículas de fundo */}
        {particles.current.map((p) => (
          <Particle key={p.id} style={{ top: p.top, left: p.left }} />
        ))}

        {/* Gradiente roxo sutil no centro */}
        <div
          className="absolute pointer-events-none"
          style={{
            width: 500,
            height: 500,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(191,90,242,0.12) 0%, transparent 70%)',
          }}
        />

        {/* Botão fechar */}
        <button
          onClick={() => navigate('/')}
          className="absolute top-5 right-5 p-2.5 rounded-xl transition-colors z-10"
          style={{
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.12)',
            color: 'rgba(255,255,255,0.5)',
          }}
          title="Fechar (Esc)"
        >
          <X size={18} />
        </button>

        {/* Tópico */}
        <div className="mb-10 z-10">
          {editingTopic ? (
            <input
              ref={topicRef}
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              onBlur={() => setEditingTopic(false)}
              onKeyDown={(e) => e.key === 'Enter' && setEditingTopic(false)}
              className="text-center text-base bg-transparent outline-none border-b text-white"
              style={{ borderColor: 'rgba(191,90,242,0.5)', caretColor: '#BF5AF2' }}
            />
          ) : (
            <button
              onClick={() => setEditingTopic(true)}
              className="text-base font-medium transition-colors"
              style={{ color: 'rgba(255,255,255,0.7)' }}
            >
              {isBreak ? '☕ Pausa ativa' : topic}
            </button>
          )}
        </div>

        {/* Timer SVG circular */}
        <div className="relative flex items-center justify-center z-10 mb-10">
          <svg
            width={240}
            height={240}
            viewBox="0 0 240 240"
            style={{ transform: 'rotate(-90deg)' }}
          >
            {/* Círculo de fundo */}
            <circle
              cx={120}
              cy={120}
              r={radius}
              fill="none"
              stroke="rgba(255,255,255,0.07)"
              strokeWidth={8}
            />
            {/* Círculo de progresso */}
            <circle
              cx={120}
              cy={120}
              r={radius}
              fill="none"
              stroke="url(#timerGradient)"
              strokeWidth={8}
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              style={{ transition: 'stroke-dashoffset 0.5s ease' }}
            />
            <defs>
              <linearGradient id="timerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0A84FF" />
                <stop offset="100%" stopColor="#BF5AF2" />
              </linearGradient>
            </defs>
          </svg>

          {/* Tempo central */}
          <div className="absolute flex flex-col items-center">
            <span
              className="font-mono font-bold text-white"
              style={{ fontSize: 52, letterSpacing: '-2px', lineHeight: 1 }}
            >
              {timeStr}
            </span>
            <span
              className="text-xs uppercase tracking-widest mt-1"
              style={{ color: isBreak ? '#FF9F0A' : 'rgba(255,255,255,0.4)' }}
            >
              {isBreak ? 'PAUSA' : 'FOCO'}
            </span>
          </div>
        </div>

        {/* Controles */}
        <div className="flex items-center gap-4 z-10 mb-10">
          <motion.button
            onClick={() => (isRunning ? pause() : start())}
            className="w-16 h-16 rounded-full flex items-center justify-center text-white"
            style={{
              background: 'var(--gradient-primary)',
              boxShadow: 'var(--shadow-glow-blue)',
            }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
          >
            {isRunning ? <Pause size={26} /> : <Play size={26} />}
          </motion.button>

          <motion.button
            onClick={reset}
            className="w-11 h-11 rounded-full flex items-center justify-center"
            style={{
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.12)',
              color: 'rgba(255,255,255,0.5)',
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.92 }}
          >
            <RotateCcw size={18} />
          </motion.button>
        </div>

        {/* Mensagem motivacional */}
        <AnimatePresence mode="wait">
          <motion.p
            key={msgIndex}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.5 }}
            className="text-sm z-10 text-center px-8"
            style={{ color: 'rgba(255,255,255,0.35)' }}
          >
            {FOCUS_MESSAGES[msgIndex]}
          </motion.p>
        </AnimatePresence>

        <p
          className="absolute bottom-5 text-xs z-10"
          style={{ color: 'rgba(255,255,255,0.15)' }}
        >
          Pressione Esc para sair
        </p>
      </motion.div>
    </AnimatePresence>
  )
}
