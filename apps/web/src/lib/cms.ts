export const CMS_URL = "http://localhost:3000";

export function getCMSUrl(path: string | null | undefined): string | null {
  if (!path) return null;

  // In Production (Build), we expect media to be synced to /media/
  if (import.meta.env.PROD) {
    if (path.startsWith("http")) return path;

    // If the path comes from CMS as /api/media/file/filename.jpg, we want /media/filename.jpg
    const filename = path.split("/").pop();
    if (filename) {
      return `/media/${filename}`;
    }
  }

  // In Development, fetch from CMS server
  if (path.startsWith("http")) {
    return path;
  }

  // Ensure we don't double slashes or miss one
  const basePath = path.startsWith("/") ? path : `/${path}`;

  // If we are in dev and it's a relative media path, make sure it hits the API correctly if needed
  // But based on previous context, user said /api/media/file/ is in the DB url

  return `${CMS_URL}${basePath}`;
}
