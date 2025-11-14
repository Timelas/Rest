import { AdvantagesStrip } from '@/components/sections/AdvantagesStrip/AdvantagesStrip'
import { HeroVideo } from '@/components/sections/HeroVideo/HeroVideo'
import { PatternBlock } from '@/components/ui/PatternBlock/PatternBlock'
import { PhotoMosaic } from '@/components/ui/PhotoMosaic/PhotoMosaic'
import { MediaGrid } from '@/components/ui/MediaGrid/MediaGrid'
import { NewsCard } from '@/components/ui/NewsCard/NewsCard'
import { ShowcaseSlider } from '@/components/ui/Sliders/ShowcaseSlider'
import { StorySlider } from '@/components/ui/Sliders/StorySlider'
import {
  ADVANTAGES,
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
}

export const HomePage = ({ onBook, onOpenMenu, onSelectNews }: HomePageProps) => (
  <div className={styles.page}>
    <HeroVideo
      poster="https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=1600&q=80"
      videoSrc={heroVideoSrc}
      subtitle="Грузинский ресторан в Москве на Мичуринском проспекте STRAPEZO. Ресторан грузинской и европейской кухни. Банкеты и дни рождения."
      description=""
      badges={HERO_BADGES}
      onBook={onBook}
      onOpenMenu={onOpenMenu}
    />

    <section className="section">
      <div className="container">
        <AdvantagesStrip advantages={ADVANTAGES} />
      </div>
    </section>

    <section className="section">
      <div className="container">
        <div className="section-title">
          <span className="section-title__eyebrow">Пространства</span>
          <h2 className="typo-h2">Выберите настроение вечера</h2>
        </div>
        <PhotoMosaic assets={MOSAIC_ASSETS} />
      </div>
    </section>

    <section className="section">
      <div className="container">
        <PatternBlock
          title="События каждую неделю"
          description="Бранчи, кинопоказы, авторские дегустации и тематические фестивали."
          cta={{ label: 'Афиша', onClick: () => onSelectNews('news-1'), variant: 'light' }}
        />
      </div>
    </section>

    <section className="section">
      <div className="container">
        <ShowcaseSlider slides={SHOWCASE_SLIDES} />
      </div>
    </section>

    <section className="section">
      <div className="container">
        <StorySlider stories={STORY_SLIDES} />
      </div>
    </section>

    <section className="section">
      <div className="container">
        <div className={styles.newsGrid}>
          {NEWS_CARDS.map((card) => (
            <NewsCard key={card.id} data={card} onSelect={onSelectNews} />
          ))}
        </div>
      </div>
    </section>

    <section className="section">
      <div className="container">
        <MediaGrid assets={MEDIA_ASSETS} title="Галерея атмосферы" />
      </div>
    </section>
  </div>
)
