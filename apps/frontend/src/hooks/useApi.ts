import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { useAppContext } from "@/context/app";

interface UseApiArgs<ReturnData> {
  endpoint: string;
  params?: Record<string, unknown>;
  onError?: () => void;
  onSuccess?: (data: ReturnData) => void;
}

export const useApi = <ReturnData>(args: UseApiArgs<ReturnData>) => {
  const { onError, onSuccess, endpoint, params = {} } = args;
  const { setLoading } = useAppContext();
  return useQuery(
    [endpoint, Object.values(params)],
    async () => {
      setLoading(true);

      return await axios
        .get<ReturnData>(endpoint, {
          params,
        })
        .then(({ data }) => data);
    },
    {
      keepPreviousData: true,
      staleTime: 1000 * 60 * 5,
      onError() {
        setLoading(false);

        onError && onError();
      },
      onSuccess(data) {
        setLoading(false);

        onSuccess && onSuccess(data);
      },
    }
  );
};
