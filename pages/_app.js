import 'tailwindcss/tailwind.css'
import { Provider } from 'next-auth/client'
import "../style.css"
import NextNProgress from 'nextjs-progressbar';

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <NextNProgress />
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
