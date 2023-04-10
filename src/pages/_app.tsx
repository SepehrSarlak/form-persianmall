import { AppProps } from "next/app";
import React from "react";
import "../assets/styles/global-style.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
