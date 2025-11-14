import { PageIntro } from '@/components/sections/PageIntro/PageIntro'
import { PatternBlock } from '@/components/ui/PatternBlock/PatternBlock'
import { GalleryPattern } from '@/components/ui/GalleryPattern/GalleryPattern'
import { MEDIA_ASSETS } from '@/data/content'

export const SummerVerandaPage = () => (
  <div>
    <PageIntro
      title="Летняя веранда"
      subtitle="Зелёное пространство"
      description="Панорамные окна, растения и вечерние кинопоказы под открытым небом."
      breadcrumbs={[
        { label: 'Главная', href: '#' },
        { label: 'Летняя веранда' },
      ]}
    />

    <section className="section">
      <div className="container">
        <PatternBlock
          title="Бар под открытым небом"
          description="Вечерние сети миксолистов и локальные вина из Кахети."
          cta={{ label: 'Забронировать стол', variant: 'light' }}
        />
      </div>
    </section>

    <section className="section">
      <div className="container">
        <GalleryPattern assets={MEDIA_ASSETS} />
      </div>
    </section>
  </div>
)
