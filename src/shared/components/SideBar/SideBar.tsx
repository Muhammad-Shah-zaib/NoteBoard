import './SideBar.css';
import notion from '../../../assets/notion.svg';
import Button from '../../button/Button';
import CloseBtn from '../../../assets/buttons/CloseBtn';
import Whiteboard from './Whiteboard.tsx';
import Profile from './Profile.tsx';
import SearchBtn from '../../../assets/buttons/SearchBtn.tsx';
import HomeBtn from '../../../assets/buttons/HomeBtn.tsx';
import SettingsBtn from '../../../assets/buttons/SettingsBtn.tsx';
import Notes from './Notes.tsx';

function SideBar() {
    return (
        <div className="ctn">
            <div>
                {/* header */}
                <header>
                    {/* Logo and button */}
                    <div className="logo-ctn">
                        <img src={notion} alt="" />
                        <Button className={`close-btn`}>{<CloseBtn />}</Button>
                    </div>
                    {/* Profile image and name */}
                    <Profile />
                    {/* buttons for setting search Home */}
                    <div className={`gap-4 space-y-0.5 py-6`}>
                        <div
                            className={`flex cursor-pointer items-center gap-2 px-2 py-1 transition-all duration-300 hover:bg-zinc-800`}
                        >
                            <Button>{<SearchBtn />}</Button>
                            <span>Search</span>
                        </div>
                        <div
                            className={`flex cursor-pointer items-center gap-2 px-2 py-1 transition-all duration-300 hover:bg-zinc-800`}
                        >
                            <Button>{<HomeBtn />}</Button>
                            <span>Home</span>
                        </div>
                        <div
                            className={`flex cursor-pointer items-center gap-2 px-2 py-1 transition-all duration-300 hover:bg-zinc-800`}
                        >
                            <Button>{<SettingsBtn />}</Button>
                            <span>Settings</span>
                        </div>
                    </div>
                </header>
                {/* main */}
                <main>
                    {/* Whiteboard and Whiteboard */}
                    <Whiteboard />
                    <Notes />
                </main>
            </div>
            <footer>{/* Logout / check Trash */}</footer>
        </div>
    );
}

export default SideBar;
