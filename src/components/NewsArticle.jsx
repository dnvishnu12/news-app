'use client'
import { ArticleLayout } from '@/components/ArticleLayout'
import { getAllArticles, getArticlesByCategory } from '@/lib/articles'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function NewsArticle({ title }) {
  const [articles, setArticles] = useState([])
  const searchParams = useSearchParams()
  const category = searchParams.get('category') || 'all'

  useEffect(() => {
    const fetchArticles = async () => {
      let fetchedArticles = []
      if (category === 'all') {
        fetchedArticles = await getAllArticles()
      } else {
        fetchedArticles = await getArticlesByCategory(category)
      }
      setArticles(fetchedArticles)
    }
    fetchArticles()
  }, [title, category])

  const article = articles.find((art) => art.title === title)
  console.log(article)

  if (!article) {
    return
  }

  return (
    <ArticleLayout article={article}>
      <h1>sdf</h1>
      <div className="prose max-w-none prose-zinc dark:prose-invert">
        <p>{article.description}</p>
        <p>{article.content}</p>
      </div>
    </ArticleLayout>
  )
}
