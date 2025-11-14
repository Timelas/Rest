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
  return (
    <footer className={styles.footer}>
      <div className={styles.primary}>
        <div className={styles.nav}>
        <div className={styles.columns}>
          <div className={styles.column}>
            <p className={cn('typo-h5', styles.columnTitle)}>Адрес</p>
            <p className={cn('typo-footer', styles.columnText)}>{contacts.addressMini}</p>
          </div>
          <div className={styles.column}>
            <p className={cn('typo-h5', styles.columnTitle)}>Телефон</p>
            <p className={cn('typo-footer', styles.columnText)}>{contacts.phone}</p>
          </div>
          <div className={styles.column}>
            <p className={cn('typo-h5', styles.columnTitle)}>Почта</p>
            <a href={`mailto:${contacts.email}`} className={cn('typo-footer', styles.link)}>
              {contacts.email}
            </a>
          </div>
          <div className={styles.column}>
            <p className={cn('typo-h5', styles.columnTitle)}>Резерв стола</p>
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
          <div className={styles.bottomLeft}>
            {POLICY_LINKS.map((link) => (
              <a key={link} className={cn('typo-footer', styles.link, styles.underlineLink)} href="#">
                {link}
              </a>
            ))}
          </div>
          <div className={styles.bottomRight}>
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
          <img src={mapImage} alt="Карта расположения ресторана" loading="lazy" className={styles.img}/>
        </figure>
      </div>
    </footer>
  )
}
