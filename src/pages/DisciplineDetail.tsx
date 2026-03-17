import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import ModuleCard from '@/components/study/ModuleCard'
import ExerciseGenerator from '@/components/study/ExerciseGenerator'
import WhereToStudy from '@/components/study/WhereToStudy'

interface Discipline {
  id: string
  name: string
  description: string | null
  icon: string | null
  color: string | null
}

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
  order_index: number
  is_locked: boolean
  lessons?: Lesson[]
}

export default function DisciplineDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [discipline, setDiscipline] = useState<Discipline | null>(null)
  const [modules, setModules] = useState<Module[]>([])
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null)
  const [exerciseOpen, setExerciseOpen] = useState(false)
  const [whereOpen, setWhereOpen] = useState(false)

  useEffect(() => {
    if (!id) return

    // Busca disciplina
    supabase
      .from('disciplines')
      .select('*')
      .eq('id', id)
      .single()
      .then(({ data }) => { if (data) setDiscipline(data) })

    // Busca módulos + aulas
    supabase
      .from('modules')
      .select('*, lessons(*)')
      .eq('discipline_id', id)
      .order('order_index')
      .then(({ data }) => {
        if (data) {
          // Ordena as aulas dentro de cada módulo
          const sorted = data.map((m) => ({
            ...m,
            lessons: (m.lessons ?? []).sort(
              (a: Lesson, b: Lesson) => a.order_index - b.order_index
            ),
          }))
          setModules(sorted)
        }
      })
  }, [id])

  const color = discipline?.color ?? '#0A84FF'

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 max-w-4xl mx-auto space-y-6"
    >
      {/* Botão voltar */}
      <button
        className="flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft size={16} />
        Voltar
      </button>

      {/* Header da disciplina */}
      {discipline && (
        <div
          className="rounded-2xl p-6 flex items-start gap-4"
          style={{ background: `${color}15`, border: `1px solid ${color}30` }}
        >
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shrink-0"
            style={{ background: `${color}20` }}
          >
            {discipline.icon ?? '📚'}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[var(--text-primary)]">{discipline.name}</h2>
            {discipline.description && (
              <p className="text-[var(--text-secondary)] text-sm mt-1">{discipline.description}</p>
            )}
            {/* Barra de progresso da disciplina */}
            <div className="mt-3 flex items-center gap-2">
              <div className="h-1.5 w-40 bg-[var(--bg-tertiary)] rounded-full overflow-hidden">
                <div className="h-full w-0 rounded-full" style={{ background: color }} />
              </div>
              <span className="text-xs text-[var(--text-tertiary)]">0% concluído</span>
            </div>
          </div>
        </div>
      )}

      {/* Lista de módulos */}
      {modules.length > 0 ? (
        <div className="space-y-3">
          {modules.map((mod) => (
            <ModuleCard
              key={mod.id}
              module={mod}
              disciplineColor={color}
              totalCount={mod.lessons?.length ?? 0}
              completedCount={0}
              onLessonClick={(lesson) => {
                setSelectedLesson(lesson)
              }}
            />
          ))}
        </div>
      ) : (
        <div className="glass rounded-2xl p-8 text-center">
          <p className="text-4xl mb-3">📦</p>
          <p className="font-semibold text-[var(--text-primary)]">Nenhum módulo encontrado</p>
          <p className="text-sm text-[var(--text-secondary)] mt-1">
            Execute o <code className="text-bigsur-blue">seed.sql</code> no Supabase para popular o conteúdo.
          </p>
        </div>
      )}

      {/* Modal de exercícios */}
      {selectedLesson && (
        <ExerciseGenerator
          lessonTitle={selectedLesson.title}
          disciplineName={discipline?.name ?? ''}
          isOpen={exerciseOpen}
          onClose={() => setExerciseOpen(false)}
        />
      )}

      {/* Modal de onde estudar */}
      {selectedLesson && (
        <WhereToStudy
          lessonTitle={selectedLesson.title}
          isOpen={whereOpen}
          onClose={() => setWhereOpen(false)}
        />
      )}

      {/* Painel de ações da aula selecionada */}
      {selectedLesson && !exerciseOpen && !whereOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 glass-dark rounded-2xl px-5 py-3 flex items-center gap-3 shadow-2xl"
        >
          <span className="text-sm text-white/70 mr-1">{selectedLesson.title}</span>
          <button
            className="text-xs px-3 py-1.5 rounded-xl bg-bigsur-blue/20 text-bigsur-blue hover:bg-bigsur-blue/30 transition-colors"
            onClick={() => setWhereOpen(true)}
          >
            📍 Onde estudar
          </button>
          <button
            className="text-xs px-3 py-1.5 rounded-xl bg-bigsur-purple/20 text-bigsur-purple hover:bg-bigsur-purple/30 transition-colors"
            onClick={() => setExerciseOpen(true)}
          >
            ✏️ Praticar
          </button>
          <button
            className="text-xs text-white/40 hover:text-white/70 transition-colors"
            onClick={() => setSelectedLesson(null)}
          >
            ✕
          </button>
        </motion.div>
      )}
    </motion.div>
  )
}
