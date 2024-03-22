import axios from "axios";
import { API_ROUTES } from "../routes";
import AsyncStorage from "@react-native-async-storage/async-storage";
//https://burmese.dvb.no/wp-json/wp/v2/posts?page=1&_fields=id,title,date,_links,excerpt,categories&_embed=wp:featuredmedia

const CACHE_PREFIX = "wp_data";
const getCachedData = async ({ cacheKey, expirationTime = 3600 }) => {
  try {
    const cachedData = await AsyncStorage.getItem(CACHE_PREFIX + cacheKey);

    if (cachedData !== null) {
      const parsedData = JSON.parse(cachedData);
      const currentTime = new Date().getTime();

      if (currentTime - parsedData.timestamp < expirationTime * 1000) {
        return parsedData.data;
      } else {
        // throw new Error("cache Expired");
      }
    }
  } catch (error) {
    // throw new Error(error);
  }
  return null;
};
const myFetch = async ({ url, params, cacheKey, fresh = false }) => {
  try {
    if (!fresh) {
      const cachedData = await getCachedData();
      if (cachedData !== null) {
        console.log("cache Data found");
        return cachedData; // Exit early if data is found in cache
      }
    }
    const response = await fetch(url, {
      params,
      withCredentials: true,
    });
    const json = await response.json();

    if (json) {
      await AsyncStorage.setItem(
        CACHE_PREFIX + cacheKey,
        JSON.stringify({
          data: json,
          timestamp: new Date().getTime(),
        })
      );
      return json;
    }
  } catch (error) {
    throw new Error(error);
  }
};

function wpScan({ wpUrl, api_base_path = "/?rest_route=/" }) {
  // const baseUrl = `${wpUrl}/?rest_route=/`;
  const isWpJson = "/wp-json/" == api_base_path;
  const baseUrl = isWpJson
    ? `${wpUrl}${api_base_path}`
    : `${wpUrl}/?rest_route=/`;

  const defaultHeader = {
    withCredentials: false,
    credentials: "omit",
    maxRedirects: 15,
    // headers: {
    //   "Access-Control-Allow-Origin": "*"
    // },
  };
  const getCategory = async () => {
    // return await axios
    //   .get(`${baseUrl}wp/v2/categories`, {
    //     ...defaultHeader,
    //   })
    //   .then(function (response) {
    //     return response.data;
    //   })
    //   .catch(function (error) {
    //     throw new Error("Error fetching Category");
    //   });
    return await myFetch({
      url: `${baseUrl}wp/v2/categories`,
    });
  };
  const getInfo = async () => {
    const infoKeyList = [
      "site_icon_url",
      "name",
      "description",
      "url",
      "home",
      "site_logo",
    ];
    return await axios
      .get(`${baseUrl}`, {
        ...defaultHeader,
        params: { _fields: `${infoKeyList.join(",")}` },
      })
      .then(function (response) {
        return {
          ...response.data,
          api_base_path: isWpJson ? "/wp-json/" : "/?rest_route=/",
          error_code: null,
        };
      })
      .catch(async function (error) {
        if (isWpJson) {
          api_base_path = "/?rest_route=/";
        } else {
          api_base_path = "/wp-json/";
        }
        try {
          const response = await axios.get(`${wpUrl}${api_base_path}`, {
            params: { _fields: `${infoKeyList.join(",")}` },
          });
          return { ...response.data, api_base_path, error_code: null };
        } catch (error_1) {
          errorReport({ error, wpUrl });
          if (error_1?.code == "ERR_NETWORK") {
            throw new Error(`${wpUrl} is not a wordpress`);
          } else {
            throw new Error(error_1);
          }
        }
      });
  };

  const getPost = async (param) => {
    const infoKeyList = [
      "id",
      "title",
      "date",
      "_links",
      "excerpt",
      "categories",
    ];
    return await axios
      .get(`${baseUrl}wp/v2/posts`, {
        ...defaultHeader,
        params: {
          page: 1,
          _fields: `${infoKeyList.join(",")}`,
          _embed: "wp:featuredmedia",
          ...param,
        },
      })
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        errorReport({ error, wpUrl });
        throw new Error("Error fetching Posts");
      });
    
  };

  const getSearch = async (param) => {
    const infoKeyList = ["id", "title", "date", "_links"];
    return await axios
      .get(`${baseUrl}wp/v2/search`, {
        params: {
          page: 1,
          _fields: `${infoKeyList.join(",")}`,
          ...param,
        },
      })
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        errorReport({ error, wpUrl });
        throw new Error("Error fetching Posts");
      });
  };

  const getPostDetail = async (id) => {
    const infoKeyList = [
      "id",
      "title",
      "date",
      "_links",
      "excerpt",
      "categories",
      "content",
    ];
    return await axios
      .get(`${baseUrl}wp/v2/posts/${id}`, {
        ...defaultHeader,
        params: {
          page: 1,
          _fields: `${infoKeyList.join(",")}`,
          _embed: "wp:featuredmedia",
        },
      })
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        errorReport({ error, wpUrl });
        throw new Error("Error fetching Posts");
      });
  };
  return { getCategory, getInfo, getPost, getPostDetail, getSearch };
}

export default wpScan;

function errorReport({ error, wpUrl }) {
  const status = error?.response?.status;
  const code = error.code; //"ERR_NETWORK"

  if (code == "ERR_NETWORK") {
    const error_code = error.code || "ERR_UNKNOWN";
    // if (status == 400);

    var option = {
      url: API_ROUTES.ERROR_REPORT,
      method: "POST",
      data: { error_code, url: wpUrl },
      headers: {
        "Content-type": "application/x-www-form-urlencoded", // Set content type to JSON
      },
      withCredentials: true,
    };

    axios(option)
      .then(function (response) {})
      .catch((err) => {});
  }
}

export const findImage = (p, baseUrl) => {
  var img =
    p?._embedded?.["wp:featuredmedia"]?.[0]?.media_details?.sizes?.medium_large
      ?.source_url ||
    p?._embedded?.["wp:featuredmedia"]?.[0]?.media_details?.sizes?.medium
      ?.source_url ||
    p?._embedded?.["wp:featuredmedia"]?.[0]?.media_details?.sizes?.full
      ?.source_url;
  return img && (img.startsWith("http") ? img : `${baseUrl}${img}`);
};
