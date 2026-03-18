import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Trash2, Plus, X } from 'lucide-react'
import { useCalendarStore, type CalendarEvent } from '@/store/calendarStore'

function getTimeUntil(dateStr: string) {
  const target = new Date(dateStr + 'T00:00:00')
  const now = new Date()
  const diff = target.getTime() - now.getTime()
  if (diff <= 0) return null
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  return { days, hours, minutes }
}

function formatDatePT(dateStr: string): string {
  const [year, month, day] = dateStr.split('-').map(Number)
  const months = ['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro']
  return `${day.toString().padStart(2, '0')} de ${months[month - 1]} de ${year}`
}

function isPast(dateStr: string): boolean {
  return new Date(dateStr + 'T23:59:59') < new Date()
}

function AddEventModal({ onClose }: { onClose: () => void }) {
  const addEvent = useCalendarStore((s) => s.addEvent)
  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [emoji, setEmoji] = useState('📅')
  const [color, setColor] = useState('#1A4DAB')

  const colors = ['#1A4DAB', '#D62B2B', '#F5C400', '#1A1A1A', '#5C5C5C', '#9A9A9A']

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim() || !date) return
    addEvent({ title: title.trim(), date, emoji, color, isFeatured: false })
    onClose()
  }

  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: 'fixed', inset: 0, zIndex: 9999,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: 16,
          background: 'rgba(26, 26, 26, 0.75)',
        }}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          style={{
            background: '#FFFFFF',
            border: '2px solid #1A1A1A',
            boxShadow: '6px 6px 0 #1A1A1A',
            padding: 24,
            width: '100%',
            maxWidth: 440,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <h3 style={{ fontWeight: 700, fontSize: 15, color: '#1A1A1A' }}>Novo Evento</h3>
            <button onClick={onClose} style={{ color: '#9A9A9A', lineHeight: 0 }}>
              <X size={18} />
            </button>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{ fontSize: 11, fontWeight: 700, color: '#5C5C5C', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: 6 }}>
                Título do evento
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex: Prova de Cálculo"
                style={{ width: '100%', padding: '8px 12px', fontSize: 13, outline: 'none', background: '#F5F0E8', border: '2px solid #1A1A1A', color: '#1A1A1A' }}
                required
              />
            </div>

            <div>
              <label style={{ fontSize: 11, fontWeight: 700, color: '#5C5C5C', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: 6 }}>
                Data
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                style={{ width: '100%', padding: '8px 12px', fontSize: 13, outline: 'none', background: '#F5F0E8', border: '2px solid #1A1A1A', color: '#1A1A1A' }}
                required
              />
            </div>

            <div>
              <label style={{ fontSize: 11, fontWeight: 700, color: '#5C5C5C', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: 6 }}>
                Emoji
              </label>
              <input
                type="text"
                value={emoji}
                onChange={(e) => setEmoji(e.target.value)}
                style={{ width: 72, padding: '8px 12px', fontSize: 13, outline: 'none', background: '#F5F0E8', border: '2px solid #1A1A1A', color: '#1A1A1A', textAlign: 'center' }}
              />
            </div>

            <div>
              <label style={{ fontSize: 11, fontWeight: 700, color: '#5C5C5C', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: 8 }}>
                Cor Bauhaus
              </label>
              <div style={{ display: 'flex', gap: 8 }}>
                {colors.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setColor(c)}
                    style={{
                      width: 28, height: 28,
                      background: c,
                      border: color === c ? '2px solid #1A1A1A' : '2px solid transparent',
                      transform: color === c ? 'scale(1.2)' : 'scale(1)',
                      transition: 'transform 0.1s',
                    }}
                  />
                ))}
              </div>
            </div>

            <button
              type="submit"
              style={{
                background: '#1A4DAB',
                color: '#FFFFFF',
                border: '2px solid #1A1A1A',
                padding: '10px 0',
                fontWeight: 700,
                fontSize: 13,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                cursor: 'pointer',
                boxShadow: '3px 3px 0 #1A1A1A',
              }}
            >
              Adicionar Evento
            </button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  )
}

export default function EventCalendar() {
  const { events, removeEvent, setFeatured, getFeaturedEvent } = useCalendarStore()
  const [showModal, setShowModal] = useState(false)
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 60000)
    return () => clearInterval(id)
  }, [])

  const featured = getFeaturedEvent()
  const timeUntil = featured ? getTimeUntil(featured.date) : null
  const otherEvents = events.filter((e) => !e.isFeatured)

  return (
    <div style={{ background: '#FFFFFF', border: '2px solid #1A1A1A', boxShadow: '4px 4px 0 #1A1A1A' }}>
      {/* Faixa amarela topo */}
      <div style={{ height: 4, background: '#F5C400' }} />

      <div style={{ padding: 20 }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <h3 style={{ fontWeight: 700, fontSize: 14, color: '#1A1A1A', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span>📅</span> Calendário de Eventos
          </h3>
          <button
            onClick={() => setShowModal(true)}
            style={{
              display: 'flex', alignItems: 'center', gap: 4,
              background: '#1A4DAB', color: '#FFFFFF',
              border: '2px solid #1A1A1A',
              padding: '6px 12px',
              fontSize: 12, fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '2px 2px 0 #1A1A1A',
            }}
          >
            <Plus size={13} /> Adicionar
          </button>
        </div>

        {/* Evento destaque */}
        {featured && (
          <motion.div
            key={featured.id + tick}
            style={{
              background: '#F5F0E8',
              border: '1px solid #D0CCC4',
              borderLeft: `4px solid ${featured.color}`,
              padding: 16,
              marginBottom: 16,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <p style={{ fontSize: 10, fontWeight: 700, color: featured.color, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
                ⭐ Evento Destaque
              </p>
              <div style={{ display: 'flex', gap: 4 }}>
                <button
                  onClick={() => removeEvent(featured.id)}
                  title="Remover"
                  style={{ color: '#D62B2B', lineHeight: 0, padding: 4 }}
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
              <span style={{ fontSize: 24 }}>{featured.emoji}</span>
              <div>
                <p style={{ fontWeight: 600, fontSize: 13, color: '#1A1A1A', marginBottom: 8 }}>
                  {featured.title}
                </p>
                {timeUntil ? (
                  <>
                    <p style={{ fontWeight: 900, fontSize: 56, lineHeight: 1, color: '#D62B2B' }}>
                      {timeUntil.days}
                    </p>
                    <p style={{ fontSize: 11, fontWeight: 600, color: '#5C5C5C', marginTop: 2 }}>
                      dias · {timeUntil.hours}h {timeUntil.minutes.toString().padStart(2, '0')}min restantes
                    </p>
                    <p style={{ fontSize: 11, color: '#9A9A9A', marginTop: 2 }}>
                      {formatDatePT(featured.date)}
                    </p>
                  </>
                ) : (
                  <p style={{ fontSize: 13, color: '#9A9A9A' }}>Este evento já passou.</p>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Outros eventos */}
        {otherEvents.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <p style={{ fontSize: 10, fontWeight: 700, color: '#9A9A9A', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>
              Outros eventos
            </p>
            {otherEvents.map((event: CalendarEvent) => {
              const past = isPast(event.date)
              return (
                <div
                  key={event.id}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    padding: '8px 12px',
                    background: '#F5F0E8',
                    border: '1px solid #D0CCC4',
                    borderLeft: `3px solid ${event.color}`,
                    opacity: past ? 0.5 : 1,
                  }}
                >
                  <span style={{ fontSize: 16 }}>{event.emoji}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 12, fontWeight: 600, color: '#1A1A1A', textDecoration: past ? 'line-through' : 'none', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {event.title}
                    </p>
                    <p style={{ fontSize: 11, color: '#9A9A9A' }}>{formatDatePT(event.date)}</p>
                  </div>
                  <div style={{ display: 'flex', gap: 2 }}>
                    <button
                      onClick={() => setFeatured(event.id)}
                      title="Definir como destaque"
                      style={{ padding: 6, color: '#9A9A9A', lineHeight: 0 }}
                    >
                      <Star size={13} />
                    </button>
                    <button
                      onClick={() => removeEvent(event.id)}
                      title="Remover"
                      style={{ padding: 6, color: '#D62B2B', lineHeight: 0 }}
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {events.length === 0 && (
          <p style={{ fontSize: 12, color: '#9A9A9A', textAlign: 'center', padding: '16px 0' }}>
            Nenhum evento cadastrado ainda.
          </p>
        )}
      </div>

      {/* Modal via portal */}
      {showModal && <AddEventModal onClose={() => setShowModal(false)} />}
    </div>
  )
}