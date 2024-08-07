import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { wrapper } from '../common/store/Store';
import '../globals.css';
import { ThemeProvider } from '../components/Theme/ThemeContext';

const MyApp = ({ Component, ...rest }: AppProps) => {
  const { store, props } = wrapper.useWrappedStore(rest);
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Component {...props.pageProps} />
      </ThemeProvider>
    </Provider>
  );
};

export default MyApp;