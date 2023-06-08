import { Route, BrowserRouter, Routes, } from "react-router-dom";
import { ToastContainer } from 'react-toastify';

import Login from "./component/Login";
import Register from "./component/Register";
import Form from "./component/Form";

import Aos from "aos";
import 'aos/dist/aos.css';
import { useEffect } from "react";
import Main from "./component/Main";
import Details from "./component/Details";
import Count from "./component/Count";
import Cart from "./component/Cart";
import OrderDetails from "./component/OrderDetails";
import PlacedItems from "./component/PlacedItems";

function App() {

  useEffect(() => {
    Aos.init({
      duration: 1600
    });
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path='/' element={<Main/>}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/details' element={<Details />}></Route>
          <Route path='/form' element={<Form />} ></Route>
          <Route path='/signup' element={<Register />} ></Route>
          <Route path='/admin' element={<Count />} ></Route>
          <Route path='/cart' element={<Cart />} ></Route>
          <Route path='/order' element={<OrderDetails />} ></Route>
          <Route path='/placed' element={<PlacedItems/>} ></Route>
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </>
  );
}

export default App;
