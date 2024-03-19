import { useEffect, useState } from "react";
import axios from "axios";

export function useApi(url: string, theParams?: object | null) {
  //age must be minute - undefine is 1440 min /24 hour - 0 is no cache
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [params, setParams] = useState(theParams);
  // const setDataLog =(a)=>console.log(a)

  const myFetch = () => {
    setLoading(true);
    axios
      .get(url, {
        params,
        withCredentials: true,
      })
      .then(function (response) {
        setLoading(false);
        setError(false);
        if (response.status === 204) {
          setData(null);
        } else {
          setData(response.data);
        }
      })
      .catch(function (error) {
        setLoading(false);
        setError(error);
      });
  };

  useEffect(() => {
    setData(null);
    myFetch();
  }, [url, params]);
  const refresh = () => {
    myFetch();
  };

  return { loading, error, data, setData, setParams, refresh };
}

export async function cacheDelete(cacheName: string, url: RequestInfo | URL) {
  // console.log("delete", cacheName, url);
  const cache = await caches.open(cacheName);
  cache.delete(url);
}
