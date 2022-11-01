import siteMetadata, { description } from '@/data/siteMetadata'
import { useState } from 'react'
import Pagination from '@/components/Pagination'
import Card from '@/components/Card'

export default function ListLayout({ posts, title, initialDisplayPosts = [], pagination }) {
  const [searchValue, setSearchValue] = useState('')
  const filteredBlogPosts = posts.filter((frontMatter) => {
    const searchContent = frontMatter.title + frontMatter.summary + frontMatter.tags.join(' ')
    return searchContent.toLowerCase().includes(searchValue.toLowerCase())
  })

  // If initialDisplayPosts exist, display it if no searchValue is specified
  const displayPosts =
    initialDisplayPosts.length > 0 && !searchValue ? initialDisplayPosts : filteredBlogPosts

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            {title}
          </h1>
          <div className="relative max-w-lg">
            <input
              aria-label="Search Content and Tags"
              type="text"
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search Content and Tags"
              className="block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-900 dark:bg-gray-800 dark:text-gray-100"
            />
            <svg
              className="absolute right-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-300"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
        <div className="container grid grid-cols-1 py-12 md:grid-cols-2">
          {!filteredBlogPosts.length && 'No posts found.'}
          {displayPosts.map((frontMatter, index) => {
            // Shoutout to oldmate#9999 for this clean solution and teaching me about ternary!
            const alignStyle =
              index % 2 == 0 ? 'md:mr-4' : 'md:mt-[50%] md:mb-[-50%] md:ml-4 last:mb-0'
            const { slug, date, title, summary, tags, previewImage } = frontMatter
            return (
              <div key={slug} className={alignStyle}>
                <Card
                  title={title}
                  date={date}
                  tags={tags}
                  description={summary}
                  imgSrc={previewImage}
                  href={slug}
                />
              </div>
            )
          })}
        </div>
      </div>
      {pagination && pagination.totalPages > 1 && !searchValue && (
        <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
      )}
    </>
  )
}
