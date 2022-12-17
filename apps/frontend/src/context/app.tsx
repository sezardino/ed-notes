import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { useRouter } from "next/router";
import React, { useContext, useMemo, useState } from "react";
import { AuthRoutes, SessionUser } from "shared";
import { LoadingOverlay } from "ui";

import { api } from "@/services";

const AppContext = React.createContext({
  isLoading: false,
  setLoading: undefined as unknown as (loading: boolean) => void,
  user: undefined as unknown as SessionUser | null,
  signIn: undefined as unknown as (user: SessionUser) => void,
  logOut: undefined as unknown as () => void,
});

export const useAppContext = () => useContext(AppContext);

interface AppProviderProps extends React.PropsWithChildren {
  isProtected?: boolean;
}

export const AppProvider: React.FC<AppProviderProps> = (props) => {
  const { children, isProtected } = props;
  const router = useRouter();
  const { isLoading: isUserFetching } = useQuery<AxiosResponse<SessionUser>>({
    queryKey: ["user"],
    queryFn: () => api.get("auth/me"),
    retry: false,
    onSuccess(data) {
      setUser(data.data);
    },
    onError() {
      setUser(null);

      if (isProtected) {
        router.push(AuthRoutes.SingIn);
      }
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<null | SessionUser>(null);

  const signIn = (user: SessionUser) => setUser(user);
  const logOut = () => setUser(null);

  const value = useMemo(
    () => ({ isLoading, user, signIn, logOut, setLoading: setIsLoading }),
    [isLoading, user]
  );

  return (
    <AppContext.Provider value={value}>
      {(isLoading || isUserFetching) && <LoadingOverlay />}
      {children}
    </AppContext.Provider>
  );
};
