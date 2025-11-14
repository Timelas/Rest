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
  height: number
}

export const Header = ({
  navItems,
  activePage,
  onNavigate,
}: HeaderProps) => {
  const boardRef = useRef<HTMLDivElement | null>(null)
  const [indicator, setIndicator] = useState<Indicator>({ width: 0, left: 0, height: 0 })

  const updateIndicator = useCallback(() => {
    const board = boardRef.current
    if (!board) return

    const activeElement = board.querySelector<HTMLButtonElement>(
      `[data-slug="${activePage}"]`
    )

    if (!activeElement) return

    const parentRect = board.getBoundingClientRect()
    const { left, width, height } = activeElement.getBoundingClientRect()

    setIndicator({
      width,
      left: left - parentRect.left,
      height,
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

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Logo variant="dark" />
        <div className={styles.navWrapper}>
          <div className={styles.navBoard} ref={boardRef}>
            {indicator.width > 0 && (
              <span
                className={styles.navActive}
                style={{
                  width: indicator.width,
                  height: indicator.height,
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
