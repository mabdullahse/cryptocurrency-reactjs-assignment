import { useEffect, useState, FC, useRef } from 'react';

interface IuseApiRequest {
  url: string;
  option?: 'GET' | 'POST';
  include_crypto_api?: boolean;
}
function useApiRequest({ url, option, include_crypto_api }: IuseApiRequest) {
  const [data, setData] = useState<any>([] || {});
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchData = (updatedURL = '') => {
    setIsLoaded(false);

    // Create a new AbortController instance
    const abortController = new AbortController();
    abortControllerRef.current = abortController;
    const signal = abortController.signal;

    const options = {
      method: option,
      headers: new Headers({
        'content-type': 'application/json',
        ...(include_crypto_api && {
          'X-CMC_PRO_API_KEY': import.meta.env.VITE_REACT_APP_KEY,
        }),
      }),
      signal,
    };

    fetch(updatedURL ? updatedURL : url, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        return response.json();
      })
      .then((response) => {
        setIsLoaded(true);

        setData(response.data);
      })
      .catch((err) => {
        setError(error);
      });
  };

  useEffect(() => {
    fetchData();

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [url]);

  const refresh = (updatedURL: string) => {
    setIsLoaded(false);
    setTimeout(() => {
      fetchData(updatedURL);
    }, 2000);
  };

  return { error, isLoaded, data, refresh };
}

export default useApiRequest;
