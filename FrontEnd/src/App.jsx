import { useState } from 'react'
import Header from './Components/Header'
import Sidebar from './Components/Sidebar'
import { Outlet } from 'react-router-dom'
import {Provider} from "react-redux"
import { store } from './Utils/Store'


function App() {


  return (
    <Provider store={store}>
   <Header />
   <Outlet />
    </Provider>
  )
}

export default App
