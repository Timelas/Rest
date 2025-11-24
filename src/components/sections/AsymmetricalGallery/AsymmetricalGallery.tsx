import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from 'react'

import { Button } from '@/components/ui/Button/Button'
import { useInView } from '@/hooks/useInView'

import styles from './AsymmetricalGallery.module.css'

type GalleryImage = {
  id: string
  src: string
  alt?: string
}

type GalleryEntry = GalleryImage & { ratio: string }

type AsymmetricalGalleryProps = {
  images: readonly GalleryImage[]
  buttonLabel: string
  onButtonClick: () => void
  showButton?: boolean
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

const observerOptions: IntersectionObserverInit = {
  threshold: 0.35,
  rootMargin: '0px 0px -10% 0px',
}

export const AsymmetricalGallery = ({
  images,
  buttonLabel,
  onButtonClick,
  showButton = true,
}: AsymmetricalGalleryProps) => {
  const section = useInView<HTMLDivElement>({ threshold: 0.2 })
  const [visibleTiles, setVisibleTiles] = useState<Record<string, boolean>>({})
  const tileRefs = useRef<Record<string, HTMLElement | null>>({})
  const observerRef = useRef<IntersectionObserver | null>(null)

  const groups = useMemo(() => {
    const nextGroups: Group[] = []
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
          nextGroups.push(currentGroup)
          currentGroup = startGroup()
        }
      }
    }

    if (currentGroup.left.length || currentGroup.right.length || currentGroup.wides.length) {
      nextGroups.push(currentGroup)
    }

    return nextGroups
  }, [images])

  useEffect(() => {
    setVisibleTiles({})
    Object.values(tileRefs.current).forEach((node) => node && observerRef.current?.unobserve(node))
    tileRefs.current = {}
    observerRef.current?.disconnect()
    observerRef.current = null
  }, [images])

  useEffect(() => {
    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return
            const id = entry.target.getAttribute('data-tile-id')
            if (!id) return
            setVisibleTiles((prev) => (prev[id] ? prev : { ...prev, [id]: true }))
            observerRef.current?.unobserve(entry.target)
          })
        },
        observerOptions
      )
    }

    Object.entries(tileRefs.current).forEach(([id, node]) => {
      if (node && !visibleTiles[id]) {
        observerRef.current?.observe(node)
      }
    })

    return () => observerRef.current?.disconnect()
  }, [groups, visibleTiles])

  const registerTile = useCallback(
    (id: string) => (node: HTMLElement | null) => {
      if (node) {
        tileRefs.current[id] = node
        if (observerRef.current && !visibleTiles[id]) {
          observerRef.current.observe(node)
        }
      } else {
        delete tileRefs.current[id]
      }
    },
    [visibleTiles]
  )

  return (
    <div className={styles.section} ref={section.ref}>
      {groups.map((group, groupIndex) => (
        <div key={`group-${groupIndex}`} className={styles.segment}>
          {(group.left.length > 0 || group.right.length > 0) && (
            <div className={styles.columns}>
              <div className={styles.column}>
                {group.left.map((entry) => (
                  <figure
                    key={entry.id}
                    ref={registerTile(entry.id)}
                    data-tile-id={entry.id}
                    className={`${styles.tile} ${visibleTiles[entry.id] ? styles.tileVisible : ''}`}
                    style={{ '--tile-ratio': entry.ratio } as CSSProperties}
                  >
                    <img src={entry.src} alt={entry.alt ?? 'Галерея ресторана'} loading="lazy" />
                  </figure>
                ))}
              </div>
              <div className={styles.column}>
                {group.right.map((entry) => (
                  <figure
                    key={entry.id}
                    ref={registerTile(entry.id)}
                    data-tile-id={entry.id}
                    className={`${styles.tile} ${visibleTiles[entry.id] ? styles.tileVisible : ''}`}
                    style={{ '--tile-ratio': entry.ratio } as CSSProperties}
                  >
                    <img src={entry.src} alt={entry.alt ?? 'Галерея ресторана'} loading="lazy" />
                  </figure>
                ))}
              </div>
            </div>
          )}
          {group.wides.map((entry) => (
            <figure
              key={entry.id}
              ref={registerTile(entry.id)}
              data-tile-id={entry.id}
              className={`${styles.tile} ${styles.wide} ${visibleTiles[entry.id] ? styles.tileVisible : ''}`}
              style={{ '--tile-ratio': entry.ratio } as CSSProperties}
            >
              <img src={entry.src} alt={entry.alt ?? 'Галерея ресторана'} loading="lazy" />
            </figure>
          ))}
        </div>
      ))}

      {showButton && (
        <div className={styles.actions}>
          <Button size="large" padding="wide" onClick={onButtonClick}>
            {buttonLabel}
          </Button>
        </div>
      )}
    </div>
  )
}
