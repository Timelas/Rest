import type { PageSlug } from '@/constants/pages'

import styles from './Breadcrumbs.module.css'

type BreadcrumbItem = {
  label: string
  slug?: PageSlug
}

type BreadcrumbsProps = {
  items: BreadcrumbItem[]
  onNavigate?: (slug: PageSlug) => void
}

export const Breadcrumbs = ({ items, onNavigate }: BreadcrumbsProps) => (
  <nav className={styles.breadcrumbs} aria-label="Хлебные крошки">
    <ol className={styles.list}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1
        return (
          <li key={`${item.label}-${index}`} className={styles.item}>
            {item.slug && !isLast && onNavigate ? (
              <button className={`${styles.button} typo-breadcrumbs`} type="button" onClick={() => onNavigate(item.slug!)}>
                {item.label}
              </button>
            ) : (
              <span className={`${styles.current} typo-breadcrumbs`}>{item.label}</span>
            )}
            {!isLast && <span className={styles.separator}>-</span>}
          </li>
        )
      })}
    </ol>
  </nav>
)
