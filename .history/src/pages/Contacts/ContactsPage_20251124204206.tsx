import mapImage from '@/assets/img/FooterMap.png'
import videoImage from '@/assets/img/FooterVideo.png'
import { CONTACTS } from '@/data/contacts'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs/Breadcrumbs'
import type { PageSlug } from '@/constants/pages'
import styles from './ContactsPage.module.css'

type ContactsPageProps = {
  onNavigate?: (slug: PageSlug) => void
}

export const ContactsPage = ({ onNavigate }: ContactsPageProps) => (
  <div className={styles.page}>
    <section className={styles.section}>
      <Breadcrumbs
        items={[
          { label: 'Главная', slug: 'home' },
          { label: 'Контакты' },
        ]}
        onNavigate={onNavigate}
      />
    </section>

    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.columns}>
          <div className={styles.column}>
            <p className={`${styles.title} typo-breadcrumbs`}>Адрес</p>
            <p className={`${styles.value} typo-description-secondary`}>{CONTACTS.address}</p>
          </div>
          <div className={styles.column}>
            <p className={`${styles.title} typo-breadcrumbs`}>Телефон</p>
            <a href={`tel:${CONTACTS.phone}`} className={`${styles.value} ${styles.link} typo-description-secondary`}>
              {CONTACTS.phone}
            </a>
          </div>
          <div className={styles.column}>
            <p className={`${styles.title} typo-breadcrumbs`}>Почта</p>
            <a href={`mailto:${CONTACTS.email}`} className={`${styles.value} ${styles.link} typo-description-secondary`}>
              {CONTACTS.email}
            </a>
          </div>
          <div className={styles.column}>
            <p className={`${styles.title} typo-breadcrumbs`}>Резерв столов</p>
            <ul className={styles.list}>
              {CONTACTS.halls.map((hall) => (
                <li key={hall.title} className="typo-description-secondary">
                  {hall.title}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
)
