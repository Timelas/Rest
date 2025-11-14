import patternRaw from '@/assets/svg/pattern_animated_final.svg?raw'
import styles from './PatternAnimated.module.css'
import { useEffect, useRef } from 'react'

export const PatternAnimated = () => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        ref.current?.classList.add('animate')
      }
    }, { threshold: 0.3 })

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={`${styles.wrapper}`} dangerouslySetInnerHTML={{ __html: patternRaw }} />
  )
}
