import { useEffect, useState } from 'react'
import { X, CheckCircle, XCircle, Loader2 } from 'lucide-react'
import { generateExercises } from '@/lib/gemini'
import { useStudyStore } from '@/store/studyStore'
import type { Lesson } from '@/data/disciplinesData'

interface QuizModalProps {
  isOpen: boolean
  onClose: () => void
  lesson: Lesson
  disciplineId: string
  disciplineName: string
}

interface ParsedQuestion {
  number: number
  text: string
}

function parseExercises(raw: string): ParsedQuestion[] {
  // Split text before "Gabarito" to get only questions
  const exercisesPart = raw.split(/gabarito/i)[0] ?? raw

  // Match numbered exercises: "1.", "1)", "**1."
  const parts = exercisesPart
    .split(/(?=\*{0,2}\d+[\.\)])/g)
    .map((s) => s.replace(/^\*{1,2}/, '').trim())
    .filter((s) => /^\d+[\.\)]/.test(s))

  return parts.slice(0, 5).map((text, idx) => ({
    number: idx + 1,
    text: text.replace(/^\d+[\.\)]\s*\*{0,2}/, '').trim(),
  }))
}

function getGabarito(raw: string): string {
  const match = raw.match(/gabarito[\s\S]*/i)
  return match ? match[0].replace(/\*{1,2}/g, '').trim() : ''
}

export default function QuizModal({ isOpen, onClose, lesson, disciplineId, disciplineName }: QuizModalProps) {
  const { saveQuizScore, completeLesson } = useStudyStore()

  const [questions, setQuestions] = useState<ParsedQuestion[]>([])
  const [gabarito, setGabarito] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<boolean[]>([])
  const [finished, setFinished] = useState(false)
  const [showGabarito, setShowGabarito] = useState(false)

  useEffect(() => {
    if (!isOpen) return

    // Reset state
    setCurrent(0)
    setAnswers([])
    setFinished(false)
    setShowGabarito(false)
    setError('')

    const load = async () => {
      setIsLoading(true)
      try {
        const text = await generateExercises(lesson.summary, disciplineName)
        const parsed = parseExercises(text)
        const gab = getGabarito(text)
        setQuestions(parsed.length > 0 ? parsed : [{ number: 1, text: text }])
        setGabarito(gab)
      } catch {
        setError('Não foi possível gerar os exercícios. Verifique sua chave da API Gemini.')
      } finally {
        setIsLoading(false)
      }
    }
    load()
  }, [isOpen, lesson.summary, disciplineName])

  if (!isOpen) return null

  const handleAnswer = async (correct: boolean) => {
    const newAnswers = [...answers, correct]
    setAnswers(newAnswers)

    if (current + 1 >= questions.length || current + 1 >= 5) {
      const score = newAnswers.filter(Boolean).length
      setFinished(true)
      await saveQuizScore(lesson.id, score)
      if (score >= 3) {
        await completeLesson(disciplineId, lesson.id)
      }
    } else {
      setCurrent(current + 1)
    }
  }

  const score = answers.filter(Boolean).length
  const total = answers.length

  const scoreLabel = () => {
    if (score === total) return 'Perfeito! 🎉'
    if (score >= total * 0.8) return 'Excelente! 🌟'
    if (score >= total * 0.6) return 'Bom trabalho! 👍'
    return 'Continue praticando! 💪'
  }

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 50,
        background: 'rgba(26, 26, 26, 0.7)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 16,
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        style={{
          background: '#FFFFFF',
          border: '3px solid #1A1A1A',
          boxShadow: '6px 6px 0 #1A1A1A',
          width: '100%',
          maxWidth: 560,
          maxHeight: '90vh',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header */}
        <div style={{ padding: '16px 20px', borderBottom: '2px solid #1A1A1A', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#1A1A1A' }}>
          <div>
            <p style={{ color: '#9A9A9A', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Quiz</p>
            <h3 style={{ color: '#FFFFFF', fontWeight: 800, fontSize: 16, marginTop: 2 }}>{lesson.title}</h3>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#FFFFFF', padding: 4 }}>
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: 24 }}>
          {isLoading && (
            <div style={{ textAlign: 'center', padding: '48px 0' }}>
              <Loader2 size={32} style={{ color: '#1A4DAB', animation: 'spin 1s linear infinite', margin: '0 auto 16px' }} />
              <p style={{ color: '#5C5C5C', fontSize: 14 }}>Gerando exercícios com IA...</p>
            </div>
          )}

          {error && (
            <div style={{ background: '#FFF0F0', border: '2px solid #D62B2B', padding: 16, textAlign: 'center' }}>
              <p style={{ color: '#D62B2B', fontSize: 14 }}>{error}</p>
            </div>
          )}

          {!isLoading && !error && !finished && questions.length > 0 && (
            <div>
              {/* Progress dots */}
              <div style={{ display: 'flex', gap: 6, marginBottom: 24 }}>
                {Array.from({ length: Math.min(questions.length, 5) }).map((_, i) => (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      height: 4,
                      background: i < answers.length
                        ? (answers[i] ? '#1A4DAB' : '#D62B2B')
                        : i === current ? '#1A1A1A' : '#EBEBEB',
                    }}
                  />
                ))}
              </div>

              <p style={{ fontSize: 12, color: '#9A9A9A', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
                Exercício {current + 1} de {Math.min(questions.length, 5)}
              </p>

              <div
                style={{
                  background: '#F5F0E8',
                  border: '2px solid #1A1A1A',
                  padding: 20,
                  marginBottom: 24,
                  fontSize: 15,
                  lineHeight: 1.7,
                  color: '#1A1A1A',
                  whiteSpace: 'pre-wrap',
                }}
              >
                {questions[current]?.text}
              </div>

              <p style={{ fontSize: 12, color: '#5C5C5C', marginBottom: 12, textAlign: 'center' }}>
                Resolva o exercício e avalie seu desempenho:
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <button
                  onClick={() => handleAnswer(true)}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    padding: '14px 20px',
                    background: '#1A4DAB',
                    color: '#FFFFFF',
                    border: '2px solid #1A1A1A',
                    borderRadius: 0,
                    fontSize: 14,
                    fontWeight: 700,
                    cursor: 'pointer',
                    textTransform: 'uppercase',
                    letterSpacing: '0.03em',
                  }}
                >
                  <CheckCircle size={18} />
                  Acertei
                </button>
                <button
                  onClick={() => handleAnswer(false)}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    padding: '14px 20px',
                    background: '#EBEBEB',
                    color: '#1A1A1A',
                    border: '2px solid #1A1A1A',
                    borderRadius: 0,
                    fontSize: 14,
                    fontWeight: 700,
                    cursor: 'pointer',
                    textTransform: 'uppercase',
                    letterSpacing: '0.03em',
                  }}
                >
                  <XCircle size={18} />
                  Errei
                </button>
              </div>
            </div>
          )}

          {!isLoading && !error && finished && (
            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  width: 80, height: 80,
                  background: score >= 3 ? '#1A4DAB' : '#D62B2B',
                  border: '3px solid #1A1A1A',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 20px',
                  fontSize: 32,
                }}
              >
                {score >= 3 ? '🎯' : '📚'}
              </div>

              <h4 style={{ fontSize: 28, fontWeight: 900, color: '#1A1A1A', marginBottom: 4 }}>
                {score}/{total}
              </h4>
              <p style={{ fontSize: 16, color: '#5C5C5C', marginBottom: 8 }}>{scoreLabel()}</p>

              {score >= 3 && (
                <div style={{ background: '#F0F7FF', border: '2px solid #1A4DAB', padding: '8px 16px', display: 'inline-block', marginBottom: 20 }}>
                  <p style={{ fontSize: 13, color: '#1A4DAB', fontWeight: 700 }}>✓ Aula marcada como concluída</p>
                </div>
              )}

              {gabarito && (
                <div style={{ textAlign: 'left', marginTop: 16 }}>
                  <button
                    onClick={() => setShowGabarito(!showGabarito)}
                    style={{
                      background: 'none', border: '2px solid #1A1A1A', padding: '8px 16px',
                      fontSize: 13, fontWeight: 700, cursor: 'pointer', color: '#1A1A1A',
                      textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 12,
                    }}
                  >
                    {showGabarito ? 'Ocultar' : 'Ver'} Gabarito
                  </button>

                  {showGabarito && (
                    <div
                      style={{
                        background: '#F5F0E8', border: '2px solid #1A1A1A', padding: 16,
                        fontSize: 13, lineHeight: 1.8, color: '#1A1A1A', whiteSpace: 'pre-wrap',
                        maxHeight: 240, overflowY: 'auto',
                      }}
                    >
                      {gabarito}
                    </div>
                  )}
                </div>
              )}

              <button
                onClick={onClose}
                style={{
                  marginTop: 20, width: '100%', padding: '12px 24px',
                  background: '#1A1A1A', color: '#FFFFFF',
                  border: '2px solid #1A1A1A', borderRadius: 0,
                  fontSize: 14, fontWeight: 700, cursor: 'pointer',
                  textTransform: 'uppercase', letterSpacing: '0.04em',
                }}
              >
                Fechar
              </button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  )
}
