import { AppProps } from "next/app";
import { Provider } from "react-redux";
import { wrapper } from "../common/store/Store";
import "../globals.css";
import { ThemeProvider } from "../components/Theme/ThemeContext";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "React App",
};

const RootLayout = ({ Component, ...rest }: AppProps) => {
  const { store, props } = wrapper.useWrappedStore(rest);
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Component {...props.pageProps} />
      </ThemeProvider>
    </Provider>
  );
};

export default RootLayout;
