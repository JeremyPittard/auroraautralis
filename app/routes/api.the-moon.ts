import { json } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";

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

const API_KEY = "61d42f221dc143a1b02130608241909";
const API_URL = "http://api.weatherapi.com/v1/astronomy.json";

// Simple in-memory cache
const cache: { [key: string]: { data: ApiResponse; date: string } } = {};

// Set the time when the cache should reset (e.g., 00:00 UTC)
const CACHE_RESET_HOUR = 0;
const CACHE_RESET_MINUTE = 0;

const shouldRefreshCache = (date: string): boolean => {
  const now = new Date();
  const cacheDate = new Date(date);

  // Check if it's a new day and past the reset time
  return (
    now.getUTCDate() !== cacheDate.getUTCDate() ||
    now.getUTCMonth() !== cacheDate.getUTCMonth() ||
    now.getUTCFullYear() !== cacheDate.getUTCFullYear() ||
    now.getUTCHours() > CACHE_RESET_HOUR ||
    (now.getUTCHours() === CACHE_RESET_HOUR &&
      now.getUTCMinutes() >= CACHE_RESET_MINUTE)
  );
};

const fetchMoonData = async (query: string) => {
  const cacheKey = `astronomy_${query}`;
  const now = new Date().toISOString();

  // Check if we have a valid cached response
  if (cache[cacheKey] && !shouldRefreshCache(cache[cacheKey].date)) {
    console.log("Returning cached data for", query);
    return cache[cacheKey].data;
  }

  console.log("Fetching fresh data for", query);
  const response = await fetch(`${API_URL}?key=${API_KEY}&q=${query}`);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data: ApiResponse = await response.json();

  // Store in cache
  cache[cacheKey] = { data: data, date: now };

  return data;
};

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const query = url.searchParams.get("q") || "Australia";

  try {
    const moonDeets = await fetchMoonData(query);

    return json(moonDeets, { status: 200 });
  } catch (error) {
    console.error("Error fetching astronomy data:", error);
    return json({ error: "Failed to fetch astronomy data" }, { status: 500 });
  }
};
