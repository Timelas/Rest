import { useState } from 'react'

import childAnimationImg from '@/assets/img/ChildAnimation.png'
import rest1 from '@/assets/img/rest1.png'
import rest2 from '@/assets/img/rest2.png'
import rest3 from '@/assets/img/rest3.png'

import styles from './FamilyActivities.module.css'

const ACTIVITIES = [
  {
    id: 'animation',
    title: 'Детская анимация',
    description:
      'Каждые выходные для наших маленьких гостей с 14:00 до 20:00 предусмотрена детская зона с аниматором. Командные игры и тематические сценарии помогают детям моментально подружиться.',
    image: childAnimationImg,
  },
  {
    id: 'master',
    title: 'Мастер-классы',
    description:
      'Шеф-кондитеры и бариста проводят творческие занятия: дети лепят хачапури, учатся декорировать десерты и создавать безалкогольные коктейли.',
    image: rest1,
  },
  {
    id: 'babysitter',
    title: 'Беби-ситер',
    description:
      'Персональный беби-ситер может сопровождать ребёнка на протяжении всего вечера, чтобы родители полностью сосредоточились на празднике.',
    image: rest2,
  },
  {
    id: 'nursery',
    title: 'Пеленальная',
    description:
      'Отдельная зона с пеленальным столом, стульчиком для кормления и набором необходимых мелочей расположена в двух шагах от гостевых залов.',
    image: rest3,
  },
] as const

export const FamilyActivities = () => {
  const [activeId, setActiveId] = useState(ACTIVITIES[0].id)
  const activeActivity = ACTIVITIES.find((item) => item.id === activeId) ?? ACTIVITIES[0]

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.list}>
          {ACTIVITIES.map((activity) => {
            const isActive = activity.id === activeId

            return (
              <button
                key={activity.id}
                className={styles.item}
                data-active={isActive}
                onClick={() => setActiveId(activity.id)}
              >
                <div className={styles.itemHeader}>
                  <span className={`${styles.itemTitle} typo-h3`}>{activity.title}</span>
                </div>
                <p className={`${styles.itemDescription} typo-description-secondary`}>{activity.description}</p>
              </button>
            )
          })}
        </div>

        <figure className={styles.preview}>
          <img src={activeActivity.image} alt={activeActivity.title} loading="lazy" />
        </figure>
      </div>
    </section>
  )
}
