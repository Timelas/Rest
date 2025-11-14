import patternRaw from '@/assets/svg/patternnew.svg?raw'

import styles from './PatternAnimated.module.css'

export const PatternAnimated = () => (
  <div className={styles.wrapper} dangerouslySetInnerHTML={{ __html: patternRaw }} />
)
