import type { ButtonHTMLAttributes } from 'react'

import { cn } from '@/utils/cn'

import styles from './FilterChip.module.css'

type FilterChipProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  active?: boolean
}

export const FilterChip = ({ active = false, className, children, ...rest }: FilterChipProps) => (
  <button
    className={cn(styles.chip, active && styles['chip--active'], 'typo-filter', className)}
    {...rest}
  >
    {children}
  </button>
)
