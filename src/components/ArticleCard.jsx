import { formatDate } from '@/lib/formatDate'

const { Card } = require('./Card')

export default function Article({ article, category }) {
  return (
    <Card as="article">
      <Card.Title href={`/article/${article.title}?category=${category}`}>
        {article.title}
      </Card.Title>
      <Card.Eyebrow as="time" dateTime={article.date} decorate>
        {formatDate(article.date)}
      </Card.Eyebrow>
      <Card.Description>{article.description}</Card.Description>
      <Card.Cta>Read article</Card.Cta>
    </Card>
  )
}
