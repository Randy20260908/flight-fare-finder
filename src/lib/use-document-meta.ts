import { useEffect } from "react";

type Meta = { title: string; description: string };

function setMetaContent(selector: string, content: string) {
  const el = document.head.querySelector<HTMLMetaElement>(selector);
  if (el) el.content = content;
}

/**
 * Per-page title/description, replacing the `head()` option that each TanStack
 * route used to declare. index.html carries the defaults for the first paint.
 */
export function useDocumentMeta({ title, description }: Meta) {
  useEffect(() => {
    document.title = title;
    setMetaContent('meta[name="description"]', description);
    setMetaContent('meta[property="og:title"]', title);
    setMetaContent('meta[property="og:description"]', description);
  }, [title, description]);
}
