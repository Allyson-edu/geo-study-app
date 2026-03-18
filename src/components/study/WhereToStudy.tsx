import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, RefreshCw } from 'lucide-react'
import { generateWhereToStudy } from '@/lib/gemini'

interface WhereToStudyProps {
  lessonTitle: string
  isOpen: boolean
  onClose: () => void
}

// Renderização de conteúdo — flat Bauhaus
function StudyContent({ text }: { text: string }) {
  const lines = text.split('\n')
  return (
    <div className="space-y-1.5">
      {lines.map((line, i) => {
        const formatted = line
          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
          .replace(/\*(.*?)\*/g, '<em>$1</em>')
        return (
          <p
            key={i}
            className="text-sm leading-relaxed"
            style={{ color: 'var(--text-primary)' }}
            dangerouslySetInnerHTML={{ __html: formatted }}
          />
        )
      })}
    </div>
  )
}

export default function WhereToStudy({ lessonTitle, isOpen, onClose }: WhereToStudyProps) {
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function search() {
    setLoading(true)
    setError('')
    try {
      const result = await generateWhereToStudy(lessonTitle)
      setContent(result)
    } catch (e) {
      setError('Erro ao buscar recursos. Verifique sua chave do Gemini.')
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isOpen && !content) search()
  }, [isOpen]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay — sem blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50"
            style={{ background: 'rgba(26, 26, 26, 0.7)' }}
            onClick={onClose}
          />

          {/* Modal flat Bauhaus */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed inset-x-4 top-[10%] bottom-[5%] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-[560px] z-50 flex flex-col overflow-hidden"
            style={{
              background: '#FFFFFF',
              border: '2px solid #1A1A1A',
              boxShadow: '6px 6px 0 #1A1A1A',
            }}
          >
            {/* Header */}
            <div
              className="flex items-start justify-between p-5 shrink-0"
              style={{ borderBottom: '2px solid #1A1A1A' }}
            >
              <div>
                <h2 className="font-bold" style={{ color: '#1A1A1A' }}>📍 Onde estudar</h2>
                <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>{lessonTitle}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  className="flex items-center gap-1.5 text-xs px-3 py-1.5 transition-all"
                  style={{
                    background: '#EBEBEB',
                    border: '2px solid #1A1A1A',
                    color: 'var(--text-primary)',
                  }}
                  onClick={search}
                  disabled={loading}
                >
                  <RefreshCw size={12} className={loading ? 'animate-spin' : ''} />
                  Buscar novamente
                </button>
                <button
                  className="p-1.5"
                  style={{ border: '2px solid #1A1A1A', color: 'var(--text-primary)' }}
                  onClick={onClose}
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Conteúdo */}
            <div className="flex-1 overflow-y-auto p-5">
              {loading ? (
                <div className="flex flex-col items-center justify-center h-full gap-3">
                  <div
                    className="w-8 h-8 animate-spin"
                    style={{ border: '3px solid #EBEBEB', borderTop: '3px solid #1A4DAB' }}
                  />
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    Buscando os melhores recursos...
                  </p>
                </div>
              ) : error ? (
                <div className="text-center text-sm" style={{ color: '#D62B2B' }}>{error}</div>
              ) : (
                <StudyContent text={content} />
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
