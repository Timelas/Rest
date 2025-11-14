import { Breadcrumbs } from '@/components/ui/Breadcrumbs/Breadcrumbs'

import styles from './PageIntro.module.css'

type PageIntroProps = {
  title: string
  subtitle?: string
  description: string
  breadcrumbs: { label: string; href?: string }[]
}

export const PageIntro = ({ title, subtitle, description, breadcrumbs }: PageIntroProps) => (
  <section className={styles.intro}>
    <Breadcrumbs items={breadcrumbs} />
    {subtitle && <span className={styles.subtitle}>{subtitle}</span>}
    <h1 className="typo-h1">{title}</h1>
    <p className="typo-description-primary">{description}</p>
  </section>
)
