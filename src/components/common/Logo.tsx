import logoLight from '@/assets/svg/logo.svg'
import logoDark from '@/assets/svg/logoDark.svg'
import { cn } from '@/utils/cn'

import styles from './Logo.module.css'

type LogoProps = {
  variant?: 'light' | 'dark'
  size?: 'default' | 'compact'
}

export const Logo = ({ variant = 'dark', size = 'default' }: LogoProps) => {
  const dimensions = size === 'compact' ? { width: 48 } : { width: 88 }
  const logoSource = variant === 'dark' ? logoDark : logoLight

  return (
    <div className={cn(styles.logo, styles[`logo--${size}`])}>
      <img src={logoSource} alt="Strapezo" style={dimensions} />
    </div>
  )
}
