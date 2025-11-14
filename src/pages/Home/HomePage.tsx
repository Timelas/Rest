import { AboutPreview } from '@/components/sections/AboutPreview/AboutPreview'
import { HeroVideo } from '@/components/sections/HeroVideo/HeroVideo'
import { MediaGallery } from '@/components/sections/MediaGallery/MediaGallery'
import { PatternAnimated } from '@/components/sections/PatternAnimated/PatternAnimated'
import { MenuShowcase } from '@/components/sections/MenuShowcase/MenuShowcase'
import { BanquetsShowcase } from '@/components/sections/BanquetsShowcase/BanquetsShowcase'
import { HallsShowcase } from '@/components/sections/HallsShowcase/HallsShowcase'
import { FamilyActivities } from '@/components/sections/FamilyActivities/FamilyActivities'
import { GALLERY_IMAGES, HERO_BADGES } from '@/data/content'
import heroVideoWebm from '@/assets/video/home.webm?url'
import heroVideoMp4 from '@/assets/video/home.mp4?url'

import styles from './HomePage.module.css'

type HomePageProps = {
  onBook: () => void
  onOpenMenu: () => void
  onNavigateAbout: () => void
}

export const HomePage = ({ onBook, onOpenMenu, onNavigateAbout }: HomePageProps) => (
  <div className={styles.page}>
    <HeroVideo
      poster="https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=1600&q=80"
      videoSources={[
        { src: heroVideoMp4, type: 'video/mp4' },
        { src: heroVideoWebm, type: 'video/webm' },
      ]}
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
    
    <section className={`${styles.patternSection} ${styles.patternSectionSecondary}`}>
      <PatternAnimated />
    </section>

    <section className={styles.familySection}>
      <FamilyActivities />
    </section>
  </div>
)
