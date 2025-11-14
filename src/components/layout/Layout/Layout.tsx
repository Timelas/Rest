import type { ReactNode } from 'react'

import { FloatingWhatsappButton } from '@/components/layout/FloatingWhatsappButton/FloatingWhatsappButton'
import { Footer } from '@/components/layout/Footer/Footer'
import { Header } from '@/components/layout/Header/Header'
import { BookHallPopup } from '@/components/popups/BookHallPopup/BookHallPopup'
import { MenuPopup } from '@/components/popups/MenuPopup/MenuPopup'
import type { PageSlug } from '@/constants/pages'
import { CONTACTS } from '@/data/contacts'
import type { NavigationItem, PopupType } from '@/types/site'

import styles from './Layout.module.css'

type LayoutProps = {
  children: ReactNode
  navItems: NavigationItem[]
  activePage: PageSlug
  popup: PopupType
  onNavigate: (slug: PageSlug) => void
  onClosePopup: () => void
}

export const Layout = ({
  children,
  navItems,
  activePage,
  popup,
  onNavigate,
  onClosePopup,
}: LayoutProps) => {
  return (
    <div className={styles.page}>
      <Header
        navItems={navItems}
        activePage={activePage}
        onNavigate={onNavigate}
      />
      <main className={styles.main}>{children}</main>
      <Footer contacts={CONTACTS} />
      <FloatingWhatsappButton />
      <MenuPopup
        isOpen={popup === 'menu'}
        onClose={onClosePopup}
        navItems={navItems}
        activePage={activePage}
        onNavigate={(slug) => {
          onNavigate(slug)
          onClosePopup()
        }}
        contacts={CONTACTS}
      />
      <BookHallPopup
        isOpen={popup === 'booking'}
        onClose={onClosePopup}
      />
    </div>
  )
}
