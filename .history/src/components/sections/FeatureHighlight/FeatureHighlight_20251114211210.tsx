import { Button } from '@/components/ui/Button/Button'

import styles from './FeatureHighlight.module.css'

type FeatureHighlightProps = {
  title: string
  description: string
  image: string
  imageAlt?: string
  buttonLabel: string
  onButtonClick: () => void
  showLogo?: boolean
  logoSrc?: string
}

export const FeatureHighlight = ({
  title,
  description,
  image,
  imageAlt = '',
  buttonLabel,
  onButtonClick,
  showLogo = false,
  logoSrc,
}: FeatureHighlightProps) => (
  <div className={styles.section}>
    <div className={styles.content}>
      {showLogo && logoSrc && <img src={logoSrc} alt="Satrpezo" className={styles.logo} />}
      <p className={`${styles.title} typo-caption`}>{title}</p>
      <div className={`${styles.description} typo-description-secondary`}>
        {description.split('\n').map((paragraph, index) => (
          <p key={index}>{paragraph.trim()}</p>
        ))}
      </div>
      <div className={styles.actions}>
        <Button size="large" variant="dark" onClick={onButtonClick}>
          {buttonLabel}
        </Button>
      </div>
    </div>
    <figure className={styles.image}>
      <img src={image} alt={imageAlt || title} loading="lazy" />
    </figure>
  </div>
)
