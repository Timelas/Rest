import { useEffect, useMemo, useState, type FormEvent, type MouseEvent } from 'react'

import type { BookingContext } from '@/types/site'
import { useScrollLock } from '@/hooks/useScrollLock'
import { cn } from '@/utils/cn'

import styles from './BookHallPopup.module.css'

type BookHallPopupProps = {
  isOpen: boolean
  onClose: () => void
  context: BookingContext
}

type FormState = {
  name: string
  phone: string
  wishes: string
  agree: boolean
}

const INITIAL_FORM_STATE: FormState = {
  name: '',
  phone: '',
  wishes: '',
  agree: true,
}

export const BookHallPopup = ({ isOpen, onClose, context }: BookHallPopupProps) => {
  const [formState, setFormState] = useState<FormState>(INITIAL_FORM_STATE)

  useScrollLock(isOpen)

  useEffect(() => {
    if (!isOpen) return
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeydown)
    return () => window.removeEventListener('keydown', handleKeydown)
  }, [isOpen, onClose])

  useEffect(() => {
    if (!isOpen) return
    setFormState(INITIAL_FORM_STATE)
  }, [isOpen, context])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const payload = {
      ...formState,
      intent: context.intent,
      hallId: context.hallId,
      hallName: context.hallName,
      hallImage: context.hallImage,
    }

    console.info('Booking submission', payload)
    // TODO: wire up to WordPress endpoint
    onClose()
  }

  const bookingTitle = context.intent === 'hall' ? 'Забронировать зал' : 'Забронировать стол'
  const hallLabel = context.intent === 'hall' ? context.hallName : undefined

  const handleOverlayClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose()
    }
  }

  const updateField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setFormState((prev) => ({ ...prev, [key]: value }))
  }

  const submitDisabled = useMemo(
    () => !formState.name.trim() || !formState.phone.trim() || !formState.agree,
    [formState.agree, formState.name, formState.phone]
  )

  if (!isOpen) return null

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-label={bookingTitle}
        onClick={(event) => event.stopPropagation()}
      >
        <header className={styles.header}>
          <div className={styles.titleBlock}>
            <p className={styles.kicker}>Форма бронирования</p>
            <h3 className={cn('typo-h3', styles.title)}>{bookingTitle}</h3>
          </div>
          <button onClick={onClose} aria-label="Закрыть" className={styles.closeButton}>
            ⤫
          </button>
        </header>

        <div className={styles.content}>
          <div className={styles.media}>
            <div className={styles.photoFrame} aria-label={hallLabel ?? 'Выбранное пространство'}>
              {context.hallImage ? (
                <img src={context.hallImage} alt={hallLabel ?? 'Фото зала'} />
              ) : (
                <div className={styles.photoStub}>
                  <span>Фото будет здесь</span>
                </div>
              )}
            </div>
            {hallLabel && <p className={styles.badge}>{hallLabel}</p>}
          </div>

          <div className={styles.formColumn}>
            <p className={styles.description}>
              Заполните форму для бронирования, чтобы наш менеджер связался с вами и помог с завершением бронирования.
            </p>

            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.fields}>
                <div className={styles.inputStack}>
                  <label
                    className={cn(styles.field, (formState.name || '').length > 0 && styles.fieldActive)}
                  >
                    <input
                      type="text"
                      name="name"
                      value={formState.name}
                      onChange={(event) => updateField('name', event.target.value)}
                      placeholder=" "
                      required
                      aria-label="Имя"
                    />
                    <span className={styles.placeholder}>Имя</span>
                  </label>

                  <label
                    className={cn(styles.field, (formState.phone || '').length > 0 && styles.fieldActive)}
                  >
                    <input
                      type="tel"
                      name="phone"
                      value={formState.phone}
                      onChange={(event) => updateField('phone', event.target.value)}
                      placeholder=" "
                      required
                      aria-label="Телефон"
                    />
                    <span className={styles.placeholder}>Телефон</span>
                  </label>
                </div>

                <label
                  className={cn(
                    styles.field,
                    styles.fieldTextarea,
                    (formState.wishes || '').length > 0 && styles.fieldActive
                  )}
                >
                  <textarea
                    name="wishes"
                    value={formState.wishes}
                    onChange={(event) => updateField('wishes', event.target.value)}
                    placeholder=" "
                    aria-label="Пожелания"
                    rows={4}
                  />
                  <span className={styles.placeholder}>Пожелания</span>
                </label>
              </div>

              <label className={styles.checkboxRow}>
                <input
                  type="checkbox"
                  checked={formState.agree}
                  onChange={(event) => updateField('agree', event.target.checked)}
                />
                <span className={styles.checkboxBox} aria-hidden="true" />
                <span className={styles.checkboxLabel}>
                  Ознакомился с&nbsp;
                  <a className={styles.privacyLink} href="/privacy" target="_blank" rel="noreferrer">
                    политикой конфиденциальности
                  </a>
                  &nbsp;и согласен на обработку персональных данных
                </span>
              </label>

              <div className={styles.actions}>
                <button
                  type="submit"
                  className={cn(styles.submit, 'typo-button-large')}
                  disabled={submitDisabled}
                >
                  Отправить заявку
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
