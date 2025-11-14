import type { ButtonHTMLAttributes } from 'react'

import { cn } from '@/utils/cn'

import styles from './Button.module.css'

type ButtonVariant = 'light' | 'dark' | 'outline'
type ButtonSize = 'regular' | 'large' | 'bold'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
}

export const Button = ({
  variant = 'dark',
  size = 'regular',
  fullWidth = false,
  className,
  children,
  ...rest
}: ButtonProps) => (
  <button
    className={cn(
      styles.button,
      styles[`button--${variant}`],
      styles[`button--${size}`],
      fullWidth && styles['button--fullWidth'],
      className,
      size === 'large' ? 'typo-button-large' : 'typo-button-regular'
    )}
    {...rest}
  >
    {children}
  </button>
)
