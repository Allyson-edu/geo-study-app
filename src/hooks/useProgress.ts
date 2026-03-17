import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'

// Busca todos os registros de progresso de um usuário
export function useUserProgress(userId: string | undefined) {
  return useQuery({
    queryKey: ['user_progress', userId],
    queryFn: async () => {
      if (!userId) return []
      const { data, error } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', userId)
      if (error) throw error
      return data
    },
    enabled: !!userId,
  })
}

// Mutation para marcar uma aula como completa e incrementar XP
export function useCompleteLesson() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({
      userId,
      lessonId,
      xpReward,
      notes,
    }: {
      userId: string
      lessonId: string
      xpReward: number
      notes?: string
    }) => {
      // Upsert progresso da aula
      const { error: progressError } = await supabase
        .from('user_progress')
        .upsert({
          user_id: userId,
          lesson_id: lessonId,
          completed: true,
          completed_at: new Date().toISOString(),
          notes: notes ?? null,
        })
      if (progressError) throw progressError

      // Incrementar XP no perfil
      const { data: profile, error: profileFetchError } = await supabase
        .from('profiles')
        .select('total_xp')
        .eq('id', userId)
        .single()
      if (profileFetchError) throw profileFetchError

      const { error: xpError } = await supabase
        .from('profiles')
        .update({ total_xp: (profile.total_xp ?? 0) + xpReward })
        .eq('id', userId)
      if (xpError) throw xpError
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['user_progress', variables.userId] })
      queryClient.invalidateQueries({ queryKey: ['profile', variables.userId] })
    },
  })
}

// Calcula porcentagem de conclusão de um módulo
export function useModuleProgress(moduleId: string | undefined, userId: string | undefined) {
  const { data: lessons } = useQuery({
    queryKey: ['lessons', moduleId],
    queryFn: async () => {
      if (!moduleId) return []
      const { data, error } = await supabase
        .from('lessons')
        .select('id')
        .eq('module_id', moduleId)
      if (error) throw error
      return data
    },
    enabled: !!moduleId,
  })

  const { data: progress } = useUserProgress(userId)

  if (!lessons || !progress) return 0
  if (lessons.length === 0) return 0

  const completedIds = new Set(
    progress.filter(p => p.completed).map(p => p.lesson_id)
  )
  const completed = lessons.filter(l => completedIds.has(l.id)).length
  return Math.round((completed / lessons.length) * 100)
}
