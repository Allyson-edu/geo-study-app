import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CalendarEvent {
  id: string
  title: string
  date: string // formato: 'YYYY-MM-DD'
  emoji: string
  color: string
  isFeatured: boolean
}

interface CalendarState {
  events: CalendarEvent[]
  addEvent: (event: Omit<CalendarEvent, 'id'>) => void
  removeEvent: (id: string) => void
  setFeatured: (id: string) => void
  getFeaturedEvent: () => CalendarEvent | undefined
}

export const useCalendarStore = create<CalendarState>()(
  persist(
    (set, get) => ({
      events: [
        {
          id: 'ufpe-start',
          title: 'Início das Aulas — UFPE Geologia',
          date: '2026-08-03',
          emoji: '🎓',
          color: '#0A84FF',
          isFeatured: true,
        },
        {
          id: 'matricula',
          title: 'Período de Matrícula',
          date: '2026-07-15',
          emoji: '📋',
          color: '#FF9F0A',
          isFeatured: false,
        },
      ],
      addEvent: (event) =>
        set((s) => ({
          events: [...s.events, { ...event, id: crypto.randomUUID() }],
        })),
      removeEvent: (id) =>
        set((s) => ({ events: s.events.filter((e) => e.id !== id) })),
      setFeatured: (id) =>
        set((s) => ({
          events: s.events.map((e) => ({ ...e, isFeatured: e.id === id })),
        })),
      getFeaturedEvent: () => get().events.find((e) => e.isFeatured),
    }),
    { name: 'geo-study-calendar' }
  )
)
