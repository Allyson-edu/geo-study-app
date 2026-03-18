import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import {
  Menu, X,
  Home, BookOpen, GraduationCap, BookMarked, Target,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface NavItem {
  to: string
  icon: React.ReactNode
  label: string
  activeColor: string
  inactiveColor: string
}

const mainItems: NavItem[] = [
  { to: '/',          icon: <Home size={16} />,          label: 'Dashboard', activeColor: '#D62B2B', inactiveColor: '#1A4DAB' },
  { to: '/pre-curso', icon: <BookOpen size={16} />,      label: 'Pré-Curso', activeColor: '#D62B2B', inactiveColor: '#1A4DAB' },
  { to: '/graduacao', icon: <GraduationCap size={16} />, label: 'Graduação', activeColor: '#D62B2B', inactiveColor: '#1A4DAB' },
]

const toolItems: NavItem[] = [
  { to: '/diario', icon: <BookMarked size={16} />, label: 'Diário de Estudos', activeColor: '#D62B2B', inactiveColor: '#F5C400' },
  { to: '/foco',   icon: <Target size={16} />,     label: 'Modo Foco',         activeColor: '#D62B2B', inactiveColor: '#D62B2B' },
]

function NavSection({ title, items, onClose }: { title: string; items: NavItem[]; onClose: () => void }) {
  return (
    <div className="mb-4">
      <p
        className="px-3 mb-2 text-[10px] font-bold uppercase tracking-widest"
        style={{ color: '#9A9A9A' }}
      >
        {title}
      </p>
      {items.map(({ to, icon, label, activeColor, inactiveColor }) => (
        <NavLink
          key={to}
          to={to}
          end={to === '/'}
          onClick={onClose}
          className={({ isActive }) => `nav-item mb-0.5${isActive ? ' active' : ''}`}
        >
          {({ isActive }) => (
            <>
              <span
                className="nav-icon"
                style={{ color: isActive ? activeColor : inactiveColor }}
              >
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
      {/* Logo — "G" em quadrado amarelo + texto bold */}
      <div className="flex items-center gap-2.5 px-2 mb-2">
        <div
          className="w-9 h-9 flex items-center justify-center shrink-0 font-bold text-base"
          style={{ background: '#F5C400', color: '#1A1A1A', border: '2px solid #1A1A1A' }}
        >
          G
        </div>
        <span className="font-bold text-[15px]" style={{ color: 'var(--text-primary)' }}>
          GeoStudy
        </span>
      </div>

      {/* Faixa vermelha Bauhaus — marca territorial */}
      <div style={{ height: 3, background: '#D62B2B', marginBottom: 16 }} />

      {/* Separador preto */}
      <div className="h-px mb-4" style={{ background: '#1A1A1A' }} />

      {/* Navegação */}
      <nav className="flex-1 overflow-y-auto">
        <NavSection title="Principal" items={mainItems} onClose={() => setOpen(false)} />
        <NavSection title="Ferramentas" items={toolItems} onClose={() => setOpen(false)} />
      </nav>
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
        className="md:hidden fixed top-3 left-3 z-50 p-2"
        style={{
          background: '#FFFFFF',
          border: '2px solid #1A1A1A',
          boxShadow: '2px 2px 0 #1A1A1A',
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