// components/ErrorBoundary.tsx
"use client"; // Error boundaries must be client components

import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode; // Optional custom fallback UI
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can log the error to an error reporting service here
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    // Example: logErrorToMyService(error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        this.props.fallback || (
          <div className="flex items-center justify-center h-screen bg-red-50 text-red-700 p-4">
            <div className="text-center">
              <h1 className="text-2xl font-semibold mb-2">
                Oops! Something went wrong.
              </h1>
              <p>
                An error occurred in this section. Please try refreshing the
                page.
              </p>
              {/* Optionally provide error details in development */}
              {process.env.NODE_ENV === "development" && this.state.error && (
                <pre className="mt-4 text-xs text-left bg-red-100 p-2 rounded overflow-auto">
                  {this.state.error.toString()}
                </pre>
              )}
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
