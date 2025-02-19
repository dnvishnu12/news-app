import axios from 'axios'

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export async function getAllArticles() {
  try {
    const response = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`,
    )

    if (response.data.status !== 'ok') {
      throw new Error('Failed to fetch articles')
    }

    return response.data.articles.map((article, index) => ({
      slug: `article-${index + 1}`,
      author: article.author || article.source.name || 'Unknown Author',
      date: article.publishedAt.split('T')[0], // Extract only the date part
      title: article.title,
      description: article.description || 'No description available.',
      content: article.content || '',
    }))
  } catch (error) {
    console.error('Error fetching articles:', error)
    return []
  }
}

export async function getArticlesByCategory(category) {
  try {
    const response = await axios.get(
      `https://newsapi.org/v2/top-headlines?category=${category}&apiKey=${API_KEY}`,
    )

    if (response.data.status !== 'ok') {
      throw new Error('Failed to fetch articles')
    }

    return response.data.articles.map((article, index) => ({
      slug: `article-${index + 1}`,
      author: article.author || article.source.name || 'Unknown Author',
      date: article.publishedAt.split('T')[0], // Extract only the date part
      title: article.title,
      description: article.description || 'No description available.',
      content: article.content || '',
    }))
  } catch (error) {
    console.error('Error fetching articles:', error)
    return []
  }
}

export async function getArticlesByQuery(query) {
  try {
    const response = await axios.get(
      `https://newsapi.org/v2/everything?q=${query}&apiKey=${API_KEY}`,
    )

    if (response.data.status !== 'ok') {
      throw new Error('Failed to fetch articles')
    }

    return response.data.articles.map((article, index) => ({
      slug: `article-${index + 1}`,
      author: article.author || article.source.name || 'Unknown Author',
      date: article.publishedAt.split('T')[0], // Extract only the date part
      title: article.title,
      description: article.description || 'No description available.',
      content: article.content || '',
    }))
  } catch (error) {
    console.error('Error fetching articles:', error)
    return []
  }
}
