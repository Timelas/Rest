import type { ButtonHTMLAttributes } from 'react'

import { cn } from '@/utils/cn'

import styles from './Button.module.css'

type ButtonVariant = 'light' | 'dark' | 'outline'
type ButtonSize = 'regular' | 'large'
type ButtonPadding = 'narrow' | 'wide'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
  maxWidth?: boolean
  padding?: ButtonPadding
}

export const Button = ({
  variant = 'dark',
  size = 'regular',
  fullWidth = false,
  maxWidth = false,
  padding = 'narrow',
  className,
  children,
  ...rest
}: ButtonProps) => (
  <button
    className={cn(
      styles.button,
      styles[`button--${variant}`],
      styles[`button--${size}`],
      styles[`button--pad-${padding}`],
      fullWidth && styles['button--fullWidth'],
      maxWidth && styles['button--maxWidth'],
      className,
      size === 'large' ? 'typo-button-large' : 'typo-button-regular'
    )}
    {...rest}
  >
    {children}
  </button>
)
