import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const BASE_URL = 'https://newsapi.org/v2';

const axiosConfig = {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    'Accept': 'application/json',
  },
  maxRedirects: 0,
};

export async function getAllArticles() {
  try {
    const response = await axios.get(
      `${BASE_URL}/top-headlines?country=us&apiKey=${API_KEY}`,
      axiosConfig
    );

    if (response.data.status !== 'ok') {
      throw new Error('Failed to fetch articles');
    }

    return response.data.articles.map((article, index) => ({
      slug: `article-${index + 1}`,
      author: article.author || article.source.name || 'Unknown Author',
      date: article.publishedAt.split('T')[0], // Extract only the date part
      title: article.title,
      description: article.description || 'No description available.',
      content: article.content || '',
    }));
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
}

export async function getArticlesByCategory(category) {
  try {
    const response = await axios.get(
      `${BASE_URL}/top-headlines?category=${category}&apiKey=${API_KEY}`,
      axiosConfig
    );

    if (response.data.status !== 'ok') {
      throw new Error('Failed to fetch articles');
    }

    return response.data.articles.map((article, index) => ({
      slug: `article-${index + 1}`,
      author: article.author || article.source.name || 'Unknown Author',
      date: article.publishedAt.split('T')[0], // Extract only the date part
      title: article.title,
      description: article.description || 'No description available.',
      content: article.content || '',
    }));
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
}

export async function getArticlesByQuery(query) {
  try {
    const response = await axios.get(
      `${BASE_URL}/everything?q=${query}&apiKey=${API_KEY}`,
      axiosConfig
    );

    if (response.data.status !== 'ok') {
      throw new Error('Failed to fetch articles');
    }

    return response.data.articles.map((article, index) => ({
      slug: `article-${index + 1}`,
      author: article.author || article.source.name || 'Unknown Author',
      date: article.publishedAt.split('T')[0], // Extract only the date part
      title: article.title,
      description: article.description || 'No description available.',
      content: article.content || '',
    }));
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
}
