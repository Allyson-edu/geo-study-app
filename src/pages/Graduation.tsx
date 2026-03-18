import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp, CheckCircle, BookOpen, ExternalLink } from 'lucide-react'
import { disciplines } from '@/data/disciplinesData'
import type { Discipline, Lesson } from '@/data/disciplinesData'
import { useStudyStore } from '@/store/studyStore'
import QuizModal from '@/components/study/QuizModal'
import ResourcesModal from '@/components/study/ResourcesModal'

const EXAM_DATE = new Date('2026-08-03T00:00:00')

const PRIORITY_COLORS = {
  URGENTE: '#D62B2B',
  ALTA: '#D68B2B',
  MÉDIA: '#D6C02B',
}

function getDaysUntilExam() {
  const now = new Date()
  now.setHours(0, 0, 0, 0)
  const target = new Date(EXAM_DATE)
  target.setHours(0, 0, 0, 0)
  return Math.ceil((target.getTime() - now.getTime()) / 86400000)
}

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07 } },
}

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
}

export default function Graduation() {
  const graduationDisciplines = disciplines.filter((d) => d.semester === 'graduation')
  const getDisciplineProgress = useStudyStore((s) => s.getDisciplineProgress)
  const getLessonProgress = useStudyStore((s) => s.getLessonProgress)

  const [daysLeft, setDaysLeft] = useState(getDaysUntilExam)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [quizLesson, setQuizLesson] = useState<{ lesson: Lesson; discipline: Discipline } | null>(null)
  const [resourcesLesson, setResourcesLesson] = useState<{ lesson: Lesson; disciplineId: string } | null>(null)

  useEffect(() => {
    setDaysLeft(getDaysUntilExam())
    const interval = setInterval(() => setDaysLeft(getDaysUntilExam()), 60000)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="p-6 max-w-5xl mx-auto space-y-6"
    >
      {/* Header */}
      <motion.div variants={item}>
        <h2 className="text-2xl font-bold" style={{ color: '#1A1A1A' }}>🏛️ Graduação — UFPE Geologia</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginTop: 4 }}>
          Curso de Geologia · Universidade Federal de Pernambuco · 1º Semestre
        </p>
      </motion.div>

      {/* Faixa amarela Bauhaus */}
      <motion.div variants={item} style={{ height: 4, background: '#F5C400' }} />

      {/* Countdown em vermelho — destaque */}
      <motion.div
        variants={item}
        style={{
          background: daysLeft <= 30 ? '#D62B2B' : '#1A1A1A',
          border: '3px solid #1A1A1A',
          boxShadow: `4px 4px 0 ${daysLeft <= 30 ? '#1A1A1A' : '#D62B2B'}`,
          padding: '20px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 12,
        }}
      >
        <div>
          <p style={{ color: daysLeft <= 30 ? 'rgba(255,255,255,0.7)' : '#9A9A9A', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>
            Início das Aulas
          </p>
          <p style={{ color: '#FFFFFF', fontSize: 18, fontWeight: 800 }}>
            03/08/2026 — Geologia UFPE
          </p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: 48, fontWeight: 900, color: '#FFFFFF', lineHeight: 1 }}>
            {daysLeft > 0 ? daysLeft : 0}
          </p>
          <p style={{ fontSize: 12, fontWeight: 700, color: daysLeft <= 30 ? 'rgba(255,255,255,0.8)' : '#9A9A9A', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            {daysLeft === 1 ? 'dia restante' : 'dias restantes'}
          </p>
        </div>
      </motion.div>

      {/* Lista de disciplinas */}
      <motion.div variants={container} className="space-y-3">
        {graduationDisciplines.map((discipline) => {
          const progress = getDisciplineProgress(discipline.id)
          const isExpanded = expandedId === discipline.id
          const priorityColor = PRIORITY_COLORS[discipline.priority]

          return (
            <motion.div key={discipline.id} variants={item}>
              <div
                style={{
                  background: '#FFFFFF',
                  border: '2px solid #1A1A1A',
                  boxShadow: '3px 3px 0 #1A1A1A',
                  borderLeft: `6px solid ${priorityColor}`,
                }}
              >
                {/* Header do card — clicável */}
                <button
                  onClick={() => setExpandedId(isExpanded ? null : discipline.id)}
                  style={{
                    width: '100%',
                    padding: '16px 20px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 12,
                  }}
                >
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 4 }}>
                      <h3 style={{ fontWeight: 800, fontSize: 15, color: '#1A1A1A' }}>{discipline.name}</h3>
                      <span
                        style={{
                          fontSize: 10,
                          fontWeight: 800,
                          color: '#FFFFFF',
                          background: priorityColor,
                          padding: '2px 8px',
                          letterSpacing: '0.06em',
                          textTransform: 'uppercase',
                        }}
                      >
                        {discipline.priority}
                      </span>
                    </div>
                    <p style={{ fontSize: 12, color: '#5C5C5C', marginBottom: 8, lineHeight: 1.4 }}>
                      {discipline.ementa}
                    </p>
                    {/* Progress bar */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ flex: 1, height: 6, background: '#EBEBEB', border: '1px solid #D0CCC4' }}>
                        <div style={{ height: '100%', background: discipline.color, width: `${Math.max(progress, progress > 0 ? 2 : 0)}%`, transition: 'width 0.5s ease' }} />
                      </div>
                      <span style={{ fontSize: 11, fontWeight: 700, color: '#5C5C5C', flexShrink: 0 }}>
                        {progress}% · {discipline.lessons.length} aulas
                      </span>
                    </div>
                  </div>

                  <div style={{ flexShrink: 0 }}>
                    {isExpanded ? <ChevronUp size={18} color="#1A1A1A" /> : <ChevronDown size={18} color="#1A1A1A" />}
                  </div>
                </button>

                {/* Lista de aulas — expandível */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      style={{ overflow: 'hidden', borderTop: '2px solid #1A1A1A' }}
                    >
                      <div style={{ padding: '8px 0' }}>
                        {discipline.lessons.map((lesson) => {
                          const lessonProg = getLessonProgress(lesson.id)
                          const isCompleted = lessonProg?.completed ?? false

                          return (
                            <div
                              key={lesson.id}
                              style={{
                                padding: '12px 20px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 12,
                                borderBottom: '1px solid #EBEBEB',
                              }}
                            >
                              {/* Status icon */}
                              <div style={{ flexShrink: 0 }}>
                                {isCompleted ? (
                                  <CheckCircle size={18} style={{ color: '#1A4DAB' }} />
                                ) : (
                                  <div style={{ width: 18, height: 18, border: '2px solid #D0CCC4' }} />
                                )}
                              </div>

                              {/* Lesson info */}
                              <div style={{ flex: 1, minWidth: 0 }}>
                                <p style={{ fontWeight: 600, fontSize: 13, color: isCompleted ? '#5C5C5C' : '#1A1A1A', textDecoration: isCompleted ? 'line-through' : 'none' }}>
                                  {lesson.title}
                                </p>
                                <p style={{ fontSize: 11, color: '#9A9A9A', marginTop: 1 }}>
                                  {lesson.duration}
                                  {lessonProg?.quiz_score != null && (
                                    <span style={{ marginLeft: 8, color: '#1A4DAB', fontWeight: 700 }}>
                                      Quiz: {lessonProg.quiz_score}/5
                                    </span>
                                  )}
                                </p>
                              </div>

                              {/* Action buttons */}
                              <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                                <button
                                  onClick={() => setQuizLesson({ lesson, discipline })}
                                  style={{
                                    display: 'flex', alignItems: 'center', gap: 4,
                                    padding: '6px 10px',
                                    background: '#1A4DAB',
                                    color: '#FFFFFF',
                                    border: '2px solid #1A1A1A',
                                    borderRadius: 0,
                                    fontSize: 11,
                                    fontWeight: 700,
                                    cursor: 'pointer',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.03em',
                                  }}
                                >
                                  <BookOpen size={12} />
                                  Quiz
                                </button>
                                <button
                                  onClick={() => setResourcesLesson({ lesson, disciplineId: discipline.id })}
                                  style={{
                                    display: 'flex', alignItems: 'center', gap: 4,
                                    padding: '6px 10px',
                                    background: '#F5C400',
                                    color: '#1A1A1A',
                                    border: '2px solid #1A1A1A',
                                    borderRadius: 0,
                                    fontSize: 11,
                                    fontWeight: 700,
                                    cursor: 'pointer',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.03em',
                                  }}
                                >
                                  <ExternalLink size={12} />
                                  Estudar
                                </button>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Quiz Modal */}
      {quizLesson && (
        <QuizModal
          isOpen={!!quizLesson}
          onClose={() => setQuizLesson(null)}
          lesson={quizLesson.lesson}
          disciplineId={quizLesson.discipline.id}
          disciplineName={quizLesson.discipline.name}
        />
      )}

      {/* Resources Modal */}
      {resourcesLesson && (
        <ResourcesModal
          isOpen={!!resourcesLesson}
          onClose={() => setResourcesLesson(null)}
          lesson={resourcesLesson.lesson}
          disciplineId={resourcesLesson.disciplineId}
        />
      )}
    </motion.div>
  )
}