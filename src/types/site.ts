import type { PageSlug } from '@/constants/pages'

export type NavigationItem = {
  slug: PageSlug
  label: string
}

export type Advantage = {
  id: string
  title: string
  description: string
  icon?: string
}

export type NewsCard = {
  id: string
  title: string
  date: string
  excerpt: string
  image: string
  tag?: string
}

export type MediaAsset = {
  id: string
  title: string
  format: 'photo' | 'video'
  thumbnail: string
  aspect?: string
}

export type GalleryPattern = {
  id: string
  layout: ('wide' | 'tall' | 'square')[]
}

export type PopupType = 'menu' | 'booking' | null
