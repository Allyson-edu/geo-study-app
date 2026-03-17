import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ThemeState {
  isLight: boolean
  toggle: () => void
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      isLight: false,
      toggle: () => {
        const newIsLight = !get().isLight
        document.documentElement.classList.toggle('light', newIsLight)
        set({ isLight: newIsLight })
      },
    }),
    {
      name: 'geo-study-theme',
      onRehydrateStorage: () => (state) => {
        if (state?.isLight) {
          document.documentElement.classList.add('light')
        }
      },
    }
  )
)
