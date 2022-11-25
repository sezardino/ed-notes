import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { appWithTranslation } from "next-i18next";
import type { AppProps } from "next/app";

import "../styles/globals.css";

const queryClient = new QueryClient();

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
};

export default appWithTranslation(App);
