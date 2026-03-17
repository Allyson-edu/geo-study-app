import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { LayoutDashboard, BookOpen, GraduationCap, Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/pre-curso', icon: BookOpen, label: 'Pré-Curso' },
  { to: '/graduacao', icon: GraduationCap, label: 'Graduação' },
]

export default function Sidebar() {
  const [open, setOpen] = useState(false)

  const content = (
    <div className="flex flex-col h-full py-6 px-3">
      {/* Logo */}
      <div className="flex items-center gap-2 px-3 mb-8">
        <span className="text-3xl">🌍</span>
        <span className="font-bold text-lg text-[var(--text-primary)]">GeoStudy</span>
      </div>

      {/* Navegação */}
      <nav className="flex flex-col gap-1 flex-1">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200',
                isActive
                  ? 'bg-bigsur-blue/20 text-bigsur-blue font-semibold'
                  : 'text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]'
              )
            }
          >
            <Icon size={20} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Avatar resumido */}
      <div className="mt-4 px-3 py-3 rounded-xl bg-[var(--bg-tertiary)]">
        <div className="flex items-center gap-2">
          <span className="text-2xl">👦</span>
          <div>
            <p className="text-sm font-semibold text-[var(--text-primary)]">Allyson</p>
            <p className="text-xs text-[var(--text-secondary)]">Nível 1 · Calouro</p>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* Sidebar desktop */}
      <aside className="hidden md:flex flex-col w-60 shrink-0 glass-dark dark:glass border-r border-[var(--border-color)]">
        {content}
      </aside>

      {/* Botão hamburguer mobile */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-xl bg-[var(--bg-secondary)] shadow-lg border border-[var(--border-color)]"
        onClick={() => setOpen(!open)}
        aria-label="Menu"
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar mobile overlay */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="md:hidden fixed inset-0 z-40 bg-black/50"
              onClick={() => setOpen(false)}
            />
            <motion.aside
              initial={{ x: -240 }}
              animate={{ x: 0 }}
              exit={{ x: -240 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="md:hidden fixed left-0 top-0 bottom-0 z-50 w-60 glass-dark border-r border-[var(--border-color)]"
            >
              {content}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
