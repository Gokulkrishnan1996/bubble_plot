import axios from "axios";
import { useEffect, useState } from "react";

export const useFetchData = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    axios
      .get(url)
      .then((res) => res.data)
      .then(setData)
      .catch((e) => JSON.stringify(e.response))
      .then(setError)
      .finally(() => setLoading(false));
  }, [url]);

  return { data, isLoading, error };
};
