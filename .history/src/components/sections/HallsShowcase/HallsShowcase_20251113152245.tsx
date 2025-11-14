import { useEffect, useMemo, useState } from 'react'

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

import styles from './HallsShowcase.module.css'

const HALLS = [
  {
    id: 'main',
    name: 'основной зал',
    descriptionPrimary:
      'Подойдет для масштабных праздников и банкетов с ведущим и развлекательной программой. Просторный зал оснащён современной звуковой и световой аппаратурой, что создаёт идеальную атмосферу для торжеств любого формата.',
    descriptionSecondary:
      'Удобная планировка позволяет разместить большое количество гостей, а стильный интерьер с элегантной отделкой добавляет мероприятию особый шарм.',
    features: [
      { id: 'capacity', icon: peopleIcon, label: '150 мест' },
      { id: 'banquet', icon: placeIcon, label: 'Зона для шоу' },
      { id: 'bar', icon: coctailIcon, label: 'Барная стойка' },
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
      { id: 'service', icon: coctailIcon, label: 'Персональный бар' },
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

export const HallsShowcase = () => {
  const [activeHallId, setActiveHallId] = useState(HALLS[0].id)
  const [activeMediaIndex, setActiveMediaIndex] = useState(0)

  const activeHallIndex = useMemo(
    () => HALLS.findIndex((hall) => hall.id === activeHallId),
    [activeHallId]
  )

  const activeHall = useMemo(() => HALLS[activeHallIndex] ?? HALLS[0], [activeHallIndex])

  useEffect(() => {
    setActiveMediaIndex(0)
  }, [activeHallId])

  const handlePrev = () => {
    const prevIndex = (activeHallIndex - 1 + HALLS.length) % HALLS.length
    setActiveHallId(HALLS[prevIndex].id)
  }

  const handleNext = () => {
    const nextIndex = (activeHallIndex + 1) % HALLS.length
    setActiveHallId(HALLS[nextIndex].id)
  }

  const handleThumbClick = (index: number) => {
    setActiveMediaIndex(index)
  }

  const activeImage = activeHall.media[activeMediaIndex] ?? activeHall.media[0]

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.heading}>
          <h2 className={styles.title}>Залы</h2>
          <div className={styles.filters}>
            {HALLS.map((hall) => (
              <FilterChip
                key={hall.id}
                active={hall.id === activeHallId}
                onClick={() => setActiveHallId(hall.id)}
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

          <div className={styles.hallCard}>
            <div className={styles.infoColumn}>
              <h3 className={`${styles.hallName} typo-h3`}>{activeHall.name}</h3>
              <div className={styles.texts}>
                <p className={`${styles.description} typo-description-secondary`}>{activeHall.descriptionPrimary}</p>
                <p className={`${styles.description} typo-description-secondary`}>{activeHall.descriptionSecondary}</p>
              </div>

              <ul className={styles.features}>
                {activeHall.features.map((feature) => (
                  <li key={feature.id} className={styles.featureItem}>
                    <img src={feature.icon} alt="" aria-hidden="true" />
                    <span>{feature.label}</span>
                  </li>
                ))}
              </ul>

              <div className={styles.ctaRow}>
                <Button size="large">Забронировать зал</Button>
              </div>
            </div>

            <div className={styles.galleryColumn}>
              <figure className={styles.mainMedia}>
                <img src={activeImage} alt={`${activeHall.name} фото ${activeMediaIndex + 1}`} loading="lazy" />
              </figure>
              <div className={styles.thumbRow}>
                {activeHall.media.map((mediaSrc, index) => (
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
