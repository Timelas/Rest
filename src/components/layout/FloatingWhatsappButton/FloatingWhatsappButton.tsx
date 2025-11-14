import WAIcon from '@/assets/svg/WA.svg'

import styles from './FloatingWhatsappButton.module.css'

export const FloatingWhatsappButton = () => {
  return (
    <a
      href="https://wa.me/79991234567"
      className={styles.button}
      target="_blank"
      rel="noreferrer"
      aria-label="Написать в WhatsApp"
    >
      <img src={WAIcon} alt="" aria-hidden="true" />
    </a>
  )
}
