import type { Advantage } from '@/types/site'
import { cn } from '@/utils/cn'

import styles from './AdvantageCard.module.css'

type AdvantageCardProps = Advantage & {
  tone?: 'light' | 'dark'
}

export const AdvantageCard = ({
  title,
  description,
  icon = '✦',
  tone = 'light',
}: AdvantageCardProps) => {
  return (
    <article className={cn(styles.card, styles[`card--${tone}`], 'fade-in')}>
      <div className={styles.icon}>{icon}</div>
      <div>
        <h4 className={cn('typo-h4', styles.title)}>{title}</h4>
        <p className={cn('typo-description-secondary', styles.description)}>{description}</p>
      </div>
    </article>
  )
}
