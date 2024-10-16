import { useGet } from "./useGet";

export const useUser = <T>(url: string) => {
  const { data, isLoading, error, revalidate } = useGet<T>(url);
  return { data, isLoading, error, revalidate };
}
