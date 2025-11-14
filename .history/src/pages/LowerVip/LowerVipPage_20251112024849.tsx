import { PageIntro } from '@/components/sections/PageIntro/PageIntro'
import { PatternBlock } from '@/components/ui/PatternBlock/PatternBlock'
import { GalleryPattern } from '@/components/ui/GalleryPattern/GalleryPattern'
import { MEDIA_ASSETS } from '@/data/content'

export const LowerVipPage = () => (
  <div>
    <PageIntro
      title="Нижний VIP"
      subtitle="Приват"
      description="Подземный зал на 25 гостей с собственным баром, караоке и кинопроектором."
      breadcrumbs={[
        { label: 'Главная', href: '#' },
        { label: 'Нижний VIP' },
      ]}
    />

    <section className="section">
      <div className="container">
        <PatternBlock
          title="Полный контроль"
          description="Звук, свет и доступ в зал управляются с планшета хоста."
          cta={{ label: 'Запросить медиакит', variant: 'outline' }}
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
