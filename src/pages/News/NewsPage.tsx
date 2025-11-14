import { useState } from 'react'

import { PageIntro } from '@/components/sections/PageIntro/PageIntro'
import { FilterChip } from '@/components/ui/FilterChip/FilterChip'
import { NewsCard } from '@/components/ui/NewsCard/NewsCard'
import { NEWS_CARDS } from '@/data/content'

const CATEGORIES = ['Все', 'События', 'Афиша', 'Новости кухни']

type NewsPageProps = {
  onSelectNews: (id: string) => void
}

export const NewsPage = ({ onSelectNews }: NewsPageProps) => {
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0])

  return (
    <div>
      <PageIntro
        title="Новости"
        subtitle="Актуально"
        description="Следите за событиями ресторана, новыми коллекциями блюд и спецпроектами."
        breadcrumbs={[
          { label: 'Главная', href: '#' },
          { label: 'Новости' },
        ]}
      />

      <section className="section">
        <div className="container" style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
          {CATEGORIES.map((category) => (
            <FilterChip
              key={category}
              active={activeCategory === category}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </FilterChip>
          ))}
        </div>
      </section>

      <section className="section">
        <div
          className="container"
          style={{ display: 'grid', gap: '24px', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}
        >
          {NEWS_CARDS.map((card) => (
            <NewsCard key={card.id} data={card} onSelect={onSelectNews} />
          ))}
        </div>
      </section>
    </div>
  )
}
