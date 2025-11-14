import { type CSSProperties } from 'react'

import rest1 from '@/assets/img/rest1.png'
import rest2 from '@/assets/img/rest2.png'
import rest3 from '@/assets/img/rest3.png'
import rest4 from '@/assets/img/rest4.png'
import logoMini from '@/assets/svg/logoMiniFull.svg'
import { Button } from '@/components/ui/Button/Button'
import { useInView } from '@/hooks/useInView'
import { cn } from '@/utils/cn'

import styles from './AboutPreview.module.css'

type AboutPreviewProps = {
  onNavigateAbout: () => void
}

const FRAMES = [
  { id: 'leftTop', src: rest1, className: styles.leftTop, alt: 'Satrapezo — основной зал' },
  { id: 'leftBottom', src: rest2, className: styles.leftBottom, alt: 'Подпись Satrapezo' },
  { id: 'rightTop', src: rest3, className: styles.rightTop, alt: 'Гости Satrapezo' },
  { id: 'rightBottom', src: rest4, className: styles.rightBottom, alt: 'Атмосфера Satrapezo' },
] as const

export const AboutPreview = ({ onNavigateAbout }: AboutPreviewProps) => {
  const section = useInView<HTMLDivElement>({ threshold: 0.15 })

  return (
    <div className={styles.about} ref={section.ref}>
      <div className={styles.gallery}>
        <div className={styles.columnLeft}>
          {FRAMES.slice(0, 2).map((frame) => (
            <figure
              key={frame.id}
              className={cn(styles.frame, frame.className, section.inView && styles.frameVisible)}
            >
              <img src={frame.src} alt={frame.alt} />
            </figure>
          ))}
        </div>
        <div className={cn(styles.copy, section.inView && styles.copyVisible)}>
          <img
            src={logoMini}
            alt="STRAPEZO"
            className={cn(styles.logo, styles.copyReveal)}
            style={{ '--reveal-delay': '0s' } as CSSProperties}
          />
          <div className={styles.text}>
            <h1
              className={cn('typo-h1', styles.title, styles.copyReveal)}
              style={{ '--reveal-delay': '0.4s' } as CSSProperties}
            >
              Ресторан грузинской и европейской кухни
            </h1>
            <p
              className={cn('typo-description-emphasis', styles.description, styles.copyReveal)}
              style={{ '--reveal-delay': '0.8s' } as CSSProperties}
            >
              Ресторан Satrapezo, расположенный на Мичуринском проспекте, предлагает вниманию гостей всё многообразие
              блюд традиционной грузинской кухни, великолепную национальную выпечку и большой ассортимент вина. Название
              ресторана Сатрапезо переводится как «Трапеза». Однако в данном случае имеется в виду не обычный приём
              пищи, а особое ритуальное пиршество, устроенное в каком-либо священном месте. Этот обычай перекочевал в
              грузинскую культуру и на какое-то время стал национальной традицией. Именно эту концепцию постарались
              воплотить рестораторы.
            </p>
          </div>
          <Button
            variant="dark"
            size="large"
            padding="wide"
            onClick={onNavigateAbout}
            className={cn(styles.copyReveal, styles.button)}
            style={{ '--reveal-delay': '1.2s' } as CSSProperties}
          >
            Больше о ресторане
          </Button>
        </div>
        <div className={styles.columnRight}>
          {FRAMES.slice(2).map((frame) => (
            <figure
              key={frame.id}
              className={cn(styles.frame, frame.className, section.inView && styles.frameVisible)}
            >
              <img src={frame.src} alt={frame.alt} />
            </figure>
          ))}
        </div>
      </div>
    </div>
  )
}
