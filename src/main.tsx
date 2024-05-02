import React from 'react'
import ReactDOM from 'react-dom/client'
import {NextUIProvider} from "@nextui-org/react"
import './index.css'

import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Dashboard from './pages/Dashboard'
import { Layout } from './components/layouts/Layout'
import { AuthLayout } from './components/layouts/AuthLayout'
import Login from './pages/Login'

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Dashboard />
      }
    ],
  },
  {
    element: <AuthLayout />,
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
      <RouterProvider router={ router } />
    </NextUIProvider>
  </React.StrictMode>,
)
