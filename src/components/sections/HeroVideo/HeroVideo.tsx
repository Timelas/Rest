import { useEffect, useState, type CSSProperties } from 'react'

import captureHero from '@/assets/img/captureHero.png'
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
}: HeroVideoProps) => {
  const [isVideoReady, setIsVideoReady] = useState(false)
  const [ctaVisible, setCtaVisible] = useState(false)
  const [descriptionVisible, setDescriptionVisible] = useState(false)
  const [badgesVisible, setBadgesVisible] = useState(false)

  useEffect(() => {
    setIsVideoReady(false)
    setCtaVisible(false)
    setDescriptionVisible(false)
    setBadgesVisible(false)
    if (!videoSrc) {
      const raf = requestAnimationFrame(() => setIsVideoReady(true))
      return () => cancelAnimationFrame(raf)
    }
  }, [videoSrc])

  useEffect(() => {
    if (!isVideoReady) return
    const ctaTimer = setTimeout(() => setCtaVisible(true), 80)
    const descriptionTimer = setTimeout(() => setDescriptionVisible(true), 360)
    const badgesTimer = setTimeout(() => setBadgesVisible(true), 720)
    return () => {
      clearTimeout(ctaTimer)
      clearTimeout(descriptionTimer)
      clearTimeout(badgesTimer)
    }
  }, [isVideoReady])

  return (
    <section className={cn(styles.hero, 'fade-in')} data-hero-section>
      <div className={styles.media}>
        {videoSrc ? (
          <>
            <img
              src={captureHero}
              alt="Стартовый кадр видео"
              className={cn(styles.videoPlaceholder, isVideoReady && styles['videoPlaceholder--hidden'])}
            />
            <video
              autoPlay
              muted
              loop
              playsInline
              poster={poster}
              onLoadedData={() => setIsVideoReady(true)}
              onCanPlay={() => setIsVideoReady(true)}
            >
              <source src={videoSrc} type="video/mp4" />
            </video>
          </>
        ) : (
          <img src={poster} alt="Видео-заставка" />
        )}
      </div>
      <div className={styles.overlay}>
        <div className={styles.content}>
          <div className={cn(styles.primary, ctaVisible && styles.visible)}>
            <img src={LogoFull} alt="Strapezo" className={styles.heroLogo} />
            <div className={cn(styles.ctas, ctaVisible && styles.visible)}>
              <Button variant="light" size="large" onClick={onBook}>
                Забронировать стол
              </Button>
              <Button variant="outline" size="large" onClick={onOpenMenu}>
                Меню
              </Button>
            </div>
          </div>
          <div className={styles.footer}>
            <div className={cn(styles.description, descriptionVisible && styles.visible)}>
              {subtitle && <p className="typo-description-hero">{subtitle}</p>}
              {description && <p className="typo-description-primary">{description}</p>}
            </div>
            <div className={cn(styles.badges, badgesVisible && styles.visible)}>
              {badges.map((badge, index) => (
                <div
                  key={badge.id}
                  className={styles.badge}
                  style={{ '--badge-delay': `${index * 80}ms` } as CSSProperties}
                >
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
}
