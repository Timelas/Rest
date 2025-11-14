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

const IMAGES = {
  leftTop: rest1,
  leftBottom: rest2,
  rightTop: rest3,
  rightBottom: rest4,
} as const

export const AboutPreview = ({ onNavigateAbout }: AboutPreviewProps) => {
  const leftTop = useInView<HTMLElement>()
  const leftBottom = useInView<HTMLElement>()
  const rightTop = useInView<HTMLElement>()
  const rightBottom = useInView<HTMLElement>()

  return (
    <div className={styles.about}>
      <div className={styles.gallery}>
        <div className={styles.columnLeft}>
          <figure ref={leftTop.ref} className={cn(styles.frame, styles.leftTop, leftTop.inView && styles.visible)}>
            <img src={IMAGES.leftTop} alt="Satrapezo — основной зал" />
          </figure>
          <figure
            ref={leftBottom.ref}
            className={cn(styles.frame, styles.leftBottom, leftBottom.inView && styles.visible)}
          >
            <img src={IMAGES.leftBottom} alt="Подпись Satrapezo" />
          </figure>
        </div>
        <div className={styles.columnRight}>
          <figure ref={rightTop.ref} className={cn(styles.frame, styles.rightTop, rightTop.inView && styles.visible)}>
            <img src={IMAGES.rightTop} alt="Гости Satrapezo" />
          </figure>
          <figure
            ref={rightBottom.ref}
            className={cn(styles.frame, styles.rightBottom, rightBottom.inView && styles.visible)}
          >
            <img src={IMAGES.rightBottom} alt="Атмосфера Satrapezo" />
          </figure>
        </div>
      </div>
      <div className={styles.copy}>
        <img src={logoMini} alt="STRAPEZO" className={styles.logo} />
        <span className={styles.tagline}>Рест с 1234</span>
        <h1 className={cn('typo-h1', styles.title)}>Ресторан грузинской европейской кухни</h1>
        <p className={cn('typo-description-primary', styles.description)}>
          Ресторан Satrapezo, расположенный на Мичуринском проспекте, предлагает вниманию гостей всё многообразие блюд
          традиционной грузинской кухни, великолепную национальную выпечку и большой ассортимент вина. Название
          ресторана Сатрапезо переводится как «Трапеза». Однако в данном случае имеется в виду не обычный приём пищи, а
          особое ритуальное пиршество, устроенное в каком-либо священном месте. Этот обычай перекочевал в грузинскую
          культуру и на какое-то время стал национальной традицией. Именно эту концепцию постарались воплотить
          рестораторы.
        </p>
        <Button variant="dark" size="large" onClick={onNavigateAbout}>
          Подробнее о ресторане
        </Button>
      </div>
    </div>
  )
}
