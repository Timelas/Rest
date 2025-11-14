import type { ReactNode } from 'react'

import { Button } from '@/components/ui/Button/Button'
import { cn } from '@/utils/cn'

import styles from './PatternBlock.module.css'

type PatternBlockProps = {
  title: string
  description: string
  cta?: {
    label: string
    onClick?: () => void
    variant?: 'light' | 'dark' | 'outline'
  }
  extra?: ReactNode
}

export const PatternBlock = ({ title, description, cta, extra }: PatternBlockProps) => (
  <section className={styles.block}>
    <div className={styles.pattern} />
    <div className={styles.content}>
      <h3 className={cn('typo-h2', 'fade-in')}>{title}</h3>
      <p className={cn('typo-description-primary', 'fade-in')}>{description}</p>
      {cta && (
        <Button
          variant={cta.variant ?? 'light'}
          size="large"
          onClick={cta.onClick}
          className="fade-in"
        >
          {cta.label}
        </Button>
      )}
    </div>
    {extra}
  </section>
)
