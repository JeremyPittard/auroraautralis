import { AppShell } from "@mantine/core";
import type { MetaFunction } from "@remix-run/node";
import { isRouteErrorResponse, useRouteError } from "@remix-run/react";
import Faq from "~/components/faq";
import Hero from "~/components/hero/Hero";

export const meta: MetaFunction = () => {
  return [
    { title: "Mantine Remix App" },
    { name: "description", content: "Welcome to Mantine!" },
  ];
};

export default function Index() {
  return (
    <AppShell.Main>
      <Hero />
      <Faq />
    </AppShell.Main>
  );
}
