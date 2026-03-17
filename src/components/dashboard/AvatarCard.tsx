import { motion } from 'framer-motion'

// Crystal SVG — quartzo/ametista animado flutuando
const CrystalSVG = () => (
  <svg
    width="80"
    height="100"
    viewBox="0 0 80 100"
    className="float-anim"
    style={{ filter: 'drop-shadow(0 8px 20px rgba(155,89,182,0.5))' }}
  >
    <defs>
      <linearGradient id="crystalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#9B59B6" />
        <stop offset="50%" stopColor="#2E86DE" />
        <stop offset="100%" stopColor="#9B59B6" />
      </linearGradient>
      <linearGradient id="crystalShine" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
        <stop offset="100%" stopColor="rgba(255,255,255,0)" />
      </linearGradient>
    </defs>
    {/* Corpo do cristal */}
    <polygon points="40,5 70,25 70,75 40,95 10,75 10,25" fill="url(#crystalGrad)" opacity="0.95" />
    {/* Faceta lateral direita */}
    <polygon points="40,5 70,25 70,75 40,50" fill="rgba(255,255,255,0.12)" />
    {/* Brilho diagonal */}
    <polygon points="20,20 45,10 50,30 25,40" fill="url(#crystalShine)" />
    {/* Arestas superiores */}
    <line x1="40" y1="5" x2="70" y2="25" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
    <line x1="40" y1="5" x2="10" y2="25" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
  </svg>
)

interface AvatarCardProps {
  level: number
  xp: number
  preCoursePercent?: number
  preCourseCompleted?: number
  preCourseTotal?: number
}

export default function AvatarCard({
  level,
  preCoursePercent = 0,
  preCourseCompleted = 0,
  preCourseTotal = 6,
}: AvatarCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="card-btn variant-purple rounded-2xl p-6 flex flex-col items-center gap-3"
    >
      {/* Cristal SVG animado */}
      <div className="w-32 h-32 flex items-center justify-center">
        <CrystalSVG />
      </div>

      {/* Nome em gradiente */}
      <div className="text-center">
        <p className="font-bold text-lg text-grad">Allyson</p>
        <p className="text-xs font-medium mt-0.5" style={{ color: 'var(--text-secondary)' }}>
          Nível {level}
        </p>
      </div>

      {/* Barra de progresso Pré-Curso */}
      <div className="w-full">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>
            Pré-Curso
          </span>
          <span className="text-xs font-bold text-grad-jade">
            {Math.round(preCoursePercent)}% concluído
          </span>
        </div>
        <div className="progress-track">
          <div
            className="progress-fill jade"
            style={{ width: `${Math.round(preCoursePercent)}%` }}
          />
        </div>
        <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
          {preCourseCompleted} de {preCourseTotal} disciplinas
        </p>
      </div>
    </motion.div>
  )
}
