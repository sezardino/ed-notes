import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface UseApiArgs {
  endpoint: string;
  params?: Record<string, unknown>;
  onError?: () => void;
  onSuccess?: () => void;
}

export const useApi = <ReturnData>(args: UseApiArgs) => {
  const { onError, onSuccess, endpoint, params = {} } = args;
  return useQuery(
    [endpoint, Object.values(params)],
    async () => {
      return await axios
        .get<ReturnData>(endpoint, {
          params,
        })
        .then(({ data }) => data);
    },
    {
      keepPreviousData: true,
      staleTime: 1000 * 60 * 5,
      onError,
      onSuccess,
    }
  );
};
