import type { LinksFunction } from "@remix-run/node"; // or cloudflare/deno
import { MantineProvider, ColorSchemeScript, AppShell } from "@mantine/core";
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
} from "@remix-run/react";
import theme from "./theme/theme";
import "@fontsource/atkinson-hyperlegible/latin.css";

import mantineStyles from "@mantine/core/styles.css?url";
import Footer from "./components/footer";
export const links: LinksFunction = () => [
  { rel: "stylesheet", href: mantineStyles },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <ColorSchemeScript />
      </head>
      <body style={{ background: "var(--mantine-color-dark-navy-4)" }}>
        <MantineProvider theme={theme} forceColorScheme="dark">
          <AppShell>{children}</AppShell>
          <Footer />
        </MantineProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>
          {error.status} {error.statusText} dfsdfd
        </h1>
        <p>{error.data}</p>
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div>
        <h1>Error</h1>
        <p>{error.message}</p>
        <p>The stack trace is:</p>
        <pre>{error.stack}</pre>
      </div>
    );
  } else {
    return <h1>Unknown Error</h1>;
  }
}
