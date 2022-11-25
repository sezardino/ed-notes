import React, { useContext, useMemo, useState } from "react";
import { LoadingOverlay } from "ui";

const AppContext = React.createContext({
  isLoading: false,
  setLoading: undefined as unknown as (loading: boolean) => void,
  user: undefined as unknown as string | null,
  signIn: undefined as unknown as (id: string) => void,
  logOut: undefined as unknown as () => void,
});

export const useAppContext = () => useContext(AppContext);

export const AppProvider: React.FC<React.PropsWithChildren> = (props) => {
  const { children } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<null | string>(null);

  const signIn = (id: string) => setUser(id);
  const logOut = () => setUser(null);

  const value = useMemo(
    () => ({ isLoading, user, signIn, logOut, setLoading: setIsLoading }),
    []
  );

  return (
    <AppContext.Provider value={value}>
      {isLoading && <LoadingOverlay />}
      {children}
    </AppContext.Provider>
  );
};
