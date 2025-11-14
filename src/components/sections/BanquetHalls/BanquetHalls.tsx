import menu1 from '@/assets/img/Rectangle 16.png'
import menu2 from '@/assets/img/Rectangle 17.png'
import menu3 from '@/assets/img/Rectangle 18.png'
import menu4 from '@/assets/img/Rectangle 19.png'
import menu5 from '@/assets/img/Rectangle 20.png'
import menu6 from '@/assets/img/Rectangle 21.png'
import menu7 from '@/assets/img/Rectangle 22.png'
import menu8 from '@/assets/img/Rectangle 23.png'
import { useInView } from '@/hooks/useInView'
import { cn } from '@/utils/cn'

import styles from './BanquetHalls.module.css'

const HALLS = [
  {
    id: 'main',
    title: 'Основной зал',
    description:
      'Пространство для масштабных банкетов с ведущим, шоу и танцевальной программой. Профессиональный свет и звук, сцена и свободная рассадка помогают настроить зал под любую концепцию мероприятия.',
    highlights: ['До 150 гостей', 'Шоу-зона и танцпол', 'Панорамный свет'],
    media: [menu1, menu2, menu3],
  },
  {
    id: 'upper',
    title: 'Верхний VIP',
    description:
      'Камерный зал для деловых встреч и закрытых вечеринок. Приватная атмосфера, отдельный вход и премиальные материалы отделки подчёркивают статус события.',
    highlights: ['До 40 гостей', 'Приватный вход', 'Сигнатурный бар'],
    media: [menu4, menu5, menu6],
  },
  {
    id: 'lower',
    title: 'Нижний VIP',
    description:
      'Уютное пространство для семейных праздников, пресс-завтраков или private-party. Звукоизоляция и настроечноё освещение создают расслабленную атмосферу.',
    highlights: ['До 60 гостей', 'Лаундж-зона', 'Отдельный бар'],
    media: [menu6, menu7, menu8],
  },
  {
    id: 'terrace',
    title: 'Летняя веранда',
    description:
      'Открытая площадка с зеленью и мягкими диванами. Подходит для свадебных церемоний, welcome-фуршетов и душевных летних встреч.',
    highlights: ['До 80 гостей', 'Живая зелень', 'Зона welcome'],
    media: [menu3, menu4, menu5],
  },
] as const

export const BanquetHalls = () => {
  const section = useInView<HTMLDivElement>({ threshold: 0.2 })

  return (
    <section className={styles.section} ref={section.ref}>
      <div className={styles.inner}>
        <h2 className="typo-h2">Залы</h2>
        <div className={styles.list}>
          {HALLS.map((hall, index) => (
            <article
              key={hall.id}
              className={cn(
                styles.hall,
                index % 2 === 1 && styles.hallReverse,
                section.inView && styles.hallVisible
              )}
            >
              <div className={styles.text}>
                <p className={`${styles.hallName} typo-h4`}>{hall.title}</p>
                <p className="typo-description-secondary">{hall.description}</p>
                <ul className={styles.highlights}>
                  {hall.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </div>
              <div className={styles.media}>
                {hall.media.slice(0, 3).map((image, mediaIndex) => (
                  <figure key={`${hall.id}-${mediaIndex}`} className={styles.mediaItem}>
                    <img src={image} alt={`${hall.title} ${mediaIndex + 1}`} loading="lazy" />
                  </figure>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
