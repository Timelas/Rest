import patternRaw from '@/assets/svg/pattern_draw.svg?raw'
import styles from './PatternAnimated.module.css'

export const PatternAnimated = () => (
  <div
    className={styles.wrapper}
    dangerouslySetInnerHTML={{ __html: patternRaw }}
  />
)
