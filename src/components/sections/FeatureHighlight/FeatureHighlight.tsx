import { Button } from '@/components/ui/Button/Button'
import { useInView } from '@/hooks/useInView'

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
}: FeatureHighlightProps) => {
  const section = useInView<HTMLDivElement>({ threshold: 0.3 })

  return (
    <div className={styles.section} ref={section.ref}>
      <div className={styles.content}>
        {showLogo && logoSrc && <img src={logoSrc} alt="Satrpezo" className={styles.logo} />}
        <p className={`${styles.titleDesktop} typo-h4`}>{title}</p>
        <div className={`${styles.description} typo-description-secondary ${section.inView ? styles.descriptionVisible : ''}`}>
          {description.split('\n').map((paragraph, index) => (
            <p key={index} className="typo-description-secondary" style={{ '--paragraph-index': index } as React.CSSProperties}>
              {paragraph.trim()}
            </p>
          ))}
        </div>
        <div className={`${styles.actions} ${section.inView ? styles.actionsVisible : ''}`}>
          <Button size="large" variant="dark" onClick={onButtonClick}>
            {buttonLabel}
          </Button>
        </div>
      </div>
      <div className={`${styles.media} ${section.inView ? styles.mediaVisible : ''}`}>
        <p className={`${styles.titleMobile} typo-h4`}>{title}</p>
        <figure className={styles.image}>
          <img src={image} alt={imageAlt || title} loading="lazy" />
        </figure>
      </div>
    </div>
  )
}
