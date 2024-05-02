import React from 'react'
import ReactDOM from 'react-dom/client'
import {NextUIProvider} from "@nextui-org/react"
import './index.css'

import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Layout } from './components/layouts/Layout'
import { AuthLayout } from './components/layouts/AuthLayout'
import Login from './pages/Login'
import NotFountPage from './pages/NotFount'
import Productos from './pages/Productos'
import CrearProducto from './pages/CrearProducto'
import { Toaster } from 'sonner'

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <NotFountPage />,
    children: [
      {
        path: "/productos",
        element: <Productos />,
      },
      {
        path: "/crear-producto",
        element: <CrearProducto />,
      }
    ],
  },
  {
    element: <AuthLayout />,
    errorElement: <NotFountPage />,
    children: [
      {
        path: "/login",
        element: <Login />
      }
    ],
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <NextUIProvider>
      <Toaster richColors />
      <RouterProvider router={ router } />
    </NextUIProvider>
  </React.StrictMode>,
)
