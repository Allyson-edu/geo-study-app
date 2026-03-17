import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, RotateCcw, Minus, Plus } from 'lucide-react'
import { usePomodoroStore, BREAK_MESSAGES_EXPORT } from '@/store/pomodoroStore'
import { cn } from '@/lib/utils'

const RADIUS = 45
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

// Bip simples via Web Audio API
function playBeep(isBreak: boolean) {
  try {
    const ctx = new AudioContext()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.frequency.value = isBreak ? 523 : 880 // Dó ou Lá
    gain.gain.setValueAtTime(0.3, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8)
    osc.start()
    osc.stop(ctx.currentTime + 0.8)
  } catch {
    // silencia erros de AudioContext em ambientes sem suporte
  }
}

export default function PomodoroWidget() {
  const store = usePomodoroStore()
  const dragRef = useRef<{ startX: number; startY: number; el: HTMLElement } | null>(null)
  const widgetRef = useRef<HTMLDivElement>(null)
  const [customPos, setCustomPos] = useState<{ x: number; y: number } | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  // Timer tick
  useEffect(() => {
    if (!store.isRunning) return
    const id = setInterval(() => {
      const before = store.timeLeft
      store.tick()
      if (before <= 1) {
        playBeep(store.isBreak)
      }
    }, 1000)
    return () => clearInterval(id)
  }, [store.isRunning, store.tick, store.timeLeft, store.isBreak])

  // Calcular posição fixa nos cantos
  const positionStyles: Record<string, string> = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'top-right': 'top-20 right-6',
    'top-left': 'top-20 left-6',
  }

  // Drag — desktop (mouse)
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!widgetRef.current) return
    const rect = widgetRef.current.getBoundingClientRect()
    dragRef.current = {
      startX: e.clientX - rect.left,
      startY: e.clientY - rect.top,
      el: widgetRef.current,
    }
    setIsDragging(true)
    e.preventDefault()
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!dragRef.current || !isDragging) return
      const x = e.clientX - dragRef.current.startX
      const y = e.clientY - dragRef.current.startY
      setCustomPos({ x, y })
    }
    const handleMouseUp = (e: MouseEvent) => {
      if (!isDragging) return
      setIsDragging(false)
      // Snap para o canto mais próximo
      const x = e.clientX
      const y = e.clientY
      const midX = window.innerWidth / 2
      const midY = window.innerHeight / 2
      const vert = y < midY ? 'top' : 'bottom'
      const horiz = x < midX ? 'left' : 'right'
      store.setPosition(`${vert}-${horiz}` as Parameters<typeof store.setPosition>[0])
      setCustomPos(null)
      dragRef.current = null
    }
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, store])

  // Drag — iPad (touch)
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!widgetRef.current) return
    const touch = e.touches[0]
    const rect = widgetRef.current.getBoundingClientRect()
    dragRef.current = {
      startX: touch.clientX - rect.left,
      startY: touch.clientY - rect.top,
      el: widgetRef.current,
    }
    setIsDragging(true)
  }

  useEffect(() => {
    const handleTouchMove = (e: TouchEvent) => {
      if (!dragRef.current || !isDragging) return
      const touch = e.touches[0]
      const x = touch.clientX - dragRef.current.startX
      const y = touch.clientY - dragRef.current.startY
      setCustomPos({ x, y })
    }
    const handleTouchEnd = (e: TouchEvent) => {
      if (!isDragging) return
      setIsDragging(false)
      const touch = e.changedTouches[0]
      const x = touch.clientX
      const y = touch.clientY
      const midX = window.innerWidth / 2
      const midY = window.innerHeight / 2
      const vert = y < midY ? 'top' : 'bottom'
      const horiz = x < midX ? 'left' : 'right'
      store.setPosition(`${vert}-${horiz}` as Parameters<typeof store.setPosition>[0])
      setCustomPos(null)
      dragRef.current = null
    }
    window.addEventListener('touchmove', handleTouchMove, { passive: true })
    window.addEventListener('touchend', handleTouchEnd)
    return () => {
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [isDragging, store])

  // SVG timer
  const totalTime = store.isBreak ? store.breakMinutes * 60 : store.focusMinutes * 60
  const progress = 1 - store.timeLeft / totalTime
  const strokeDashoffset = CIRCUMFERENCE * (1 - progress)
  const timerColor = store.isBreak ? '#30D158' : '#0A84FF'

  // Formato mm:ss
  const minutes = Math.floor(store.timeLeft / 60).toString().padStart(2, '0')
  const seconds = (store.timeLeft % 60).toString().padStart(2, '0')

  const posClass = customPos ? '' : positionStyles[store.position]

  return (
    <motion.div
      ref={widgetRef}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        'fixed z-50 select-none',
        posClass,
        isDragging ? 'cursor-grabbing' : 'cursor-grab'
      )}
      style={
        customPos
          ? { left: customPos.x, top: customPos.y, bottom: 'auto', right: 'auto' }
          : {}
      }
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      <motion.div
        layout
        className={cn(
          'glass-dark rounded-2xl shadow-2xl overflow-hidden',
          store.isMinimized ? 'w-20 h-20' : 'w-64'
        )}
      >
        {store.isMinimized ? (
          /* Estado minimizado — só o círculo e o tempo */
          <button
            className="w-full h-full flex flex-col items-center justify-center"
            onClick={(e) => {
              e.stopPropagation()
              store.toggleMinimized()
            }}
          >
            <svg width="60" height="60" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r={RADIUS} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
              <circle
                cx="50" cy="50" r={RADIUS}
                fill="none"
                stroke={timerColor}
                strokeWidth="8"
                strokeDasharray={CIRCUMFERENCE}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                transform="rotate(-90 50 50)"
                style={{ transition: 'stroke-dashoffset 0.5s ease' }}
              />
            </svg>
            <span className="text-xs font-mono text-white/80 -mt-1">{minutes}:{seconds}</span>
          </button>
        ) : (
          /* Widget expandido */
          <div className="p-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-white/60 uppercase tracking-wider">
                {store.isBreak ? '☕ Descanso' : '🎯 Foco'}
              </span>
              <div className="flex items-center gap-1">
                <span className="text-xs text-white/40">#{store.sessionCount}</span>
                <button
                  className="text-white/40 hover:text-white/80 transition-colors p-1"
                  onClick={(e) => { e.stopPropagation(); store.toggleMinimized() }}
                >
                  <Minus size={14} />
                </button>
              </div>
            </div>

            {/* Timer SVG circular */}
            <div className="flex justify-center mb-3">
              <div className="relative">
                <svg width="100" height="100" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r={RADIUS} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="6" />
                  <circle
                    cx="50" cy="50" r={RADIUS}
                    fill="none"
                    stroke={timerColor}
                    strokeWidth="6"
                    strokeDasharray={CIRCUMFERENCE}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    transform="rotate(-90 50 50)"
                    style={{ transition: 'stroke-dashoffset 0.5s ease' }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-mono font-bold text-white">
                    {minutes}:{seconds}
                  </span>
                </div>
              </div>
            </div>

            {/* Controles de tempo */}
            <div className="flex items-center justify-center gap-2 mb-3">
              <button
                className="text-white/40 hover:text-white/80 transition-colors"
                onClick={(e) => {
                  e.stopPropagation()
                  if (!store.isBreak) store.setFocusMinutes(Math.max(1, store.focusMinutes - 5))
                }}
              >
                <Minus size={12} />
              </button>
              <span className="text-xs text-white/60 w-16 text-center">
                {store.isBreak ? `Pausa ${store.breakMinutes}min` : `Foco ${store.focusMinutes}min`}
              </span>
              <button
                className="text-white/40 hover:text-white/80 transition-colors"
                onClick={(e) => {
                  e.stopPropagation()
                  if (!store.isBreak) store.setFocusMinutes(Math.min(60, store.focusMinutes + 5))
                }}
              >
                <Plus size={12} />
              </button>
            </div>

            {/* Botões de controle */}
            <div className="flex items-center justify-center gap-3 mb-3">
              <button
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
                onClick={(e) => { e.stopPropagation(); store.reset() }}
                aria-label="Reset"
              >
                <RotateCcw size={16} />
              </button>
              <button
                className="px-5 py-2 rounded-xl font-semibold text-white transition-colors"
                style={{ background: timerColor }}
                onClick={(e) => {
                  e.stopPropagation()
                  store.isRunning ? store.pause() : store.start()
                }}
              >
                {store.isRunning
                  ? <Pause size={18} />
                  : <Play size={18} />
                }
              </button>
            </div>

            {/* Mensagem de descanso */}
            <AnimatePresence mode="wait">
              {store.isBreak && (
                <motion.p
                  key={store.currentMessageIndex}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="text-xs text-white/60 text-center leading-relaxed"
                >
                  {BREAK_MESSAGES_EXPORT[store.currentMessageIndex]}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}
