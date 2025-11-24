import corpImage from '@/assets/img/corp.png'
import gallery1 from '@/assets/img/rest1.png'
import gallery2 from '@/assets/img/rest2.png'
import gallery3 from '@/assets/img/rest3.png'
import gallery4 from '@/assets/img/rest4.png'
import gallery5 from '@/assets/img/menu1.png'
import gallery6 from '@/assets/img/menu2.png'
import gallery7 from '@/assets/img/menu3.png'
import video1 from '@/assets/img/video1.png'
import video2 from '@/assets/img/video2.png'
import video3 from '@/assets/img/video3.png'
import video4 from '@/assets/img/video4.png'
import video5 from '@/assets/img/video5.png'
import { useState } from 'react'

import { FeatureHighlight } from '@/components/sections/FeatureHighlight/FeatureHighlight'
import { MediaGallery } from '@/components/sections/MediaGallery/MediaGallery'
import { AsymmetricalGallery } from '@/components/sections/AsymmetricalGallery/AsymmetricalGallery'
import { HallCard } from '@/components/sections/HallsShowcase/HallCard'
import { HALLS, type Hall } from '@/components/sections/HallsShowcase/HallsShowcase'
import hallStyles from '@/components/sections/HallsShowcase/HallsShowcase.module.css'
import { ContentMediaRow } from '@/components/sections/ContentMediaRow/ContentMediaRow'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs/Breadcrumbs'
import logoFull from '@/assets/svg/logoFullDark.svg'
import { useInView } from '@/hooks/useInView'
import type { PageSlug } from '@/constants/pages'
import type { BookingContext } from '@/types/site'

import styles from './BanquetsPage.module.css'
import { cn } from '@/utils/cn'

type BanquetsPageProps = {
  onNavigate: (slug: PageSlug) => void
  onBook: (context?: Partial<BookingContext>) => void
}

const FEATURE_TEXT = `Ищите ресторан под корпоратив в Москве? Загляните в SATRAPEZO – ресторан грузинской и европейской кухни на Мичуринском проспекте. Удобное расположение, стильный интерьер залов, уютная летняя веранда, живая музыка и бесплатная парковка – неоспоримые преимущества ресторана. Но главное, мы сможем устроить настоящий пир для вас и ваших сотрудников, ведь именно Грузия славится на весь мир своим гостеприимством и уникальными кулинарными традициями.
Мы сумеем разработать для вас такое меню, которое учтёт вкусы гостей с самыми разными гастропредпочтениями. SATRAPEZO удивляет не только грузинской кухней, приготовленной на углях, правильными хинкали и национальной выпечкой, но и европейскими салатами, мясными, рыбными, овощными блюдами, десертами.
При этом мы отдадим под проведение корпоратива наиболее подходящий зал: уютный VIP на 20 гостей или основной зал на 150 персон. Какой бы формат вы ни выбрали – корпоратив в SATRAPEZO всегда проходит на высшем уровне!`

const MEDIA_GALLERY_ITEMS = [
  { id: 'event-1', src: video1, alt: 'Дни рождения', label: 'Дни рождения' },
  { id: 'event-2', src: video2, alt: 'Корпоративы', label: 'Корпоративы' },
  { id: 'event-3', src: video3, alt: 'Выпускные', label: 'Выпускные' },
  { id: 'event-4', src: video4, alt: 'Бизнес-мероприятия', label: 'Бизнес-мероприятия' },
  { id: 'event-5', src: video5, alt: 'Детские дни рождения', label: 'Детские дни рождения' },
  { id: 'event-6', src: gallery5, alt: 'Концерты и съемки', label: 'Концерты и съёмки' },
  { id: 'event-7', src: gallery6, alt: 'Фуршеты', label: 'Фуршеты' },
  { id: 'event-8', src: gallery7, alt: 'Презентации брендов', label: 'Презентации брендов' },
] 

const EVENT_MEDIA_ITEMS = [
  { id: 'media-1', image: video1, alt: 'Видео мероприятия 1' },
  { id: 'media-2', image: video2, alt: 'Видео мероприятия 2' },
  { id: 'media-3', image: video3, alt: 'Видео мероприятия 3' },
  { id: 'media-4', image: video4, alt: 'Видео мероприятия 4' },
  { id: 'media-5', image: video5, alt: 'Видео мероприятия 5' },
] 

const ASYM_GALLERY_IMAGES = [
  { id: 'banquet-1', src: gallery1, alt: 'Ресторан Satrapezo' },
  { id: 'banquet-2', src: gallery2, alt: 'Интерьер Satrapezo' },
  { id: 'banquet-3', src: gallery3, alt: 'Команда Satrapezo' },
  { id: 'banquet-4', src: gallery4, alt: 'Настроение банкетов' },
  { id: 'banquet-5', src: gallery5, alt: 'Подача блюд' },
  { id: 'banquet-6', src: gallery6, alt: 'Десерты' },
  { id: 'banquet-7', src: gallery7, alt: 'Авторские коктейли' },
] 

const FAMILY_TEXT = [
  'Дети в Satrapezo — всегда самые важные гости! Их здесь ждут моменты, полные радости и веселья, мастер-классы и невероятно вкусное авторское детское меню от нашего шеф-повара.',
  'Каждые выходные для наших маленьких гостей с 14:00 до 20:00 предусмотрена детская зона с аниматором.',
  'Для детей каждый праздник – это чудо, которое они предвкушают и ждут больше всего на свете. А особенно запоминается малышу его день рождения.',
  'Если вы хотите организовать эксклюзивный детский праздник, Satrapezo предложит вам просторный зал, детское меню и атмосферу настоящего торжества.',
] as const

const BANQUET_HALLS: Hall[] = [
  HALLS.find((h) => h.id === 'main'),
  HALLS.find((h) => h.id === 'upper-vip'),
  HALLS.find((h) => h.id === 'lower-vip'),
  HALLS.find((h) => h.id === 'terrace'),
].filter(Boolean) as Hall[]

type HallRowProps = {
  hall: Hall
  reverse?: boolean
  activeIndex: number
  onChangeIndex: (next: number) => void
  onBook: (context?: Partial<BookingContext>) => void
}

const HallRow = ({ hall, reverse, activeIndex, onChangeIndex, onBook }: HallRowProps) => {
  const rowInView = useInView<HTMLDivElement>({ threshold: 0.2 })
  const displayMedia = hall.media
  const safeIndex = Math.min(activeIndex, Math.max(displayMedia.length - 1, 0))
  const activeImage = displayMedia[safeIndex] ?? displayMedia[0]

  const animationClass = reverse ? hallStyles.hallCardEnteringLeft : hallStyles.hallCardEnteringRight

  return (
    <div
      className={`${styles.hallRow} ${reverse ? styles.hallRowReverse : ''}`}
      ref={rowInView.ref}
    >
      <HallCard
        className={cn(styles.hallCardWrapper, rowInView.inView && animationClass)}
        hall={hall}
        activeImage={activeImage}
        activeMediaIndex={safeIndex}
        displayMedia={displayMedia}
        inView={rowInView.inView}
        reverse={reverse}
        onThumbClick={onChangeIndex}
        onBookHall={(context) => onBook({ intent: 'hall', ...context })}
      />
    </div>
  )
}

export const BanquetsPage = ({ onNavigate, onBook }: BanquetsPageProps) => {
  const [mediaIndexByHall, setMediaIndexByHall] = useState<Record<string, number>>({})

  return (
    <div className={styles.page}>
      <section className={styles.section}>
        <Breadcrumbs
          items={[
            { label: 'Главная', slug: 'home' },
            { label: 'Банкеты и корпоративы' },
          ]}
          onNavigate={onNavigate}
        />
        <FeatureHighlight
          title="Рассчитаем банкет"
          description={FEATURE_TEXT}
          image={corpImage}
          imageAlt="Корпоратив Satrapezo"
          buttonLabel="Рассчитать банкет"
          onButtonClick={() => onBook({ intent: 'table' })}
          showLogo
          logoSrc={logoFull}
        />
      </section>

      <section className={styles.mediaGallerySection}>
        <div className={styles.galleryHeader}>
          <h2 className="typo-h2">Форматы мероприятий</h2>
        </div>
        <MediaGallery images={MEDIA_GALLERY_ITEMS} />
      </section>

      <section className={styles.hallsSection}>
        <h2 className={`${styles.hallsTitle} typo-h2`}>Залы</h2>
        <div className={styles.hallsList}>
          {BANQUET_HALLS.map((hall, index) => (
            <HallRow
              key={hall.id}
              hall={hall}
              reverse={index % 2 === 1}
              activeIndex={mediaIndexByHall[hall.id] ?? 0}
              onChangeIndex={(next) => setMediaIndexByHall((prev) => ({ ...prev, [hall.id]: next }))}
              onBook={onBook}
            />
          ))}
        </div>
      </section>

    <section className={styles.mediaRowSection}>
      <ContentMediaRow label="Контент" items={EVENT_MEDIA_ITEMS} />
    </section>

      <section className={styles.gallerySection}>
        <h3 className={`${styles.galleryTitle} typo-h3`}>ФОТОГАЛЕРЕЯ МЕРОПРИЯТИЙ</h3>
        <AsymmetricalGallery
          images={ASYM_GALLERY_IMAGES}
          buttonLabel="Смотреть еще"
          onButtonClick={() => onBook({ intent: 'table' })}
        />
      </section>

      <section className={styles.textSection}>
        <div className={styles.textContent}>
          {FAMILY_TEXT.map((paragraph, index) => (
            <p key={index} className="typo-description-secondary">
              {paragraph}
            </p>
          ))}
        </div>
      </section>
    </div>
  )
}
