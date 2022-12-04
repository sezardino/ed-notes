import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head />
      <body className="bg-gray-50 dark:bg-gray-900 text-black dark:text-white">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
