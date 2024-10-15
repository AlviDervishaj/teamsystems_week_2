import { useCallback, useState } from "react"

function useGet<T>(url: string) {
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
export const useUser = <T>(url: string) => {
  const { data, isLoading, error, revalidate } = useGet<T>(url);
  return { data, isLoading, error, revalidate };
}
