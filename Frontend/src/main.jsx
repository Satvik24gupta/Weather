import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router'
import Login from './components/Login.jsx'
import Signup from './components/Signup.jsx'
import Layout from './Layout.jsx'
import { Provider } from 'react-redux'
import { store } from './store.js'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
      <Route path='' element={<App/>}/>
      <Route path='login' element={<Login/>}/>
      <Route path='signup' element={<Signup/>}/>
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    {/* <App /> */}
    <RouterProvider router={router}/>
  </Provider>,
)
