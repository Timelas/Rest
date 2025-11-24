import { useRef } from 'react'

import styles from './Sliders.module.css'

export type ShowcaseSlide = {
  id: string
  title: string
  description: string
  image: string
}

type ShowcaseSliderProps = {
  slides: ShowcaseSlide[]
}

export const ShowcaseSlider = ({ slides }: ShowcaseSliderProps) => {
  const trackRef = useRef<HTMLDivElement | null>(null)

  const scroll = (direction: 'prev' | 'next') => {
    const track = trackRef.current
    if (!track) return
    const cardWidth = track.firstElementChild?.clientWidth ?? 300
    track.scrollBy({ left: direction === 'next' ? cardWidth + 24 : -(cardWidth + 24), behavior: 'auto' })
  }

  return (
    <section className={styles.sliderSection}>
      <div className={styles.sliderHeader}>
        <h3 className="typo-h3">Актуальные подборки</h3>
        <div className={styles.sliderControls}>
          <button onClick={() => scroll('prev')}>←</button>
          <button onClick={() => scroll('next')}>→</button>
        </div>
      </div>
      <div className={styles.sliderTrack} ref={trackRef}>
        {slides.map((slide) => (
          <article key={slide.id} className={styles.slide}>
            <img src={slide.image} alt={slide.title} />
            <div>
              <h4 className="typo-h4">{slide.title}</h4>
              <p className="typo-description-secondary">{slide.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
