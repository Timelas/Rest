import type { Contacts } from '@/data/contacts'
import mapImage from '@/assets/img/FooterMap.png'
import videoImage from '@/assets/img/FooterVideo.png'
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

export const Footer = ({ contacts }: FooterProps) => {
  return (
    <footer className={styles.footer}>
      <div className={styles.primary}>
        <div className={styles.columns}>
          <div className={styles.column}>
            <p className={cn('typo-h5', styles.columnTitle)}>Адрес</p>
            <p className={cn('typo-footer', styles.columnText)}>{contacts.address}</p>
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
            <p className={cn('typo-h5', styles.columnTitle)}>Резерв столов</p>
            <ul className={styles.list}>
              {contacts.halls.map((hall) => (
                <li key={hall.title} className="typo-footer">{hall.title}</li>
              ))}
            </ul>
          </div>
          <div className={styles.column}>
            <p className={cn('typo-footer', styles.columnTitle)}>Соцсети</p>
            <div className={styles.socials}>
              {contacts.socials.map((social) => (
                <a key={social.id} href={social.url} className={cn('typo-filter', styles.socialBadge)}>
                  {social.label}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.divider} />
        <div className={styles.bottomRow}>
          <div className={styles.bottomLeft}>
            {POLICY_LINKS.map((link) => (
              <a key={link} className={cn('typo-footer', styles.link)} href="#">
                {link}
              </a>
            ))}
          </div>
          <div className={styles.bottomRight}>
            {SECONDARY_LINKS.map((link) => (
              <a key={link} className={cn('typo-footer', styles.link)} href="#">
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
