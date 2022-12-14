import Image from './Image'
import Link from './Link'
import Tag from '@/components/Tag'
import formatDate from '@/lib/utils/formatDate'

const Card = ({
  title,
  description,
  imgSrc,
  href,
  tags,
  date,
  websiteURL,
  websiteURLLabel,
  websiteKeyword,
}) => (
  <div className="md my-4" style={{ maxWidth: '544px' }}>
    <div
      className={`${
        imgSrc && 'h-full'
      }  overflow-hidden rounded-md border-2 border-gray-200 border-opacity-60 dark:border-gray-700 `}
    >
      {imgSrc &&
        (href ? (
          <Link href={`/blog/${href}`} aria-label={`Link to ${title}`}>
            <Image
              alt={title}
              src={imgSrc}
              className="transform object-cover object-center transition duration-700 ease-out hover:scale-105 md:h-36 lg:h-48"
              width={544}
              height={306}
            />
          </Link>
        ) : (
          <Image
            alt={title}
            src={imgSrc}
            className="object-cover object-center md:h-36 lg:h-48"
            width={544}
            height={306}
          />
        ))}
      <div className="p-6">
        <time
          className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400"
          dateTime={date}
        >
          {formatDate(date)}
        </time>
        <h2 className="mb-3 text-2xl font-bold leading-8 tracking-tight">
          {href ? (
            <Link href={`/blog/${href}`} aria-label={`Link to ${title}`}>
              {title}
            </Link>
          ) : (
            title
          )}
        </h2>
        <p className="prose mb-3 max-w-none text-gray-500 dark:text-gray-400">{description}</p>
        {websiteURL && websiteURLLabel && websiteKeyword ? (
          <div className="mb-3 text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
            <Link href={websiteURL} aria-label={websiteURLLabel}>
              {websiteKeyword}
            </Link>
          </div>
        ) : (
          ''
        )}
        <div className="flex flex-wrap">
          {tags.map((tag) => (
            <Tag key={tag} text={tag} />
          ))}
        </div>
      </div>
    </div>
  </div>
)

export default Card
