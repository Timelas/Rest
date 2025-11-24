import { useEffect, useMemo, useRef } from 'react'

import { Breadcrumbs } from '@/components/ui/Breadcrumbs/Breadcrumbs'
import { FeatureHighlight } from '@/components/sections/FeatureHighlight/FeatureHighlight'
import { AsymmetricalGallery } from '@/components/sections/AsymmetricalGallery/AsymmetricalGallery'
import { PatternAnimated } from '@/components/sections/PatternAnimated/PatternAnimated'
import type { PageSlug } from '@/constants/pages'
import type { BookingContext } from '@/types/site'

import kidsLogo from '@/assets/svg/strapezo-kids.svg'
import videoIcon from '@/assets/svg/video.svg'
import logoFull from '@/assets/svg/logoFullDark.svg'

import styles from './KidsAnimationPage.module.css'
import { cn } from '@/utils/cn'
import { useInView } from '@/hooks/useInView'

type KidsAnimationPageProps = {
  onNavigate?: (slug: PageSlug) => void
  onBook?: (context?: Partial<BookingContext>) => void
}

const PLACEHOLDER_BURGUNDY =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800"><rect width="100%" height="100%" fill="%23792929"/></svg>'

const SLIDER_ITEMS = [
  { id: 'birthday', title: 'Дни рождения', width: 478 },
  { id: 'babysitter', title: 'Babysitter', width: 327 },
  { id: 'workshop', title: 'Мастер-классы', width: 327 },
  { id: 'nursery', title: 'Пеленальная', width: 327 },
] as const

const VIDEO_GRID = ['kids-video-1', 'kids-video-2', 'kids-video-3', 'kids-video-4']

const FINAL_GALLERY = [
  { id: 'kg-1', src: PLACEHOLDER_BURGUNDY, alt: 'Детская галерея 1' },
  { id: 'kg-2', src: PLACEHOLDER_BURGUNDY, alt: 'Детская галерея 2' },
  { id: 'kg-3', src: PLACEHOLDER_BURGUNDY, alt: 'Детская галерея 3' },
  { id: 'kg-4', src: PLACEHOLDER_BURGUNDY, alt: 'Детская галерея 4' },
  { id: 'kg-5', src: PLACEHOLDER_BURGUNDY, alt: 'Детская галерея 5' },
  { id: 'kg-6', src: PLACEHOLDER_BURGUNDY, alt: 'Детская галерея 6' },
  { id: 'kg-7', src: PLACEHOLDER_BURGUNDY, alt: 'Детская галерея 7' },
] as const

const TEXT_BLOCKS = [
  'Дети в Strapezo — всегда самые важные гости! Их здесь ждут моменты, полные радости и веселья, мастер-классы и невероятно вкусное авторское детское меню от нашего шеф-повара.',
  'Каждые выходные для наших маленьких гостей с 14:00 до 20:00 предусмотрена детская зона с аниматором.',
  'Для детей каждый праздник – это чудо, которое они предвкушают и ждут больше всего на свете. А особенно запоминается малышу его день рождения.',
  'Если вы хотите организовать эксклюзивный детский праздник, Satrapezo предложит вам просторный зал, детское меню и атмосферу настоящего торжества.',
]

export const KidsAnimationPage = ({ onNavigate, onBook }: KidsAnimationPageProps) => {
  const duplicatedSlides = useMemo(() => [...SLIDER_ITEMS, ...SLIDER_ITEMS], [])
  const trackRef = useRef<HTMLDivElement | null>(null)
  const baseWidthRef = useRef(0)
  const offsetRef = useRef(0)
  const lastScrollYRef = useRef(0)
  const centerCopy = useInView<HTMLDivElement>({ threshold: 0.2 })
  const textCopy = useInView<HTMLDivElement>({ threshold: 0.2 })

  const applyTransform = () => {
    const track = trackRef.current
    const base = baseWidthRef.current
    if (!track || base <= 0) return
    const normalized = ((offsetRef.current % base) + base) % base
    track.style.transform = `translate3d(${-normalized}px,0,0)`
  }

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const measure = () => {
      const base = track.scrollWidth / 2
      baseWidthRef.current = base
      offsetRef.current = base > 0 ? base / 2 : 0
      applyTransform()
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  useEffect(() => {
    lastScrollYRef.current = window.scrollY
    const handleScroll = () => {
      const delta = window.scrollY - lastScrollYRef.current
      lastScrollYRef.current = window.scrollY
      if (delta === 0) return
      offsetRef.current += delta * 0.22
      applyTransform()
      offsetRef.current += delta * 0.22
      applyTransform()
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className={styles.page}>
      <section className={styles.section}>
        <Breadcrumbs
          items={[
            { label: 'Главная', slug: 'home' },
            { label: 'Детская анимация' },
          ]}
          onNavigate={onNavigate}
        />
      </section>

      <section className={styles.section}>
        <FeatureHighlight
          title="Детская анимация"
          description={TEXT_BLOCKS.join('\n')}
          image={PLACEHOLDER_BURGUNDY}
          imageAlt="Детская анимация Strapezo"
          buttonLabel="Меню"
          logoSrc={logoFull}
          onButtonClick={() => onBook?.({ intent: 'table' })}
        />
      </section>

      <section className={cn(styles.section, styles.logoSection)}>
        <div className={styles.kidsLogoBlock}>
          <img src={kidsLogo} alt="Strapezo Kids" height={77} />
        </div>
        <div className={styles.kidsSliderWrapper}>
          <div className={styles.kidsSliderTrack} ref={trackRef}>
            {duplicatedSlides.map((item, index) => (
              <article
                key={`${item.id}-${index}`}
                className={styles.kidsSlide}
                data-wide={item.id === 'birthday'}
                style={{ '--slide-width': `${item.width}px` } as React.CSSProperties}
              >
                <span className="typo-highlight">{item.title}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={cn(styles.section, styles.spacedSection)}>
        <div
          className={cn(styles.centerTextBlock, centerCopy.inView && styles.centerTextBlockVisible)}
          ref={centerCopy.ref}
        >
          {TEXT_BLOCKS.map((paragraph, idx) => (
            <p key={`center-${idx}`} className={`${styles.centerText} typo-highlight`}>
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      <section className={cn(styles.section, styles.spacedSection)}>
        <div className={styles.videoGrid}>
          {VIDEO_GRID.map((id) => (
            <div key={id} className={styles.videoCard}>
              <img src={videoIcon} alt="Видео" width={40} height={40} />
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <PatternAnimated />
      </section>


      <section className={styles.section}>
        <div className={styles.blockStack}>
          <h2 className={`${styles.sectionTitle} typo-h2`}>Детская анимация</h2>
          <div className={styles.fullVideo}>
            <img src={videoIcon} alt="Видео" width={70} height={70}/>
          </div>
        </div>
      </section>

      <section className={cn(styles.section, styles.spacedSection)}>
        <div
          className={cn(styles.textBlock, textCopy.inView && styles.textBlockVisible)}
          ref={textCopy.ref}
        >
          {TEXT_BLOCKS.map((paragraph, idx) => (
            <p key={idx} className="typo-highlight">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      <section className={cn(styles.section, styles.spacedSection)}>
        <h3 className={`${styles.galleryTitle} typo-h3`}>ФОТОГАЛЕРЕЯ МЕРОПРИЯТИЙ</h3>
        <AsymmetricalGallery
          images={FINAL_GALLERY}
          buttonLabel=""
          onButtonClick={() => undefined}
          showButton={false}
        />
      </section>
    </div>
  )
}
