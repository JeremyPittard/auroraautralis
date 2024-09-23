const createDailyCache = <T>(
  resetHour: number = 0,
  resetMinute: number = 0
) => {
  const cache: {
    [key: string]: {
      data: T;
      date: string;
    };
  } = {};

  const shouldRefreshCache = (date: string) => {
    const now = new Date();
    const cacheDate = new Date(date);

    return (
      now.getUTCDate() !== cacheDate.getUTCDate() ||
      now.getUTCMonth() !== cacheDate.getUTCMonth() ||
      now.getUTCFullYear() !== cacheDate.getUTCFullYear() ||
      now.getUTCHours() > resetHour ||
      (now.getUTCHours() === resetHour && now.getUTCMinutes() >= resetMinute)
    );
  };

  return {
    set: (key: string, data: T) => {
      const now = new Date().toISOString();
      cache[key] = { data, date: now };
    },
    get: (key: string): T | null => {
      const cacheEntry = cache[key];
      if (cacheEntry && !shouldRefreshCache(cacheEntry.date)) {
        return cacheEntry.data;
      }
      return null;
    },
    clear: (): void => {
      Object.keys(cache).forEach((key) => delete cache[key]);
    },
  };
};

export default createDailyCache;
