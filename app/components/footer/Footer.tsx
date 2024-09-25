import { Container, Group, Anchor } from "@mantine/core";
import { MantineLogo } from "@mantinex/mantine-logo";
import classes from "./footer.module.css";

const links = [
  { link: "#", label: "Contact" },
  { link: "#", label: "Privacy" },
  { link: "#", label: "Blog" },
  { link: "#", label: "Careers" },
];
const Footer = () => {
  const items = links.map((link) => (
    <Anchor<"a">
      c="dimmed"
      key={link.label}
      href={link.link}
      onClick={(event) => event.preventDefault()}
      size="sm"
    >
      {link.label}
    </Anchor>
  ));

  return (
    <footer className={classes.footer}>
      <Container className={classes.inner} size={"xl"}>
        <MantineLogo size={28} />
        <Group className={classes.links}>{items}</Group>
      </Container>
      <Container className={classes.acknowledgement} size={"xl"}>
        <p>this website was created on the lands of the Whadjuk Noongar</p>
      </Container>
    </footer>
  );
};

export default Footer;
