import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { navigation } from '../data/siteData'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const updateScroll = () => setScrolled(window.scrollY > 24)
    updateScroll()
    window.addEventListener('scroll', updateScroll, { passive: true })
    return () => window.removeEventListener('scroll', updateScroll)
  }, [])

  useEffect(() => {
    if (!menuOpen) return undefined

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }

    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [menuOpen])

  return (
    <header
      className={`site-header ${scrolled || menuOpen ? 'is-scrolled' : ''}`}
    >
      <a
        className="wordmark"
        href="#home"
        aria-label="TriCoff home"
        onClick={() => setMenuOpen(false)}
      >
        TRI<span>COFF</span><i>.</i>
      </a>

      <nav className="desktop-nav" aria-label="Main navigation">
        {navigation.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>

      <a className="header-visit" href="#location">
        Come say hello <ArrowUpRight size={15} strokeWidth={1.7} />
      </a>

      <button
        className="menu-toggle"
        type="button"
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
        aria-controls="mobile-navigation"
        onClick={() => setMenuOpen((open) => !open)}
      >
        {menuOpen ? <X size={23} /> : <Menu size={23} />}
      </button>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="mobile-navigation"
            className="mobile-nav"
            aria-label="Mobile navigation"
            initial={reduceMotion ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {navigation.map((item, index) => (
              <motion.a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: reduceMotion ? 0 : index * 0.035 }}
              >
                {item.label}
                <ArrowUpRight size={17} strokeWidth={1.6} />
              </motion.a>
            ))}
            <p>A little place to pause, whenever you need one.</p>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
