import { useCallback, useEffect, useMemo, useState } from 'react'

import arrowLeft from '@/assets/svg/arrow-left.svg'
import arrowRight from '@/assets/svg/arrow-right.svg'
import peopleIcon from '@/assets/svg/people.svg'
import coctailIcon from '@/assets/svg/coctail.svg'
import placeIcon from '@/assets/svg/place.svg'
import menu1 from '@/assets/img/Rectangle 16.png'
import menu2 from '@/assets/img/Rectangle 17.png'
import menu3 from '@/assets/img/Rectangle 18.png'
import menu4 from '@/assets/img/Rectangle 19.png'
import menu5 from '@/assets/img/Rectangle 20.png'
import menu6 from '@/assets/img/Rectangle 21.png'
import menu7 from '@/assets/img/Rectangle 22.png'
import menu8 from '@/assets/img/Rectangle 23.png'
import { Button } from '@/components/ui/Button/Button'
import { FilterChip } from '@/components/ui/FilterChip/FilterChip'
import { useInView } from '@/hooks/useInView'
import { cn } from '@/utils/cn'

import styles from './HallsShowcase.module.css'

const MAX_THUMBS = 5
const MOBILE_THUMBS = 3
const CARD_ANIMATION_MS = 450

const HALLS = [
  {
    id: 'main',
    name: 'основной зал',
    descriptionPrimary:
      'Подойдет для масштабных праздников и банкетов с ведущим и развлекательной программой. Просторный зал оснащён современной звуковой и световой аппаратурой, что создаёт идеальную атмосферу для торжеств любого формата. Удобная планировка позволяет разместить большое количество гостей, а стильный интерьер с элегантной отделкой добавляет мероприятию особый шарм. Здесь легко организовать танцевальную площадку, фотозону и зону для выступлений артистов, что сделает ваш праздник незабываемым.',
    descriptionSecondary:
      'Подойдет для масштабных праздников и банкетов с ведущим и развлекательной программой. Просторный зал оснащён современной звуковой и световой аппаратурой, что создаёт идеальную атмосферу для торжеств любого формата.',
    features: [
      { id: 'capacity', icon: peopleIcon, label: '150 мест' },
      { id: 'banquet', icon: placeIcon, label: 'Шоу зона' },
      { id: 'bar', icon: coctailIcon, label: 'Бар' },
      { id: 'space', icon: placeIcon, label: 'Танцпол' },
    ],
    media: [menu1, menu2, menu3, menu4, menu5, menu6],
  },
  {
    id: 'upper-vip',
    name: 'верхний вип',
    descriptionPrimary:
      'Уединённое пространство для камерных встреч и деловых переговоров. Премиальные материалы отделки и мягкий тёплый свет создают приватную атмосферу.',
    descriptionSecondary:
      'Персональный сервис, отдельный санузел и возможность кастомной рассадки гостей подчёркивают статус мероприятия.',
    features: [
      { id: 'capacity', icon: peopleIcon, label: '40 мест' },
      { id: 'privacy', icon: placeIcon, label: 'Приватный вход' },
      { id: 'mixology', icon: coctailIcon, label: 'Сигнатурный бар' },
      { id: 'view', icon: placeIcon, label: 'Панорамный вид' },
    ],
    media: [menu6, menu7, menu8, menu5, menu4, menu3],
  },
  {
    id: 'lower-vip',
    name: 'нижний вип',
    descriptionPrimary:
      'Идеален для семейных торжеств и душевных вечеров. Звукоизоляция и акцентное освещение помогают создать уютную обстановку.',
    descriptionSecondary:
      'Зал оборудован современной мультимедиа, поэтому легко интегрировать живых музыкантов или презентации.',
    features: [
      { id: 'capacity', icon: peopleIcon, label: '60 мест' },
      { id: 'comfort', icon: placeIcon, label: 'Лаундж-зона' },
      { id: 'service', icon: coctailIcon, label: 'Бар' },
      { id: 'tech', icon: placeIcon, label: 'LED-экраны' },
    ],
    media: [menu3, menu2, menu1, menu7, menu8, menu4],
  },
  {
    id: 'terrace',
    name: 'летняя веранда',
    descriptionPrimary:
      'Открытое пространство с живой зеленью и мягкими диванами идеально подходит для летних встреч и свадебных церемоний.',
    descriptionSecondary:
      'Полог и обогреватели позволяют комфортно чувствовать себя в любую погоду, а отдельный вход обеспечивает приватность.',
    features: [
      { id: 'capacity', icon: peopleIcon, label: '80 мест' },
      { id: 'fresh', icon: placeIcon, label: 'Зелёный сад' },
      { id: 'cocktails', icon: coctailIcon, label: 'Летний бар' },
      { id: 'comfort', icon: placeIcon, label: 'Отдельный вход' },
    ],
    media: [menu4, menu5, menu6, menu2, menu3, menu1],
  },
] as const

type Hall = (typeof HALLS)[number]
type HallId = Hall['id']

export const HallsShowcase = () => {
  const section = useInView<HTMLDivElement>({ threshold: 0.3 })
  const [activeHallId, setActiveHallId] = useState<HallId>(HALLS[0].id)
  const [activeMediaIndex, setActiveMediaIndex] = useState(0)
  const [transitionStage, setTransitionStage] = useState<'idle' | 'leaving' | 'entering'>('idle')
  const [nextHallId, setNextHallId] = useState<HallId | null>(null)
  const [transitionDirection, setTransitionDirection] = useState<'left' | 'right'>('right')
  const [thumbLimit, setThumbLimit] = useState(MAX_THUMBS)

  const activeHallIndex = useMemo(
    () => HALLS.findIndex((hall) => hall.id === activeHallId),
    [activeHallId]
  )

  const activeHall = useMemo(() => HALLS[activeHallIndex] ?? HALLS[0], [activeHallIndex])
  const displayMedia = useMemo(
    () => activeHall.media.slice(0, thumbLimit),
    [activeHall, thumbLimit]
  )

  useEffect(() => {
    setActiveMediaIndex(0)
  }, [activeHallId])

  useEffect(() => {
    const resolveLimit = () => (window.innerWidth <= 768 ? MOBILE_THUMBS : MAX_THUMBS)
    const handleResize = () => setThumbLimit(resolveLimit())

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const requestHallChange = useCallback(
    (hallId: HallId, direction: 'left' | 'right' = 'right') => {
      if (hallId === activeHallId || transitionStage !== 'idle') return
      setNextHallId(hallId)
      setTransitionDirection(direction)
      setTransitionStage('leaving')
    },
    [activeHallId, transitionStage]
  )

  useEffect(() => {
    if (transitionStage === 'leaving') {
      const timeout = setTimeout(() => {
        if (nextHallId) {
          setActiveHallId(nextHallId)
          setTransitionStage('entering')
        } else {
          setTransitionStage('idle')
        }
      }, CARD_ANIMATION_MS)

      return () => clearTimeout(timeout)
    }

    if (transitionStage === 'entering') {
      const timeout = setTimeout(() => {
        setTransitionStage('idle')
        setNextHallId(null)
      }, CARD_ANIMATION_MS)

      return () => clearTimeout(timeout)
    }

    return undefined
  }, [transitionStage, nextHallId])

  const handlePrev = () => {
    if (transitionStage !== 'idle') return
    const prevIndex = (activeHallIndex - 1 + HALLS.length) % HALLS.length
    requestHallChange(HALLS[prevIndex].id, 'left')
  }

  const handleNext = () => {
    if (transitionStage !== 'idle') return
    const nextIndex = (activeHallIndex + 1) % HALLS.length
    requestHallChange(HALLS[nextIndex].id, 'right')
  }

  const handleThumbClick = (index: number) => {
    setActiveMediaIndex(index)
  }

  useEffect(() => {
    setActiveMediaIndex((prev) => Math.min(prev, Math.max(displayMedia.length - 1, 0)))
  }, [displayMedia.length])

  const safeMediaIndex = Math.min(activeMediaIndex, Math.max(displayMedia.length - 1, 0))
  const activeImage = displayMedia[safeMediaIndex] ?? activeHall.media[0]

  return (
    <section className={cn(styles.section, section.inView && styles.sectionReady)} ref={section.ref}>
      <div className={styles.inner}>
        <div className={styles.heading}>
          <h2 className={cn(styles.title, section.inView && styles.titleVisible)}>Залы</h2>
          <div className={cn(styles.filters, section.inView && styles.filtersVisible)}>
            {HALLS.map((hall) => (
              <FilterChip
                key={hall.id}
                active={hall.id === activeHallId}
                onClick={() => requestHallChange(hall.id)}
              >
                {hall.name}
              </FilterChip>
            ))}
          </div>
        </div>

        <div className={styles.hallWrapper}>
          <button className={`${styles.navArrow} ${styles.navArrowLeft}`} onClick={handlePrev} aria-label="Предыдущий зал">
            <img src={arrowLeft} alt="" aria-hidden="true" />
          </button>

          <div
            className={cn(
              styles.hallCard,
              transitionStage === 'leaving' &&
                (transitionDirection === 'right' ? styles.hallCardLeavingRight : styles.hallCardLeavingLeft),
              transitionStage === 'entering' &&
                (transitionDirection === 'right' ? styles.hallCardEnteringRight : styles.hallCardEnteringLeft)
            )}
          >
            <div className={cn(styles.infoColumn, section.inView && styles.infoVisible)}>
              <h3
                className={cn(styles.hallName, styles.hallNameDesktop, 'typo-h3', styles.copyReveal)}
                style={{ '--reveal-delay': '0s' } as React.CSSProperties}
              >
                {activeHall.name}
              </h3>
              <div className={styles.texts}>
                <p
                  className={cn(styles.description, 'typo-description-secondary', styles.copyReveal)}
                  style={{ '--reveal-delay': '0.2s' } as React.CSSProperties}
                >
                  {activeHall.descriptionPrimary}
                </p>
                <p
                  className={cn(styles.description, 'typo-description-secondary', styles.copyReveal)}
                  style={{ '--reveal-delay': '0.4s' } as React.CSSProperties}
                >
                  {activeHall.descriptionSecondary}
                </p>
              </div>

              <ul className={styles.features}>
                {activeHall.features.map((feature) => (
                  <li key={feature.id} className={styles.featureItem}>
                    <img src={feature.icon} alt="" aria-hidden="true" />
                    <span className='typo-description-feature'>{feature.label}</span>
                  </li>
                ))}
              </ul>

              <div className={cn(styles.ctaRow, styles.copyReveal)} style={{ '--reveal-delay': '0.8s' } as React.CSSProperties}>
                <Button size="large" padding="wide">Забронировать зал</Button>
              </div>
            </div>

            <div className={cn(styles.galleryColumn, section.inView && styles.galleryVisible)}>
              <h3
                className={cn(styles.hallName, styles.hallNameMobile, 'typo-h3', styles.copyReveal)}
                style={{ '--reveal-delay': '0s' } as React.CSSProperties}
                aria-hidden="true"
              >
                {activeHall.name}
              </h3>
              <figure className={cn(styles.mainMedia, styles.copyReveal)} style={{ '--reveal-delay': '0.4s' } as React.CSSProperties}>
                <img src={activeImage} alt={`${activeHall.name} фото ${activeMediaIndex + 1}`} loading="lazy" />
              </figure>
              <div className={cn(styles.thumbRow, styles.copyReveal)} style={{ '--reveal-delay': '0.6s' } as React.CSSProperties}>
                {displayMedia.map((mediaSrc, index) => (
                  <button
                    key={`${activeHall.id}-thumb-${index}`}
                    className={styles.thumb}
                    data-active={index === activeMediaIndex}
                    onClick={() => handleThumbClick(index)}
                    aria-label={`Показать фото ${index + 1}`}
                  >
                    <img src={mediaSrc} alt="" loading="lazy" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button className={`${styles.navArrow} ${styles.navArrowRight}`} onClick={handleNext} aria-label="Следующий зал">
            <img src={arrowRight} alt="" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  )
}
