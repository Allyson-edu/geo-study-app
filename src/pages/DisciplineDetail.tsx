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

  // Cor sólida da disciplina — usar como acento Bauhaus
  const accentColor = discipline?.color ?? '#1A4DAB'

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 max-w-4xl mx-auto space-y-6"
    >
      {/* Botão voltar */}
      <button
        className="flex items-center gap-2 text-sm transition-colors"
        style={{ color: 'var(--text-secondary)' }}
        onClick={() => navigate(-1)}
      >
        <ArrowLeft size={16} />
        Voltar
      </button>

      {/* Header da disciplina — card flat com faixa colorida na borda esquerda */}
      {discipline && (
        <div
          className="p-6 flex items-start gap-4"
          style={{
            background: '#FFFFFF',
            border: '2px solid #1A1A1A',
            borderLeft: `8px solid ${accentColor}`,
            boxShadow: '4px 4px 0 #1A1A1A',
          }}
        >
          {/* Ícone — quadrado com cor sólida */}
          <div
            className="w-14 h-14 flex items-center justify-center text-3xl shrink-0"
            style={{
              background: accentColor,
              border: '2px solid #1A1A1A',
            }}
          >
            {discipline.icon ?? '📚'}
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold" style={{ color: '#1A1A1A' }}>
              {discipline.name}
            </h2>
            {discipline.description && (
              <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
                {discipline.description}
              </p>
            )}
            {/* Barra de progresso flat */}
            <div className="mt-3 flex items-center gap-2">
              <div
                className="overflow-hidden"
                style={{ height: 8, width: 160, background: '#EBEBEB', border: '1px solid #D0CCC4' }}
              >
                <div style={{ height: '100%', width: '0%', background: accentColor }} />
              </div>
              <span className="text-xs" style={{ color: 'var(--text-muted)' }}>0% concluído</span>
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
              disciplineColor={accentColor}
              totalCount={mod.lessons?.length ?? 0}
              completedCount={0}
              onLessonClick={(lesson) => {
                setSelectedLesson(lesson)
              }}
            />
          ))}
        </div>
      ) : (
        <div
          className="p-8 text-center"
          style={{ background: '#FFFFFF', border: '2px solid #1A1A1A', boxShadow: '3px 3px 0 #1A1A1A' }}
        >
          <p className="text-4xl mb-3">📦</p>
          <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>Nenhum módulo encontrado</p>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
            Execute o <code style={{ color: '#1A4DAB', fontWeight: 700 }}>seed.sql</code> no Supabase para popular o conteúdo.
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

      {/* Painel de ações da aula selecionada — flat Bauhaus */}
      {selectedLesson && !exerciseOpen && !whereOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 px-5 py-3 flex items-center gap-3"
          style={{
            background: '#1A1A1A',
            border: '2px solid #1A1A1A',
            boxShadow: '4px 4px 0 #D62B2B',
          }}
        >
          <span className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.7)', marginRight: 4 }}>
            {selectedLesson.title}
          </span>
          <button
            className="text-xs px-3 py-1.5 font-medium transition-all"
            style={{
              background: '#F5C400',
              border: '2px solid #F5C400',
              color: '#1A1A1A',
            }}
            onClick={() => setWhereOpen(true)}
          >
            📍 Onde estudar
          </button>
          <button
            className="text-xs px-3 py-1.5 font-medium transition-all"
            style={{
              background: '#1A4DAB',
              border: '2px solid #1A4DAB',
              color: '#FFFFFF',
            }}
            onClick={() => setExerciseOpen(true)}
          >
            ✏️ Praticar
          </button>
          <button
            className="text-xs font-medium transition-colors"
            style={{ color: 'rgba(255,255,255,0.5)' }}
            onClick={() => setSelectedLesson(null)}
          >
            ✕
          </button>
        </motion.div>
      )}
    </motion.div>
  )
}
