import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, PenLine, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'

interface LessonRowProps {
  lesson: {
    id: string
    title: string
    xp_reward: number
  }
  completed: boolean
  notes?: string
  onComplete: (notes?: string) => void
  onWhereToStudy: () => void
  onPractice: () => void
  isLoading?: boolean
}

export default function LessonRow({
  lesson,
  completed,
  notes: initialNotes = '',
  onComplete,
  onWhereToStudy,
  onPractice,
  isLoading,
}: LessonRowProps) {
  const [notesOpen, setNotesOpen] = useState(false)
  const [notes, setNotes] = useState(initialNotes)
  const [showXpAnim, setShowXpAnim] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'
    }
  }, [notes])

  function handleCheck() {
    if (completed || isLoading) return
    onComplete(notes || undefined)
    setShowXpAnim(true)
    setTimeout(() => setShowXpAnim(false), 1500)
  }

  return (
    <div className={cn('py-3 transition-opacity', completed ? 'opacity-70' : '')}>
      <div className="flex items-start gap-3">
        {/* Checkbox animado */}
        <button
          className={cn(
            'mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all',
            completed
              ? 'bg-bigsur-green border-bigsur-green'
              : 'border-[var(--border-color)] hover:border-bigsur-blue'
          )}
          onClick={handleCheck}
          disabled={completed || isLoading}
          aria-label="Marcar como completo"
        >
          <AnimatePresence>
            {completed && (
              <motion.svg
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                width="10" height="8" viewBox="0 0 10 8" fill="none"
              >
                <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </motion.svg>
            )}
          </AnimatePresence>
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={cn(
              'text-sm text-[var(--text-primary)]',
              completed ? 'line-through text-[var(--text-tertiary)]' : ''
            )}>
              {lesson.title}
            </span>

            {/* Badge XP */}
            <div className="relative">
              <span className="text-xs font-semibold text-bigsur-blue flex items-center gap-0.5">
                <Zap size={10} /> +{lesson.xp_reward}
              </span>
              <AnimatePresence>
                {showXpAnim && (
                  <motion.span
                    initial={{ opacity: 1, y: 0 }}
                    animate={{ opacity: 0, y: -20 }}
                    exit={{ opacity: 0 }}
                    className="absolute -top-4 left-0 text-xs font-bold text-bigsur-green whitespace-nowrap"
                  >
                    +{lesson.xp_reward} XP! 🎉
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Botões de ação */}
          <div className="flex items-center gap-2 mt-1.5 flex-wrap">
            <button
              className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg bg-bigsur-blue/10 text-bigsur-blue hover:bg-bigsur-blue/20 transition-colors"
              onClick={onWhereToStudy}
            >
              <MapPin size={11} /> Onde estudar
            </button>
            <button
              className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg bg-bigsur-purple/10 text-bigsur-purple hover:bg-bigsur-purple/20 transition-colors"
              onClick={onPractice}
            >
              <PenLine size={11} /> Praticar
            </button>
            <button
              className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              onClick={() => setNotesOpen(!notesOpen)}
            >
              📝 Notas
            </button>
          </div>

          {/* Campo de notas expansível */}
          <AnimatePresence>
            {notesOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="mt-2 overflow-hidden"
              >
                <textarea
                  ref={textareaRef}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Escreva suas notas aqui..."
                  className="w-full min-h-[60px] resize-none bg-[var(--bg-tertiary)] text-[var(--text-primary)] text-xs rounded-xl p-3 border border-[var(--border-color)] focus:outline-none focus:ring-2 focus:ring-bigsur-blue/30 placeholder:text-[var(--text-tertiary)]"
                  rows={2}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Loading spinner */}
        {isLoading && (
          <div className="shrink-0 w-4 h-4 border-2 border-bigsur-blue/30 border-t-bigsur-blue rounded-full animate-spin" />
        )}
      </div>
    </div>
  )
}
