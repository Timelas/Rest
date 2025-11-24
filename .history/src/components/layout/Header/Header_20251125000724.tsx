import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

import { Logo } from '@/components/common/Logo'
import { PAGE_DEFINITIONS } from '@/constants/pages'
import type { PageSlug } from '@/constants/pages'
import type { NavigationItem } from '@/types/site'
import { cn } from '@/utils/cn'
import burgerIcon from '@/assets/svg/burger.svg'
import burgerIconDark from '@/assets/svg/burgerDark.svg'

import styles from './Header.module.css'

type HeaderProps = {
  navItems: NavigationItem[]
  activePage: PageSlug
  onNavigate: (slug: PageSlug) => void
}

type Indicator = {
  width: number
  left: number
}

export const Header = ({
  navItems,
  activePage,
  onNavigate,
}: HeaderProps) => {
  const headerRef = useRef<HTMLElement | null>(null)
  const boardRef = useRef<HTMLDivElement | null>(null)
  const [indicator, setIndicator] = useState<Indicator>({ width: 0, left: 0 })
  const [isScrolled, setIsScrolled] = useState(false)
  const [isBackgroundLight, setIsBackgroundLight] = useState(false)
  const [isIntroAnimating, setIsIntroAnimating] = useState(activePage === 'home')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const forceDarkBranding = activePage === 'about' || activePage === 'menu' || activePage === 'banquets'
  const highlightContacts = ['menu', 'banquets', 'kidsAnimation', 'summerVeranda', 'contacts'].includes(activePage)
  const currentPageLabel = useMemo(() => PAGE_DEFINITIONS[activePage]?.label ?? 'Меню', [activePage])

  const updateIndicator = useCallback(() => {
    const board = boardRef.current
    if (!board) return

    const activeElement = board.querySelector<HTMLButtonElement>(`[data-slug="${activePage}"]`)

    if (!activeElement) {
      setIndicator({ width: 0, left: 0 })
      return
    }

    const navItems = Array.from(board.querySelectorAll<HTMLButtonElement>('[data-slug]'))
    const isLastItem = navItems[navItems.length - 1] === activeElement

    const parentRect = board.getBoundingClientRect()
    const { left, width } = activeElement.getBoundingClientRect()

    setIndicator({
      width: Math.max(0, width - (isLastItem ? 2 : 0)),
      left: left - parentRect.left,
    })
  }, [activePage])

  useEffect(() => {
    const rafId = requestAnimationFrame(updateIndicator)
    const fontReady = (document as unknown as { fonts?: { ready?: Promise<void> } }).fonts?.ready
    fontReady?.then(() => requestAnimationFrame(updateIndicator))
    return () => cancelAnimationFrame(rafId)
  }, [updateIndicator, activePage])

  useEffect(() => {
    const handleResize = () => updateIndicator()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [updateIndicator])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (activePage === 'home') {
      setIsIntroAnimating(true)
      const timer = setTimeout(() => setIsIntroAnimating(false), 900)
      return () => clearTimeout(timer)
    }
    setIsIntroAnimating(false)
  }, [activePage])

  const detectBackground = useCallback(() => {
    if (forceDarkBranding) {
      setIsBackgroundLight(false)
      return
    }
    const headerEl = headerRef.current
    if (!headerEl) return

    if (window.scrollY > 40) {
      setIsBackgroundLight(false)
      return
    }

    const rect = headerEl.getBoundingClientRect()
    const sampleX = Math.min(Math.max(rect.left + rect.width / 2, 1), window.innerWidth - 1)
    const sampleY = Math.min(Math.max(rect.bottom + 2, 1), window.innerHeight - 1)
    const target = document.elementFromPoint(sampleX, sampleY)

    const getBackgroundColor = (element: Element | null): string | null => {
      let current: Element | null = element
      while (current) {
        const style = window.getComputedStyle(current)
        const color = style.backgroundColor
        if (color && color !== 'rgba(0, 0, 0, 0)' && color !== 'transparent') {
          return color
        }
        current = current.parentElement
      }
      return window.getComputedStyle(document.body).backgroundColor
    }

    const color = getBackgroundColor(target as Element | null)
    if (!color) return

    const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i)
    if (!match) return

    const [r, g, b] = match.slice(1, 4).map(Number)
    const brightness = 0.299 * r + 0.587 * g + 0.114 * b
    setIsBackgroundLight(brightness > 170)
  }, [forceDarkBranding])

  useEffect(() => {
    const runInitialDetect = () => detectBackground()

    if (document.readyState === 'complete') {
      requestAnimationFrame(runInitialDetect)
    } else {
      window.addEventListener('load', runInitialDetect, { once: true })
    }

    window.addEventListener('scroll', detectBackground, { passive: true })
    window.addEventListener('resize', detectBackground)

    return () => {
      window.removeEventListener('load', runInitialDetect)
      window.removeEventListener('scroll', detectBackground)
      window.removeEventListener('resize', detectBackground)
    }
  }, [detectBackground])
  const logoVariant = forceDarkBranding ? 'dark' : activePage === 'home' ? 'light' : isBackgroundLight ? 'dark' : 'light'
  const burgerIconSrc = forceDarkBranding ? burgerIconDark : burgerIcon
  const contactsClass = cn(
    styles.contacts,
    highlightContacts && !isScrolled && styles.contactsAccent,
    highlightContacts && isScrolled && styles.contactsLight
  )

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1026 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [isMobileMenuOpen])

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  const handleMobileNavigate = (slug: PageSlug) => {
    onNavigate(slug)
    setIsMobileMenuOpen(false)
  }

  const closeMobileMenu = () => setIsMobileMenuOpen(false)

  return (
    <>
      <header
        ref={headerRef}
        className={cn(
          styles.header,
          isScrolled && styles['header--offset'],
          isIntroAnimating && styles['header--intro']
        )}
      >
      <div
        className={cn(
          styles.inner,
          isScrolled && styles['inner--scrolled'],
          forceDarkBranding && styles.innerDark
        )}
      >
        <button className={styles.logoButton} onClick={() => onNavigate('home')} aria-label="На главную">
          <Logo variant={logoVariant} />
        </button>
        <div className={styles.navWrapper}>
          <div className={styles.navBoard} ref={boardRef}>
            {indicator.width > 0 && (
              <span
                className={styles.navActive}
                style={{
                  width: indicator.width,
                  transform: `translateX(${indicator.left}px)`,
                }}
              />
            )}
            {navItems.map((item) => (
              <button
                type="button"
                key={item.slug}
                data-slug={item.slug}
                className={cn(
                  styles.navItem,
                  'typo-menu',
                  activePage === item.slug && styles['navItem--active']
                )}
                onClick={() => onNavigate(item.slug)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
        <div className={styles.mobileControls}>
          <button
            type="button"
            className={cn(
              styles.burgerButton,
              forceDarkBranding && styles.burgerButtonDark,
              isMobileMenuOpen && styles.burgerButtonOpen
            )}
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-expanded={isMobileMenuOpen}
            aria-label="Открыть меню"
          >
            <span
              className={cn(
                styles.burgerLabel,
                'typo-button-advantage',
                forceDarkBranding && styles.burgerLabelDark
              )}
            >
              {currentPageLabel}
            </span>
            <span className={cn(styles.burgerIcon, forceDarkBranding && styles.burgerIconDark)}>
              <img src={burgerIconSrc} alt="" aria-hidden="true" />
              <span className={cn(styles.burgerCross, isMobileMenuOpen && styles.burgerCrossVisible)} />
            </span>
          </button>
        </div>
        <div className={contactsClass}>
          <a className={cn('typo-base', styles.phone)} href="tel:+74994604296">
            +7 499 460 42 96
          </a>
          <address className={cn('typo-base', styles.address)}>
            Москва, Мичуринский проспект,
            <br />
            Олимпийская деревня, 3
          </address>
        </div>
      </div>
      </header>
      {createPortal(
        isMobileMenuOpen ? (
        <div className={styles.mobileMenuOverlay} onClick={closeMobileMenu}>
          <div className={styles.mobileMenu} onClick={(event) => event.stopPropagation()}>
            <div className={styles.mobileMenuHeader}>
              <button
                type="button"
                className={styles.mobileLogo}
                onClick={() => handleMobileNavigate('home')}
                aria-label="На главную"
              >
                <Logo variant="dark" />
              </button>
              <button type="button" className={styles.mobileClose} aria-label="Закрыть меню" onClick={closeMobileMenu}>
                <span />
              </button>
            </div>
            <div className={styles.mobileMenuInner}>
              <p className={styles.mobileHint}>Навигация</p>
              <ul className={styles.mobileNavList}>
                {navItems.map((item) => (
                  <li key={item.slug}>
                    <button
                      type="button"
                      className={cn(
                        styles.mobileNavItem,
                        activePage === item.slug && styles.mobileNavItemActive
                      )}
                      onClick={() => handleMobileNavigate(item.slug)}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>

              <div className={styles.mobileContactsBlock}>
                <a href="tel:+74994604296" className={styles.mobilePhone}>
                  +7 499 460 42 96
                </a>
                <p className={styles.mobileAddress}>
                  Москва, Мичуринский проспект,
                  <br />
                  Олимпийская деревня, 3
                </p>
              </div>
            </div>
          </div>
        </div>
        ) : null,
        document.body
      )}
    </>
  )
}
