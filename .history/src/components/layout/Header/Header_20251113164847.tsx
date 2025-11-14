import { useCallback, useEffect, useRef, useState } from 'react'

import { Logo } from '@/components/common/Logo'
import type { PageSlug } from '@/constants/pages'
import type { NavigationItem } from '@/types/site'
import { cn } from '@/utils/cn'

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

  const detectBackground = useCallback(() => {
    const headerEl = headerRef.current
    if (!headerEl) return

    if (window.scrollY > 40) {
      setIsBackgroundLight(false)
      return
    }

    const rect = headerEl.getBoundingClientRect()
    const sampleX = rect.left + rect.width / 2
    const sampleY = rect.bottom + 2
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
    detectBackground()
    window.addEventListener('scroll', detectBackground, { passive: true })
    window.addEventListener('resize', detectBackground)
    return () => {
      window.removeEventListener('scroll', detectBackground)
      window.removeEventListener('resize', detectBackground)
    }
  }, [detectBackground])

  const logoVariant = isBackgroundLight ? 'dark' : 'light'

  return (
    <header ref={headerRef} className={cn(styles.header, isScrolled && styles['header--offset'])}>
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
                  width: indicator.width,
                  transform: `translateX(${indicator.left}px)`,
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
    </header>
  )
}
