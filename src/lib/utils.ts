import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function calculateLevel(xp: number): number {
  return Math.floor(xp / 500) + 1
}

export function xpForNextLevel(currentLevel: number): number {
  return currentLevel * 500
}

export function xpProgress(xp: number): number {
  const level = calculateLevel(xp)
  const xpForCurrentLevel = (level - 1) * 500
  const xpForNext = level * 500
  return ((xp - xpForCurrentLevel) / (xpForNext - xpForCurrentLevel)) * 100
}

export function getAvatarTitle(level: number): string {
  const titles = [
    '', // 0 index não usado
    'Explorador Iniciante',
    'Explorador de Fórmulas',
    'Calculista Iniciante',
    'Algebrista Aprendiz',
    'Geômetra Emergente',
    'Analista em Formação',
    'Físico Aspirante',
    'Químico Avançado',
    'Pré-Geólogo',
    'Geólogo Master',
  ]
  return titles[Math.min(level, 10)] || 'Geólogo Lendário'
}

export function getDaysUntilCourse(): number {
  const courseStart = new Date('2026-08-03')
  const today = new Date()
  const diff = courseStart.getTime() - today.getTime()
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)))
}

export function getGreeting(): string {
  const hour = new Date().getHours()
  if (hour < 12) return 'Bom dia'
  if (hour < 18) return 'Boa tarde'
  return 'Boa noite'
}
