import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { AuthInput, SessionUser } from "shared";

import { useAppContext } from "@/context/app";
import { api } from "@/services";

interface UseAuth {
  signIn: (dto: AuthInput) => Promise<AxiosResponse<SessionUser>>;
  signUp: (dto: AuthInput) => Promise<AxiosResponse<SessionUser>>;
  logout: () => Promise<string>;
}

export const useAuth = (): UseAuth => {
  const { signIn, logOut } = useAppContext();

  const signInMutation = useMutation<
    AxiosResponse<SessionUser>,
    unknown,
    AuthInput
  >({
    mutationFn: (dto) =>
      api.post("auth/sign-in", {
        ...dto,
      }),
    onSuccess(data) {
      signIn(data.data);
    },
  });

  const signUpMutation = useMutation<
    AxiosResponse<SessionUser>,
    unknown,
    AuthInput
  >({
    mutationFn: (dto: AuthInput) =>
      api.post("auth/sign-up", {
        ...dto,
      }),
    onSuccess(data) {
      signIn(data.data);
    },
  });

  const logoutMutation = useMutation<string>({
    mutationFn: () => api.get("auth/logout"),
    onSuccess() {
      logOut();
    },
  });

  return {
    logout: logoutMutation.mutateAsync,
    signIn: signInMutation.mutateAsync,
    signUp: signUpMutation.mutateAsync,
  };
};
