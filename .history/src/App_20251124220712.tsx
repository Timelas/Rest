import { useEffect, useMemo, useState } from 'react'

import { Layout } from '@/components/layout/Layout/Layout'
import { AboutPage } from '@/pages/About/AboutPage'
import { BanquetsPage } from '@/pages/Banquets/BanquetsPage'
import { MenuPage } from '@/pages/Menu/MenuPage'
import { ContactsPage } from '@/pages/Contacts/ContactsPage'
import { HomePage } from '@/pages/Home/HomePage'
import { KidsAnimationPage } from '@/pages/KidsAnimation/KidsAnimationPage'
import { LowerVipPage } from '@/pages/LowerVip/LowerVipPage'
import { MainHallPage } from '@/pages/MainHall/MainHallPage'
import { NewsArticlePage } from '@/pages/NewsArticle/NewsArticlePage'
import { NewsPage } from '@/pages/News/NewsPage'
import { SummerVerandaPage } from '@/pages/SummerVeranda/SummerVerandaPage'
import { UpperVipPage } from '@/pages/UpperVip/UpperVipPage'
import { PAGE_DEFINITIONS, PRIMARY_NAVIGATION } from '@/constants/pages'
import type { PageSlug } from '@/constants/pages'
import type { BookingContext, NavigationItem, PopupType } from '@/types/site'

const resolveSlugFromPath = (path: string): PageSlug => {
  const match = Object.entries(PAGE_DEFINITIONS).find(([, def]) => def.path === path)
  if (match) return match[0] as PageSlug
  if (path.startsWith('/news/')) return 'newsDetail'
  return 'home'
}

const resolveNewsIdFromPath = (path: string): string | undefined => {
  if (!path.startsWith('/news/')) return undefined
  const [, , newsId] = path.split('/')
  return newsId || undefined
}

const getInitialRoute = () => {
  if (typeof window === 'undefined') {
    return { slug: 'home' as PageSlug, newsId: undefined as string | undefined }
  }
  const path = window.location.pathname || '/'
  const slug = resolveSlugFromPath(path)
  const newsId = slug === 'newsDetail' ? resolveNewsIdFromPath(path) : undefined
  return { slug, newsId }
}

export const App = () => {
  const initialRoute = getInitialRoute()
  const [activePage, setActivePage] = useState<PageSlug>(initialRoute.slug)
  const [popup, setPopup] = useState<PopupType>(null)
  const [bookingContext, setBookingContext] = useState<BookingContext>({ intent: 'table' })
  const [selectedNewsId, setSelectedNewsId] = useState<string | undefined>(initialRoute.newsId)

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
    window.scrollTo({ top: 0 })
  }, [])

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname || '/'
      const slug = resolveSlugFromPath(path)
      setActivePage(slug)
      if (slug === 'newsDetail') {
        setSelectedNewsId(resolveNewsIdFromPath(path))
      } else {
        setSelectedNewsId(undefined)
      }
      window.scrollTo({ top: 0 })
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const navItems: NavigationItem[] = useMemo(
    () =>
      PRIMARY_NAVIGATION.map((slug) => ({
        slug,
        label: PAGE_DEFINITIONS[slug].label,
      })),
    []
  )

  const pushRoute = (slug: PageSlug, newsId?: string) => {
    if (typeof window === 'undefined') return
    const definitionPath = PAGE_DEFINITIONS[slug]?.path ?? '/'
    const path = slug === 'newsDetail' && newsId ? `/news/${newsId}` : definitionPath
    window.history.pushState({ slug, newsId }, '', path)
  }

  const handleNavigate = (slug: PageSlug) => {
    pushRoute(slug)
    setActivePage(slug)
    if (slug !== 'newsDetail') {
      setSelectedNewsId(undefined)
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSelectNews = (id: string) => {
    setSelectedNewsId(id)
    setActivePage('newsDetail')
    pushRoute('newsDetail', id)
    window.scrollTo({ top: 0 })
  }

  const handleOpenBooking = (context?: Partial<BookingContext>) => {
    setBookingContext({
      intent: context?.intent ?? 'table',
      hallId: context?.hallId,
      hallName: context?.hallName,
      hallImage: context?.hallImage,
    })
    setPopup('booking')
  }

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return (
          <HomePage
            onBook={handleOpenBooking}
            onOpenMenu={() => setPopup('menu')}
            onNavigateAbout={() => handleNavigate('about')}
          />
        )
      case 'about':
        return <AboutPage onNavigate={handleNavigate} onBook={handleOpenBooking} />
      case 'menu':
        return <MenuPage onNavigate={handleNavigate} />
      case 'banquets':
        return <BanquetsPage onNavigate={handleNavigate} onBook={handleOpenBooking} />
      case 'kidsAnimation':
        return <KidsAnimationPage />
      case 'summerVeranda':
        return <SummerVerandaPage />
      case 'mainHall':
        return <MainHallPage />
      case 'lowerVip':
        return <LowerVipPage />
      case 'upperVip':
        return <UpperVipPage />
      case 'contacts':
        return <ContactsPage />
      case 'news':
        return <NewsPage onSelectNews={handleSelectNews} />
      case 'newsDetail':
        return <NewsArticlePage articleId={selectedNewsId} />
      default:
        return (
          <HomePage
            onBook={handleOpenBooking}
            onOpenMenu={() => setPopup('menu')}
            onNavigateAbout={() => handleNavigate('about')}
          />
        )
    }
  }

  return (
    <Layout
      navItems={navItems}
      activePage={activePage}
      popup={popup}
      bookingContext={bookingContext}
      onNavigate={handleNavigate}
      onClosePopup={() => setPopup(null)}
    >
      {renderPage()}
    </Layout>
  )
}
