import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, PenLine } from 'lucide-react'
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
  }

  return (
    <div className={cn('py-3 transition-opacity', completed ? 'opacity-70' : '')}>
      <div className="flex items-start gap-3">
        {/* Checkbox quadrado — Bauhaus */}
        <button
          className="mt-0.5 w-5 h-5 flex items-center justify-center shrink-0 transition-all"
          style={{
            border: completed ? '2px solid #1A4DAB' : '2px solid #D0CCC4',
            background: completed ? '#1A4DAB' : 'transparent',
          }}
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
          <span
            className="text-sm"
            style={{
              color: completed ? 'var(--text-muted)' : 'var(--text-primary)',
              textDecoration: completed ? 'line-through' : 'none',
            }}
          >
            {lesson.title}
          </span>

          {/* Botões de ação flat */}
          <div className="flex items-center gap-2 mt-1.5 flex-wrap">
            <button
              className="flex items-center gap-1 text-xs px-2.5 py-1 transition-all"
              style={{
                background: '#F5F0E8',
                border: '1px solid #1A1A1A',
                color: '#1A4DAB',
              }}
              onClick={onWhereToStudy}
            >
              <MapPin size={11} /> Onde estudar
            </button>
            <button
              className="flex items-center gap-1 text-xs px-2.5 py-1 transition-all"
              style={{
                background: '#F5F0E8',
                border: '1px solid #1A1A1A',
                color: '#1A4DAB',
              }}
              onClick={onPractice}
            >
              <PenLine size={11} /> Praticar
            </button>
            <button
              className="flex items-center gap-1 text-xs px-2.5 py-1 transition-all"
              style={{
                background: '#F5F0E8',
                border: '1px solid #D0CCC4',
                color: 'var(--text-secondary)',
              }}
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
                  className="w-full min-h-[60px] resize-none text-xs p-3 outline-none"
                  style={{
                    background: '#F5F0E8',
                    border: '2px solid #1A1A1A',
                    color: 'var(--text-primary)',
                  }}
                  rows={2}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Loading spinner */}
        {isLoading && (
          <div
            className="shrink-0 w-4 h-4 animate-spin"
            style={{ border: '2px solid #EBEBEB', borderTop: '2px solid #1A4DAB' }}
          />
        )}
      </div>
    </div>
  )
}
