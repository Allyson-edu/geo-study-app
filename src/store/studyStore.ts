import { create } from 'zustand'
import { supabase } from '../lib/supabase'
import { disciplines } from '../data/disciplinesData'

export interface LessonProgress {
  lesson_id: string
  discipline_id: string
  completed: boolean
  completed_at: string | null
  quiz_score: number | null
}

export interface StudySession {
  discipline_id: string
  lesson_id: string | null
  date: string
  duration_minutes: number
}

interface StudyStore {
  userId: string | null
  progress: LessonProgress[]
  sessions: StudySession[]
  isLoading: boolean

  loadUserData: (userId: string) => Promise<void>
  completeLesson: (disciplineId: string, lessonId: string) => Promise<void>
  saveQuizScore: (lessonId: string, score: number) => Promise<void>
  recordStudySession: (disciplineId: string, lessonId: string, durationMinutes: number) => Promise<void>

  getCurrentStreak: () => number
  getDaysSinceStudied: () => number
  getDisciplineProgress: (disciplineId: string) => number
  getLessonProgress: (lessonId: string) => LessonProgress | null
  getRecommendedDiscipline: (semester?: 'pre' | 'graduation') => string
}

export const useStudyStore = create<StudyStore>((set, get) => ({
  userId: null,
  progress: [],
  sessions: [],
  isLoading: false,

  loadUserData: async (userId: string) => {
    set({ isLoading: true, userId })

    const [{ data: progressData }, { data: sessionsData }] = await Promise.all([
      supabase
        .from('lesson_progress')
        .select('lesson_id, discipline_id, completed, completed_at, quiz_score')
        .eq('user_id', userId),
      supabase
        .from('study_sessions')
        .select('discipline_id, lesson_id, date, duration_minutes')
        .eq('user_id', userId)
        .order('date', { ascending: false }),
    ])

    set({
      progress: (progressData as LessonProgress[]) ?? [],
      sessions: (sessionsData as StudySession[]) ?? [],
      isLoading: false,
    })
  },

  completeLesson: async (disciplineId: string, lessonId: string) => {
    const { userId } = get()
    if (!userId) return

    const now = new Date().toISOString()

    await supabase.from('lesson_progress').upsert(
      {
        user_id: userId,
        lesson_id: lessonId,
        discipline_id: disciplineId,
        completed: true,
        completed_at: now,
        updated_at: now,
      },
      { onConflict: 'user_id,lesson_id' },
    )

    set((state) => {
      const existing = state.progress.find((p) => p.lesson_id === lessonId)
      if (existing) {
        return {
          progress: state.progress.map((p) =>
            p.lesson_id === lessonId ? { ...p, completed: true, completed_at: now } : p,
          ),
        }
      }
      return {
        progress: [
          ...state.progress,
          { lesson_id: lessonId, discipline_id: disciplineId, completed: true, completed_at: now, quiz_score: null },
        ],
      }
    })
  },

  saveQuizScore: async (lessonId: string, score: number) => {
    const { userId, progress } = get()
    if (!userId) return

    const now = new Date().toISOString()
    const existing = progress.find((p) => p.lesson_id === lessonId)

    // Fallback: find the discipline from static data if progress entry doesn't exist yet
    const disciplineId =
      existing?.discipline_id ??
      disciplines.find((d) => d.lessons.some((l) => l.id === lessonId))?.id

    if (!disciplineId) return

    await supabase.from('lesson_progress').upsert(
      {
        user_id: userId,
        lesson_id: lessonId,
        discipline_id: disciplineId,
        quiz_score: score,
        updated_at: now,
      },
      { onConflict: 'user_id,lesson_id' },
    )

    set((state) => {
      const exists = state.progress.some((p) => p.lesson_id === lessonId)
      if (exists) {
        return {
          progress: state.progress.map((p) =>
            p.lesson_id === lessonId ? { ...p, quiz_score: score } : p,
          ),
        }
      }
      return {
        progress: [
          ...state.progress,
          { lesson_id: lessonId, discipline_id: disciplineId, completed: false, completed_at: null, quiz_score: score },
        ],
      }
    })
  },

  recordStudySession: async (disciplineId: string, lessonId: string, durationMinutes: number) => {
    const { userId } = get()
    if (!userId) return

    const today = new Date().toISOString().split('T')[0]

    const { data: existing } = await supabase
      .from('study_sessions')
      .select('id')
      .eq('user_id', userId)
      .eq('date', today)
      .eq('discipline_id', disciplineId)
      .eq('lesson_id', lessonId)
      .maybeSingle()

    if (!existing) {
      await supabase.from('study_sessions').insert({
        user_id: userId,
        discipline_id: disciplineId,
        lesson_id: lessonId,
        date: today,
        duration_minutes: durationMinutes,
      })

      set((state) => ({
        sessions: [
          { discipline_id: disciplineId, lesson_id: lessonId, date: today, duration_minutes: durationMinutes },
          ...state.sessions,
        ],
      }))
    }
  },

  getCurrentStreak: () => {
    const { sessions } = get()
    if (sessions.length === 0) return 0

    const uniqueDates = [...new Set(sessions.map((s) => s.date))].sort((a, b) =>
      b.localeCompare(a),
    )

    const today = new Date().toISOString().split('T')[0]
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]

    // Streak must include today or yesterday
    if (uniqueDates[0] !== today && uniqueDates[0] !== yesterday) return 0

    let streak = 0
    let expected = uniqueDates[0] === today ? today : yesterday

    for (const date of uniqueDates) {
      if (date === expected) {
        streak++
        const d = new Date(expected)
        d.setDate(d.getDate() - 1)
        expected = d.toISOString().split('T')[0]
      } else {
        break
      }
    }

    return streak
  },

  getDaysSinceStudied: () => {
    const { sessions } = get()
    if (sessions.length === 0) return Infinity

    const uniqueDates = [...new Set(sessions.map((s) => s.date))].sort((a, b) =>
      b.localeCompare(a),
    )

    const lastDate = new Date(uniqueDates[0])
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    lastDate.setHours(0, 0, 0, 0)

    return Math.round((today.getTime() - lastDate.getTime()) / 86400000)
  },

  getDisciplineProgress: (disciplineId: string) => {
    const { progress } = get()
    const discipline = disciplines.find((d) => d.id === disciplineId)
    if (!discipline || discipline.lessons.length === 0) return 0

    const completed = progress.filter(
      (p) => p.discipline_id === disciplineId && p.completed,
    ).length

    return Math.round((completed / discipline.lessons.length) * 100)
  },

  getLessonProgress: (lessonId: string) => {
    const { progress } = get()
    return progress.find((p) => p.lesson_id === lessonId) ?? null
  },

  getRecommendedDiscipline: (semester: 'pre' | 'graduation' = 'pre') => {
    const { sessions, progress } = get()
    const filteredDisciplines = disciplines.filter((d) => d.semester === semester)

    if (filteredDisciplines.length === 0) return disciplines[0]?.id ?? ''

    const priorityWeight = { URGENTE: 3, ALTA: 2, MÉDIA: 1 }

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const scored = filteredDisciplines.map((d) => {
      const totalLessons = d.lessons.length
      const completedLessons = progress.filter(
        (p) => p.discipline_id === d.id && p.completed,
      ).length
      const progressPct = totalLessons > 0 ? completedLessons / totalLessons : 0

      const disciplineSessions = sessions.filter((s) => s.discipline_id === d.id)
      let daysSince = 999
      if (disciplineSessions.length > 0) {
        const lastDate = new Date(
          [...new Set(disciplineSessions.map((s) => s.date))].sort((a, b) => b.localeCompare(a))[0],
        )
        lastDate.setHours(0, 0, 0, 0)
        daysSince = Math.round((today.getTime() - lastDate.getTime()) / 86400000)
      }

      const score =
        priorityWeight[d.priority] * 10 +
        (1 - progressPct) * 5 +
        Math.min(daysSince, 30) * 0.5

      return { id: d.id, score }
    })

    scored.sort((a, b) => b.score - a.score)
    return scored[0]?.id ?? filteredDisciplines[0].id
  },
}))
