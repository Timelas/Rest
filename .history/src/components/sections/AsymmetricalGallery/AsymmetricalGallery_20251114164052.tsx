import type { CSSProperties } from 'react'

import { Button } from '@/components/ui/Button/Button'

import styles from './AsymmetricalGallery.module.css'

type GalleryImage = {
  id: string
  src: string
  alt?: string
}

type GalleryEntry = GalleryImage & { ratio: string }

type AsymmetricalGalleryProps = {
  images: GalleryImage[]
  buttonLabel: string
  onButtonClick: () => void
}

type PatternStep =
  | { type: 'column'; column: 'left' | 'right'; ratio: string }
  | { type: 'wide'; ratio: string }

const PATTERN: PatternStep[] = [
  { type: 'column', column: 'left', ratio: '466 / 554' },
  { type: 'column', column: 'right', ratio: '466 / 448' },
  { type: 'column', column: 'left', ratio: '466 / 608' },
  { type: 'column', column: 'right', ratio: '466 / 609' },
  { type: 'column', column: 'left', ratio: '466 / 502' },
  { type: 'column', column: 'right', ratio: '466 / 609' },
  { type: 'wide', ratio: '932 / 400' },
]

type Segment = {
  left: GalleryEntry[]
  right: GalleryEntry[]
  wide?: GalleryEntry
}

export const AsymmetricalGallery = ({ images, buttonLabel, onButtonClick }: AsymmetricalGalleryProps) => {
  const segments: Segment[] = []
  let index = 0

  while (index < images.length) {
    const segment: Segment = { left: [], right: [] }

    for (const step of PATTERN) {
      if (index >= images.length) break
      const image = images[index++]
      const entry: GalleryEntry = { ...image, ratio: step.ratio }

      if (step.type === 'column') {
        segment[step.column].push(entry)
      } else {
        segment.wide = entry
        break
      }
    }

    segments.push(segment)
  }

  return (
    <div className={styles.section}>
      {segments.map((segment, segmentIndex) => (
        <div key={`segment-${segmentIndex}`} className={styles.segment}>
          <div className={styles.columns}>
            <div className={styles.column}>
              {segment.left.map((entry) => (
                <figure key={entry.id} className={styles.tile} style={{ '--tile-ratio': entry.ratio } as CSSProperties}>
                  <img src={entry.src} alt={entry.alt ?? 'Галерея ресторана'} loading="lazy" />
                </figure>
              ))}
            </div>
            <div className={styles.column}>
              {segment.right.map((entry) => (
                <figure key={entry.id} className={styles.tile} style={{ '--tile-ratio': entry.ratio } as CSSProperties}>
                  <img src={entry.src} alt={entry.alt ?? 'Галерея ресторана'} loading="lazy" />
                </figure>
              ))}
            </div>
          </div>
          {segment.wide && (
            <figure className={`${styles.tile} ${styles.wide}`} style={{ '--tile-ratio': segment.wide.ratio } as CSSProperties}>
              <img src={segment.wide.src} alt={segment.wide.alt ?? 'Галерея ресторана'} loading="lazy" />
            </figure>
          )}
        </div>
      ))}

      <div className={styles.actions}>
        <Button size="large" onClick={onButtonClick}>
          {buttonLabel}
        </Button>
      </div>
    </div>
  )
}
