import { Image, Accordion, Grid, Container, Title } from "@mantine/core";
import image from "./image.svg";
import classes from "./faq.module.css";
import { faqList } from "./faq-list";

const Faq = () => {
  return (
    <div className={classes.wrapper} id="faq">
      <Container size="lg">
        <Grid id="faq-grid" gutter={50}>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Image src={image} alt="Frequently Asked Questions" />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Title order={2} ta="left" className={classes.title}>
              Frequently Asked Questions
            </Title>

            <Accordion
              chevronPosition="right"
              defaultValue="reset-password"
              variant="separated"
            >
              {faqList.map((faq, index) => {
                return (
                  <Accordion.Item
                    className={classes.item}
                    value={faq.question.replaceAll(" ", "-")}
                    key={`faq-${index}`}
                  >
                    <Accordion.Control>{faq.question}</Accordion.Control>
                    <Accordion.Panel>{faq.answer}</Accordion.Panel>
                  </Accordion.Item>
                );
              })}
            </Accordion>
          </Grid.Col>
        </Grid>
      </Container>
    </div>
  );
};

export default Faq;
