import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, RefreshCw } from 'lucide-react'
import { generateExercises } from '@/lib/gemini'

interface ExerciseGeneratorProps {
  lessonTitle: string
  disciplineName: string
  isOpen: boolean
  onClose: () => void
}

// Renderização básica de markdown (negrito, itálico, listas)
function SimpleMarkdown({ text }: { text: string }) {
  const lines = text.split('\n')
  return (
    <div className="text-sm text-[var(--text-primary)] space-y-1 leading-relaxed">
      {lines.map((line, i) => {
        // Negrito
        const formatted = line
          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
          .replace(/\*(.*?)\*/g, '<em>$1</em>')
        return (
          <p
            key={i}
            dangerouslySetInnerHTML={{ __html: formatted }}
            className={line.match(/^\d+\./) ? 'ml-2' : ''}
          />
        )
      })}
    </div>
  )
}

export default function ExerciseGenerator({
  lessonTitle,
  disciplineName,
  isOpen,
  onClose,
}: ExerciseGeneratorProps) {
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function generate() {
    setLoading(true)
    setError('')
    try {
      const result = await generateExercises(lessonTitle, disciplineName)
      setContent(result)
    } catch (e) {
      setError('Erro ao gerar exercícios. Verifique sua chave do Gemini.')
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isOpen && !content) generate()
  }, [isOpen]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-x-4 top-[10%] bottom-[5%] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-[600px] z-50 glass-dark rounded-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-start justify-between p-5 border-b border-[var(--border-color)] shrink-0">
              <div>
                <h2 className="font-bold text-white">✏️ Exercícios</h2>
                <p className="text-xs text-white/50 mt-0.5">{lessonTitle}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-white/10 text-white/70 hover:bg-white/20 transition-colors"
                  onClick={generate}
                  disabled={loading}
                >
                  <RefreshCw size={12} className={loading ? 'animate-spin' : ''} />
                  Gerar novos
                </button>
                <button
                  className="p-1.5 rounded-lg bg-white/10 text-white/70 hover:bg-white/20 transition-colors"
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
                  <div className="w-8 h-8 border-2 border-bigsur-purple/30 border-t-bigsur-purple rounded-full animate-spin" />
                  <p className="text-sm text-white/50">Gerando exercícios personalizados...</p>
                </div>
              ) : error ? (
                <div className="text-center text-red-400 text-sm">{error}</div>
              ) : (
                <SimpleMarkdown text={content} />
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
