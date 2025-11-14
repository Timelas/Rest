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

export const MediaGallery = ({ images, className }: MediaGalleryProps) => (
  <div className={cn(styles.gallery, className)}>
    {images.map((image) => (
      <figure key={image.id} className={styles.item}>
        <img src={image.src} alt={image.alt} />
        {image.label && <figcaption>{image.label}</figcaption>}
      </figure>
    ))}
  </div>
)
