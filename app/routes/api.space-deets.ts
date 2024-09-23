import { json, LoaderFunction } from "@remix-run/node";
import fetchSpaceDeets from "~/utils/fetch-space-deets";

export const loader: LoaderFunction = async () => {
  try {
    return await fetchSpaceDeets();
  } catch (error) {
    console.error("Error fetching astronomy data:", error);
    return json({ error: "error fetching asto data" }, { status: 500 });
  }
};
