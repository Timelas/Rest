import { useEffect, useRef, useState } from 'react'

import type { Contacts } from '@/data/contacts'
import mapImage from '@/assets/img/FooterMap.png'
import videoImage from '@/assets/img/FooterVideo.png'
import tgIcon from '@/assets/img/TG.svg'
import instIcon from '@/assets/img/INST.svg'
import fbIcon from '@/assets/img/FB.svg'
import { cn } from '@/utils/cn'

import styles from './Footer.module.css'

type FooterProps = {
  contacts: Contacts
}

const POLICY_LINKS = ['Политика конфиденциальности']
const SECONDARY_LINKS = [
  'Банкеты и корпоративы',
  'События',
  'Условия бронирования',
  'Кинозал',
]

const SOCIAL_ICONS: Record<string, string> = {
  tg: tgIcon,
  inst: instIcon,
  fb: fbIcon,
}

export const Footer = ({ contacts }: FooterProps) => {
  const footerRef = useRef<HTMLElement | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const activate = () => setReady(true)
    const handleScroll = () => {
      if (ready) return
      const target = footerRef.current
      if (!target) return
      const rect = target.getBoundingClientRect()
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight
      if (rect.top <= viewportHeight * 0.9) {
        activate()
      }
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [ready])

  return (
    <footer className={styles.footer} ref={footerRef}>
      <div className={cn(styles.content, ready && styles.contentReady)}>
        <div className={styles.primary}>
          <div className={styles.nav}>
          <div className={cn(styles.columns, ready && styles.columnsReady)}>
          <div className={styles.column}>
            <p className={cn('typo-footer', styles.columnTitle)}>Адрес</p>
            <p className={cn('typo-footer', styles.columnText)}>{contacts.addressMini}</p>
          </div>
          <div className={styles.column}>
            <p className={cn('typo-footer', styles.columnTitle)}>Телефон</p>
            <p className={cn('typo-footer', styles.columnText)}>{contacts.phone}</p>
          </div>
          <div className={styles.column}>
            <p className={cn('typo-footer', styles.columnTitle)}>Почта</p>
            <a href={`mailto:${contacts.email}`} className={cn('typo-footer', styles.link, styles.underlineLink)}>
              {contacts.email}
            </a>
          </div>
          <div className={styles.column}>
            <p className={cn('typo-footer', styles.columnTitle)}>Резерв стола</p>
            <ul className={styles.list}>
              {contacts.halls.map((hall) => (
                <li key={hall.title} className="typo-footer">
                  <a href="#" className={styles.hallLink}>
                    {hall.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.column}>
            <p className={cn('typo-footer', styles.columnTitle)}>Соцсети</p>
            <div className={styles.socials}>
              {contacts.socials.map((social) => (
                <a key={social.id} href={social.url} className={styles.socialBadge} aria-label={social.label}>
                  <img
                    src={SOCIAL_ICONS[social.id]}
                    alt=""
                    width={20}
                    height={20}
                    className={styles.socialIcon}
                    aria-hidden="true"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
          </div>
          <div className={styles.divider} />
          <div className={styles.bottomRow}>
          <div className={cn(styles.bottomLeft, ready && styles.linksReady)}>
            {POLICY_LINKS.map((link) => (
              <a key={link} className={cn('typo-footer', styles.link, styles.underlineLink)} href="#">
                {link}
              </a>
            ))}
          </div>
          <div className={cn(styles.bottomRight, ready && styles.linksReady)}>
            {SECONDARY_LINKS.map((link) => (
              <a key={link} className={cn('typo-footer', styles.link, styles.underlineLink)} href="#">
                {link}
              </a>
            ))}
          </div>
        </div>
        </div>
        <div className={styles.media}>
          <figure className={styles.mediaVideo}>
            <img src={videoImage} alt="Видео ресторана" loading="lazy" />
          </figure>
          <figure className={styles.mediaMap}>
            <img src={mapImage} alt="Карта расположения ресторана" loading="lazy" className={styles.img} />
          </figure>
        </div>
      </div>
    </footer>
  )
}
