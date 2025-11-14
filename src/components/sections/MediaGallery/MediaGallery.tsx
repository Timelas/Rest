import { useEffect, useState } from 'react'

import { useInView } from '@/hooks/useInView'
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
  const gallery = useInView<HTMLDivElement>({ threshold: 0.3 })
  const [triggered, setTriggered] = useState(false)

  useEffect(() => {
    if (gallery.inView && !triggered) {
      setTriggered(true)
    }
  }, [gallery.inView, triggered])

  return (
    <div ref={gallery.ref} className={cn(styles.galleryContain)}>
      <div className={cn(styles.gallery, className)}>
        {images.map((image, index) => (
          <figure
            key={image.id}
            className={cn(styles.item, triggered && styles.itemAnimated)}
            style={{ '--gallery-delay': `${index * 0.08}s` } as React.CSSProperties}
          >
            <img src={image.src} alt={image.alt} />
            {image.label && <figcaption>{image.label}</figcaption>}
          </figure>
        ))}
      </div>
    </div>
  )
}
