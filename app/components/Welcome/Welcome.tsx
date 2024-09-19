import { Title, Text, Anchor, useMantineTheme } from "@mantine/core";
import classes from "./Welcome.module.css";

export function Welcome() {
  const theme = useMantineTheme();
  return (
    <>
      <Title className={classes.title} ta="center" mt={100} c={"bright-pink.1"}>
        Welcome to{" "}
        <Text
          inherit
          variant="gradient"
          component="span"
          gradient={{ from: "pink", to: "yellow" }}
        >
          Mantine
        </Text>
      </Title>
      <Text ta="center" size="lg" maw={580} mx="auto" mt="xl" c={"white"}>
        This starter Remixdsadsa project includes a minimal setup for server
        side rendering, if you want to learn more on Mantine + Remix integration
        follow{" "}
        <Anchor href="https://mantine.dev/guides/remix/" size="lg">
          this guide
        </Anchor>
        . To get started edit index.tsx file.
      </Text>
    </>
  );
}
