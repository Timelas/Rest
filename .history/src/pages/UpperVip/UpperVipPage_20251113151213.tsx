import { PageIntro } from '@/components/sections/PageIntro/PageIntro'
import { PatternBlock } from '@/components/ui/PatternBlock/PatternBlock'
import { PhotoMosaic } from '@/components/ui/PhotoMosaic/PhotoMosaic'
import { MOSAIC_ASSETS } from '@/data/content'

export const UpperVipPage = () => (
  <div>
    <PageIntro
      title="Верхний вип"
      subtitle="Панорама"
      description="Зал на 40 гостей с панорамными окнами и выходом к летней веранде."
      breadcrumbs={[
        { label: 'Главная', href: '#' },
        { label: 'Верхний вип' },
      ]}
    />

    <section className="section">
      <div className="container">
        <PatternBlock
          title="Собственный шеф"
          description="Меню создаёт отдельная бригада поваров и сомелье, доступен дегустационный стол."
          cta={{ label: 'Связаться с менеджером', variant: 'light' }}
        />
      </div>
    </section>

    <section className="section">
      <div className="container">
        <PhotoMosaic assets={MOSAIC_ASSETS} />
      </div>
    </section>
  </div>
)
