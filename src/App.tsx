import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'
import './App.css'
import MasterLayout from './shared/layout/MasterLayout'
import Notes from "./components/Notes/Notes.tsx";
import CreateNotes from "./components/Notes/CreateNotes.tsx";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path={`/`} element={<Navigate to={`/notes`} />} />
          {/* master layout */}
          <Route path={'/'} element={<MasterLayout/>}>
              <Route path={'notes'} element={<Notes />} />
              <Route path={'create-notes'} element={<CreateNotes />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
