import { Container } from '@/components/Container'
import ArticleComponent from '@/components/ArticleComponent'

export default async function Home() {
  return (
    <>
      <Container className="mt-9">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
            Stay Ahead with the Latest News
          </h1>
          <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
            Get the hottest updates from Business, Tech, Sports, and
            Entertainment, all in one place.
          </p>
        </div>
      </Container>

      <ArticleComponent type="all" />
    </>
  )
}
