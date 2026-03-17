import { useState } from 'react'
import { motion } from 'framer-motion'
import { useDiaryStore, type DiaryEntry } from '@/store/diaryStore'

const MOODS: { value: 1 | 2 | 3 | 4 | 5; emoji: string; label: string }[] = [
  { value: 1, emoji: '😫', label: 'Difícil' },
  { value: 2, emoji: '😐', label: 'Ok' },
  { value: 3, emoji: '🙂', label: 'Bem' },
  { value: 4, emoji: '😊', label: 'Ótimo' },
  { value: 5, emoji: '🤩', label: 'Incrível' },
]

// Cor do quadrado pelo humor/ausência
function getMoodColor(hasEntry: boolean, mood?: number): string {
  if (!hasEntry) return 'var(--bg-tertiary)'
  const colors: Record<number, string> = {
    1: '#FF375F',
    2: '#FF9F0A',
    3: '#5AC8FA',
    4: '#30D158',
    5: '#BF5AF2',
  }
  return colors[mood ?? 3] ?? '#30D158'
}

function formatDate(dateStr: string): string {
  const [y, m, d] = dateStr.split('-').map(Number)
  return `${d.toString().padStart(2, '0')}/${m.toString().padStart(2, '0')}/${y}`
}

function getTodayStr() {
  return new Date().toISOString().slice(0, 10)
}

// Card de entrada anterior
function EntryCard({ entry }: { entry: DiaryEntry }) {
  const mood = MOODS.find((m) => m.value === entry.mood)
  return (
    <div
      className="rounded-xl p-4"
      style={{
        background: 'var(--bg-tertiary)',
        border: '1px solid var(--border-color)',
      }}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold" style={{ color: 'var(--text-tertiary)' }}>
          {formatDate(entry.date)}
        </span>
        <div className="flex items-center gap-2">
          <span className="text-base">{mood?.emoji}</span>
          <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
            {entry.timeStudied} min
          </span>
        </div>
      </div>
      <p
        className="text-sm line-clamp-2"
        style={{ color: 'var(--text-primary)' }}
      >
        {entry.content}
      </p>
      {entry.discovery && (
        <p className="text-xs mt-1.5" style={{ color: 'var(--accent-teal)' }}>
          💡 {entry.discovery}
        </p>
      )}
    </div>
  )
}

export default function StudyDiary() {
  const { entries, addEntry, getLast30Days } = useDiaryStore()

  const today = getTodayStr()
  const todayEntry = entries.find((e) => e.date === today)

  const [content, setContent] = useState(todayEntry?.content ?? '')
  const [mood, setMood] = useState<1 | 2 | 3 | 4 | 5>(todayEntry?.mood ?? 3)
  const [timeStudied, setTimeStudied] = useState<string>(
    todayEntry?.timeStudied ? String(todayEntry.timeStudied) : ''
  )
  const [discovery, setDiscovery] = useState(todayEntry?.discovery ?? '')
  const [saved, setSaved] = useState(false)

  const last30 = getLast30Days()
  const recentEntries = [...entries]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 5)

  function handleSave(e: React.FormEvent) {
    e.preventDefault()
    if (!content.trim()) return
    addEntry({
      date: today,
      content: content.trim(),
      mood,
      timeStudied: Number(timeStudied) || 0,
      discovery: discovery.trim(),
    })
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 max-w-3xl mx-auto space-y-6"
    >
      {/* Header */}
      <div>
        <h2
          className="text-2xl font-bold"
          style={{
            background: 'var(--gradient-primary)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          📔 Diário de Estudos
        </h2>
        <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
          {new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' })}
        </p>
      </div>

      {/* Grade de contribuições — últimos 30 dias */}
      <div
        className="rounded-2xl p-5"
        style={{
          background: 'var(--bg-card)',
          backdropFilter: 'blur(20px)',
          border: '1px solid var(--border-color)',
        }}
      >
        <p className="text-xs font-semibold mb-3" style={{ color: 'var(--text-tertiary)' }}>
          ATIVIDADE — ÚLTIMOS 30 DIAS
        </p>
        <div className="flex flex-wrap gap-1">
          {last30.map((day) => (
            <div
              key={day.date}
              title={`${formatDate(day.date)}${day.hasEntry ? ` · ${MOODS.find((m) => m.value === day.mood)?.label ?? ''}` : ' · Sem registro'}`}
              className="rounded-sm transition-transform hover:scale-125 cursor-default"
              style={{
                width: 14,
                height: 14,
                background: getMoodColor(day.hasEntry, day.mood),
                opacity: day.hasEntry ? 1 : 0.35,
              }}
            />
          ))}
        </div>
        <div className="flex items-center gap-3 mt-3">
          <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Menos</span>
          {[false, true].flatMap((h) =>
            h ? MOODS.map((m) => (
              <div
                key={m.value}
                className="w-3 h-3 rounded-sm"
                style={{ background: getMoodColor(true, m.value) }}
                title={m.label}
              />
            )) : [
              <div
                key="none"
                className="w-3 h-3 rounded-sm"
                style={{ background: 'var(--bg-tertiary)', opacity: 0.35 }}
              />
            ]
          )}
          <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Mais</span>
        </div>
      </div>

      {/* Formulário de hoje */}
      <div
        className="rounded-2xl p-5"
        style={{
          background: 'var(--bg-card)',
          backdropFilter: 'blur(20px)',
          border: '1px solid var(--border-color)',
        }}
      >
        <p className="font-semibold mb-4 text-sm" style={{ color: 'var(--text-primary)' }}>
          ✏️ Entrada de Hoje
        </p>

        <form onSubmit={handleSave} className="space-y-4">
          {/* O que estudei */}
          <div>
            <label className="text-xs font-medium mb-1.5 block" style={{ color: 'var(--text-secondary)' }}>
              O que estudei hoje?
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Descreva o que você estudou hoje..."
              rows={4}
              className="w-full px-3 py-2.5 rounded-xl text-sm resize-none outline-none"
              style={{
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-primary)',
              }}
            />
          </div>

          {/* Seletor de humor */}
          <div>
            <label className="text-xs font-medium mb-2 block" style={{ color: 'var(--text-secondary)' }}>
              Como foi?
            </label>
            <div className="flex gap-2">
              {MOODS.map((m) => (
                <button
                  key={m.value}
                  type="button"
                  onClick={() => setMood(m.value)}
                  className="flex flex-col items-center gap-1 px-2 py-2 rounded-xl transition-all text-2xl"
                  style={{
                    background: mood === m.value ? getMoodColor(true, m.value) + '30' : 'var(--bg-tertiary)',
                    border: mood === m.value ? `2px solid ${getMoodColor(true, m.value)}` : '2px solid transparent',
                    transform: mood === m.value ? 'scale(1.1)' : 'scale(1)',
                  }}
                  title={m.label}
                >
                  {m.emoji}
                  <span className="text-[10px] font-medium" style={{ color: 'var(--text-tertiary)' }}>
                    {m.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Tempo estudado */}
          <div>
            <label className="text-xs font-medium mb-1.5 block" style={{ color: 'var(--text-secondary)' }}>
              Tempo estudado
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min={0}
                max={1440}
                value={timeStudied}
                onChange={(e) => setTimeStudied(e.target.value)}
                placeholder="0"
                className="w-24 px-3 py-2 rounded-xl text-sm outline-none"
                style={{
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                }}
              />
              <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>minutos</span>
            </div>
          </div>

          {/* Descoberta do dia */}
          <div>
            <label className="text-xs font-medium mb-1.5 block" style={{ color: 'var(--text-secondary)' }}>
              💡 Descoberta do dia <span style={{ color: 'var(--text-tertiary)' }}>(opcional)</span>
            </label>
            <textarea
              value={discovery}
              onChange={(e) => setDiscovery(e.target.value)}
              placeholder="Algo interessante que você aprendeu hoje..."
              rows={2}
              className="w-full px-3 py-2.5 rounded-xl text-sm resize-none outline-none"
              style={{
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-primary)',
              }}
            />
          </div>

          <motion.button
            type="submit"
            className="w-full py-3 rounded-xl font-semibold text-sm text-white"
            style={{
              background: 'var(--gradient-primary)',
              boxShadow: 'var(--shadow-glow-blue)',
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {saved ? '✅ Entrada salva!' : '💾 Salvar entrada'}
          </motion.button>
        </form>
      </div>

      {/* Entradas recentes */}
      {recentEntries.length > 0 && (
        <div>
          <p className="font-semibold text-sm mb-3" style={{ color: 'var(--text-primary)' }}>
            📋 Entradas Recentes
          </p>
          <div className="space-y-3">
            {recentEntries.map((e) => (
              <EntryCard key={e.id} entry={e} />
            ))}
          </div>
        </div>
      )}
    </motion.div>
  )
}
