import { create } from 'zustand'

const BREAK_MESSAGES = [
  "💧 Vai beber água! Hidratação é estudo também.",
  "📱 Não abre o Instagram. Você sabe que não vai fechar em 5 minutos.",
  "🧘 Levanta e espreguiça! Seu pescoço agradece.",
  "🎬 Nada de YouTube agora, jovem.",
  "🌟 Respira fundo. Você está indo muito bem!",
  "👁️ Descanse os olhos. Olha pra longe por 20 segundos.",
  "🚶 Dá uma caminhada até a cozinha. Volta logo!",
  "🍎 Que tal uma fruta? Glicose = foco.",
  "😴 Fecha os olhos por 2 minutinhos. Não dorme!",
  "🪟 Olha pela janela. O mundo ainda existe lá fora.",
  "🖐️ Mexe os dedos, abre e fecha as mãos. Circulação!",
  "🎵 Coloca uma música boa. 5 minutos de cabeça livre.",
  "📵 Pode checar o celular agora. Mas SÓ agora.",
  "🧠 Seu cérebro está consolidando o que você estudou. Relaxa!",
  "☕ Café? Chá? Alguma coisa quente faz bem.",
  "🌊 Respira: 4 segundos inspira, 4 segura, 4 solta.",
  "💪 Você tá mandando bem! Não desiste agora.",
  "🐶 Vai dar atenção pro seu pet. Ele tá com saudades.",
  "🌱 Uma planta regada é uma planta feliz. E você?",
  "🎯 Foco total na próxima sessão. Você consegue!",
]

interface PomodoroState {
  timeLeft: number
  isRunning: boolean
  isBreak: boolean
  focusMinutes: number
  breakMinutes: number
  position: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
  currentMessageIndex: number
  usedMessageIndices: number[]
  isMinimized: boolean
  sessionCount: number
  start: () => void
  pause: () => void
  reset: () => void
  tick: () => void
  setPosition: (pos: PomodoroState['position']) => void
  toggleMinimized: () => void
  nextMessage: () => void
  setFocusMinutes: (min: number) => void
  setBreakMinutes: (min: number) => void
}

export const usePomodoroStore = create<PomodoroState>((set, get) => ({
  timeLeft: 25 * 60,
  isRunning: false,
  isBreak: false,
  focusMinutes: 25,
  breakMinutes: 5,
  position: 'bottom-right',
  currentMessageIndex: 0,
  usedMessageIndices: [],
  isMinimized: false,
  sessionCount: 0,

  start: () => set({ isRunning: true }),
  pause: () => set({ isRunning: false }),
  reset: () => {
    const { focusMinutes } = get()
    set({ timeLeft: focusMinutes * 60, isRunning: false, isBreak: false })
  },
  tick: () => {
    const { timeLeft, isBreak, breakMinutes, focusMinutes, sessionCount } = get()
    if (timeLeft <= 1) {
      const newIsBreak = !isBreak
      const newTime = newIsBreak ? breakMinutes * 60 : focusMinutes * 60
      set({
        timeLeft: newTime,
        isBreak: newIsBreak,
        isRunning: false,
        sessionCount: !isBreak ? sessionCount + 1 : sessionCount,
      })
      if (newIsBreak) get().nextMessage()
    } else {
      set({ timeLeft: timeLeft - 1 })
    }
  },
  setPosition: (pos) => set({ position: pos }),
  toggleMinimized: () => set((s) => ({ isMinimized: !s.isMinimized })),
  nextMessage: () => {
    const { usedMessageIndices } = get()
    let available = BREAK_MESSAGES.map((_, i) => i).filter(i => !usedMessageIndices.includes(i))
    if (available.length === 0) {
      available = BREAK_MESSAGES.map((_, i) => i)
      set({ usedMessageIndices: [] })
    }
    const idx = available[Math.floor(Math.random() * available.length)]
    set({ currentMessageIndex: idx, usedMessageIndices: [...usedMessageIndices, idx] })
  },
  setFocusMinutes: (min) => set({ focusMinutes: min, timeLeft: min * 60 }),
  setBreakMinutes: (min) => set({ breakMinutes: min }),
}))

export { BREAK_MESSAGES as BREAK_MESSAGES_EXPORT }
