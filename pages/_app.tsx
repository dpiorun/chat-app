import ErrorBoundary from "@/components/ErrorBoundary";
import UsersProvider from "@/context/Users";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary
      fallback={
        <div>
          <h2>Oops, there is an error!</h2>
          <p>Try to refresh the page...</p>
        </div>
      }
    >
      <UsersProvider>
        <Component {...pageProps} />
      </UsersProvider>
    </ErrorBoundary>
  );
}
