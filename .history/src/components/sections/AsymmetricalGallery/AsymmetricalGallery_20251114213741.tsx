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
  { type: 'wide', ratio: '946 / 608' },
  { type: 'column', column: 'left', ratio: '466 / 462' },
  { type: 'column', column: 'right', ratio: '466 / 542' },
  { type: 'column', column: 'left', ratio: '466 / 462' },
  { type: 'column', column: 'right', ratio: '466 / 380' },
]

type Group = {
  left: GalleryEntry[]
  right: GalleryEntry[]
  wides: GalleryEntry[]
}

export const AsymmetricalGallery = ({ images, buttonLabel, onButtonClick }: AsymmetricalGalleryProps) => {
  const groups: Group[] = []
  let index = 0

  const startGroup = (): Group => ({ left: [], right: [], wides: [] })
  let currentGroup = startGroup()

  while (index < images.length) {
    for (const step of PATTERN) {
      if (index >= images.length) break
      const image = images[index++]
      const entry: GalleryEntry = { ...image, ratio: step.ratio }

      if (step.type === 'column') {
        currentGroup[step.column].push(entry)
      } else {
        currentGroup.wides.push(entry)
        groups.push(currentGroup)
        currentGroup = startGroup()
      }
    }
  }

  if (currentGroup.left.length || currentGroup.right.length || currentGroup.wides.length) {
    groups.push(currentGroup)
  }

  return (
    <div className={styles.section}>
      {groups.map((group, groupIndex) => (
        <div key={`group-${groupIndex}`} className={styles.segment}>
          {(group.left.length > 0 || group.right.length > 0) && (
            <div className={styles.columns}>
              <div className={styles.column}>
                {group.left.map((entry) => (
                  <figure key={entry.id} className={styles.tile} style={{ '--tile-ratio': entry.ratio } as CSSProperties}>
                    <img src={entry.src} alt={entry.alt ?? 'Галерея ресторана'} loading="lazy" />
                  </figure>
                ))}
              </div>
              <div className={styles.column}>
                {group.right.map((entry) => (
                  <figure key={entry.id} className={styles.tile} style={{ '--tile-ratio': entry.ratio } as CSSProperties}>
                    <img src={entry.src} alt={entry.alt ?? 'Галерея ресторана'} loading="lazy" />
                  </figure>
                ))}
              </div>
            </div>
          )}
          {group.wides.map((entry) => (
            <figure key={entry.id} className={`${styles.tile} ${styles.wide}`} style={{ '--tile-ratio': entry.ratio } as CSSProperties}>
              <img src={entry.src} alt={entry.alt ?? 'Галерея ресторана'} loading="lazy" />
            </figure>
          ))}
        </div>
      ))}

      <div className={styles.actions}>
        <Button size="large" padding='wide' onClick={onButtonClick}>
          {buttonLabel}
        </Button>
      </div>
    </div>
  )
}
