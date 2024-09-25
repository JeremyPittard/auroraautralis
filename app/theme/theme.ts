import { createTheme } from "@mantine/core";
import colors from "./colors";

const theme = createTheme({
  colors: colors,
  fontFamily: "Atkinson Hyperlegible",
  headings: { fontFamily: "Atkinson Hyperlegible", fontWeight: "900" },
});

export default theme;
