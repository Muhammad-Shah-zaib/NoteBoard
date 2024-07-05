import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import MasterLayout from './shared/layout/MasterLayout';
import Notes from './components/Notes/Notes.tsx';
import CreateNotesContainer from './containers/CreateNotesContainer.tsx';
import UpdateNoteContainer from './containers/updateNoteContainer.tsx';

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path={`/`} element={<Navigate to={`/notes`} />} />
                    {/* master layout */}
                    <Route path={'/'} element={<MasterLayout />}>
                        <Route path={'notes'} element={<Notes />} />
                        <Route
                            path={'create-notes'}
                            element={<CreateNotesContainer />}
                        />
                        <Route
                            path={`update-notes/:id`}
                            element={<UpdateNoteContainer />}
                        />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
