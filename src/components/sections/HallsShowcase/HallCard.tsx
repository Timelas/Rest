import type { CSSProperties } from 'react'

import { Button } from '@/components/ui/Button/Button'
import type { BookingContext } from '@/types/site'
import { cn } from '@/utils/cn'

import type { Hall } from './HallsShowcase'
import styles from './HallsShowcase.module.css'

type HallCardProps = {
  hall: Hall
  activeImage: string
  activeMediaIndex: number
  displayMedia: readonly string[]
  inView: boolean
  className?: string
  reverse?: boolean
  ctaAlign?: 'center' | 'start'
  onThumbClick: (index: number) => void
  onBookHall?: (context: BookingContext) => void
}

export const HallCard = ({
  hall,
  activeImage,
  activeMediaIndex,
  displayMedia,
  inView,
  className,
  reverse = false,
  ctaAlign = 'center',
  onThumbClick,
  onBookHall,
}: HallCardProps) => {
  return (
    <div className={cn(styles.hallCard, reverse && styles.hallCardReverse, className)}>
      <div className={cn(styles.infoColumn, inView && styles.infoVisible)}>
        <h3
          className={cn(styles.hallName, styles.hallNameDesktop, 'typo-h3', styles.copyReveal)}
          style={{ '--reveal-delay': '0s' } as CSSProperties}
        >
          {hall.name}
        </h3>
        <div className={styles.texts}>
          <p
            className={cn(styles.description, 'typo-description-secondary', styles.copyReveal)}
            style={{ '--reveal-delay': '0.2s' } as CSSProperties}
          >
            {hall.descriptionPrimary}
          </p>
          <p
            className={cn(styles.description, 'typo-description-secondary', styles.copyReveal)}
            style={{ '--reveal-delay': '0.4s' } as CSSProperties}
          >
            {hall.descriptionSecondary}
          </p>
        </div>

        <ul className={styles.features}>
          {hall.features.map((feature) => (
            <li key={feature.id} className={styles.featureItem}>
              <img src={feature.icon} alt="" aria-hidden="true" />
              <span className="typo-description-feature">{feature.label}</span>
            </li>
          ))}
        </ul>

        <div
          className={cn(
            styles.ctaRow,
            ctaAlign === 'start' && styles.ctaRowStart,
            styles.copyReveal
          )}
          style={{ '--reveal-delay': '0.8s' } as CSSProperties}
        >
          <Button
            size="large"
            padding="wide"
            onClick={() =>
              onBookHall?.({
                intent: 'hall',
                hallId: hall.id,
                hallName: hall.name,
                hallImage: activeImage,
              })
            }
          >
            Забронировать зал
          </Button>
        </div>
      </div>

      <div className={cn(styles.galleryColumn, inView && styles.galleryVisible)}>
        <h3
          className={cn(styles.hallName, styles.hallNameMobile, 'typo-h3', styles.copyReveal)}
          style={{ '--reveal-delay': '0s' } as CSSProperties}
          aria-hidden="true"
        >
          {hall.name}
        </h3>
        <figure className={cn(styles.mainMedia, styles.copyReveal)} style={{ '--reveal-delay': '0.4s' } as CSSProperties}>
          <img src={activeImage} alt={`${hall.name} фото ${activeMediaIndex + 1}`} loading="lazy" />
        </figure>
        <div className={cn(styles.thumbRow, styles.copyReveal)} style={{ '--reveal-delay': '0.6s' } as CSSProperties}>
          {displayMedia.map((mediaSrc, index) => (
            <button
              key={`${hall.id}-thumb-${index}`}
              className={styles.thumb}
              data-active={index === activeMediaIndex}
              onClick={() => onThumbClick(index)}
              aria-label={`Показать фото ${index + 1}`}
            >
              <img src={mediaSrc} alt="" loading="lazy" />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
