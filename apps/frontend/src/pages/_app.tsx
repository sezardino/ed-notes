import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NextPage } from "next";
import { appWithTranslation } from "next-i18next";
import type { AppProps } from "next/app";

import { AppProvider } from "@/context/app";

import "../styles/globals.css";

const queryClient = new QueryClient();

export type NextPageWithLayout<P = Record<string, unknown>, IP = P> = NextPage<
  P,
  IP
> & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout || ((page: React.ReactNode) => page);

  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>{getLayout(<Component {...pageProps} />)}</AppProvider>
    </QueryClientProvider>
  );
};

export default appWithTranslation(App);
