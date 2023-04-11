import { ThemeProvider } from "@material-ui/core";
import { createTheme } from '@material-ui/core/styles';
import { AppProps } from "next/app";
import React from "react";
import "../assets/styles/global-style.css";


const theme = createTheme({
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
