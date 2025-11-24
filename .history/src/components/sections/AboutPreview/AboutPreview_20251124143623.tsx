import { useEffect, useRef, useState, type CSSProperties, type MouseEvent } from 'react'

import rest1 from '@/assets/img/rest1.png'
import rest2 from '@/assets/img/rest2.png'
import rest3 from '@/assets/img/rest3.png'
import rest4 from '@/assets/img/rest4.png'
import logoMini from '@/assets/svg/logoMiniFull.svg'
import { Button } from '@/components/ui/Button/Button'
import { useInView } from '@/hooks/useInView'
import { cn } from '@/utils/cn'

import styles from './AboutPreview.module.css'

type AboutPreviewProps = {
  onNavigateAbout: () => void
}

const FRAMES = [
  { id: 'leftTop', src: rest1, className: styles.leftTop, alt: 'Satrapezo — основной зал' },
  { id: 'leftBottom', src: rest2, className: styles.leftBottom, alt: 'Подпись Satrapezo' },
  { id: 'rightTop', src: rest3, className: styles.rightTop, alt: 'Гости Satrapezo' },
  { id: 'rightBottom', src: rest4, className: styles.rightBottom, alt: 'Атмосфера Satrapezo' },
] as const

const MIN_DISTANCE = 500
const SLOW_INTERVAL_MS = 180
const DROP_DURATION_MS = 950
const FALLBACK_CLEAR_MS = DROP_DURATION_MS + 320

type FloatingPhoto = {
  id: number
  x: number
  y: number
  src: string
  dropping: boolean
  dropTarget: number
  dropDuration: number
}

export const AboutPreview = ({ onNavigateAbout }: AboutPreviewProps) => {
  const section = useInView<HTMLDivElement>({ threshold: 0.15 })
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window === 'undefined' ? true : window.innerWidth >= 1024
  )
  const [photos, setPhotos] = useState<FloatingPhoto[]>([])
  const galleryRef = useRef<HTMLDivElement | null>(null)
  const lastSpawnRef = useRef<{ x: number; y: number; time: number } | null>(null)
  const timersRef = useRef<number[]>([])
  const idRef = useRef(0)
  const frameIndexRef = useRef(0)

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (!isDesktop) {
      setPhotos([])
      lastSpawnRef.current = null
    }
  }, [isDesktop])

  useEffect(
    () => () => {
      timersRef.current.forEach((t) => window.clearTimeout(t))
      timersRef.current = []
    },
    []
  )

  const spawnFrame = (event: MouseEvent<HTMLDivElement>) => {
    if (!isDesktop) return
    const now = Date.now()
    const last = lastSpawnRef.current
    const dist = last ? Math.hypot(event.clientX - last.x, event.clientY - last.y) : Infinity
    const timeDiff = last ? now - last.time : Infinity
    if (dist < MIN_DISTANCE && timeDiff < SLOW_INTERVAL_MS) return

    const rect = event.currentTarget.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    const containerHeight = galleryRef.current?.offsetHeight ?? rect.height
    const dropTarget = (containerHeight || 500) * 1.35
    const dropDuration = DROP_DURATION_MS

    const id = ++idRef.current
    const src = FRAMES[frameIndexRef.current % FRAMES.length].src
    frameIndexRef.current += 1
    lastSpawnRef.current = { x: event.clientX, y: event.clientY, time: now }

    setPhotos((prev) => [...prev, { id, x, y, src, dropping: false, dropTarget, dropDuration }])

    const dropTimer = window.setTimeout(() => {
      setPhotos((prev) => prev.map((photo) => (photo.id === id ? { ...photo, dropping: true } : photo)))
    }, 20)

    const clearTimer = window.setTimeout(() => {
      setPhotos((prev) => prev.filter((photo) => photo.id !== id))
    }, Math.max(FALLBACK_CLEAR_MS, dropDuration + 200))

    timersRef.current.push(dropTimer, clearTimer)
  }

  return (
    <div
      className={styles.about}
      ref={section.ref}
      onMouseMove={spawnFrame}
    >
      <div className={styles.gallery} ref={galleryRef}>
        {photos.map((photo) => (
          <figure
            key={photo.id}
            className={cn(styles.floatingPhoto, photo.dropping && styles.floatingPhotoDropping)}
            style={
              {
                '--cursor-x': `${photo.x}px`,
                '--cursor-y': `${photo.y}px`,
                '--drop-duration': `${photo.dropDuration}ms`,
                '--drop-target': `${photo.dropTarget}px`,
              } as CSSProperties
            }
            aria-hidden="true"
            onTransitionEnd={(event) => {
              if (event.propertyName === 'opacity' && photo.dropping) {
                setPhotos((prev) => prev.filter((item) => item.id !== photo.id))
              }
            }}
          >
            <img src={photo.src} alt="" />
          </figure>
        ))}

        <div className={styles.columnLeft}>
          {FRAMES.slice(0, 2).map((frame) => (
            <figure
              key={frame.id}
              className={cn(styles.frame, frame.className, section.inView && styles.frameVisible)}
            >
              <img src={frame.src} alt={frame.alt} />
            </figure>
          ))}
        </div>
        <div className={cn(styles.copy, section.inView && styles.copyVisible)}>
          <img
            src={logoMini}
            alt="STRAPEZO"
            className={cn(styles.logo, styles.copyReveal)}
            style={{ '--reveal-delay': '0s' } as CSSProperties}
          />
          <div className={styles.text}>
            <h1
              className={cn('typo-h1', styles.title, styles.copyReveal)}
              style={{ '--reveal-delay': '0.4s' } as CSSProperties}
            >
              Ресторан грузинской и европейской кухни
            </h1>
            <p
              className={cn('typo-description-emphasis', styles.description, styles.copyReveal)}
              style={{ '--reveal-delay': '0.8s' } as CSSProperties}
            >
              Ресторан Satrapezo, расположенный на Мичуринском проспекте, предлагает вниманию гостей всё многообразие
              блюд традиционной грузинской кухни, великолепную национальную выпечку и большой ассортимент вина. Название
              ресторана Сатрапезо переводится как «Трапеза». Однако в данном случае имеется в виду не обычный приём
              пищи, а особое ритуальное пиршество, устроенное в каком-либо священном месте. Этот обычай перекочевал в
              грузинскую культуру и на какое-то время стал национальной традицией. Именно эту концепцию постарались
              воплотить рестораторы.
            </p>
          </div>
          <Button
            variant="dark"
            size="large"
            padding="wide"
            onClick={onNavigateAbout}
            className={cn(styles.copyReveal, styles.button)}
            style={{ '--reveal-delay': '1.2s' } as CSSProperties}
          >
            Больше о ресторане
          </Button>
        </div>
        <div className={styles.columnRight}>
          {FRAMES.slice(2).map((frame) => (
            <figure
              key={frame.id}
              className={cn(styles.frame, frame.className, section.inView && styles.frameVisible)}
            >
              <img src={frame.src} alt={frame.alt} />
            </figure>
          ))}
        </div>
      </div>
    </div>
  )
}
