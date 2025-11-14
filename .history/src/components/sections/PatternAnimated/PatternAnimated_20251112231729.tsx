import patternRaw from '@/assets/svg/patternnew.svg?raw'
import { useEffect, useRef } from 'react'
import styles from './PatternAnimated.module.css'

export const PatternAnimated = () => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        const svg = ref.current?.querySelector('svg')
        svg?.classList.add('animate')  // КЛАСС НА САМОМ <svg>
      }
    }, { threshold: 0.3 })

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={styles.wrapper} dangerouslySetInnerHTML={{ __html: patternRaw }} />
  )
}
