import { cn } from '@/utils/cn'

import styles from './Sliders.module.css'

export type StorySlide = {
  id: string
  eyebrow: string
  title: string
  copy: string
}

type StorySliderProps = {
  stories: StorySlide[]
}

export const StorySlider = ({ stories }: StorySliderProps) => (
  <section className={styles.storySlider}>
    {stories.map((story, index) => (
      <article key={story.id} className={styles.storySlide}>
        <span className={cn('typo-breadcrumbs', styles.storyEyebrow)}>{story.eyebrow}</span>
        <h3 className="typo-h3">{story.title}</h3>
        <p className="typo-description-primary">{story.copy}</p>
        <div className={styles.storyProgress}>
          <div style={{ width: `${((index + 1) / stories.length) * 100}%` }} />
        </div>
      </article>
    ))}
  </section>
)
