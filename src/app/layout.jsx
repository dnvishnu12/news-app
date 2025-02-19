import { Providers } from '@/app/providers'
import { Layout } from '@/components/Layout'

import '@/styles/tailwind.css'

export const metadata = {
  title: {
    template: '%s - Latest News',
    default: 'Latest News - Breaking Stories & Insights',
  },
  description:
    'Stay updated with breaking news, trending topics, and in-depth analysis on business, technology, sports, entertainment, and more. Your trusted source for real-time updates.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <link
          rel="icon"
          href="https://cdn-icons-png.flaticon.com/512/3723/3723485.png"
        />
      </head>
      <body className="flex h-full bg-zinc-50 dark:bg-black">
        <Providers>
          <div className="flex w-full">
            <Layout>{children}</Layout>
          </div>
        </Providers>
      </body>
    </html>
  )
}
