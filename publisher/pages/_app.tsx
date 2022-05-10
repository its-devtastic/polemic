import type { AppProps } from "next/app";
import "katex/dist/katex.min.css";

import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
