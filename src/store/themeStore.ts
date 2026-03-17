import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ThemeState {
  isDark: boolean
  toggle: () => void
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      isDark: true,
      toggle: () => set((s) => {
        const newDark = !s.isDark
        document.documentElement.classList.toggle('dark', newDark)
        return { isDark: newDark }
      }),
    }),
    { name: 'geo-study-theme' }
  )
)
