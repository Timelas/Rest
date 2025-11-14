import { useLayoutEffect, useRef, useState, type CSSProperties } from 'react'

import childAnimationImg from '@/assets/img/ChildAnimation.png'
import rest1 from '@/assets/img/rest1.png'
import rest2 from '@/assets/img/rest2.png'
import rest3 from '@/assets/img/rest3.png'
import { Button } from '@/components/ui/Button/Button'
import { useInView } from '@/hooks/useInView'
import { cn } from '@/utils/cn'

import styles from './FamilyActivities.module.css'

const ACTIVITIES = [
  {
    id: 'animation',
    title: 'Детская анимация',
    description:
      'Каждые выходные для наших маленьких гостей с 14:00 до 20:00 предусмотрена детская зона с аниматором.',
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

type ActivityId = (typeof ACTIVITIES)[number]['id']

export const FamilyActivities = () => {
  const [activeId, setActiveId] = useState<ActivityId>(ACTIVITIES[0].id)
  const [heights, setHeights] = useState<Partial<Record<ActivityId, number>>>({})
  const descriptionRefs = useRef<Record<string, HTMLParagraphElement | null>>({})
  const activeActivity = ACTIVITIES.find((item) => item.id === activeId) ?? ACTIVITIES[0]
  const section = useInView<HTMLDivElement>({ threshold: 0.3 })

  useLayoutEffect(() => {
    const measure = () => {
      const next: Partial<Record<ActivityId, number>> = {}
      ACTIVITIES.forEach((activity) => {
        const el = descriptionRefs.current[activity.id]
        if (el) {
          next[activity.id] = el.scrollHeight
        }
      })
      setHeights(next)
    }

    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  return (
    <section className={styles.section} ref={section.ref}>
      <div className={styles.inner}>
        <div className={styles.list}>
          {ACTIVITIES.map((activity, index) => {
            const isActive = activity.id === activeId

            return (
              <button
                key={activity.id}
                className={cn(styles.item, section.inView && styles.itemVisible)}
                data-active={isActive}
                onClick={() => setActiveId(activity.id)}
                style={{ '--item-delay': `${index * 0.12}s` } as CSSProperties}
              >
                <div className={styles.itemHeader}>
                  <span className={`${styles.itemTitle} typo-h3`}>{activity.title}</span>
                </div>
                <p
                  ref={(node) => {
                    descriptionRefs.current[activity.id] = node
                  }}
                  className={`${styles.itemDescription} typo-description-secondary`}
                  style={{
                    maxHeight: activeId === activity.id ? heights[activity.id] ?? 0 : 0,
                    opacity: activeId === activity.id ? 1 : 0,
                  }}
                >
                  {activity.description}
                </p>
                <figure
                  className={cn(styles.itemPreview, activeId === activity.id && styles.itemPreviewActive)}
                  aria-hidden={activeId !== activity.id}
                >
                  <img src={activity.image} alt={activity.title} loading="lazy" />
                </figure>
              </button>
            )
          })}

          <div className={cn(styles.actions, section.inView && styles.actionsVisible)}>
            <Button variant="dark" size="large" maxWidth className={styles.actionsButton}>
              Подробнее
            </Button>
          </div>
        </div>

        <figure className={cn(styles.preview, section.inView && styles.previewVisible)}>
          <img src={activeActivity.image} alt={activeActivity.title} loading="lazy" />
        </figure>
      </div>
    </section>
  )
}
