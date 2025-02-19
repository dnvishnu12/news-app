'use client'
import { useEffect, useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import Article from '@/components/ArticleCard'
import { Container } from './Container'
import Categories from './CategoriesCard'
import {
  getAllArticles,
  getArticlesByCategory,
  getArticlesByQuery,
} from '@/lib/articles'
import Loader from './Loader'

export default function ArticleComponent({ type, category = 'all' }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredArticles, setFilteredArticles] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [recentSearches, setRecentSearches] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const articlesPerPage = 5

  useEffect(() => {
    const fetchArticles = async () => {
      let articles = []
      if (type === 'all') {
        articles = await getAllArticles()
      } else if (type === 'category') {
        articles = await getArticlesByCategory(category)
      }
      setFilteredArticles(articles)
    }
    fetchArticles()
  }, [type, category])

  useEffect(() => {
    const storedSearches =
      JSON.parse(localStorage.getItem('recentSearches')) || []
    setRecentSearches(storedSearches)
  }, [])

  const handleSearchQuery = async (search) => {
    let articles = await getArticlesByQuery(search)
    setFilteredArticles(articles)
    setCurrentPage(1)

    const updatedSearches = [
      search,
      ...recentSearches.filter((q) => q !== search),
    ].slice(0, 3)
    setRecentSearches(updatedSearches)
    localStorage.setItem('recentSearches', JSON.stringify(updatedSearches))
  }

  const indexOfLastArticle = currentPage * articlesPerPage
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage
  const currentArticles = filteredArticles.slice(
    indexOfFirstArticle,
    indexOfLastArticle,
  )

  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage)

  return (
    <>
      <Container className="mt-16 md:mt-14">
        {type === 'all' && (
          <div className="relative mx-auto w-full max-w-xl">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearchQuery(searchQuery)
                  e.target.blur() // Remove focus after pressing Enter
                }
              }}
              className="w-full rounded-full border border-gray-300 bg-white px-5 py-3 pr-12 text-gray-900 shadow-md focus:border-blue-500 focus:ring focus:ring-blue-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
            />
            <FiSearch
              className="absolute top-1/2 right-5 -translate-y-1/2 cursor-pointer text-gray-500 dark:text-gray-400"
              size={22}
              onClick={() => handleSearchQuery(searchQuery)}
            />
            {showSuggestions && recentSearches.length > 0 && (
              <div className="bg-opacity-90 absolute top-full left-0 z-50 mt-2 w-full rounded-lg bg-white shadow-lg dark:bg-neutral-900">
                {recentSearches.map((search, index) => (
                  <div
                    key={index}
                    className="cursor-pointer px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-neutral-700"
                    onClick={() => {
                      setSearchQuery(search)
                      handleSearchQuery(search)
                      setShowSuggestions(false)
                    }}
                  >
                    {search}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="mx-auto mt-12 grid max-w-xl grid-cols-1 gap-y-10 md:mt-10 lg:max-w-none lg:grid-cols-2">
          {filteredArticles.length > 0 ? (
            <div className="flex flex-col gap-12">
              {currentArticles.map((article) => (
                <Article
                  key={article.slug}
                  article={article}
                  category={category}
                />
              ))}
            </div>
          ) : (
            <Loader />
          )}

          <div className="space-y-8 lg:pl-14 xl:pl-20">
            <Categories />
          </div>
        </div>

        {totalPages > 1 && (
          <div className="mt-24 flex justify-center gap-6">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="cursor-pointer rounded-full bg-gray-100 px-5 py-2 text-gray-700 shadow hover:bg-gray-200 focus:ring-2 focus:ring-blue-300 focus:outline-none disabled:opacity-50"
            >
              Previous
            </button>
            <span className="flex items-center text-gray-900 dark:text-gray-100">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="cursor-pointer rounded-full bg-gray-100 px-5 py-2 text-gray-700 shadow hover:bg-gray-200 focus:ring-2 focus:ring-blue-300 focus:outline-none disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </Container>
    </>
  )
}
