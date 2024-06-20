

import { BrowserRouter as Router, Route, Routes, RouterProvider } from 'react-router-dom';
import './App.css';

import { useState } from 'react';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AllRoute from './component/route/Route';
import { AuthProvider } from './component/auth/auth';
import { CartProvider } from './component/cart/CartContext';
import { LanguageProvider } from './languges/LangugeContext';




function App() {


  return <>

    <AuthProvider>
      <LanguageProvider>
        <CartProvider>
          <div className="App">
            <ToastContainer />
            <RouterProvider router={AllRoute()} />
          </div>
        </CartProvider>
      </LanguageProvider>
    </AuthProvider>



  </>
}

export default App;
