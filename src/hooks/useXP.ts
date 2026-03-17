import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { calculateLevel, xpProgress, xpForNextLevel } from '@/lib/utils'

// Busca o perfil completo do usuário
export function useProfile(userId: string | undefined) {
  return useQuery({
    queryKey: ['profile', userId],
    queryFn: async () => {
      if (!userId) return null
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()
      if (error) throw error
      return data
    },
    enabled: !!userId,
  })
}

// Mutation para adicionar XP ao perfil
export function useAddXP() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ userId, amount }: { userId: string; amount: number }) => {
      const { data: profile, error: fetchError } = await supabase
        .from('profiles')
        .select('total_xp')
        .eq('id', userId)
        .single()
      if (fetchError) throw fetchError

      const newXP = (profile.total_xp ?? 0) + amount
      const { error } = await supabase
        .from('profiles')
        .update({ total_xp: newXP })
        .eq('id', userId)
      if (error) throw error
      return newXP
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['profile', variables.userId] })
    },
  })
}

// Hook de conveniência que retorna dados de nível derivados do perfil
export function useXPData(userId: string | undefined) {
  const { data: profile, ...rest } = useProfile(userId)

  const totalXP = profile?.total_xp ?? 0
  const level = calculateLevel(totalXP)
  const progressPercent = xpProgress(totalXP)
  const xpToNextLevel = xpForNextLevel(level)

  return {
    ...rest,
    profile,
    level,
    totalXP,
    progressPercent,
    xpToNextLevel,
  }
}
