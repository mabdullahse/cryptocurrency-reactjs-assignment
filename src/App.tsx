import { useState } from 'react' 
import { Routes , Route, useLocation, Navigate} from 'react-router-dom'
import Cryptocurrency from './pages/CryptocurrencyTable'
import Nav from './components/Nav'
import { Outlet } from "react-router-dom";

function App() {
  const {pathname} = useLocation()
 
 if(pathname === "/"){
  return <Navigate to="/crypto"   replace />;
 }
 
  return (
    <div >
      <Nav/>
      <div className='container mx-auto  px-4'>
       
      <Outlet />
      </div>
    </div>
  )
}

export default App
