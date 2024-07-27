import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import MasterLayout from './shared/layout/MasterLayout';
import Notes from './components/Notes/Notes.tsx';
import CreateNotesContainer from './containers/CreateNotesContainer.tsx';
import UpdateNoteContainer from './containers/updateNoteContainer.tsx';
import ViewAllNotesContainer from './containers/ViewAllNotesContainer.tsx';
import CreateWhiteboardContainer from './containers/CreateWhiteboardContainer.tsx';
import ViewWhitebaordContainer from './containers/ViewWhitebaordContainer.tsx';
import ViewAllWhiteboardsContainer from './containers/ViewAllWhiteboardsContainer.tsx';
import EmailVerificationContainer from './containers/EmailVerificationContainer.tsx';
import SignUpContainer from './containers/SignUpContainer.tsx';
import LoginContainer from './containers/loginContainer.tsx';
import LoginVerificationContainer from './containers/LoginVerificationContainer.tsx';
import AuthGuard from './guards/AuthGuard.tsx';

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path={`/login`} element={<LoginContainer />} />
                    <Route
                        path={`/verify-login/:loginVerificationToken`}
                        element={<LoginVerificationContainer />}
                    />
                    <Route
                        path={`/verify-email/:emailVerificationToken`}
                        element={<EmailVerificationContainer />}
                    />
                    <Route path={`/signup`} element={<SignUpContainer />} />
                    <Route path={`/`} element={<Navigate to={`/notes`} />} />
                    {/* master layout */}
                    <Route path="/" element={<AuthGuard />}>
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
                            <Route
                                path={`view-all-notes`}
                                element={<ViewAllNotesContainer />}
                            />
                            <Route
                                path={`/create-whiteboard`}
                                element={<CreateWhiteboardContainer />}
                            />
                            <Route
                                path={`/update-whiteboard/:id`}
                                element={<CreateWhiteboardContainer />}
                            />
                            <Route
                                path={`/whiteboard`}
                                element={<ViewWhitebaordContainer />}
                            />
                            <Route
                                path={`/view-all-whiteboards`}
                                element={<ViewAllWhiteboardsContainer />}
                            />
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
