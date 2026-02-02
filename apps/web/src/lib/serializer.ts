export async function serializeLexical(content: any): Promise<string> {
    if (!content) return '';
    try {
        const json = typeof content === 'string' ? JSON.parse(content) : content;
        if (!json.root) return '';
        
        return serializeNode(json.root);
    } catch (e) {
        console.error("Error parsing content", e);
        return '';
    }
}

function serializeNode(node: any): string {
    if (!node) return '';

    if (node.type === 'text') {
        let text = node.text || '';
        // Basic escaping could be added here
        if (node.format & 1) text = `<strong>${text}</strong>`;
        if (node.format & 2) text = `<em>${text}</em>`;
        if (node.format & 8) text = `<u>${text}</u>`;
        return text;
    }

    const children = node.children?.map(serializeNode).join('') || '';

    switch (node.type) {
        case 'root':
            return children;
        case 'paragraph':
            return `<p>${children}</p>`;
        case 'heading':
            return `<h${node.tag}>${children}</h${node.tag}>`;
        case 'list':
            const tag = node.listType === 'number' ? 'ol' : 'ul';
            return `<${tag}>${children}</${tag}>`;
        case 'listitem':
            return `<li>${children}</li>`;
        case 'quote':
            return `<blockquote>${children}</blockquote>`;
        case 'link':
            return `<a href="${node.fields?.url || '#'}">${children}</a>`;
        default:
            return children;
    }
}
