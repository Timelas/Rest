import { MenuShowcase } from '@/components/sections/MenuShowcase/MenuShowcase'
import { PatternAnimated } from '@/components/sections/PatternAnimated/PatternAnimated'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs/Breadcrumbs'
import type { PageSlug } from '@/constants/pages'

import styles from './MenuPage.module.css'

type MenuPageProps = {
  onNavigate: (slug: PageSlug) => void
}

export const MenuPage = ({ onNavigate }: MenuPageProps) => (
  <div className={styles.page}>
    <section className={styles.section}>
      <Breadcrumbs
        items={[
          { label: 'Главная', slug: 'home' },
          { label: 'Меню' },
        ]}
        onNavigate={onNavigate}
      />
      <MenuShowcase />
    </section>

    <section className={styles.patternSection}>
      <PatternAnimated />
    </section>
  </div>
)
