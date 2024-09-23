import { json, LoaderFunction } from "@remix-run/node";
import cheerio from "cheerio";

export const loader: LoaderFunction = async () => {
  const url = "https://www.sws.bom.gov.au/Aurora";

  const response = await fetch(url);
  const html = await response.text();

  return json(html);
};
