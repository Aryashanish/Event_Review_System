import './App.css'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import { Outlet } from 'react-router-dom'
import { UserProvider } from './Context/userContext.jsx'

function App() {

  return (
    <UserProvider>
      <Header />
      <div className='show'>
        <Outlet />
      </div>
      <Footer />
    </UserProvider>
  )
}

export default App
