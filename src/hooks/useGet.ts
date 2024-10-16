import { useCallback, useState } from "react"
export function useGet<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const revalidate = useCallback(() => {
    setIsLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((error) => setError(`${error}`))
      .finally(() => setIsLoading(false));
  }, [url]);
  return { data, isLoading, error, revalidate };

}

