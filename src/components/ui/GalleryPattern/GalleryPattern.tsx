import type { MediaAsset } from '@/types/site'

import styles from './GalleryPattern.module.css'

type GalleryPatternProps = {
  assets: MediaAsset[]
}

export const GalleryPattern = ({ assets }: GalleryPatternProps) => (
  <div className={styles.gallery}>
    {assets.map((asset) => (
      <figure key={asset.id} className={styles.item}>
        <img src={asset.thumbnail} alt={asset.title} />
      </figure>
    ))}
  </div>
)
