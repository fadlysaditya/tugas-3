import '../styles/globals.css'
import'../styles/flexboxgrid.css'

import { Provider } from "react-redux";
import store from "../redux/store";

import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../component/navbar'

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      {/* <Component {...pageProps} isLogin={false} /> */}
      <Navbar/>
      <Component {...pageProps} />
      
    </Provider>
  )
  
  
}

export default MyApp
