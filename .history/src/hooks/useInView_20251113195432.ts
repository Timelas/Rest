import { useEffect, useRef, useState } from 'react'

export const useInView = <T extends HTMLElement = HTMLElement>(options?: IntersectionObserverInit) => {
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const target = ref.current
    if (!target) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.4, ...options }
    )

    observer.observe(target)
    return () => observer.disconnect()
  }, [options])

  return { ref, inView }
}
