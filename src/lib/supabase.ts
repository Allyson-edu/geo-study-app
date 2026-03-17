import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string | null
          avatar_level: number
          total_xp: number
          current_streak: number
          longest_streak: number
          last_study_date: string | null
          created_at: string
        }
      }
      disciplines: {
        Row: {
          id: string
          name: string
          description: string | null
          area: 'pre_course' | 'graduation'
          semester: number | null
          icon: string | null
          color: string | null
          xp_value: number
          order_index: number
        }
      }
      modules: {
        Row: {
          id: string
          discipline_id: string
          title: string
          description: string | null
          order_index: number
          is_locked: boolean
        }
      }
      lessons: {
        Row: {
          id: string
          module_id: string
          title: string
          description: string | null
          order_index: number
          xp_reward: number
        }
      }
      user_progress: {
        Row: {
          id: string
          user_id: string
          lesson_id: string
          completed: boolean
          completed_at: string | null
          notes: string | null
        }
      }
    }
  }
}
