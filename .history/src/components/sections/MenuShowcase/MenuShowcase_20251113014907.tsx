import menu1 from '@/assets/img/menu1.png'
import menu2 from '@/assets/img/menu2.png'
import menu3 from '@/assets/img/menu3.png'
import menu4 from '@/assets/img/menu4.png'

import styles from './MenuShowcase.module.css'

const MENU_ITEMS = [
  { id: 'main', title: 'Основное меню', image: menu1 },
  { id: 'bar', title: 'Барное меню', image: menu2 },
  { id: 'kids', title: 'Детское меню', image: menu3 },
  { id: 'summer', title: 'Летнее предложение', image: menu4 },
] as const

export const MenuShowcase = () => (
  <div className={styles.section}>
    <div className={styles.inner}>
      <h2 className={styles.title}>Меню</h2>
      <div className={styles.grid}>
        {MENU_ITEMS.map((item) => (
          <article key={item.id} className={styles.card}>
            <img src={item.image} alt={item.title} className={styles.image} loading="lazy" />
            <p className={`${styles.label} typo-h4`}>{item.title}</p>
          </article>
        ))}
      </div>
    </div>
  </div>
)
