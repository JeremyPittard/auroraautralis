import type { MetaFunction } from "@remix-run/node";
import DisplayLatitude from "~/components/display-latitude";

export const meta: MetaFunction = () => {
  return [
    { title: "Mantine Remix App" },
    { name: "description", content: "Welcome to Mantine!" },
  ];
};

export default function Index() {
  return (
    <div>
      <DisplayLatitude />
    </div>
  );
}
