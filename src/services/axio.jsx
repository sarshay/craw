import { useEffect, useState } from 'react'
import axios from 'axios'

export default function useMyLoader(end_point, param = null, method = "get") {
    const [data, setData] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        setError(false);
        setData(false)

        axios
            ({
                method: method,
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    // 'Access-Control-Allow-Origin': '*'
                    'Accept': 'application/json'
                },
                url: end_point,
                params: param,
                validateStatus: false //to get error status
            })
            .then((res) => {
                setLoading(false);
                setData(res.data)
                console.log(res);
            })
            .catch((error) => {
                setLoading(false);
                setError(error);
            });
    }, [end_point]);

    return { loading, error, data }
}
