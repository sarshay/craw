import { useCallback, useState } from "react";

interface UseQProps {
  fun: Promise<any>;
}

function useQ({ fun }: UseQProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);

  const submit = useCallback(() => {
    setLoading(true);
    setData(null);
    setError(null);
    fun
      .then((result: any) => {
        setData(result);
      })
      .catch((err: any) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [fun]);

  return { loading, data, error, submit };
}

export default useQ;
