import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, RefreshCw } from 'lucide-react'
import { generateWhereToStudy } from '@/lib/gemini'

interface WhereToStudyProps {
  lessonTitle: string
  isOpen: boolean
  onClose: () => void
}

// Renderização com seções coloridas por tipo
function StudyContent({ text }: { text: string }) {
  const lines = text.split('\n')
  return (
    <div className="space-y-1.5">
      {lines.map((line, i) => {
        const formatted = line
          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
          .replace(/\*(.*?)\*/g, '<em>$1</em>')

        let className = 'text-sm text-white/70 leading-relaxed'
        if (line.includes('YouTube') || line.startsWith('1.')) className += ' text-red-400 font-semibold'
        if (line.includes('Plataforma') || line.startsWith('2.')) className += ' text-bigsur-blue font-semibold'
        if (line.includes('extra') || line.startsWith('3.')) className += ' text-bigsur-green font-semibold'

        return (
          <p
            key={i}
            className={className}
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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-x-4 top-[10%] bottom-[5%] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-[560px] z-50 glass-dark rounded-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-start justify-between p-5 border-b border-white/10 shrink-0">
              <div>
                <h2 className="font-bold text-white">📍 Onde estudar</h2>
                <p className="text-xs text-white/50 mt-0.5">{lessonTitle}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-white/10 text-white/70 hover:bg-white/20 transition-colors"
                  onClick={search}
                  disabled={loading}
                >
                  <RefreshCw size={12} className={loading ? 'animate-spin' : ''} />
                  Buscar novamente
                </button>
                <button
                  className="p-1.5 rounded-lg bg-white/10 text-white/70 hover:bg-white/20"
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
                  <div className="w-8 h-8 border-2 border-bigsur-blue/30 border-t-bigsur-blue rounded-full animate-spin" />
                  <p className="text-sm text-white/50">Buscando os melhores recursos...</p>
                </div>
              ) : error ? (
                <div className="text-center text-red-400 text-sm">{error}</div>
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
