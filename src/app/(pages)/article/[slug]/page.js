import NewsArticle from '@/components/NewsArticle'

export async function generateMetadata({ params }) {
  const title = decodeURIComponent(params.slug)

  return {
    title: `${title} - Latest News`,
    description: `Read the latest news article: ${title}. Stay updated with breaking stories and insights.`,
  }
}

export default function Page({ params }) {
  const title = decodeURIComponent(params.slug)

  return <NewsArticle title={title} />
}
