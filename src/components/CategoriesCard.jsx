import { categories } from '@/lib/categories'
import { Button } from './Button'

function Category({ category }) {
  return (
    <a href={`/category/${category.href}`} className="flex items-center gap-4">
      <div className="text-3xl">{category.icon}</div>
      <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
        {category.name}
      </span>
    </a>
  )
}

export default function Categories() {
  return (
    <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
      <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        Trending Categories
      </h2>
      <ol className="mt-6 cursor-pointer space-y-4">
        {categories.map((category, index) => (
          <Category key={index} category={category} />
        ))}
      </ol>
      <Button href="/" variant="secondary" className="mt-6 w-full">
        All news
      </Button>
    </div>
  )
}
