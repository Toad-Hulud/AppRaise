import React from 'react';
import { AppProps } from 'next/app';
import { wrapper } from '../redux/store';
import { Provider } from 'react-redux';
import '../styles/global.css';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const { store, props } = wrapper.useWrappedStore(pageProps);
  return (
    <Provider store={store}>
      <Component {...props.pageProps} />
    </Provider>
  );
};

export default MyApp;
