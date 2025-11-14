import { PageIntro } from '@/components/sections/PageIntro/PageIntro'
import { NEWS_CARDS } from '@/data/content'
import { PatternBlock } from '@/components/ui/PatternBlock/PatternBlock'

type NewsArticlePageProps = {
  articleId?: string
}

export const NewsArticlePage = ({ articleId }: NewsArticlePageProps) => {
  const article = NEWS_CARDS.find((item) => item.id === articleId) ?? NEWS_CARDS[0]

  return (
    <div>
      <PageIntro
        title={article.title}
        subtitle={article.date}
        description={article.excerpt}
        breadcrumbs={[
          { label: 'Главная', href: '#' },
          { label: 'Новости', href: '#' },
          { label: article.title },
        ]}
      />

      <section className="section">
        <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ borderRadius: '32px', overflow: 'hidden' }}>
            <img src={article.image} alt={article.title} style={{ width: '100%', height: 'auto' }} />
          </div>
          <p className="typo-description-primary">
            Полноценный текст новости появится после интеграции с WordPress. Здесь предусмотрено место для длинного
            описания, цитат и галереи из редактора.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <PatternBlock
            title="Подпишитесь на рассылку"
            description="Получайте анонсы дегустаций, кинопоказов и гастрономических коллабораций."
            cta={{ label: 'Подписаться', variant: 'light' }}
          />
        </div>
      </section>
    </div>
  )
}
