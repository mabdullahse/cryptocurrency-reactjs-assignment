import { useState } from 'react' 
import { Routes , Route} from 'react-router-dom'
import Cryptocurrency from './pages/Cryptocurrency'
import Nav from './components/Nav'
import { Outlet } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0)
 

 
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
