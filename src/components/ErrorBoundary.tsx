import { Component, type ErrorInfo, type ReactNode } from "react";

import { reportLovableError } from "@/lib/lovable-error-reporting";

type Props = { children: ReactNode };
type State = { error: Error | null };

function ErrorFallback({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);

  return (
    <div className="sky-scene flex min-h-screen items-center justify-center px-4">
      <div className="ink-card max-w-md px-8 py-8 text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button onClick={reset} className="btn-sun px-5 py-2 text-sm">
            Try again
          </button>
          <a href="/" className="btn-paper px-5 py-2 text-sm">
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export class ErrorBoundary extends Component<Props, State> {
  override state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  override componentDidCatch(error: Error, info: ErrorInfo) {
    reportLovableError(error, {
      boundary: "spa_root_error_boundary",
      componentStack: info.componentStack,
    });
  }

  private readonly reset = () => {
    this.setState({ error: null });
  };

  override render() {
    const { error } = this.state;
    if (error) return <ErrorFallback error={error} reset={this.reset} />;
    return this.props.children;
  }
}
