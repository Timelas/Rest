import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { Logo } from '@/components/common/Logo'
import { PAGE_DEFINITIONS } from '@/constants/pages'
import type { PageSlug } from '@/constants/pages'
import type { NavigationItem } from '@/types/site'
import { cn } from '@/utils/cn'
import burgerIcon from '@/assets/svg/burger.svg'

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
  const [activeIndex, setActiveIndex] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isBackgroundLight, setIsBackgroundLight] = useState(false)
  const [isIntroAnimating, setIsIntroAnimating] = useState(activePage === 'home')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const currentPageLabel = useMemo(() => PAGE_DEFINITIONS[activePage]?.label ?? 'Меню', [activePage])

  const updateIndicator = useCallback(() => {
    const board = boardRef.current
    if (!board) return

    const activeElement = board.querySelector<HTMLButtonElement>(
      `[data-slug="${activePage}"]`
    )

    if (!activeElement) return

    const parentRect = board.getBoundingClientRect()
    const { left, width } = activeElement.getBoundingClientRect()

    setIndicator({
      width,
      left: left - parentRect.left,
    })
    const buttons = Array.from(board.querySelectorAll<HTMLButtonElement>('[data-slug]'))
    const index = buttons.findIndex((btn) => btn.dataset.slug === activePage)
    setActiveIndex(index)
  }, [activePage])

  useEffect(() => {
    updateIndicator()
  }, [updateIndicator])

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
  }, [])

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

  const isFirst = activeIndex === 0
  const isLast = activeIndex === navItems.length - 1
  const logoVariant = isBackgroundLight ? 'dark' : 'light'

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

  return (
    <header
      ref={headerRef}
      className={cn(
        styles.header,
        isScrolled && styles['header--offset'],
        isIntroAnimating && styles['header--intro']
      )}
    >
      <div className={cn(styles.inner, isScrolled && styles['inner--scrolled'])}>
        <button className={styles.logoButton} onClick={() => onNavigate('home')} aria-label="На главную">
          <Logo variant={logoVariant} />
        </button>
        <div className={styles.navWrapper}>
          <div className={styles.navBoard} ref={boardRef}>
            {indicator.width > 0 && (
              <span
                className={styles.navActive}
                style={{
                  width: isFirst || isLast ? indicator.width + 6 : indicator.width,
                  transform: `translateX(${
                    isFirst
                      ? indicator.left - 6
                      : isLast
                      ? indicator.left
                      : indicator.left
                  }px)`,
                }}
              />
            )}
            {navItems.map((item) => (
              <button
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
            className={cn(styles.burgerButton, isMobileMenuOpen && styles.burgerButtonOpen)}
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-expanded={isMobileMenuOpen}
            aria-label="Открыть меню"
          >
            <span className={`${styles.burgerLabel} typo-button-advantage`}>{currentPageLabel}</span>
            <span className={styles.burgerIcon}>
              <img src={burgerIcon} alt="" aria-hidden="true" />
              <span className={cn(styles.burgerCross, isMobileMenuOpen && styles.burgerCrossVisible)} />
            </span>
          </button>
        </div>
        <div className={styles.contacts}>
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
      {isMobileMenuOpen && (
        <div className={styles.mobileMenuOverlay}>
          <div className={styles.mobileMenu}>
            <div className={styles.mobileMenuInner}>
              <p className={styles.mobileHint}>Навигация</p>
              <ul className={styles.mobileNavList}>
                {navItems.map((item) => (
                  <li key={item.slug}>
                    <button
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
      )}
    </header>
  )
}
