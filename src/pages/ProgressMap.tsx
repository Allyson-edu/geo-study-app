import { motion } from 'framer-motion'

// Dados mockados das disciplinas do pré-curso
const DISCIPLINES = [
  {
    id: 'matematica',
    name: 'Matemática',
    emoji: '📐',
    color: '#0A84FF',
    progress: 0,
    modules: [
      { id: 'm1', name: 'Álgebra', status: 'locked' as const },
      { id: 'm2', name: 'Geometria', status: 'locked' as const },
      { id: 'm3', name: 'Cálculo', status: 'locked' as const },
    ],
  },
  {
    id: 'fisica',
    name: 'Física',
    emoji: '⚡',
    color: '#FF9F0A',
    progress: 0,
    modules: [
      { id: 'f1', name: 'Mecânica', status: 'locked' as const },
      { id: 'f2', name: 'Termodinâmica', status: 'locked' as const },
      { id: 'f3', name: 'Ondas', status: 'locked' as const },
    ],
  },
  {
    id: 'quimica',
    name: 'Química',
    emoji: '🧪',
    color: '#30D158',
    progress: 0,
    modules: [
      { id: 'q1', name: 'Org. Básica', status: 'locked' as const },
      { id: 'q2', name: 'Inorgânica', status: 'locked' as const },
      { id: 'q3', name: 'Físico-Química', status: 'locked' as const },
    ],
  },
  {
    id: 'geologia',
    name: 'Geologia',
    emoji: '🪨',
    color: '#FF375F',
    progress: 0,
    modules: [
      { id: 'g1', name: 'Minerais', status: 'locked' as const },
      { id: 'g2', name: 'Rochas', status: 'locked' as const },
      { id: 'g3', name: 'Estratigrafia', status: 'locked' as const },
    ],
  },
  {
    id: 'biologia',
    name: 'Biologia',
    emoji: '🌿',
    color: '#5AC8FA',
    progress: 0,
    modules: [
      { id: 'b1', name: 'Ecologia', status: 'locked' as const },
      { id: 'b2', name: 'Evolução', status: 'locked' as const },
      { id: 'b3', name: 'Fisiologia', status: 'locked' as const },
    ],
  },
  {
    id: 'redacao',
    name: 'Redação',
    emoji: '✍️',
    color: '#BF5AF2',
    progress: 0,
    modules: [
      { id: 'r1', name: 'Argumentação', status: 'locked' as const },
      { id: 'r2', name: 'Coesão', status: 'locked' as const },
      { id: 'r3', name: 'Dissertação', status: 'locked' as const },
    ],
  },
]

const CENTER = { x: 400, y: 300 }
const DISC_RADIUS = 190

// Posição em círculo ao redor do centro
function circlePos(index: number, total: number, r: number) {
  const angle = (index / total) * 2 * Math.PI - Math.PI / 2
  return {
    x: CENTER.x + r * Math.cos(angle),
    y: CENTER.y + r * Math.sin(angle),
  }
}

// Posição dos módulos em mini-círculo ao redor da disciplina
function modulePos(discPos: { x: number; y: number }, index: number, total: number, r = 55) {
  const angleOffset = (index / total) * 2 * Math.PI
  return {
    x: discPos.x + r * Math.cos(angleOffset),
    y: discPos.y + r * Math.sin(angleOffset),
  }
}

// Arco SVG para progresso do nó de disciplina
function progressArc(cx: number, cy: number, r: number, progress: number, color: string) {
  if (progress <= 0) return null
  const angle = (progress / 100) * 2 * Math.PI
  const x1 = cx + r * Math.sin(0)
  const y1 = cy - r * Math.cos(0)
  const x2 = cx + r * Math.sin(angle)
  const y2 = cy - r * Math.cos(angle)
  const large = angle > Math.PI ? 1 : 0
  return (
    <path
      d={`M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2}`}
      fill="none"
      stroke={color}
      strokeWidth={4}
      strokeLinecap="round"
      opacity={0.9}
    />
  )
}

export default function ProgressMap() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 max-w-5xl mx-auto"
    >
      {/* Header */}
      <div className="mb-6">
        <h2
          className="text-2xl font-bold"
          style={{
            background: 'var(--gradient-primary)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          🗺️ Mapa de Progresso
        </h2>
        <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
          Visualize sua jornada pelas disciplinas do pré-curso.
        </p>
      </div>

      {/* Container do mapa SVG */}
      <div
        className="rounded-2xl overflow-hidden relative"
        style={{
          background: 'var(--bg-card)',
          backdropFilter: 'blur(20px)',
          border: '1px solid var(--border-color)',
          boxShadow: 'var(--shadow-card)',
        }}
      >
        {/* Grid de pontos no fundo */}
        <svg
          width="100%"
          viewBox="0 0 800 600"
          className="w-full"
          style={{ display: 'block', minHeight: 400 }}
        >
          <defs>
            {/* Padrão de pontos */}
            <pattern id="dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="rgba(255,255,255,0.06)" />
            </pattern>
            {/* Gradientes de cada disciplina */}
            {DISCIPLINES.map((d) => (
              <radialGradient key={d.id} id={`grad-${d.id}`} cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor={d.color} stopOpacity="0.3" />
                <stop offset="100%" stopColor={d.color} stopOpacity="0" />
              </radialGradient>
            ))}
          </defs>

          {/* Fundo com pontos */}
          <rect width="800" height="600" fill="url(#dots)" />

          {/* Linhas de conexão disciplina → centro */}
          {DISCIPLINES.map((disc, i) => {
            const pos = circlePos(i, DISCIPLINES.length, DISC_RADIUS)
            return (
              <line
                key={disc.id + '-center'}
                x1={CENTER.x}
                y1={CENTER.y}
                x2={pos.x}
                y2={pos.y}
                stroke="rgba(255,255,255,0.1)"
                strokeWidth={1.5}
                strokeDasharray="6 4"
              />
            )
          })}

          {/* Linhas de conexão disciplina → módulos */}
          {DISCIPLINES.map((disc, i) => {
            const dPos = circlePos(i, DISCIPLINES.length, DISC_RADIUS)
            return disc.modules.map((mod, j) => {
              const mPos = modulePos(dPos, j, disc.modules.length)
              return (
                <line
                  key={mod.id + '-line'}
                  x1={dPos.x}
                  y1={dPos.y}
                  x2={mPos.x}
                  y2={mPos.y}
                  stroke={disc.color + '44'}
                  strokeWidth={1}
                  strokeDasharray="4 3"
                />
              )
            })
          })}

          {/* Nó central */}
          <g>
            <circle cx={CENTER.x} cy={CENTER.y} r={38} fill="var(--bg-secondary)" />
            <circle
              cx={CENTER.x}
              cy={CENTER.y}
              r={38}
              fill="none"
              stroke="rgba(10,132,255,0.4)"
              strokeWidth={2}
            />
            <text
              x={CENTER.x}
              y={CENTER.y - 4}
              textAnchor="middle"
              fill="white"
              fontSize={20}
            >
              🌍
            </text>
            <text
              x={CENTER.x}
              y={CENTER.y + 14}
              textAnchor="middle"
              fill="rgba(255,255,255,0.7)"
              fontSize={9}
              fontWeight="600"
            >
              GeoStudy
            </text>
          </g>

          {/* Nós de disciplina */}
          {DISCIPLINES.map((disc, i) => {
            const pos = circlePos(i, DISCIPLINES.length, DISC_RADIUS)
            return (
              <g key={disc.id}>
                {/* Aura */}
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={52}
                  fill={`url(#grad-${disc.id})`}
                />
                {/* Círculo principal */}
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={36}
                  fill="var(--bg-secondary)"
                />
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={36}
                  fill="none"
                  stroke={disc.color}
                  strokeWidth={2}
                  strokeOpacity={0.6}
                />
                {/* Arco de progresso */}
                {progressArc(pos.x, pos.y, 36, disc.progress, disc.color)}
                {/* Emoji */}
                <text
                  x={pos.x}
                  y={pos.y + 6}
                  textAnchor="middle"
                  fontSize={22}
                  style={{ userSelect: 'none' }}
                >
                  {disc.emoji}
                </text>
                {/* Nome */}
                <text
                  x={pos.x}
                  y={pos.y + 52}
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.8)"
                  fontSize={11}
                  fontWeight="600"
                >
                  {disc.name}
                </text>
                {/* % progresso */}
                <text
                  x={pos.x}
                  y={pos.y + 64}
                  textAnchor="middle"
                  fill={disc.color}
                  fontSize={9}
                >
                  {disc.progress}%
                </text>

                {/* Módulos */}
                {disc.modules.map((mod, j) => {
                  const mPos = modulePos(pos, j, disc.modules.length)
                  const isCompleted = (mod.status as string) === 'completed'
                  return (
                    <g key={mod.id}>
                      <circle
                        cx={mPos.x}
                        cy={mPos.y}
                        r={16}
                        fill={isCompleted ? disc.color : 'var(--bg-tertiary)'}
                        stroke={isCompleted ? disc.color : disc.color + '55'}
                        strokeWidth={1.5}
                      />
                      {isCompleted ? (
                        <text
                          x={mPos.x}
                          y={mPos.y + 5}
                          textAnchor="middle"
                          fill="white"
                          fontSize={12}
                        >
                          ✓
                        </text>
                      ) : (
                        <text
                          x={mPos.x}
                          y={mPos.y + 5}
                          textAnchor="middle"
                          fill="rgba(255,255,255,0.3)"
                          fontSize={10}
                        >
                          🔒
                        </text>
                      )}
                    </g>
                  )
                })}
              </g>
            )
          })}
        </svg>
      </div>

      {/* Legenda */}
      <div className="mt-4 flex flex-wrap gap-3">
        {DISCIPLINES.map((d) => (
          <div key={d.id} className="flex items-center gap-1.5">
            <div
              className="w-3 h-3 rounded-full"
              style={{ background: d.color }}
            />
            <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
              {d.emoji} {d.name}
            </span>
          </div>
        ))}
      </div>

      <p className="text-xs mt-3" style={{ color: 'var(--text-tertiary)' }}>
        * O mapa será atualizado automaticamente conforme você avança no Pré-Curso.
      </p>
    </motion.div>
  )
}
