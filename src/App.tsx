import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import MasterLayout from './shared/layout/MasterLayout'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* master layout */}
          <Route path='/' element={<MasterLayout/>}>

          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
