import { useMemo } from 'react'

import { Logo } from '@/components/common/Logo'
import { PAGE_DEFINITIONS } from '@/constants/pages'
import type { PageSlug } from '@/constants/pages'
import type { Contacts } from '@/data/contacts'
import type { NavigationItem } from '@/types/site'
import { cn } from '@/utils/cn'
import { useScrollLock } from '@/hooks/useScrollLock'

import styles from './MenuPopup.module.css'

type MenuPopupProps = {
  isOpen: boolean
  onClose: () => void
  navItems: NavigationItem[]
  activePage: PageSlug
  onNavigate: (slug: PageSlug) => void
  contacts: Contacts
}

export const MenuPopup = ({
  isOpen,
  onClose,
  navItems,
  activePage,
  onNavigate,
  contacts,
}: MenuPopupProps) => {
  useScrollLock(isOpen)

  const extendedNavigation = useMemo(
    () =>
      navItems.map((item) => ({
        ...item,
        description: PAGE_DEFINITIONS[item.slug]?.description,
      })),
    [navItems]
  )

  if (!isOpen) return null

  return (
    <div className={cn(styles.overlay, 'fade-in')}>
      <div className={styles.panel}>
        <button className={styles.closeButton} onClick={onClose} aria-label="Закрыть меню">
          ⤫
        </button>
        <div className={styles.grid}>
          <div className={styles.logoColumn}>
            <Logo variant="dark" />
          </div>
          <div className={styles.navColumn}>
            <div className={styles.navBoard}>
              {extendedNavigation.map((item) => (
                <button
                  key={item.slug}
                  className={cn(
                    styles.navItem,
                    activePage === item.slug && styles['navItem--active']
                  )}
                  onClick={() => onNavigate(item.slug)}
                >
                  <span className="typo-h5">{item.label}</span>
                  <p className="typo-description-secondary">{item.description}</p>
                </button>
              ))}
            </div>
          </div>
          <div className={styles.contactsColumn}>
            <div className={styles.contactBlock}>
              <p className={cn('typo-breadcrumbs', styles.label)}>Телефон</p>
              <a href={`tel:${contacts.phone}`} className={cn('typo-news-card', styles.value)}>
                {contacts.phone}
              </a>
            </div>
            <div className={styles.contactBlock}>
              <p className={cn('typo-breadcrumbs', styles.label)}>Адрес</p>
              <p className={cn('typo-news-card', styles.value)}>{contacts.address}</p>
            </div>
            <div className={styles.contactBlock}>
              <p className={cn('typo-breadcrumbs', styles.label)}>Режим работы</p>
              <p className={cn('typo-news-card', styles.value)}>{contacts.workingHours}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
