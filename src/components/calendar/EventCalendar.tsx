import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Trash2, Plus, X } from 'lucide-react'
import { useCalendarStore, type CalendarEvent } from '@/store/calendarStore'

// Calcula dias/horas/minutos até uma data (usa hora local — correto para app pessoal)
function getTimeUntil(dateStr: string) {
  const target = new Date(dateStr + 'T00:00:00') // meia-noite local
  const now = new Date()
  const diff = target.getTime() - now.getTime()
  if (diff <= 0) return null
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  return { days, hours, minutes }
}

// Formata data em português: "03 de agosto de 2026"
function formatDatePT(dateStr: string): string {
  const [year, month, day] = dateStr.split('-').map(Number)
  const months = [
    'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
    'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro',
  ]
  return `${day.toString().padStart(2, '0')} de ${months[month - 1]} de ${year}`
}

// Verifica se uma data já passou (fim do dia local)
function isPast(dateStr: string): boolean {
  return new Date(dateStr + 'T23:59:59') < new Date() // fim do dia local
}

// Modal para adicionar evento
function AddEventModal({ onClose }: { onClose: () => void }) {
  const addEvent = useCalendarStore((s) => s.addEvent)
  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [emoji, setEmoji] = useState('📅')
  const [color, setColor] = useState('#0A84FF')

  const colors = ['#0A84FF', '#BF5AF2', '#FF9F0A', '#30D158', '#FF375F', '#5AC8FA']

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim() || !date) return
    addEvent({ title: title.trim(), date, emoji, color, isFeatured: false })
    onClose()
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(26, 26, 26, 0.7)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="p-6 w-full max-w-md"
        style={{
          background: '#FFFFFF',
          border: '2px solid #1A1A1A',
          boxShadow: '6px 6px 0 #1A1A1A',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-bold text-base" style={{ color: 'var(--text-primary)' }}>
            ➕ Novo Evento
          </h3>
          <button onClick={onClose} style={{ color: 'var(--text-tertiary)' }}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Título */}
          <div>
            <label className="text-xs font-medium mb-1 block" style={{ color: 'var(--text-secondary)' }}>
              Título do evento
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Prova de Cálculo"
              className="w-full px-3 py-2 text-sm outline-none"
              style={{
                background: '#F5F0E8',
                border: '2px solid #1A1A1A',
                color: '#1A1A1A',
              }}
              required
            />
          </div>

          {/* Data */}
          <div>
            <label className="text-xs font-medium mb-1 block" style={{ color: 'var(--text-secondary)' }}>
              Data
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 text-sm outline-none"
              style={{
                background: '#F5F0E8',
                border: '2px solid #1A1A1A',
                color: '#1A1A1A',
              }}
              required
            />
          </div>

          {/* Emoji */}
          <div>
            <label className="text-xs font-medium mb-1 block" style={{ color: 'var(--text-secondary)' }}>
              Emoji
            </label>
            <input
              type="text"
              value={emoji}
              onChange={(e) => setEmoji(e.target.value)}
              className="w-24 px-3 py-2 text-sm outline-none text-center"
              style={{
                background: '#F5F0E8',
                border: '2px solid #1A1A1A',
                color: '#1A1A1A',
              }}
            />
          </div>

          {/* Cor */}
          <div>
            <label className="text-xs font-medium mb-2 block" style={{ color: 'var(--text-secondary)' }}>
              Cor
            </label>
            <div className="flex gap-2">
              {colors.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  className="w-7 h-7 transition-transform"
                  style={{
                    background: c,
                    transform: color === c ? 'scale(1.25)' : 'scale(1)',
                    border: color === c ? `2px solid #1A1A1A` : '2px solid transparent',
                  }}
                />
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 font-bold text-sm text-white uppercase tracking-wider"
            style={{ background: '#1A4DAB', border: '2px solid #1A1A1A', boxShadow: '3px 3px 0 #1A1A1A' }}
          >
            Adicionar Evento
          </button>
        </form>
      </motion.div>
    </motion.div>
  )
}

export default function EventCalendar() {
  const { events, removeEvent, setFeatured, getFeaturedEvent } = useCalendarStore()
  const [showModal, setShowModal] = useState(false)
  const [tick, setTick] = useState(0)

  // Atualiza a cada minuto para o contador
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 60000)
    return () => clearInterval(id)
  }, [])

  const featured = getFeaturedEvent()
  const timeUntil = featured ? getTimeUntil(featured.date) : null
  const otherEvents = events.filter((e) => !e.isFeatured)

  return (
    <div className="card-btn variant-amber p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span style={{ color: 'var(--geo-amber)' }}>📅</span>
          <h3 className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>
            Calendário de Eventos
          </h3>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="btn-amber flex items-center gap-1 text-xs px-2.5 py-1.5"
        >
          <Plus size={13} /> Adicionar
        </button>
      </div>

      {/* Evento destaque */}
      {featured && (
        <motion.div
          key={featured.id + tick}
          className="p-4 mb-4"
          style={{
            background: '#F5F0E8',
            border: `1px solid #D0CCC4`,
            borderLeft: `4px solid ${featured.color}`,
          }}
        >
          <p className="text-xs font-semibold mb-3" style={{ color: featured.color }}>
            ⭐ EVENTO DESTAQUE
          </p>

          <div className="flex items-start gap-3">
            <span className="text-2xl">{featured.emoji}</span>
            <div className="flex-1">
              <p className="font-semibold text-sm mb-2" style={{ color: 'var(--text-primary)' }}>
                {featured.title}
              </p>

              {timeUntil ? (
                <>
                  <motion.p
                    className="font-bold"
                    style={{ fontSize: 48, lineHeight: 1, color: '#1A1A1A' }}
                    animate={{ opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    {timeUntil.days}
                  </motion.p>
                  <p className="text-xs font-medium mt-0.5" style={{ color: 'var(--text-secondary)' }}>
                    dias · {timeUntil.hours}h {timeUntil.minutes.toString().padStart(2, '0')}min restantes
                  </p>
                  <p className="text-xs mt-1" style={{ color: 'var(--text-tertiary)' }}>
                    {formatDatePT(featured.date)}
                  </p>
                </>
              ) : (
                <p className="text-sm font-medium" style={{ color: 'var(--text-tertiary)' }}>
                  Este evento já passou.
                </p>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* Outros eventos */}
      {otherEvents.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-medium mb-2" style={{ color: 'var(--text-tertiary)' }}>
            Outros eventos
          </p>
          {otherEvents.map((event: CalendarEvent) => {
            const past = isPast(event.date)
            return (
              <div
                key={event.id}
                className="flex items-center gap-2 px-3 py-2"
                style={{
                  background: '#F5F0E8',
                  border: '1px solid #D0CCC4',
                  opacity: past ? 0.5 : 1,
                }}
              >
                <span className="text-base shrink-0">{event.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p
                    className="text-xs font-medium truncate"
                    style={{
                      color: 'var(--text-primary)',
                      textDecoration: past ? 'line-through' : 'none',
                    }}
                  >
                    {event.title}
                  </p>
                  <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
                    {formatDatePT(event.date)}
                  </p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => setFeatured(event.id)}
                    title="Definir como destaque"
                    className="p-1.5 transition-colors"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    <Star size={14} />
                  </button>
                  <button
                    onClick={() => removeEvent(event.id)}
                    title="Remover evento"
                    className="p-1.5 transition-colors"
                    style={{ color: '#D62B2B' }}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {events.length === 0 && (
        <p className="text-xs text-center py-4" style={{ color: 'var(--text-tertiary)' }}>
          Nenhum evento cadastrado ainda.
        </p>
      )}

      {/* Modal */}
      <AnimatePresence>
        {showModal && <AddEventModal onClose={() => setShowModal(false)} />}
      </AnimatePresence>
    </div>
  )
}
