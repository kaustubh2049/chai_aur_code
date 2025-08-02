import React from 'react'
import { Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import ResetPassword from './pages/ResetPassword'
import verifyemail from './pages/verifyemail'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  return (
    <div>
      <ToastContainer/>
      <Routes>
      <Route path= '/' element={<Home/>}/>
      <Route path= '/Login' element={<Login/>}/>
      <Route path= '/Resetpassword' element={<ResetPassword/>}/>
      <Route path= '/verifyemail' element={<verifyemail/>}/>

      </Routes>
    </div>
  )
}

export default App
