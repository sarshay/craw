import { useEffect, useState } from 'react'
import axios from 'axios'

export default function useCacheOrFatch(cacheName, url, age = 1440 ) {//age must be minute - undefine is 1440 min /24 hour - 0 is no cache
    const [data, setData] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const getSingleCacheData = async () => {
        if (typeof caches === 'undefined') {
            console.error("The 'caches' API is not available in this environment.");
            fatch(url);
        }
        const cache = await caches.open(cacheName);
        const cachedResponse = await cache.match(url);

        // If cache exists
        if (cachedResponse && cachedResponse.ok) {
            return cachedResponse.json().then((item) => {
                const currentTime = Date.now();
                if (currentTime - item.timeCached > age * 60000) {
                    cache.delete(url);
                    fatch(url);
                    // console.log(`Deleting cache for URL: ${url}`);
                } else {
                    setLoading(false);
                    setError(false);
                    setData(item.data)
                    // console.log(`Cache for URL: ${url} is not older than 24 hours.`);
                }
            })
        } else {
            fatch(url)
        }
    };

    const addDataIntoCache = (cacheName, url, response) => {
        const cacheData = {
            timeCached: Date.now(),
            data: response
        };
        const data = new Response(JSON.stringify(cacheData));
        if ('caches' in window) {
            caches.open(cacheName).then((cache) => {
                cache.put(url, data);
            });
        }
    };

    function fatch() {
        //sent server word 
        axios.get(
            url,
            // {
            //     // headers: {
            //     //     // "x-apikey": "API_KEY",
            //     //     // "Access-Control-Allow-Origin": "noreferer",
            //     //     // referrerPolicy: 'no-referrer-when-downgrade'
            //     // },
            //     // responseType: "json",
            //     // params: {}
            // }
        )
            .then(function (response) {
                setLoading(false);
                setError(false);
                setData(response.data);
                addDataIntoCache(cacheName, url, response.data)
            })
            .catch(function (error) {
                setLoading(false);
                setError(error)
            })
    }

    useEffect(() => {
        setLoading(true);
        setError(false);
        setData(false);
        getSingleCacheData();
        // fatch(url)
    }, [url]);

    return { loading, error, data }
}
