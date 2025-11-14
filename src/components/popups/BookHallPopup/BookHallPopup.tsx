import type { FormEvent } from 'react'

import { useScrollLock } from '@/hooks/useScrollLock'
import { cn } from '@/utils/cn'

import styles from './BookHallPopup.module.css'

type BookHallPopupProps = {
  isOpen: boolean
  onClose: () => void
}

export const BookHallPopup = ({ isOpen, onClose }: BookHallPopupProps) => {
  useScrollLock(isOpen)

  if (!isOpen) return null

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // TODO: wire up to WordPress endpoint
    onClose()
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <header className={styles.header}>
          <h3 className="typo-h3">Забронировать зал</h3>
          <button onClick={onClose} aria-label="Закрыть" className={styles.closeButton}>
            ⤫
          </button>
        </header>
        <p className={styles.description}>
          Оставьте заявку, и менеджер подберет идеальный зал для вашего события.
        </p>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label>
            <span>Имя</span>
            <input type="text" required placeholder="Например, Мария" />
          </label>
          <label>
            <span>Телефон</span>
            <input type="tel" required placeholder="+7" />
          </label>
          <label>
            <span>Дата</span>
            <input type="date" required />
          </label>
          <label>
            <span>Зал</span>
            <select defaultValue="main" required>
              <option value="main">Основной зал</option>
              <option value="upper">Верхний VIP</option>
              <option value="lower">Нижний VIP</option>
              <option value="veranda">Летняя веранда</option>
            </select>
          </label>
          <label className={styles.fullWidth}>
            <span>Комментарий</span>
            <textarea rows={3} placeholder="Расскажите о формате мероприятия" />
          </label>
          <button type="submit" className={cn(styles.submit, 'typo-button-large')}>
            Отправить заявку
          </button>
        </form>
        <p className={styles.hint}>Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности.</p>
      </div>
    </div>
  )
}
