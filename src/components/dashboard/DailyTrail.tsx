import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useStudyStore } from '@/store/studyStore'
import { useActiveModuleStore } from '@/store/activeModuleStore'
import { disciplines } from '@/data/disciplinesData'

export default function DailyTrail() {
  const navigate = useNavigate()
  const { getRecommendedDiscipline, getDaysSinceStudied } = useStudyStore()
  const { activeModule } = useActiveModuleStore()

  const recommendedId = getRecommendedDiscipline(activeModule)
  const discipline = disciplines.find((d) => d.id === recommendedId)
  const daysSince = getDaysSinceStudied()

  if (!discipline) return null

  const subtext =
    daysSince === 0
      ? 'Você já estudou hoje, continue assim! 🔥'
      : daysSince === 1
        ? 'Você estudou ontem, continue!'
        : daysSince === Infinity
          ? 'Comece hoje e inicie sua jornada! 🚀'
          : `${daysSince} dias sem estudar esta matéria`

  const priorityColor = {
    URGENTE: '#D62B2B',
    ALTA: '#D68B2B',
    MÉDIA: '#D6C02B',
  }[discipline.priority]

  return (
    <div
      style={{
        background: '#1A1A1A',
        border: '3px solid #1A1A1A',
        boxShadow: '4px 4px 0 #D62B2B',
        padding: '20px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16,
        flexWrap: 'wrap',
      }}
    >
      <div style={{ flex: 1, minWidth: 200 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <div style={{ width: 8, height: 8, background: '#D62B2B', flexShrink: 0 }} />
          <p style={{ fontSize: 11, fontWeight: 700, color: '#9A9A9A', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Estude Hoje
          </p>
        </div>

        <p style={{ fontSize: 18, fontWeight: 800, color: '#FFFFFF', lineHeight: 1.2, marginBottom: 6 }}>
          {discipline.name}
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <span
            style={{
              fontSize: 10,
              fontWeight: 800,
              color: '#FFFFFF',
              background: priorityColor,
              padding: '2px 8px',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
            }}
          >
            {discipline.priority}
          </span>
          <span style={{ fontSize: 12, color: '#9A9A9A' }}>{subtext}</span>
        </div>
      </div>

      <button
        onClick={() => navigate(activeModule === 'pre' ? '/pre-curso' : '/graduacao')}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '12px 20px',
          background: '#D62B2B',
          color: '#FFFFFF',
          border: '2px solid #FFFFFF',
          borderRadius: 0,
          fontSize: 13,
          fontWeight: 700,
          cursor: 'pointer',
          textTransform: 'uppercase',
          letterSpacing: '0.04em',
          whiteSpace: 'nowrap',
          flexShrink: 0,
        }}
      >
        Começar Agora
        <ArrowRight size={16} />
      </button>
    </div>
  )
}
