import { AppShell } from "@mantine/core";
import type { MetaFunction } from "@remix-run/node";
import DisplayLatitude from "~/components/display-latitude";

export const meta: MetaFunction = () => {
  return [
    { title: "dashboard" },
    { name: "description", content: "do the hustle" },
  ];
};

export default function Index() {
  return (
    <>
      <AppShell.Header>
        <div>Logo</div>
      </AppShell.Header>

      <AppShell.Main>
        <DisplayLatitude />
      </AppShell.Main>
    </>
  );
}
