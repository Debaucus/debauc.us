export const CMS_URL = "http://localhost:3000";

export function getCMSUrl(path: string | null | undefined): string | null {
  if (!path) return null;
  
  // The user confirmed that images are served at /api/media/file/...
  // so we should NOT replace this path with /media/
  
  if (path.startsWith("http")) {
    return path;
  }
  
  // Ensure we don't double slashes or miss one
  const basePath = path.startsWith("/") ? path : `/${path}`;
  return `${CMS_URL}${basePath}`;
}
