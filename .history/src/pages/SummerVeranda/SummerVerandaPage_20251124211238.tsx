import gallery1 from '@/assets/img/rest1.png'
import gallery2 from '@/assets/img/rest2.png'
import gallery3 from '@/assets/img/rest3.png'
import gallery4 from '@/assets/img/rest4.png'
import { FeatureHighlight } from '@/components/sections/FeatureHighlight/FeatureHighlight'
import { AsymmetricalGallery } from '@/components/sections/AsymmetricalGallery/AsymmetricalGallery'
import { PatternAnimated } from '@/components/sections/PatternAnimated/PatternAnimated'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs/Breadcrumbs'
import type { PageSlug } from '@/constants/pages'
import type { BookingContext } from '@/types/site'

import styles from './SummerVerandaPage.module.css'

type SummerVerandaPageProps = {
  onNavigate?: (slug: PageSlug) => void
  onBook?: (context?: Partial<BookingContext>) => void
}

const PLACEHOLDER_BURGUNDY =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800"><rect width="100%" height="100%" fill="%23792929"/></svg>'

const TEXT_BLOCKS = [
  'Летняя веранда – особая история. Здесь всегда свежо и не жарко. Уют и комфорт сочетаются с высоким уровнем сервиса. Большая компания или встреча с другом – всем будет приятно провести время за чашкой кофе или бокалом вина. Летняя веранда идеально подходит для любых мероприятий, будь то ужин с друзьями или бизнес-встреча. Это общение в формате города, где все спешат по своим делам.', 
  'Мы предлагаем провести время на нашей уютной летней веранде. На удобных диванах можно утонуть, а обилие зелени создает атмосферу уединения. Вам обязательно понравится – мы готовим блюда грузинской и европейской кухни.'
]

const TEXT = [`Наша веранда вмещает до 90 посадочных мест. Мы можем предоставить столы для больших компаний или организовать отдельные зоны для ваших мероприятий. К Вашим услугам бесплатная парковка.
В таком месте удобно и комфортно смотреть матч любимой команды – по всей веранде размещены экраны для комфортного просмотра. Каждый будет видеть мельчайшие детали, не сомневайтесь.
Наслаждайтесь досугом, а мы со своей стороны гарантируем Вам качественный сервис, вкусную кухню, богатые винную и коктейльную карты.`]

const GALLERY_IMAGES = [
  { id: 'sv-1', src: gallery1, alt: 'Летняя веранда 1' },
  { id: 'sv-2', src: gallery2, alt: 'Летняя веранда 2' },
  { id: 'sv-3', src: gallery3, alt: 'Летняя веранда 3' },
  { id: 'sv-4', src: gallery4, alt: 'Летняя веранда 4' },
  { id: 'sv-5', src: gallery2, alt: 'Летняя веранда 5' },
  { id: 'sv-6', src: gallery1, alt: 'Летняя веранда 6' },
] as const

export const SummerVerandaPage = ({ onNavigate, onBook }: SummerVerandaPageProps) => (
  <div className={styles.page}>
    <section className={styles.section}>
      <Breadcrumbs
        items={[
          { label: 'Главная', slug: 'home' },
          { label: 'Летняя веранда' },
        ]}
        onNavigate={onNavigate}
      />
    </section>

    <section className={styles.section}>
      <FeatureHighlight
        title="Летняя веранда"
        description={TEXT_BLOCKS.join('\n')}
        image={PLACEHOLDER_BURGUNDY}
        imageAlt="Летняя веранда Strapezo"
        buttonLabel="Забронировать стол"
        onButtonClick={() => onBook?.({ intent: 'table' })}
      />
    </section>

    <section className={styles.section}>
      <div className={styles.textBlock}>
        {TEXT.map((paragraph, idx) => (
          <p key={`txt-${idx}`} className="typo-description-secondary">
            {paragraph}
          </p>
        ))}
      </div>
    </section>

    <section className={styles.section}>
      <div className={styles.videoPlaceholder}>
        <img src={PLACEHOLDER_BURGUNDY} alt="Видео веранды" className={styles.videoImage} />
      </div>
    </section>

    <section className={styles.section}>
      <PatternAnimated />
    </section>

    <section className={styles.section}>
      <AsymmetricalGallery images={GALLERY_IMAGES} buttonLabel="" onButtonClick={() => undefined} showButton={false} />
    </section>
  </div>
)
