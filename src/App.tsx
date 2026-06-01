import { Route, Routes } from 'react-router-dom'
import Home from './Pages /Home'
import Videos from './Pages /Video'
import './App.css'

function App() {

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/Videos' element={<Videos />} />
    </Routes>
  )
}

export default App