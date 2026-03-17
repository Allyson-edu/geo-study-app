import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import {
  Menu, X,
  Home, BookOpen, GraduationCap, BookMarked, Target, Map,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface NavItem {
  to: string
  icon: React.ReactNode
  label: string
  iconClass: string
}

const mainItems: NavItem[] = [
  { to: '/',          icon: <Home size={16} />,          label: 'Dashboard',  iconClass: 'blue'   },
  { to: '/pre-curso', icon: <BookOpen size={16} />,      label: 'Pré-Curso',  iconClass: 'teal'   },
  { to: '/graduacao', icon: <GraduationCap size={16} />, label: 'Graduação',  iconClass: 'violet' },
]

const toolItems: NavItem[] = [
  { to: '/diario', icon: <BookMarked size={16} />, label: 'Diário de Estudos',  iconClass: 'amber' },
  { to: '/foco',   icon: <Target size={16} />,     label: 'Modo Foco',          iconClass: 'red'   },
  { to: '/mapa',   icon: <Map size={16} />,        label: 'Mapa de Progresso',  iconClass: 'teal'  },
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
      {items.map(({ to, icon, label, iconClass }) => (
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
                {icon}
              </span>
              <span className="flex-1 text-[13px]">{label}</span>
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
      {/* Logo — "G" em quadrado + texto */}
      <div className="flex items-center gap-2.5 px-2 mb-5">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 font-bold text-sm"
          style={{ background: 'var(--accent-blue)', color: '#ffffff', boxShadow: '0 2px 12px rgba(91,141,239,0.4)' }}
        >
          G
        </div>
        <span className="font-bold text-[15px]" style={{ color: 'var(--text-primary)' }}>
          GeoStudy
        </span>
      </div>

      {/* Separador */}
      <div className="h-px mb-4" style={{ background: 'var(--border)' }} />

      {/* Navegação */}
      <nav className="flex-1 overflow-y-auto">
        <NavSection title="Principal" items={mainItems} onClose={() => setOpen(false)} />
        <NavSection title="Ferramentas" items={toolItems} onClose={() => setOpen(false)} />
      </nav>

      {/* Card usuário — nome + sublabel Pré-Curso */}
      <div
        className="mt-2 px-3 py-3 rounded-xl"
        style={{
          background: 'rgba(91,141,239,0.07)',
          border: '1px solid var(--border)',
        }}
      >
        <div className="flex items-center gap-2.5">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold text-white shrink-0"
            style={{ background: 'var(--accent-teal)' }}
          >
            A
          </div>
          <div>
            <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Allyson</p>
            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Pré-Curso</p>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* Sidebar desktop */}
      <aside
        className="hidden md:flex flex-col w-56 shrink-0 sidebar-glass"
        style={{ minHeight: '100vh' }}
      >
        {content}
      </aside>

      {/* Botão hamburguer mobile */}
      <button
        className="md:hidden fixed top-3 left-3 z-50 p-2 rounded-xl border"
        style={{
          background: 'var(--bg-surface)',
          borderColor: 'var(--border)',
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
              initial={{ x: -224 }}
              animate={{ x: 0 }}
              exit={{ x: -224 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="md:hidden fixed left-0 top-0 bottom-0 z-50 w-56 sidebar-glass"
            >
              {content}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
