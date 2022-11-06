import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import Card from '@/components/Card'
import Image from '@/components/Image'

// Math keeps messing up. To be worked on.
let activeProjects = 0
let previousProjects = 0

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter('blog')

  return { props: { posts } }
}

export default function Home({ posts }) {
  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <section id="about" className="">
        <div className="" id="about">
          <div className="grid grid-flow-row grid-rows-2 gap-8 py-6 sm:grid-flow-col sm:grid-cols-2 sm:py-16 md:grid-rows-1 ">
            <div className=" row-start-2 flex flex-col items-start justify-center sm:row-start-1">
              <h1 className="text-black-600 text-3xl font-medium leading-normal lg:text-4xl xl:text-5xl">
                Make it <strong>Work.</strong>
              </h1>
              <h1 className="text-black-600 text-3xl font-medium leading-normal lg:text-4xl xl:text-5xl">
                Make it <strong>Better.</strong>
              </h1>
              <p className="text-black-500 mt-4 mb-6">
                Hi! I am a Fullstack Developer with the unfortunate hobby spending hours solving a
                problem that would usually take 5 minutes. We've all been there.. right?
              </p>
              <p>
                Below you will find my previous work and my current Active Projects. I keep this as
                up to date as possible.
              </p>
            </div>
            <div className="flex w-full">
              <div className="h-full w-full">
                <Image
                  alt="Debaucus Image"
                  src="/static/images/debaucus.png"
                  className="h-60 w-60 rounded-full object-cover object-center md:h-full md:w-full"
                  width={400}
                  height={400}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="" id="active">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Active Projects
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            My current active and running projects.
          </p>
        </div>

        <div className="container grid grid-cols-1 md:grid-cols-2">
          {!posts.length && 'No active projects.'}
          {posts.slice(0, 100).map((frontMatter) => {
            const alignStyle =
              activeProjects % 2 == 0 ? 'md:mr-4' : 'md:mt-[50%] md:mb-[-50%] md:ml-4 last:mb-0'
            const {
              slug,
              date,
              title,
              summary,
              tags,
              previewImage,
              websiteURL,
              websiteKeyword,
              websiteURLLabel,
            } = frontMatter
            if (frontMatter.tags.includes('active')) {
              activeProjects = activeProjects + 1
              return (
                <div key={slug} className={alignStyle}>
                  <Card
                    title={title}
                    date={date}
                    tags={tags}
                    description={summary}
                    imgSrc={previewImage}
                    href={slug}
                    websiteURL={websiteURL}
                    websiteURLLabel={websiteURLLabel}
                    websiteKeyword={websiteKeyword}
                  />
                </div>
              )
            } else return
          })}
        </div>
        <div className="flex justify-end text-base font-medium leading-6">
          <Link
            href="/blog"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="all posts"
          >
            All Posts &rarr;
          </Link>
        </div>
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Previous Projects
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            Projects I have run in the past that have been closed down or completed.
          </p>
        </div>

        <div className="container grid grid-cols-1 md:grid-cols-2">
          {!posts.length && 'No active projects.'}
          {posts.slice(0, 100).map((frontMatter) => {
            const alignStyle2 =
              previousProjects % 2 == 0 ? 'md:mr-4' : 'md:mt-[50%] md:mb-[-50%] md:ml-4 last:mb-0'
            const {
              slug,
              date,
              title,
              summary,
              tags,
              previewImage,
              websiteURL,
              websiteKeyword,
              websiteURLLabel,
            } = frontMatter
            if (frontMatter.tags.includes('inactive')) {
              previousProjects = previousProjects + 1
              return (
                <div key={slug} className={alignStyle2}>
                  <Card
                    title={title}
                    date={date}
                    tags={tags}
                    description={summary}
                    imgSrc={previewImage}
                    href={slug}
                    websiteURL={websiteURL}
                    websiteURLLabel={websiteURLLabel}
                    websiteKeyword={websiteKeyword}
                  />
                </div>
              )
            } else return
          })}
        </div>
      </div>
      <div className="flex justify-end text-base font-medium leading-6">
        <Link
          href="/blog"
          className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
          aria-label="all posts"
        >
          All Posts &rarr;
        </Link>
      </div>
    </>
  )
}
