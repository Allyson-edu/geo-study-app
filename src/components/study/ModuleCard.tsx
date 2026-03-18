import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Lock, CheckCircle2, BookOpen } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Lesson {
  id: string
  title: string
  description: string | null
  order_index: number
  xp_reward: number
}

interface Module {
  id: string
  title: string
  description: string | null
  is_locked: boolean
  lessons?: Lesson[]
}

interface ModuleCardProps {
  module: Module
  progressPercent?: number
  completedCount?: number
  totalCount?: number
  disciplineColor?: string
  onLessonClick?: (lesson: Lesson) => void
  completedLessonIds?: Set<string>
}

export default function ModuleCard({
  module,
  progressPercent = 0,
  completedCount = 0,
  totalCount = 0,
  disciplineColor = '#0A84FF',
  onLessonClick,
  completedLessonIds = new Set(),
}: ModuleCardProps) {
  const [expanded, setExpanded] = useState(false)

  const isLocked = module.is_locked
  const isCompleted = totalCount > 0 && completedCount === totalCount

  return (
    <motion.div
      layout
      className={cn(
        'border overflow-hidden transition-all',
        isLocked ? 'opacity-50' : ''
      )}
      style={{
        background: '#FFFFFF',
        border: '2px solid #1A1A1A',
        boxShadow: isLocked ? 'none' : '3px 3px 0 #1A1A1A',
      }}
      whileHover={isLocked ? {} : { x: -1, y: -1, boxShadow: `4px 4px 0 #1A1A1A` }}
    >
      {/* Cabeçalho do card */}
      <button
        className="w-full text-left p-4"
        onClick={() => !isLocked && setExpanded(!expanded)}
        disabled={isLocked}
      >
        <div className="flex items-start gap-3">
          {/* Ícone de status */}
          <div
            className="shrink-0 w-10 h-10 flex items-center justify-center text-xl"
            style={{ background: `${disciplineColor}20`, border: `1px solid ${disciplineColor}` }}
          >
            {isLocked ? <Lock size={18} style={{ color: disciplineColor }} />
              : isCompleted ? <CheckCircle2 size={18} style={{ color: disciplineColor }} />
              : <BookOpen size={18} style={{ color: disciplineColor }} />}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-[var(--text-primary)] truncate">{module.title}</h3>
              <motion.div
                animate={{ rotate: expanded ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="shrink-0 ml-2"
              >
                {!isLocked && <ChevronDown size={16} className="text-[var(--text-tertiary)]" />}
              </motion.div>
            </div>

            {module.description && (
              <p className="text-xs text-[var(--text-secondary)] mt-0.5 truncate">{module.description}</p>
            )}

            {/* Barra de progresso */}
            <div className="mt-2 flex items-center gap-2">
              <div className="flex-1 h-1.5 bg-[#EBEBEB] border border-[#D0CCC4] overflow-hidden">
                <motion.div
                  className="h-full"
                  style={{ background: disciplineColor }}
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                />
              </div>
              <span className="text-xs text-[var(--text-tertiary)] shrink-0">
                {completedCount}/{totalCount} aulas
              </span>
            </div>
          </div>
        </div>
      </button>

      {/* Accordion de aulas */}
      <AnimatePresence initial={false}>
        {expanded && module.lessons && module.lessons.length > 0 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="border-t border-[#D0CCC4] divide-y divide-[#D0CCC4]">
              {module.lessons.map((lesson) => (
                <div
                  key={lesson.id}
                  className={cn(
                    'px-4 py-3 flex items-center gap-3',
                    completedLessonIds.has(lesson.id) ? 'opacity-60' : ''
                  )}
                >
                  {/* Checkbox visual */}
                  <div
                    className={cn(
                      'w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0',
                      completedLessonIds.has(lesson.id)
                        ? 'border-transparent bg-[#1A4DAB]'
                        : 'border-[#D0CCC4]'
                    )}
                  >
                    {completedLessonIds.has(lesson.id) && (
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                        <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>

                  <span className="flex-1 text-sm text-[var(--text-primary)]">{lesson.title}</span>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs font-semibold text-[#1A4DAB]">+{lesson.xp_reward} XP</span>
                    {onLessonClick && (
                      <button
                        className="text-xs px-2 py-1 rounded-lg bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                        onClick={() => onLessonClick(lesson)}
                      >
                        Abrir
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
