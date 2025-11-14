import type { Advantage, MediaAsset, NewsCard as NewsCardType } from '@/types/site'
import type { ShowcaseSlide } from '@/components/ui/Sliders/ShowcaseSlider'
import type { StorySlide } from '@/components/ui/Sliders/StorySlider'

export const HERO_BADGES = [
  { id: 'fire', icon: '🔥', title: 'Живой огонь и тандыр' },
  { id: 'wine', icon: '🍷', title: 'Коллекция вин из Кахети' },
  { id: 'music', icon: '🎼', title: 'Музыка и кинопоказы' },
  { id: 'family', icon: '👨‍👩‍👧', title: 'Семейные программы' },
]

export const ADVANTAGES: Advantage[] = [
  {
    id: 'chef',
    title: 'Авторская кухня',
    description: 'Меню от шефа с грузинскими корнями и московскими акцентами',
    icon: '👨‍🍳',
  },
  {
    id: 'service',
    title: 'Сервис 24/7',
    description: 'Менеджеры отвечают в мессенджерах и подстраиваются под формат события',
    icon: '🤝',
  },
  {
    id: 'tech',
    title: 'Технический парк',
    description: 'Свет, звук, экран и сценография для банкетов и концертов',
    icon: '🎛️',
  },
  {
    id: 'kids',
    title: 'Детские программы',
    description: 'Анимация, мастер-классы и няни по запросу',
    icon: '🧩',
  },
]

export const MEDIA_ASSETS: MediaAsset[] = Array.from({ length: 8 }).map((_, index) => ({
  id: `media-${index + 1}`,
  title: 'Атмосфера ресторана',
  format: index % 3 === 0 ? 'video' : 'photo',
  thumbnail: `https://images.unsplash.com/photo-15${index + 10}320${index}39-61292d08e6bd?auto=format&fit=crop&w=800&q=80`,
}))

export const MOSAIC_ASSETS: MediaAsset[] = [
  {
    id: 'mosaic-1',
    title: 'Основной зал',
    format: 'photo',
    thumbnail: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1400&q=80',
  },
  {
    id: 'mosaic-2',
    title: 'Детали',
    format: 'photo',
    thumbnail: 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'mosaic-3',
    title: 'Команда',
    format: 'photo',
    thumbnail: 'https://images.unsplash.com/photo-1525610553991-2bede1a236e2?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'mosaic-4',
    title: 'Веранда',
    format: 'photo',
    thumbnail: 'https://images.unsplash.com/photo-1457666134378-6b77915bd5f2?auto=format&fit=crop&w=800&q=80',
  },
]

export const NEWS_CARDS: NewsCardType[] = [
  {
    id: 'news-1',
    title: 'Неделя живой музыки',
    date: '10.02.2025',
    excerpt: 'Серия камерных концертов с музыкантами из Тбилиси и Москвы.',
    image: 'https://images.unsplash.com/photo-1484981184820-2e84ea0af1a0?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'news-2',
    title: 'Гастроужин от шефа',
    date: '24.02.2025',
    excerpt: 'Пять авторских сетов с винным сопровождением от сомелье.',
    image: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'news-3',
    title: 'Весенние каникулы',
    date: '05.03.2025',
    excerpt: 'Детская анимационная неделя с мастер-классами по глине.',
    image: 'https://images.unsplash.com/photo-1455853659719-4b521eebc76d?auto=format&fit=crop&w=900&q=80',
  },
]

export const SHOWCASE_SLIDES: ShowcaseSlide[] = [
  {
    id: 'slide-1',
    title: 'Пары выходного дня',
    description: 'Завтраки с видом на усадьбу и авторскими десертами.',
    image: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'slide-2',
    title: 'Корпоративные вечера',
    description: 'Соберите команду и выберите готовый сценарий.',
    image: 'https://images.unsplash.com/photo-1481833761820-0509d3217039?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'slide-3',
    title: 'Семейные воскресенья',
    description: 'Анимация, кино и семейные бранчи.',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80',
  },
]

export const STORY_SLIDES: StorySlide[] = [
  {
    id: 'story-1',
    eyebrow: 'История',
    title: 'Современная интерпретация Тбилиси',
    copy: 'Мы вдохновляемся архитектурой старого города и добавляем технологичные решения.',
  },
  {
    id: 'story-2',
    eyebrow: 'Команда',
    title: 'Команда шефов из Грузии',
    copy: 'Каждый сезон — экспедиция по регионам и обновление меню.',
  },
  {
    id: 'story-3',
    eyebrow: 'Аудио-визуал',
    title: 'Музыка и кинопоказы',
    copy: 'В каждом зале собственный плейлист и установка для кино.',
  },
]
