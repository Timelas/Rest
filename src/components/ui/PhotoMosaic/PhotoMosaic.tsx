import type { MediaAsset } from '@/types/site'

import styles from './PhotoMosaic.module.css'

type PhotoMosaicProps = {
  assets: MediaAsset[]
}

export const PhotoMosaic = ({ assets }: PhotoMosaicProps) => {
  if (!assets.length) return null

  const [primary, ...rest] = assets

  return (
    <div className={styles.wrapper}>
      <div className={styles.primary}>
        <img src={primary.thumbnail} alt={primary.title} />
      </div>
      <div className={styles.row}>
        {rest.map((asset) => (
          <div key={asset.id} className={styles.secondary}>
            <img src={asset.thumbnail} alt={asset.title} />
          </div>
        ))}
      </div>
    </div>
  )
}
