import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type ActiveModule = 'pre' | 'graduation'

interface ActiveModuleStore {
  activeModule: ActiveModule
  setActiveModule: (module: ActiveModule) => void
}

export const useActiveModuleStore = create<ActiveModuleStore>()(
  persist(
    (set) => ({
      activeModule: 'pre',
      setActiveModule: (module) => set({ activeModule: module }),
    }),
    { name: 'geostudy-active-module' }
  )
)
