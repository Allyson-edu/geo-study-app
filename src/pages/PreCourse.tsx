import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase'

interface Discipline {
  id: string
  name: string
  description: string | null
  icon: string | null
  color: string | null
  order_index: number
}

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07 } },
}

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
}

export default function PreCourse() {
  const navigate = useNavigate()
  const [disciplines, setDisciplines] = useState<Discipline[]>([])

  useEffect(() => {
    supabase
      .from('disciplines')
      .select('*')
      .eq('area', 'pre_course')
      .order('order_index')
      .then(({ data }) => {
        if (data) setDisciplines(data)
      })
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
        <h2 className="text-2xl font-bold" style={{ color: '#1A1A1A' }}>🎓 Preparação Pré-Curso</h2>
        <p className="text-[var(--text-secondary)] text-sm mt-1">
          6 disciplinas para você chegar preparado à UFPE
        </p>

        {/* Barra de progresso geral */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-xs text-[var(--text-tertiary)] mb-1">
            <span>Progresso geral</span>
            <span>0%</span>
          </div>
          <div className="h-2 bg-[#EBEBEB] border border-[#D0CCC4] overflow-hidden">
            <motion.div
              className="h-full"
              style={{ background: '#1A4DAB', width: '0%' }}
              initial={{ width: 0 }}
              animate={{ width: '0%' }}
            />
          </div>
        </div>
      </motion.div>

      {/* Grid de disciplinas */}
      <motion.div variants={container} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {disciplines.length > 0 ? disciplines.map((d) => (
          <motion.div
            key={d.id}
            variants={item}
            whileHover={{ y: -2, boxShadow: `6px 6px 0 #1A1A1A` }}
            className="p-5 cursor-pointer"
            style={{ background: '#FFFFFF', border: '2px solid #1A1A1A', boxShadow: '3px 3px 0 #1A1A1A' }}
            onClick={() => navigate(`/disciplina/${d.id}`)}
          >
            <div
              className="w-12 h-12 flex items-center justify-center text-2xl mb-3"
              style={{ background: `${d.color ?? '#1A4DAB'}20`, border: `2px solid ${d.color ?? '#1A4DAB'}` }}
            >
              {d.icon ?? '📚'}
            </div>
            <h3 className="font-bold text-[var(--text-primary)]">{d.name}</h3>
            {d.description && (
              <p className="text-xs text-[var(--text-secondary)] mt-1 line-clamp-2">{d.description}</p>
            )}
            <div className="mt-3 h-1.5 bg-[#EBEBEB] border border-[#D0CCC4] overflow-hidden">
              <div
                className="h-full"
                style={{ background: d.color ?? '#1A4DAB', width: '0%' }}
              />
            </div>
            <p className="text-xs text-[var(--text-tertiary)] mt-1">0% concluído</p>
          </motion.div>
        )) : (
          /* Estado vazio — sem conexão com Supabase */
          <motion.div variants={item} className="col-span-full p-8 text-center" style={{ background: '#FFFFFF', border: '2px solid #1A1A1A', boxShadow: '3px 3px 0 #1A1A1A' }}>
            <p className="text-4xl mb-3">🔌</p>
            <p className="font-semibold text-[var(--text-primary)]">Configure o Supabase</p>
            <p className="text-sm text-[var(--text-secondary)] mt-1">
              Adicione suas credenciais no <code className="text-bigsur-blue">.env.local</code> e rode o <code className="text-bigsur-blue">seed.sql</code> para ver as disciplinas.
            </p>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  )
}
