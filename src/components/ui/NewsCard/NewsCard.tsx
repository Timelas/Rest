import type { NewsCard as NewsCardType } from '@/types/site'
import { Button } from '@/components/ui/Button/Button'
import { cn } from '@/utils/cn'

import styles from './NewsCard.module.css'

type NewsCardProps = {
  data: NewsCardType
  onSelect?: (id: string) => void
}

export const NewsCard = ({ data, onSelect }: NewsCardProps) => (
  <article className={styles.card}>
    <div className={styles.media}>
      <img src={data.image} alt={data.title} />
      <div className={styles.mediaMeta}>
        <span className="typo-breadcrumbs">{data.date}</span>
        <p className="typo-news-card">{data.title}</p>
      </div>
    </div>
    <div className={styles.content}>
      <p className={cn('typo-news-card', styles.excerpt)}>{data.excerpt}</p>
      <Button variant="outline" size="regular" onClick={() => onSelect?.(data.id)}>
        Подробнее
      </Button>
    </div>
  </article>
)
