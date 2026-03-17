import { useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'

// Verifica e atualiza o streak do usuário com base na data do último estudo
export function useCheckStreak() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ userId }: { userId: string }) => {
      const { data: profile, error: fetchError } = await supabase
        .from('profiles')
        .select('current_streak, longest_streak, last_study_date')
        .eq('id', userId)
        .single()
      if (fetchError) throw fetchError

      const today = new Date().toISOString().split('T')[0]
      const lastDate = profile.last_study_date

      let newStreak = profile.current_streak ?? 0
      let newLongest = profile.longest_streak ?? 0

      if (lastDate === today) {
        // Já estudou hoje — sem alteração
        return { streak: newStreak, longest: newLongest }
      }

      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      const yesterdayStr = yesterday.toISOString().split('T')[0]

      if (lastDate === yesterdayStr) {
        // Estudou ontem — incrementa streak
        newStreak += 1
      } else {
        // Quebrou o streak — reset para 1
        newStreak = 1
      }

      newLongest = Math.max(newStreak, newLongest)

      const { error } = await supabase
        .from('profiles')
        .update({
          current_streak: newStreak,
          longest_streak: newLongest,
          last_study_date: today,
        })
        .eq('id', userId)
      if (error) throw error

      return { streak: newStreak, longest: newLongest }
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['profile', variables.userId] })
    },
  })
}
