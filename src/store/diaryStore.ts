import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface DiaryEntry {
  id: string
  date: string // YYYY-MM-DD
  content: string
  mood: 1 | 2 | 3 | 4 | 5 // 1=😫 2=😐 3=🙂 4=😊 5=🤩
  timeStudied: number // minutos
  discovery: string
  createdAt: string
}

interface DiaryState {
  entries: DiaryEntry[]
  addEntry: (entry: Omit<DiaryEntry, 'id' | 'createdAt'>) => void
  getToday: () => DiaryEntry | undefined
  getLast30Days: () => { date: string; hasEntry: boolean; mood?: number }[]
}

function getTodayStr() {
  return new Date().toISOString().slice(0, 10)
}

export const useDiaryStore = create<DiaryState>()(
  persist(
    (set, get) => ({
      entries: [],
      addEntry: (entry) =>
        set((s) => ({
          entries: [
            ...s.entries.filter((e) => e.date !== entry.date),
            { ...entry, id: crypto.randomUUID(), createdAt: new Date().toISOString() },
          ],
        })),
      getToday: () => {
        const today = getTodayStr()
        return get().entries.find((e) => e.date === today)
      },
      getLast30Days: () => {
        const entries = get().entries
        const result: { date: string; hasEntry: boolean; mood?: number }[] = []
        for (let i = 29; i >= 0; i--) {
          const d = new Date()
          d.setDate(d.getDate() - i)
          const dateStr = d.toISOString().slice(0, 10)
          const entry = entries.find((e) => e.date === dateStr)
          result.push({
            date: dateStr,
            hasEntry: !!entry,
            mood: entry?.mood,
          })
        }
        return result
      },
    }),
    { name: 'geo-study-diary' }
  )
)
