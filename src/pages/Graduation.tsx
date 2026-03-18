import { motion } from 'framer-motion'
import CountdownToCourse from '@/components/dashboard/CountdownToCourse'

export default function Graduation() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 max-w-5xl mx-auto space-y-6"
    >
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-[var(--text-primary)]">🏛️ Graduação — UFPE Geologia</h2>
        <p className="text-[var(--text-secondary)] text-sm mt-1">
          Curso de Geologia · Universidade Federal de Pernambuco
        </p>
      </div>

      {/* Seletor de semestre (placeholder) */}
      <div className="flex gap-2">
        {['1º Sem', '2º Sem', '3º Sem', '4º Sem'].map((sem, i) => (
          <button
            key={sem}
            className={`px-4 py-1.5 text-sm font-bold uppercase tracking-wider transition-all ${
              i === 0
                ? 'text-white'
                : 'text-[var(--text-muted)] opacity-40 cursor-not-allowed'
            }`}
            style={i === 0 ? { background: '#1A4DAB', border: '2px solid #1A1A1A' } : { background: '#EBEBEB', border: '1px solid #D0CCC4' }}
            disabled={i !== 0}
          >
            {sem}
          </button>
        ))}
      </div>

      {/* Estado vazio elegante */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="p-10 text-center"
        style={{ background: '#FFFFFF', border: '2px solid #1A1A1A', boxShadow: '4px 4px 0 #1A1A1A' }}
      >
        <div className="text-6xl mb-4">🎓</div>
        <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">
          Seu 1º semestre começa em 03/08/2026!
        </h3>
        <p className="text-[var(--text-secondary)] text-sm max-w-md mx-auto">
          As disciplinas da graduação serão adicionadas quando o semestre começar.
          Por enquanto, foque no pré-curso para chegar preparado! 💪
        </p>
      </motion.div>

      {/* Countdown reutilizado */}
      <CountdownToCourse />

      {/* Grid placeholder para disciplinas futuras */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 opacity-30 pointer-events-none">
        {['Mineralogia', 'Petrografia', 'Geologia Estrutural', 'Paleontologia', 'Geoquímica', 'Geofísica'].map((name) => (
          <div key={name} className="p-5" style={{ background: '#FFFFFF', border: '1px solid #D0CCC4' }}>
            <div className="w-10 h-10 mb-3" style={{ background: '#EBEBEB', border: '1px solid #D0CCC4' }} />
            <div className="h-4 bg-[#EBEBEB] border border-[#D0CCC4] w-3/4 mb-2" />
            <div className="h-3 bg-[#EBEBEB] border border-[#D0CCC4] w-1/2" />
            <p className="text-xs text-[var(--text-tertiary)] mt-2">{name}</p>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
