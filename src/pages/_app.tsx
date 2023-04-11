import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { AppProps } from "next/app";
import React from "react";
import "../assets/styles/global-style.css";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#616DD2',
    },
  },
});

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
</ThemeProvider>

  );
}
