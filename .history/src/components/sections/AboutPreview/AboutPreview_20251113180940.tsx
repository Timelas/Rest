import { useRef, type CSSProperties } from 'react'

import rest1 from '@/assets/img/rest1.png'
import rest2 from '@/assets/img/rest2.png'
import rest3 from '@/assets/img/rest3.png'
import rest4 from '@/assets/img/rest4.png'
import logoMini from '@/assets/svg/logoMiniFull.svg'
import { Button } from '@/components/ui/Button/Button'
import { useScrollProgress } from '@/hooks/useScrollProgress'
import { cn } from '@/utils/cn'

import styles from './AboutPreview.module.css'

type AboutPreviewProps = {
  onNavigateAbout: () => void
}

const IMAGES = {
  leftTop: rest1,
  leftBottom: rest2,
  rightTop: rest3,
  rightBottom: rest4,
} as const

export const AboutPreview = ({ onNavigateAbout }: AboutPreviewProps) => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const progress = useScrollProgress(sectionRef)
  const frameOffset = `${(progress - 3) * 100}%`
  const frameStyle = { '--frame-offset': frameOffset } as CSSProperties

  return (
    <div className={styles.about} ref={sectionRef}>
      <div className={styles.gallery}>
        <div className={styles.columnLeft}>
          <figure className={cn(styles.frame, styles.leftTop)} style={frameStyle}>
            <img src={IMAGES.leftTop} alt="Satrapezo — основной зал" />
          </figure>
          <figure className={cn(styles.frame, styles.leftBottom)} style={frameStyle}>
            <img src={IMAGES.leftBottom} alt="Подпись Satrapezo" />
          </figure>
        </div>
        <div className={styles.copy}>
        <img src={logoMini} alt="STRAPEZO" className={styles.logo} />
        <div className={styles.text}>
          <h1 className={cn('typo-h1', styles.title)}>Ресторан грузинской и европейской кухни</h1>
          <p className={cn('typo-description-emphasis', styles.description)}>
            Ресторан Satrapezo, расположенный на Мичуринском проспекте, предлагает вниманию гостей всё многообразие блюд
            традиционной грузинской кухни, великолепную национальную выпечку и большой ассортимент вина. Название
            ресторана Сатрапезо переводится как «Трапеза». Однако в данном случае имеется в виду не обычный приём пищи, а
            особое ритуальное пиршество, устроенное в каком-либо священном месте. Этот обычай перекочевал в грузинскую
            культуру и на какое-то время стал национальной традицией. Именно эту концепцию постарались воплотить
            рестораторы.
          </p>
        </div>
        <Button variant="dark" size="large" padding="wide" onClick={onNavigateAbout}>
          Больше о ресторане
        </Button>
      </div>
        <div className={styles.columnRight}>
          <figure className={cn(styles.frame, styles.rightTop)} style={frameStyle}>
            <img src={IMAGES.rightTop} alt="Гости Satrapezo" />
          </figure>
          <figure className={cn(styles.frame, styles.rightBottom)} style={frameStyle}>
            <img src={IMAGES.rightBottom} alt="Атмосфера Satrapezo" />
          </figure>
        </div>
      </div>
    </div>
  )
}
