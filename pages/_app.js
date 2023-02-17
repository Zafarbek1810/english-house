import { ToastContainer } from 'react-toastify'
import { UserContextProvider } from '../src/Context/UserContext'
import '../styles/globals.css'
import { GlobalStyle } from '../styles/globalStyle'
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
    <UserContextProvider>
      <Component {...pageProps} />
      <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
      </UserContextProvider>
      <GlobalStyle/>
    </>
  )

}

export default MyApp
