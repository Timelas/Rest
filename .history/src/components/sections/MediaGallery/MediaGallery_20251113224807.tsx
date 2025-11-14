import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react'

import { cn } from '@/utils/cn'

import styles from './MediaGallery.module.css'

type GalleryImage = {
  id: string
  src: string
  alt: string
  label?: string
}

type MediaGalleryProps = {
  images: GalleryImage[]
  className?: string
}

export const MediaGallery = ({ images, className }: MediaGalleryProps) => {
  const galleryRef = useRef<HTMLDivElement | null>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const update = () => {
      const target = galleryRef.current
      if (!target) return

      const rect = target.getBoundingClientRect()
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight
      const distance = viewportHeight - rect.top
      const ratio = distance / (rect.height || 1)
      setProgress(Math.min(Math.max(ratio, 0), 1))
    }

    const onScroll = () => requestAnimationFrame(update)

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', update)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', update)
    }
  }, [])

  const galleryStyle = useMemo(
    () =>
      ({
        '--gallery-opacity': progress,
      }) as CSSProperties,
    [progress]
  )

  return (
    <div ref={galleryRef} className={cn(styles.gallery, className)} style={galleryStyle}>
      {images.map((image) => {
        const scale = 1.2 - progress * 0.2
        const blur = (1 - progress) * 12
        const opacity = progress
        return (
          <figure
            key={image.id}
            className={styles.item}
            style={
              {
                '--gallery-scale': scale,
                '--gallery-blur': `${blur}px`,
                '--gallery-item-opacity': opacity,
              } as CSSProperties
            }
          >
            <img src={image.src} alt={image.alt} />
            {image.label && <figcaption>{image.label}</figcaption>}
          </figure>
        )
      })}
    </div>
  )
}
