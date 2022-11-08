export default function myImageLoader({ src, width, quality }) {
  return `https://debauc.us/${src}?w=${width}&q=${quality || 75}`
}
