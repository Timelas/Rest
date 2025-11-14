import mapImage from '@/assets/img/FooterMap.png'
import videoImage from '@/assets/img/FooterVideo.png'
import { CONTACTS } from '@/data/contacts'

import styles from './ContactsPage.module.css'

export const ContactsPage = () => (
  <section className={styles.section}>
    <div className={styles.inner}>
      <div className={styles.columns}>
        <div className={styles.column}>
          <span className={styles.title}>Адрес</span>
          <p className={styles.value}>{CONTACTS.address}</p>
        </div>
        <div className={styles.column}>
          <span className={styles.title}>Телефон</span>
          <a href={`tel:${CONTACTS.phone}`} className={`${styles.value} ${styles.link}`}>
            {CONTACTS.phone}
          </a>
        </div>
        <div className={styles.column}>
          <span className={styles.title}>Почта</span>
          <a href={`mailto:${CONTACTS.email}`} className={`${styles.value} ${styles.link}`}>
            {CONTACTS.email}
          </a>
        </div>
        <div className={styles.column}>
          <span className={styles.title}>Резерв столов</span>
          <div className={styles.value}>
            {CONTACTS.halls.map((hall) => (
              <div key={hall.title}>{hall.title}</div>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.media}>
        <figure>
          <img src={videoImage} alt="Видео атмосферы ресторана" loading="lazy" />
        </figure>
        <figure>
          <img src={mapImage} alt="Карта расположения ресторана" loading="lazy" />
        </figure>
      </div>
    </div>
  </section>
)
