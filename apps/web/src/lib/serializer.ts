import { getCMSUrl } from "./cms";

function escapeHTML(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function serializeLexical(
  content: any,
  mediaMap?: Map<number, any>,
): Promise<string> {
  if (!content) return "";
  try {
    const json = typeof content === "string" ? JSON.parse(content) : content;
    if (!json.root) return "";

    return serializeNode(json.root, mediaMap);
  } catch (e) {
    console.error("Error parsing content", e);
    return "";
  }
}

function serializeNode(node: any, mediaMap?: Map<number, any>): string {
  if (!node) return "";

  if (node.type === "text") {
    let text = node.text || "";
    text = escapeHTML(text);
    // Basic escaping could be added here
    if (node.format & 1) text = `<strong>${text}</strong>`;
    if (node.format & 2) text = `<em>${text}</em>`;
    if (node.format & 8) text = `<u>${text}</u>`;
    if (node.format & 16) text = `<code>${text}</code>`;
    return text;
  }

  const children =
    node.children?.map((c: any) => serializeNode(c, mediaMap)).join("") || "";

  switch (node.type) {
    case "root":
      return children;
    case "paragraph":
      return `<p>${children}</p>`;
    case "heading":
      return `<${node.tag}>${children}</${node.tag}>`;
    case "list":
      const tag = node.listType === "number" ? "ol" : "ul";
      return `<${tag}>${children}</${tag}>`;
    case "listitem":
      return `<li>${children}</li>`;
    case "quote":
      return `<blockquote>${children}</blockquote>`;
    case "link":
      return `<a href="${node.fields?.url || "#"}">${children}</a>`;
    case "block":
      // Payload's CodeBlock uses the slug "Code" by default
      if (
        node.fields?.blockType === "code" ||
        node.fields?.blockType === "Code"
      ) {
        return `<pre><code>${escapeHTML(node.fields.code || "")}</code></pre>`;
      }
      return "";
    case "linebreak":
      return "<br />";
    case "code":
      return `<pre><code>${children}</code></pre>`;
    case "upload":
      if (node.value) {
        let url: string | null = null;
        let alt = "";

        if (typeof node.value === "object" && node.value.url) {
          // Already populated (e.g. from API)
          url = node.value.url;
          alt = node.value.alt || "";
        } else if (typeof node.value === "number" && mediaMap) {
          // ID lookup using provided map
          const mediaItem = mediaMap.get(node.value);
          if (mediaItem) {
            url = mediaItem.url;
            alt = mediaItem.alt || mediaItem.filename || "";
          }
        }

        if (url) {
          const fullUrl = getCMSUrl(url);
          if (fullUrl) {
            return `<img src="${fullUrl}" alt="${alt}" class="my-4 rounded-lg" />`;
          }
        }
        console.log("Serializer upload node missing URL/Map:", node.value);
      }
      return "";
    default:
      return children;
  }
}
