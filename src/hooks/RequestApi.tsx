import { useEffect, useState, FC } from 'react';

interface IuseApiRequest {
  url: string;
  option?: 'GET' | 'POST';
  include_crypto_api?: boolean;
}
function useApiRequest({ url, option, include_crypto_api }: IuseApiRequest) {
  console.log('useApiRequest');

  const [data, setData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = () => {
    const options = {
      method: option,
      headers: new Headers({
        'content-type': 'application/json',
        ...(include_crypto_api && {
          'X-CMC_PRO_API_KEY': import.meta.env.VITE_REACT_APP_KEY,
        }),
      }),
    };

    fetch(url, options)
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
  }, [url]);

  const refresh = () => {
    setIsLoaded(false);
    setTimeout(() => {
      fetchData();
    }, 3000); //
  };

  return { error, isLoaded, data, refresh };
}

export default useApiRequest;
