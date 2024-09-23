import { json, LoaderFunction } from "@remix-run/node";
import getAndParseEnvironmentVariable from "~/utils/environment-vars";

interface DataItem {
  index: number;
  valid_time: string;
  analysis_time: string;
}

interface SpaceDetails {
  data: DataItem[];
}

export const loader: LoaderFunction = async () => {
  const requestBody = {
    api_key: getAndParseEnvironmentVariable(process.env.SWAUS_API_KEY!),
    options: {
      location: "Australian region",
      start: "",
      end: "",
    },
  };

  const apiUrl = `${getAndParseEnvironmentVariable(
    process.env.BASE_SWAUS_URL!
  )}/get-k-index`;

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(requestBody),
  };

  try {
    const spaceWeatherresponse = await fetch(apiUrl, options);
    const data: SpaceDetails = await spaceWeatherresponse.json();

    return data.data;
  } catch (error) {
    console.error("Error fetching astronomy data:", error);
    return json({ error: "Failed to fetch astronomy data" }, { status: 500 });
  }
};
