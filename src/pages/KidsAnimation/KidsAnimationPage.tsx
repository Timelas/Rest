import { PageIntro } from '@/components/sections/PageIntro/PageIntro'
import { StorySlider } from '@/components/ui/Sliders/StorySlider'
import type { StorySlide } from '@/components/ui/Sliders/StorySlider'
import { MediaGrid } from '@/components/ui/MediaGrid/MediaGrid'
import { MEDIA_ASSETS } from '@/data/content'

const KIDS_STORIES: StorySlide[] = [
  {
    id: 'kids-1',
    eyebrow: 'Суббота',
    title: 'Школа маленьких поваров',
    copy: 'Учимся готовить хинкали и читаем сказки вместе с шефом.',
  },
  {
    id: 'kids-2',
    eyebrow: 'Воскресенье',
    title: 'Кинотеатр и анимация',
    copy: 'Показы мультиков, Face Painting и мастер-классы по глине.',
  },
]

export const KidsAnimationPage = () => (
  <div>
    <PageIntro
      title="Детская анимация"
      subtitle="Семейные программы"
      description="Каждые выходные Strapezo превращается в семейный клуб: отдельное меню, аниматоры и зоны творчества."
      breadcrumbs={[
        { label: 'Главная', href: '#' },
        { label: 'Детская анимация' },
      ]}
    />

    <section className="section">
      <div className="container">
        <StorySlider stories={KIDS_STORIES} />
      </div>
    </section>

    <section className="section">
      <div className="container">
        <MediaGrid assets={MEDIA_ASSETS} title="Как это выглядит" />
      </div>
    </section>
  </div>
)
