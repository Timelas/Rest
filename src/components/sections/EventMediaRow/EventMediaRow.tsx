import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from 'react'

import { useInView } from '@/hooks/useInView'
import { cn } from '@/utils/cn'

import styles from './EventMediaRow.module.css'

type MediaItem = {
  id: string
  image: string
  alt: string
}

type EventMediaRowProps = {
  label: string
  items: MediaItem[]
}

export const EventMediaRow = ({ label, items }: EventMediaRowProps) => {
  const section = useInView<HTMLDivElement>({ threshold: 0.2 })
  const [isSliderMode, setIsSliderMode] = useState(false)
  const trackRef = useRef<HTMLDivElement | null>(null)
  const lastScrollYRef = useRef(0)
  const windowScrollRaf = useRef<number | null>(null)

  const sliderItems = useMemo(() => (isSliderMode ? [...items, ...items] : items), [items, isSliderMode])

  const normalizeLoop = useCallback(() => {
    if (!isSliderMode) return
    const track = trackRef.current
    if (!track) return
    const baseWidth = track.scrollWidth / 2
    if (baseWidth <= 0) return

    if (track.scrollLeft <= 0) {
      track.scrollLeft += baseWidth
    } else if (track.scrollLeft >= baseWidth) {
      track.scrollLeft -= baseWidth
    }
  }, [isSliderMode])

  const ensureInitialPosition = useCallback(() => {
    if (!isSliderMode) return
    const track = trackRef.current
    if (!track) return

    const baseWidth = track.scrollWidth / 2
    if (baseWidth <= 0) return
    track.scrollLeft = baseWidth / 2
  }, [isSliderMode])

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
          if (track) track.scrollLeft = 0
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
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [isSliderMode, ensureInitialPosition])

  useEffect(() => {
    if (!isSliderMode) return
    lastScrollYRef.current = window.scrollY

    const handleWindowScroll = () => {
      if (windowScrollRaf.current !== null) return
      windowScrollRaf.current = requestAnimationFrame(() => {
        windowScrollRaf.current = null
        const track = trackRef.current
        if (!track) return

        const delta = window.scrollY - lastScrollYRef.current
        lastScrollYRef.current = window.scrollY
        if (delta === 0) return

        track.scrollLeft += delta * 0.35
        normalizeLoop()
      })
    }

    window.addEventListener('scroll', handleWindowScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleWindowScroll)
      if (windowScrollRaf.current !== null) {
        cancelAnimationFrame(windowScrollRaf.current)
        windowScrollRaf.current = null
      }
    }
  }, [isSliderMode, normalizeLoop])

  useEffect(() => {
    if (!isSliderMode) return
    const track = trackRef.current
    if (!track) return

    const handleTrackScroll = () => normalizeLoop()
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
      if ((event.pointerType === 'mouse' && (event.buttons & 1) === 0)) return
      isDragging = true
      startX = event.clientX
      startScrollLeft = track.scrollLeft
      pointerId = event.pointerId
      track.classList.add(styles.dragging)
      track.setPointerCapture(event.pointerId)
      event.preventDefault()
    }

    const handlePointerMove = (event: PointerEvent) => {
      if (!isDragging) return
      const delta = event.clientX - startX
      track.scrollLeft = startScrollLeft - delta
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
  }, [isSliderMode, normalizeLoop])

  return (
    <section className={styles.section} ref={section.ref}>
      <div className={styles.inner}>
        <div className={styles.verticalLabel}>
          <span className="typo-h4">{label}</span>
        </div>
        <div className={cn(styles.track, isSliderMode && styles.trackSlider)} ref={trackRef}>
          {sliderItems.map((item, index) => (
            <article
              key={`${item.id}-${index}`}
              className={cn(styles.card, section.inView && styles.cardVisible)}
              style={{ '--card-delay': `${(index % items.length) * 0.12}s` } as CSSProperties}
            >
              <img src={item.image} alt={item.alt} loading="lazy" />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
