import type { PageSlug } from '@/constants/pages'
import { AsymmetricalGallery } from '@/components/sections/AsymmetricalGallery/AsymmetricalGallery'
import { FeatureHighlight } from '@/components/sections/FeatureHighlight/FeatureHighlight'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs/Breadcrumbs'
import logoFull from '@/assets/svg/logoFullDark.svg'
import chefImage from '@/assets/img/rest4.png'
import gallery1 from '@/assets/img/rest1.png'
import gallery2 from '@/assets/img/rest2.png'
import gallery3 from '@/assets/img/rest3.png'
import gallery4 from '@/assets/img/menu1.png'
import gallery5 from '@/assets/img/menu2.png'
import gallery6 from '@/assets/img/menu3.png'
import gallery7 from '@/assets/img/menu4.png'

import styles from './AboutPage.module.css'

type AboutPageProps = {
  onNavigate: (slug: PageSlug) => void
  onBook: () => void
}

const GALLERY_IMAGES = [
  { id: 'gallery-1', src: gallery1, alt: 'Кухня Satrapezo' },
  { id: 'gallery-2', src: gallery2, alt: 'Интерьер Satrapezo' },
  { id: 'gallery-3', src: gallery3, alt: 'Команда ресторана' },
  { id: 'gallery-4', src: gallery4, alt: 'Подача блюд' },
  { id: 'gallery-5', src: gallery5, alt: 'Авторские коктейли' },
  { id: 'gallery-6', src: gallery6, alt: 'Грузинские традиции' },
  { id: 'gallery-7', src: gallery7, alt: 'Ресторан Satrapezo' },
]

export const AboutPage = ({ onNavigate, onBook }: AboutPageProps) => (
  <div className={styles.page}>
    <section className={styles.section}>
      <Breadcrumbs
        items={[
          { label: 'Главная', slug: 'home' },
          { label: 'О ресторане' },
        ]}
        onNavigate={onNavigate}
      />
      <FeatureHighlight
        title="О нашем шеф-поваре"
        description="Команда Satrapezo возглавляется Георгием Мчедлишвили. Он соединяет рецепты из детства, редкие авторские техники и продукты из разных регионов Грузии. Шеф лично работает с фермерами и создаёт сезонные сет-меню, чтобы каждый визит в ресторан становился небольшим путешествием."
        image={chefImage}
        imageAlt="Шеф-повар Satrapezo"
        buttonLabel="Меню"
        onButtonClick={() => onNavigate('menu')}
        showLogo
        logoSrc={logoFull}
      />
    </section>

    <section className={styles.gallerySection}>
      <AsymmetricalGallery images={GALLERY_IMAGES} buttonLabel="Забронировать стол" onButtonClick={onBook} />
    </section>
  </div>
)
