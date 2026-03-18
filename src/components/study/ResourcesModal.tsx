import { useEffect, useState } from 'react'
import { X, Loader2, ExternalLink } from 'lucide-react'
import { generateWhereToStudy } from '@/lib/gemini'
import { useStudyStore } from '@/store/studyStore'
import type { Lesson } from '@/data/disciplinesData'

interface ResourcesModalProps {
  isOpen: boolean
  onClose: () => void
  lesson: Lesson
  disciplineId: string
}

function formatResources(raw: string): string {
  return raw
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .trim()
}

export default function ResourcesModal({ isOpen, onClose, lesson, disciplineId }: ResourcesModalProps) {
  const { recordStudySession } = useStudyStore()

  const [content, setContent] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isOpen) return

    setContent('')
    setError('')

    const load = async () => {
      setIsLoading(true)
      try {
        const text = await generateWhereToStudy(lesson.summary)
        setContent(formatResources(text))
        // Registrar sessão de estudo ao abrir
        await recordStudySession(disciplineId, lesson.id, 0)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Não foi possível carregar os recursos.')
      } finally {
        setIsLoading(false)
      }
    }
    load()
  }, [isOpen, lesson.summary, lesson.id, disciplineId, recordStudySession])

  if (!isOpen) return null

  // Parse sections from the content
  const sections = content
    .split(/\n(?=(?:📺|🎓|📖|💡|🔗|1\.|2\.|3\.))/g)
    .filter((s) => s.trim().length > 0)

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
          boxShadow: '6px 6px 0 #F5C400',
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
            <p style={{ color: '#9A9A9A', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Onde Estudar</p>
            <h3 style={{ color: '#FFFFFF', fontWeight: 800, fontSize: 16, marginTop: 2 }}>{lesson.title}</h3>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#FFFFFF', padding: 4 }}>
            <X size={20} />
          </button>
        </div>

        {/* Faixa amarela Bauhaus */}
        <div style={{ height: 4, background: '#F5C400' }} />

        {/* Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: 24 }}>
          {isLoading && (
            <div style={{ textAlign: 'center', padding: '48px 0' }}>
              <Loader2 size={32} style={{ color: '#F5C400', animation: 'spin 1s linear infinite', margin: '0 auto 16px' }} />
              <p style={{ color: '#5C5C5C', fontSize: 14 }}>Buscando os melhores recursos...</p>
            </div>
          )}

          {error && (
            <div style={{ background: '#FFF0F0', border: '2px solid #D62B2B', padding: 16, textAlign: 'center' }}>
              <p style={{ color: '#D62B2B', fontSize: 14 }}>{error}</p>
            </div>
          )}

          {!isLoading && !error && content && (
            <div>
              <p style={{ fontSize: 12, color: '#9A9A9A', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 16 }}>
                Recursos recomendados para: {lesson.title}
              </p>

              {sections.length > 1 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {sections.map((section, idx) => (
                    <div
                      key={idx}
                      style={{
                        background: '#F5F0E8',
                        border: '2px solid #1A1A1A',
                        padding: 16,
                      }}
                    >
                      <p style={{ fontSize: 14, lineHeight: 1.8, color: '#1A1A1A', whiteSpace: 'pre-wrap' }}>
                        {section.trim()}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div
                  style={{
                    background: '#F5F0E8',
                    border: '2px solid #1A1A1A',
                    padding: 20,
                    fontSize: 14,
                    lineHeight: 1.8,
                    color: '#1A1A1A',
                    whiteSpace: 'pre-wrap',
                  }}
                >
                  {content}
                </div>
              )}

              <div style={{ marginTop: 16, padding: '12px 16px', background: '#F0F7FF', border: '2px solid #1A4DAB', display: 'flex', alignItems: 'center', gap: 8 }}>
                <ExternalLink size={14} style={{ color: '#1A4DAB', flexShrink: 0 }} />
                <p style={{ fontSize: 12, color: '#1A4DAB', fontWeight: 600 }}>
                  Sessão de estudo registrada para hoje ✓
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ padding: '16px 24px', borderTop: '2px solid #1A1A1A' }}>
          <button
            onClick={onClose}
            style={{
              width: '100%', padding: '12px 24px',
              background: '#1A1A1A', color: '#FFFFFF',
              border: '2px solid #1A1A1A', borderRadius: 0,
              fontSize: 14, fontWeight: 700, cursor: 'pointer',
              textTransform: 'uppercase', letterSpacing: '0.04em',
            }}
          >
            Fechar
          </button>
        </div>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  )
}
