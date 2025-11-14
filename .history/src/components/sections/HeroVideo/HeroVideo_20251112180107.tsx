import LogoFull from '@/assets/svg/logoFull.svg'
import { Button } from '@/components/ui/Button/Button'
import { cn } from '@/utils/cn'

import styles from './HeroVideo.module.css'

type HeroBadge = {
  id: string
  icon: string
  title: string
  iconAlt?: string
}

type HeroVideoProps = {
  poster: string
  videoSrc?: string
  description: string
  subtitle: string
  badges: HeroBadge[]
  onBook: () => void
  onOpenMenu: () => void
}

export const HeroVideo = ({
  poster,
  videoSrc,
  subtitle,
  description,
  badges,
  onBook,
  onOpenMenu,
}: HeroVideoProps) => (
  <section className={cn(styles.hero, 'fade-in')}>
    <div className={styles.media}>
      {videoSrc ? (
        <video autoPlay muted loop playsInline poster={poster}>
          <source src={videoSrc} type="video/mp4" />
        </video>
      ) : (
        <img src={poster} alt="Видео-заставка" />
      )}
    </div>
    <div className={styles.overlay}>
      <div className={styles.content}>
      <div className={styles.primary}>
        <img src={LogoFull} alt="Strapezo" className={styles.heroLogo} />
        <div className={cn(styles.ctas, 'fade-in')}>
          <Button variant="light" size="large" onClick={onBook}>
            Забронировать стол
          </Button>
          <Button variant="outline" size="large" onClick={onOpenMenu}>
            Меню
          </Button>
        </div>
      </div>
      <div className={styles.footer}>
        <div className={cn(styles.description, 'fade-in')}>
          {subtitle && <p className="typo-description-hero">{subtitle}</p>}
          {description && <p className="typo-description-primary">{description}</p>}
        </div>
        <div className={cn(styles.badges, 'fade-in')}>
          {badges.map((badge) => (
            <div key={badge.id} className={styles.badge}>
              <img
                src={badge.icon}
                alt={badge.iconAlt ?? badge.title}
                className={styles.badgeIcon}
                aria-hidden={badge.iconAlt ? undefined : true}
              />
              <p className="typo-button-advantage">{badge.title}</p>
            </div>
          ))}
        </div>
      </div>
      </div>
    </div>
  </section>
)
