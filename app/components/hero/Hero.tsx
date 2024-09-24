import { Container, Text, Button, Group, useMantineTheme } from "@mantine/core";
import { GithubIcon } from "@mantinex/dev-icons";
import classes from "./hero.module.css";
import DisplayLatitude from "../display-latitude";

const Hero = () => {
  const theme = useMantineTheme();

  return (
    <div className={`${classes.wrapper}`}>
      <div className={classes.aurora}></div>
      <Container size={700} className={classes.inner}>
        <h1 className={classes.title}>
          A{" "}
          <Text
            component="span"
            variant="gradient"
            gradient={{
              from: theme.colors["vibrant-pink"]["4"],
              to: theme.colors["bright-green"]["4"],
            }}
            inherit
          >
            fully featured
          </Text>{" "}
          React components and hooks library
        </h1>
        <DisplayLatitude />

        <Text className={classes.description} color="dimmed">
          Build fully functional accessible web applications with ease – Mantine
          includes more than 100 customizable components and hooks to cover you
          in any situation
        </Text>

        <Group className={classes.controls}>
          <Button
            size="xl"
            className={classes.control}
            variant="gradient"
            gradient={{ from: "blue", to: "cyan" }}
            component="a"
            href="/dashboard"
          >
            Go To Dashboard
          </Button>

          <Button
            component="a"
            href="https://github.com/mantinedev/mantine"
            size="xl"
            variant="default"
            className={classes.control}
            leftSection={<GithubIcon size={20} />}
          >
            GitHub
          </Button>
        </Group>
      </Container>
    </div>
  );
};

export default Hero;
