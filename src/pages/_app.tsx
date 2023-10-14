import '@/styles/globals.css'
import type { AppProps } from 'next/app'

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'
import { BlogProvider } from '../../utils/context';
export default function App({ Component, pageProps }: AppProps) {
  return (
<>
<BlogProvider>
<ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>

    <Component {...pageProps} />
    </BlogProvider></>
 
  )
}
