import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const CACHE_PREFIX = "@myAppCache:";

// Function to fetch data from API and cache it
export const fetchDataWithCache = async ({
  url,
  params,
  cacheKey,
  expirationTime = 0,
}) => {
  try {
    // Check if data exists in cache
    const cachedData = await AsyncStorage.getItem(CACHE_PREFIX + cacheKey);

    if (cachedData !== null) {
      // Data found in cache
      const parsedData = JSON.parse(cachedData);
      const currentTime = new Date().getTime();

      // Check if data is expired
      if (currentTime - parsedData.timestamp < expirationTime * 1000) {
        // Data is still fresh, return it
        return parsedData.data;
      }
    }
    // Fetch data from API
    const response = await axios.get(url, {
      params,
      withCredentials: true,
    });

    const { data,error } = response;

    console.log(response)
    // Cache the data
    await AsyncStorage.setItem(
      CACHE_PREFIX + cacheKey,
      JSON.stringify({
        timestamp: new Date().getTime(),
        data: data,
      })
    );
    
    return data;
  } catch (error) {
    console.error("Error fetching and caching data:", error);
    throw error;
  }
};
