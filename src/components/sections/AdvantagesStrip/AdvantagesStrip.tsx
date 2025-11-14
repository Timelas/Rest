import type { Advantage } from '@/types/site'
import { AdvantageCard } from '@/components/ui/AdvantageCard/AdvantageCard'

import styles from './AdvantagesStrip.module.css'

type AdvantagesStripProps = {
  advantages: Advantage[]
}

export const AdvantagesStrip = ({ advantages }: AdvantagesStripProps) => (
  <section className={styles.strip}>
    {advantages.map((advantage) => (
      <AdvantageCard key={advantage.id} {...advantage} />
    ))}
  </section>
)
