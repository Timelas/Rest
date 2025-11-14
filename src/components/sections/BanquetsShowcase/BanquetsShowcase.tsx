import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from 'react'

import video1 from '@/assets/img/video1.png'
import video2 from '@/assets/img/video2.png'
import video3 from '@/assets/img/video3.png'
import video4 from '@/assets/img/video4.png'
import video5 from '@/assets/img/video5.png'
import { useInView } from '@/hooks/useInView'
import { cn } from '@/utils/cn'

import styles from './BanquetsShowcase.module.css'

const VIDEO_PLACEHOLDERS = [
  { id: 'event-1', caption: 'Видео мероприятия 01', image: video1 },
  { id: 'event-2', caption: 'Видео мероприятия 02', image: video2 },
  { id: 'event-3', caption: 'Видео мероприятия 03', image: video3 },
  { id: 'event-4', caption: 'Видео мероприятия 04', image: video4 },
  { id: 'event-5', caption: 'Видео мероприятия 05', image: video5 },
] as const

export const BanquetsShowcase = () => {
  const section = useInView<HTMLDivElement>({ threshold: 0.3 })
  const [sequenceStarted, setSequenceStarted] = useState(false)
  const [isSliderMode, setIsSliderMode] = useState(false)
  const trackRef = useRef<HTMLDivElement | null>(null)
  const lastScrollYRef = useRef(0)
  const scrollTargetRef = useRef(0)
  const animationFrameRef = useRef<number | null>(null)

  useEffect(() => {
    if (section.inView) {
      setSequenceStarted(true)
    }
  }, [section.inView])

  const sliderItems = useMemo(() => {
    if (!isSliderMode) return VIDEO_PLACEHOLDERS
    return [...VIDEO_PLACEHOLDERS, ...VIDEO_PLACEHOLDERS]
  }, [isSliderMode])

  const stopSmoothScroll = useCallback(() => {
    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current)
      animationFrameRef.current = null
    }
  }, [])

  useEffect(() => () => stopSmoothScroll(), [stopSmoothScroll])

  const normalizeLoop = useCallback(() => {
    if (!isSliderMode) return
    const track = trackRef.current
    if (!track) return

    const baseWidth = track.scrollWidth / 2
    if (baseWidth <= 0) return

    if (track.scrollLeft <= 0) {
      track.scrollLeft += baseWidth
      scrollTargetRef.current += baseWidth
    } else if (track.scrollLeft >= baseWidth) {
      track.scrollLeft -= baseWidth
      scrollTargetRef.current -= baseWidth
    }
  }, [isSliderMode])

  const ensureInitialPosition = useCallback(() => {
    if (!isSliderMode) return
    const track = trackRef.current
    if (!track) return

    const baseWidth = track.scrollWidth / 2
    if (baseWidth <= 0) return
    track.scrollLeft = baseWidth / 2
    scrollTargetRef.current = track.scrollLeft
  }, [isSliderMode])

  const animateScroll = useCallback(() => {
    const track = trackRef.current
    if (!track) {
      animationFrameRef.current = null
      return
    }

    const current = track.scrollLeft
    const target = scrollTargetRef.current
    const diff = target - current

    if (Math.abs(diff) < 0.5) {
      track.scrollLeft = target
      normalizeLoop()
      animationFrameRef.current = null
      return
    }

    track.scrollLeft = current + diff * 0.15
    normalizeLoop()
    animationFrameRef.current = requestAnimationFrame(animateScroll)
  }, [normalizeLoop])

  const requestSmoothScroll = useCallback(() => {
    if (!isSliderMode) return
    if (animationFrameRef.current !== null) return
    animationFrameRef.current = requestAnimationFrame(animateScroll)
  }, [animateScroll, isSliderMode])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const mediaQuery = window.matchMedia('(max-width: 1440px)')

    const updateMode = () => {
      setIsSliderMode(mediaQuery.matches)
      lastScrollYRef.current = window.scrollY
      requestAnimationFrame(() => {
        if (mediaQuery.matches) {
          ensureInitialPosition()
        } else {
          const track = trackRef.current
          if (track) {
            track.scrollLeft = 0
          }
          scrollTargetRef.current = 0
          stopSmoothScroll()
        }
      })
    }

    updateMode()
    mediaQuery.addEventListener('change', updateMode)

    return () => mediaQuery.removeEventListener('change', updateMode)
  }, [ensureInitialPosition])

  useEffect(() => {
    if (!isSliderMode) return
    const handleResize = () => requestAnimationFrame(ensureInitialPosition)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [isSliderMode, ensureInitialPosition])

  useEffect(() => {
    if (!isSliderMode) return
    lastScrollYRef.current = window.scrollY

    const handleWindowScroll = () => {
      const track = trackRef.current
      if (!track) return

      const currentY = window.scrollY
      const delta = currentY - lastScrollYRef.current
      lastScrollYRef.current = currentY
      if (delta === 0) return

      scrollTargetRef.current = track.scrollLeft + delta * 0.35
      requestSmoothScroll()
    }

    window.addEventListener('scroll', handleWindowScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleWindowScroll)
    }
  }, [isSliderMode, requestSmoothScroll])

  useEffect(() => {
    if (!isSliderMode) return
    const track = trackRef.current
    if (!track) return

    const handleTrackScroll = () => {
      scrollTargetRef.current = track.scrollLeft
      normalizeLoop()
    }
    track.addEventListener('scroll', handleTrackScroll)
    return () => track.removeEventListener('scroll', handleTrackScroll)
  }, [isSliderMode, normalizeLoop])

  useEffect(() => {
    if (!isSliderMode) return
    const track = trackRef.current
    if (!track) return

    let isDragging = false
    let startX = 0
    let startScrollLeft = 0
    let pointerId: number | null = null

    const handlePointerDown = (event: PointerEvent) => {
      if (event.pointerType === 'mouse' && (event.buttons & 1) === 0) return
      isDragging = true
      startX = event.clientX
      startScrollLeft = track.scrollLeft
      pointerId = event.pointerId
      track.classList.add(styles.dragging)
      track.setPointerCapture(event.pointerId)
      event.preventDefault()
      stopSmoothScroll()
    }

    const handlePointerMove = (event: PointerEvent) => {
      if (!isDragging) return
      const delta = event.clientX - startX
      track.scrollLeft = startScrollLeft - delta
      scrollTargetRef.current = track.scrollLeft
    }

    const stopDragging = () => {
      if (!isDragging) return
      isDragging = false
      track.classList.remove(styles.dragging)
      if (pointerId !== null) {
        try {
          track.releasePointerCapture(pointerId)
        } catch {
          // already released
        }
        pointerId = null
      }
      normalizeLoop()
      scrollTargetRef.current = track.scrollLeft
      requestSmoothScroll()
    }

    track.addEventListener('pointerdown', handlePointerDown)
    track.addEventListener('pointermove', handlePointerMove)
    track.addEventListener('pointerup', stopDragging)
    track.addEventListener('pointerleave', stopDragging)
    track.addEventListener('pointercancel', stopDragging)

    return () => {
      track.classList.remove(styles.dragging)
      track.removeEventListener('pointerdown', handlePointerDown)
      track.removeEventListener('pointermove', handlePointerMove)
      track.removeEventListener('pointerup', stopDragging)
      track.removeEventListener('pointerleave', stopDragging)
      track.removeEventListener('pointercancel', stopDragging)
    }
  }, [isSliderMode, normalizeLoop, requestSmoothScroll, stopSmoothScroll])

  return (
    <div className={styles.section} ref={section.ref}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <h2 className={cn(styles.title, 'typo-h2', sequenceStarted && styles.titleVisible)}>Банкеты и корпоративы</h2>
          <p
            className={cn(styles.description, 'typo-description-secondary', sequenceStarted && styles.descriptionVisible)}
          >
            Ищите ресторан под корпоратив в Москве? Загляните в SATRAPEZO – ресторан грузинской и европейской кухни
            на Мичуринском проспекте. Удобное расположение, стильный интерьер залов, уютная летняя веранда, живая
            музыка и бесплатная парковка – неоспоримые преимущества ресторана. Но главное, мы сможем устроить
            настоящий пир для вас и для ваших сотрудников, ведь именно Грузия славится на весь мир своим
            гостеприимством и уникальными кулинарными традициями.
          </p>
        </div>

        <div className={styles.mediaRow}>
          <div className={styles.verticalLabel}>
            <span className={`${styles.verticalText} typo-h2`}>Контент мероприятий</span>
          </div>
          <div className={cn(styles.videoTrack, isSliderMode && styles.videoTrackSlider)} ref={trackRef}>
            {sliderItems.map((item, index) => (
              <article
                key={`${item.id}-${index}`}
                className={cn(styles.videoCard, sequenceStarted && styles.videoCardVisible)}
                style={{ '--card-delay': `${(index % VIDEO_PLACEHOLDERS.length) * 0.12}s` } as CSSProperties}
              >
                <img src={item.image} alt={item.caption} loading="lazy" />
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
