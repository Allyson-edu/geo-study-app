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

// Partícula flutuante — sutil, para o fundo escuro do FocusMode
function Particle({ style }: { style: React.CSSProperties }) {
  return (
    <div
      className="absolute"
      style={{
        width: 4,
        height: 4,
        background: 'rgba(255,255,255,0.15)',
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

  // Cor do timer: azul para foco, amarelo para pausa — cores Bauhaus sólidas
  const timerColor = isBreak ? '#F5C400' : '#1A4DAB'

  // Partículas fixas para não re-renderizar
  const particles = useRef(
    Array.from({ length: 16 }, (_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
    }))
  )

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden select-none"
        style={{ background: '#1A1A1A' }}
      >
        {/* Partículas de fundo — sutis */}
        {particles.current.map((p) => (
          <Particle key={p.id} style={{ top: p.top, left: p.left }} />
        ))}

        {/* Faixa amarela Bauhaus no topo */}
        <div
          className="absolute top-0 left-0 right-0"
          style={{ height: 4, background: '#F5C400' }}
        />

        {/* Botão fechar — flat, borda branca */}
        <button
          onClick={() => navigate('/')}
          className="absolute top-5 right-5 p-2 transition-colors z-10 flex items-center justify-center"
          style={{
            background: 'transparent',
            border: '2px solid rgba(255,255,255,0.3)',
            color: 'rgba(255,255,255,0.6)',
          }}
          title="Fechar (Esc)"
        >
          <X size={18} />
        </button>

        {/* Tópico de estudo */}
        <div className="mb-10 z-10">
          {editingTopic ? (
            <input
              ref={topicRef}
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              onBlur={() => setEditingTopic(false)}
              onKeyDown={(e) => e.key === 'Enter' && setEditingTopic(false)}
              className="text-center text-base bg-transparent outline-none"
              style={{
                color: '#FFFFFF',
                borderBottom: '2px solid #F5C400',
                caretColor: '#F5C400',
              }}
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

        {/* Timer SVG — círculo geométrico intencional */}
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
              stroke="rgba(255,255,255,0.08)"
              strokeWidth={8}
            />
            {/* Círculo de progresso — cor sólida Bauhaus, sem gradiente */}
            <circle
              cx={120}
              cy={120}
              r={radius}
              fill="none"
              stroke={timerColor}
              strokeWidth={8}
              strokeLinecap="butt"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              style={{ transition: 'stroke-dashoffset 0.5s ease' }}
            />
          </svg>

          {/* Tempo central — tipografia gigante */}
          <div className="absolute flex flex-col items-center">
            <span
              className="font-mono font-bold"
              style={{ fontSize: 52, letterSpacing: '-2px', lineHeight: 1, color: '#FFFFFF' }}
            >
              {timeStr}
            </span>
            <span
              className="text-xs uppercase tracking-widest mt-1"
              style={{ color: isBreak ? '#F5C400' : 'rgba(255,255,255,0.4)' }}
            >
              {isBreak ? 'PAUSA' : 'FOCO'}
            </span>
          </div>
        </div>

        {/* Controles — flat, sem arredondamento */}
        <div className="flex items-center gap-4 z-10 mb-10">
          <motion.button
            onClick={() => (isRunning ? pause() : start())}
            className="w-16 h-16 flex items-center justify-center"
            style={{
              background: timerColor,
              border: `2px solid ${timerColor}`,
              color: isBreak ? '#1A1A1A' : '#FFFFFF',
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isRunning ? <Pause size={26} /> : <Play size={26} />}
          </motion.button>

          <motion.button
            onClick={reset}
            className="w-11 h-11 flex items-center justify-center"
            style={{
              background: 'transparent',
              border: '2px solid rgba(255,255,255,0.25)',
              color: 'rgba(255,255,255,0.5)',
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
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
