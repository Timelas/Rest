import { type CSSProperties } from 'react'

import video1 from '@/assets/img/video1.png'
import video2 from '@/assets/img/video2.png'
import video3 from '@/assets/img/video3.png'
import video4 from '@/assets/img/video4.png'
import video5 from '@/assets/img/video5.png'
import { useInView } from '@/hooks/useInView'
import { cn } from '@/utils/cn'

import styles from './BanquetsShowcase.module.css'

const VIDEO_PLACEHOLDERS = [
  { id: 'event-1', caption: 'Видео мероприятия 01', image: video1 },
  { id: 'event-2', caption: 'Видео мероприятия 02', image: video2 },
  { id: 'event-3', caption: 'Видео мероприятия 03', image: video3 },
  { id: 'event-4', caption: 'Видео мероприятия 04', image: video4 },
  { id: 'event-5', caption: 'Видео мероприятия 05', image: video5 },
] as const

export const BanquetsShowcase = () => {
  const section = useInView<HTMLDivElement>({ threshold: 0.5 })

  return (
    <div className={styles.section} ref={section.ref}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <h2 className={cn(styles.title, 'typo-h2', section.inView && styles.titleVisible)}>Банкеты и корпоративы</h2>
          <p
            className={cn(styles.description, 'typo-description-secondary', section.inView && styles.descriptionVisible)}
          >
            Ищите ресторан под корпоратив в Москве? Загляните в SATRAPEZO – ресторан грузинской и европейской кухни
            на Мичуринском проспекте. Удобное расположение, стильный интерьер залов, уютная летняя веранда, живая
            музыка и бесплатная парковка – неоспоримые преимущества ресторана. Но главное, мы сможем устроить
            настоящий пир для вас и для ваших сотрудников, ведь именно Грузия славится на весь мир своим
            гостеприимством и уникальными кулинарными традициями.
          </p>
        </div>

        <div className={styles.mediaRow}>
          <div className={styles.verticalLabel}>
            <span className={`${styles.verticalText} typo-h2`}>Контент мероприятий</span>
          </div>
          <div className={styles.videoTrack}>
            {VIDEO_PLACEHOLDERS.map((item, index) => (
              <article
                key={item.id}
                className={cn(styles.videoCard, section.inView && styles.videoCardVisible)}
                style={{ '--card-delay': `${index * 0.12}s` } as CSSProperties}
              >
                <img src={item.image} alt={item.caption} loading="lazy" />
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
