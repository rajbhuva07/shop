import React, { useState } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import HomePage from '../main/HomePage'
import About from '../about/About'
import Cart from '../cart/Cart'
import Login from '../auth/Login'
import SignUp from '../auth/SignUp'
import MainLayout from '../layout/MainLayout'
import ProtectedRoute from './ProtectedRoute'
import Success from '../paymet/Success'
import Cancel from '../paymet/Cancel'


const AllRoute =()=>{
    const [search,setSearch]=useState('')
return createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                path: '/', element: (
                    <ProtectedRoute>
                        <HomePage />

                        {/* <HomePage  search={search} setSearch={setSearch}/> */}
                     </ProtectedRoute>
                )
            },
            {
                path: 'about',
                element: (
                    <ProtectedRoute>
                        <About />
                    </ProtectedRoute>
                )
            },
            {
                path: 'cart',
                element: (
                    <ProtectedRoute>
                        <Cart />
                    </ProtectedRoute>
                )
            },
            { path: 'login', element: <Login /> },
            { path: 'singup', element: <SignUp /> },
            { path: 'success', element: <Success /> },
            { path: 'cancel', element: <Cancel /> }
        ]
    }
])

}

export default AllRoute
