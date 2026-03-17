import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  BookOpen,
  GraduationCap,
  BookHeart,
  Zap,
  Map,
  Menu,
  X,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface NavItem {
  to: string
  icon: React.ElementType
  label: string
  badge?: string
}

const mainItems: NavItem[] = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/pre-curso', icon: BookOpen, label: 'Pré-Curso' },
  { to: '/graduacao', icon: GraduationCap, label: 'Graduação' },
]

const toolItems: NavItem[] = [
  { to: '/diario', icon: BookHeart, label: 'Diário de Estudos', badge: 'NOVO' },
  { to: '/foco', icon: Zap, label: 'Modo Foco', badge: 'NOVO' },
  { to: '/mapa', icon: Map, label: 'Mapa de Progresso', badge: 'NOVO' },
]

function NavSection({ title, items, onClose }: { title: string; items: NavItem[]; onClose: () => void }) {
  return (
    <div className="mb-4">
      <p
        className="px-3 mb-1 text-[10px] font-semibold uppercase tracking-widest"
        style={{ color: 'var(--text-tertiary)' }}
      >
        {title}
      </p>
      {items.map(({ to, icon: Icon, label, badge }) => (
        <NavLink
          key={to}
          to={to}
          end={to === '/'}
          onClick={onClose}
          className={({ isActive }) =>
            isActive
              ? 'sidebar-active flex items-center gap-3 px-3 py-2.5 rounded-xl mb-0.5 transition-all duration-200'
              : 'flex items-center gap-3 px-3 py-2.5 rounded-xl mb-0.5 transition-all duration-200 hover:bg-[var(--bg-tertiary)]'
          }
          style={({ isActive }) =>
            isActive ? {} : { color: 'var(--text-secondary)' }
          }
        >
          {({ isActive }) => (
            <>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Icon size={18} style={isActive ? { color: 'white' } : {}} />
              </motion.div>
              <span
                className="text-sm font-medium flex-1"
                style={isActive ? { color: 'white' } : {}}
              >
                {label}
              </span>
              {badge && !isActive && (
                <span className="badge-new">{badge}</span>
              )}
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
      <div className="flex items-center gap-2.5 px-2 mb-6">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center text-lg shrink-0"
          style={{ background: 'var(--gradient-primary)', boxShadow: 'var(--shadow-glow-blue)' }}
        >
          🌍
        </div>
        <span className="font-bold text-base" style={{ color: 'var(--text-primary)' }}>
          GeoStudy
        </span>
      </div>

      {/* Separador */}
      <div className="h-px mb-4" style={{ background: 'var(--border-color)' }} />

      {/* Navegação */}
      <nav className="flex-1 overflow-y-auto">
        <NavSection title="Menu Principal" items={mainItems} onClose={() => setOpen(false)} />
        <NavSection title="Ferramentas" items={toolItems} onClose={() => setOpen(false)} />
      </nav>

      {/* Avatar resumido */}
      <div
        className="mt-2 px-3 py-3 rounded-xl"
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
        }}
      >
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
            style={{ background: 'var(--gradient-primary)' }}
          >
            A
          </div>
          <div>
            <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Allyson</p>
            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Nível 1 · Calouro</p>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* Sidebar desktop */}
      <aside
        className="hidden md:flex flex-col w-60 shrink-0 glass-sidebar"
        style={{ minHeight: '100vh' }}
      >
        {content}
      </aside>

      {/* Botão hamburguer mobile */}
      <button
        className="md:hidden fixed top-3 left-3 z-50 p-2 rounded-xl border"
        style={{
          background: 'var(--bg-secondary)',
          borderColor: 'var(--border-color)',
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
              className="md:hidden fixed left-0 top-0 bottom-0 z-50 w-60 glass-sidebar"
            >
              {content}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
