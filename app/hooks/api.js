import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const CACHE_PREFIX = "your_cache_prefix_here";

export function useApi({
  url,
  params: p = null,
  cacheKey,
  expirationTime = 3600,
}) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [params, setParams] = useState(p);

  const getCachedData = async () => {
    try {
      const cachedData = await AsyncStorage.getItem(CACHE_PREFIX + cacheKey);

      if (cachedData !== null) {
        const parsedData = JSON.parse(cachedData);
        const currentTime = new Date().getTime();

        if (currentTime - parsedData.timestamp < expirationTime * 1000) {
          return parsedData.data;
        }
      }
    } catch (error) {
      console.log("Error retrieving data from AsyncStorage:", error);
    }
    return null; // Data not found or expired
  };

  const myFetch = async (fresh = false) => {
    setLoading(true);
    try {
      if (!fresh) {
        const cachedData = await getCachedData();
        if (cachedData !== null) {
          console.log("cache Data found");
          setData(cachedData);
          setLoading(false);
          setError(false);
          return; // Exit early if data is found in cache
        }
      }
      console.log("refreshing " + url);
      const response = await fetch(url, {
        params,
        withCredentials: true,
      });
      setLoading(false);
      setError(false);
      console.log("loaded");
      const json = await response.json();

      if (json) {
        setData(json);
        // Cache the fetched data
        await AsyncStorage.setItem(
          CACHE_PREFIX + cacheKey,
          JSON.stringify({
            data: json,
            timestamp: new Date().getTime(),
          })
        );
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      setError(error.message);
    }
  };

  useEffect(() => {
    setData(null);
    myFetch();
  }, [url, params]);
  const refresh = () => {
    console.log("refresh");
    myFetch(true);
  };
  return { loading, error, data, setParams, myFetch, refresh };
}

export async function cacheDelete(cacheName, url) {
  const cache = await caches.open(cacheName);
  cache.delete(url);
}
