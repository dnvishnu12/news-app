import { Container } from '@/components/Container'
import { getCategoryByHref } from '@/lib/categories'
import ArticleComponent from '@/components/ArticleComponent'

export async function generateMetadata({ params }) {
  const category = decodeURIComponent(params.slug)
  const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1)

  return {
    title: `${formattedCategory} News - Latest Updates & Trends`,
    description: `Stay informed with the latest news and insights in ${formattedCategory}. Get breaking stories and trending updates from around the world.`,
  }
}

function SelectedCategory({ href }) {
  const category = getCategoryByHref(href)

  return (
    <div className="max-w-2xl">
      <h1 className="flex gap-4 text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
        <span className="mt-2">{category.icon}</span>{' '}
        <span>{category.name}</span>
      </h1>
      <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
        Get the hottest updates from Business, Tech, Sports, and Entertainment,
        all in one place.
      </p>
    </div>
  )
}

export default async function Home({ params }) {
  const category = decodeURIComponent(params.slug)

  return (
    <>
      <Container className="mt-12 md:mt-12">
        <SelectedCategory href={category} />
      </Container>

      <ArticleComponent category={category} type="category" />
    </>
  )
}
