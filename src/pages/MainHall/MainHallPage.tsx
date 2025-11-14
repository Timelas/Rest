import { PageIntro } from '@/components/sections/PageIntro/PageIntro'
import { PhotoMosaic } from '@/components/ui/PhotoMosaic/PhotoMosaic'
import { PatternBlock } from '@/components/ui/PatternBlock/PatternBlock'
import { MOSAIC_ASSETS } from '@/data/content'

export const MainHallPage = () => (
  <div>
    <PageIntro
      title="Основной зал"
      subtitle="Сцена"
      description="Пространство на 120 гостей с подиумом, экраном и системой звука."
      breadcrumbs={[
        { label: 'Главная', href: '#' },
        { label: 'Основной зал' },
      ]}
    />

    <section className="section">
      <div className="container">
        <PhotoMosaic assets={MOSAIC_ASSETS} />
      </div>
    </section>

    <section className="section">
      <div className="container">
        <PatternBlock
          title="Гибкие сценарии рассадки"
          description="От банкетной до театральной — подготовим схему и смету за один день."
          cta={{ label: 'Получить схему', variant: 'dark' }}
        />
      </div>
    </section>
  </div>
)
