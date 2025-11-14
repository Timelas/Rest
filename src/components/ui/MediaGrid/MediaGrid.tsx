import type { MediaAsset } from '@/types/site'

import styles from './MediaGrid.module.css'

type MediaGridProps = {
  assets: MediaAsset[]
  title?: string
}

export const MediaGrid = ({ assets, title }: MediaGridProps) => (
  <section className={styles.gridSection}>
    {title && <h3 className="typo-h3">{title}</h3>}
    <div className={styles.grid}>
      {assets.map((asset) => (
        <article key={asset.id} className={styles.card}>
          <img src={asset.thumbnail} alt={asset.title} />
          <div className={styles.meta}>
            <span className="typo-breadcrumbs">{asset.format}</span>
            <p className="typo-description-secondary">{asset.title}</p>
          </div>
        </article>
      ))}
    </div>
  </section>
)
