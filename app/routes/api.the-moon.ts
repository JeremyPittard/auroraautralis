import { json } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";
import createDailyCache from "~/utils/create-daily-cache";
import getAndParseEnvironmentVariable from "~/utils/environment-vars";

interface Location {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  tz_id: string;
  localtime_epoch: number;
  localtime: string;
}

interface Astro {
  sunrise: string;
  sunset: string;
  moonrise: string;
  moonset: string;
  moon_phase: string;
  moon_illumination: number;
  is_moon_up: 0 | 1;
  is_sun_up: 0 | 1;
}

interface Astronomy {
  astro: Astro;
}

interface ApiResponse {
  location: Location;
  astronomy: Astronomy;
}

// Simple in-memory cache
const DailyMoonCache = createDailyCache();

const fetchMoonData = async (query: string, url: string, key: string) => {
  const cacheKey = `astronomy_${query}`;

  const cachedData = DailyMoonCache.get(cacheKey);
  if (cachedData) {
    console.log("return of the cache", cachedData);
    return cachedData;
  }

  console.log("Fetching fresh data for", query);
  const response = await fetch(`${url}?key=${key}&q=${query}`);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data: ApiResponse = await response.json();

  // Store in cache
  DailyMoonCache.set(cacheKey, data);

  return json(data, { status: 200 });
};

export const loader: LoaderFunction = async () => {
  const API_KEY = getAndParseEnvironmentVariable(process.env.MOON_API_KEY!);
  const API_URL = getAndParseEnvironmentVariable(process.env.MOON_API_URL!);
  const query = "Australia";

  try {
    const moonDeets = await fetchMoonData(query, API_URL!, API_KEY!);

    return json(moonDeets, { status: 200 });
  } catch (error) {
    console.error("Error fetching astronomy data:", error);
    return json({ error: "Failed to fetch astronomy data" }, { status: 500 });
  }
};
