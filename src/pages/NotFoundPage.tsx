import { Link } from "react-router-dom";

import { Cloud, Sparkle } from "@/components/SkyDecor";
import { useDocumentMeta } from "@/lib/use-document-meta";

export default function NotFoundPage() {
  useDocumentMeta({
    title: "Page not found — Flight Price Notifier",
    description: "The page you're looking for doesn't exist or has been moved.",
  });

  return (
    <div className="sky-scene relative flex min-h-screen items-center justify-center overflow-hidden px-4">
      <Cloud className="anim-drift absolute left-[8%] top-[14%] w-32" />
      <Cloud className="anim-drift absolute bottom-[16%] right-[8%] w-36 [animation-delay:-4s]" />
      <Sparkle className="absolute right-[20%] top-[18%] size-5" />
      <div className="ink-card relative max-w-md px-10 py-10 text-center">
        <h1 className="text-7xl font-bold text-ink">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link to="/" className="btn-sun px-6 py-2 text-sm">
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}
