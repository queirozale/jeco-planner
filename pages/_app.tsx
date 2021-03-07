// import "tailwindcss/tailwind.css";
import '../styles/globals.css'
import { AppProps } from 'next/app';
import { Provider } from 'next-auth/client';

function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <Provider session={pageProps.session}>
      <Component {...pageProps} />
    </Provider>
  );
};

export default App