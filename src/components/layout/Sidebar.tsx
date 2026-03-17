import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface NavItem {
  to: string
  emoji: string
  label: string
  iconClass: string
}

const mainItems: NavItem[] = [
  { to: '/', emoji: '🏠', label: 'Dashboard', iconClass: 'blue' },
  { to: '/pre-curso', emoji: '📚', label: 'Pré-Curso', iconClass: 'jade' },
  { to: '/graduacao', emoji: '🎓', label: 'Graduação', iconClass: 'purple' },
]

const toolItems: NavItem[] = [
  { to: '/diario', emoji: '📖', label: 'Diário de Estudos', iconClass: 'amber' },
  { to: '/foco', emoji: '🎯', label: 'Modo Foco', iconClass: 'terra' },
  { to: '/mapa', emoji: '🗺️', label: 'Mapa de Progresso', iconClass: 'jade' },
]

function NavSection({ title, items, onClose }: { title: string; items: NavItem[]; onClose: () => void }) {
  return (
    <div className="mb-4">
      <p
        className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-widest"
        style={{ color: 'var(--text-muted)' }}
      >
        {title}
      </p>
      {items.map(({ to, emoji, label, iconClass }) => (
        <NavLink
          key={to}
          to={to}
          end={to === '/'}
          onClick={onClose}
          className={({ isActive }) => `nav-item mb-0.5${isActive ? ' active' : ''}`}
        >
          {({ isActive }) => (
            <>
              <span className={`nav-icon${isActive ? '' : ` ${iconClass}`}`}>
                {emoji}
              </span>
              <span className="flex-1">{label}</span>
            </>
          )}
        </NavLink>
      ))}
    </div>
  )
}

export default function Sidebar() {
  const [open, setOpen] = useState(false)

  const content = (
    <div className="flex flex-col h-full py-5 px-3">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-2 mb-5">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center text-lg shrink-0"
          style={{ background: 'var(--grad-primary)', boxShadow: '0 4px 15px rgba(46,134,222,0.4)' }}
        >
          🌍
        </div>
        <span className="font-bold text-base" style={{ color: 'var(--text-primary)' }}>
          GeoStudy
        </span>
      </div>

      {/* Separador */}
      <div className="h-px mb-4" style={{ background: 'var(--border-default)' }} />

      {/* Navegação */}
      <nav className="flex-1 overflow-y-auto">
        <NavSection title="Principal" items={mainItems} onClose={() => setOpen(false)} />
        <NavSection title="Ferramentas" items={toolItems} onClose={() => setOpen(false)} />
      </nav>

      {/* Card usuário */}
      <div
        className="mt-2 px-3 py-3 rounded-xl"
        style={{
          background: 'var(--card-purple)',
          border: '1px solid var(--border-purple)',
        }}
      >
        <div className="flex items-center gap-2.5">
          <span className="text-xl shrink-0">💎</span>
          <div>
            <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Allyson</p>
            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Nível 1</p>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* Sidebar desktop */}
      <aside
        className="hidden md:flex flex-col w-60 shrink-0 sidebar-glass"
        style={{ minHeight: '100vh' }}
      >
        {content}
      </aside>

      {/* Botão hamburguer mobile */}
      <button
        className="md:hidden fixed top-3 left-3 z-50 p-2 rounded-xl border"
        style={{
          background: 'var(--bg-secondary)',
          borderColor: 'var(--border-default)',
          boxShadow: 'var(--shadow-card)',
        }}
        onClick={() => setOpen(!open)}
        aria-label="Menu"
      >
        {open ? <X size={20} style={{ color: 'var(--text-primary)' }} /> : <Menu size={20} style={{ color: 'var(--text-primary)' }} />}
      </button>

      {/* Sidebar mobile overlay */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="md:hidden fixed inset-0 z-40 bg-black/60"
              onClick={() => setOpen(false)}
            />
            <motion.aside
              initial={{ x: -240 }}
              animate={{ x: 0 }}
              exit={{ x: -240 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="md:hidden fixed left-0 top-0 bottom-0 z-50 w-60 sidebar-glass"
            >
              {content}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
