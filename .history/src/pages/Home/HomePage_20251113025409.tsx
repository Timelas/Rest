import { AdvantagesStrip } from '@/components/sections/AdvantagesStrip/AdvantagesStrip'
import { AboutPreview } from '@/components/sections/AboutPreview/AboutPreview'
import { HeroVideo } from '@/components/sections/HeroVideo/HeroVideo'
import { MediaGallery } from '@/components/sections/MediaGallery/MediaGallery'
import { PatternAnimated } from '@/components/sections/PatternAnimated/PatternAnimated'
import { MenuShowcase } from '@/components/sections/MenuShowcase/MenuShowcase'
import { BanquetsShowcase } from '@/components/sections/BanquetsShowcase/BanquetsShowcase'
import { PatternBlock } from '@/components/ui/PatternBlock/PatternBlock'
import { PhotoMosaic } from '@/components/ui/PhotoMosaic/PhotoMosaic'
import { MediaGrid } from '@/components/ui/MediaGrid/MediaGrid'
import { NewsCard } from '@/components/ui/NewsCard/NewsCard'
import { ShowcaseSlider } from '@/components/ui/Sliders/ShowcaseSlider'
import { StorySlider } from '@/components/ui/Sliders/StorySlider'
import { HallsShowcase } from '@/components/sections/HallsShowcase/HallsShowcase'
import {
  ADVANTAGES,
  GALLERY_IMAGES,
  HERO_BADGES,
  MEDIA_ASSETS,
  MOSAIC_ASSETS,
  NEWS_CARDS,
  SHOWCASE_SLIDES,
  STORY_SLIDES,
} from '@/data/content'
import heroVideoSrc from '@/assets/video/home.webm'

import styles from './HomePage.module.css'

type HomePageProps = {
  onBook: () => void
  onOpenMenu: () => void
  onSelectNews: (id: string) => void
  onNavigateAbout: () => void
}

export const HomePage = ({ onBook, onOpenMenu, onSelectNews, onNavigateAbout }: HomePageProps) => (
  <div className={styles.page}>
    <HeroVideo
      poster="https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=1600&q=80"
      videoSrc={heroVideoSrc}
      subtitle="Грузинский ресторан в Москве на Мичуринском проспекте STRAPEZO Ресторан грузинской и европейской кухни. Банкеты и дни рождения"
      description=""
      badges={HERO_BADGES}
      onBook={onBook}
      onOpenMenu={onOpenMenu}
    />

    <section className={styles.aboutSection}>
      <AboutPreview onNavigateAbout={onNavigateAbout} />
    </section>

    <section className={styles.gallerySection}>
      <MediaGallery images={GALLERY_IMAGES} />
    </section>

    <section className={styles.patternSection}>
      <PatternAnimated />
    </section>

    <section className={styles.menuSection}>
      <MenuShowcase />
    </section>

    <section className={styles.banquetsSection}>
      <BanquetsShowcase />
    </section>

    <section className={styles.hallsSection}>
      <HallsShowcase />
    </section>

    <section className={styles.patternSection}>
      <PatternAnimated />
    </section>
  </div>
)
