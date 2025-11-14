import menu1 from '@/assets/img/menu1.png'
import menu2 from '@/assets/img/menu2.png'
import menu3 from '@/assets/img/menu3.png'
import menu4 from '@/assets/img/menu4.png'

import { useEffect, useState, type CSSProperties } from 'react'

import { useInView } from '@/hooks/useInView'
import { cn } from '@/utils/cn'

import styles from './MenuShowcase.module.css'

const MENU_ITEMS = [
  { id: 'main', title: 'Основное меню', image: menu1 },
  { id: 'bar', title: 'Барное меню', image: menu2 },
  { id: 'kids', title: 'Детское меню', image: menu3 },
  { id: 'summer', title: 'Летнее предложение', image: menu4 },
] as const

export const MenuShowcase = () => {
  const showcase = useInView<HTMLDivElement>({ threshold: 0.3 })
  const [sequenceStarted, setSequenceStarted] = useState(false)

  useEffect(() => {
    if (showcase.inView) {
      setSequenceStarted(true)
    }
  }, [showcase.inView])

  return (
    <div className={styles.section} ref={showcase.ref}>
      <div className={styles.inner}>
        <h2 className={cn(styles.title, 'typo-h2', sequenceStarted && styles.titleVisible)}>Меню</h2>
        <div className={styles.grid}>
          {MENU_ITEMS.map((item, index) => (
            <article
              key={item.id}
              className={cn(styles.card, sequenceStarted && styles.cardVisible)}
              style={{ '--card-delay': `${index * 0.12}s` } as CSSProperties}
            >
              <img src={item.image} alt={item.title} className={styles.image} loading="lazy" />
              <p className={`${styles.label} typo-h4`}>{item.title}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
