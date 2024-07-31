import './SideBar.css';
import notion from '../../../assets/notion.svg';
import Button from '../../button/Button';
import DoubleArrowSvg from '../../../assets/button-svgs/DoubleArrowSvg.tsx';
import Profile from './Profile.tsx';
import SearchBtnSvg from '../../../assets/button-svgs/SearchBtnSvg.tsx';
import HomeBtnSvg from '../../../assets/button-svgs/HomeBtnSvg.tsx';
import SettingsBtnSvg from '../../../assets/button-svgs/SettingsBtnSvg.tsx';
import Footer from './Footer.tsx';
import React, { useRef } from 'react';
import SavedNotesContainer from '../../../containers/SavedNotesContainer.tsx';
import SavedWhiteboardsContainer from '../../../containers/SavedWhiteboardsContainer.tsx';
import { useNavigate } from 'react-router-dom';

interface Props {
    sideBarCtnRef: React.RefObject<HTMLDivElement>;
    contentCtnRef: React.RefObject<HTMLDivElement>;
    openBtnCtnRef: React.RefObject<HTMLDivElement>;
}

function SideBar({ sideBarCtnRef, contentCtnRef, openBtnCtnRef }: Props) {
    // router hooks
    const navigate = useNavigate();
    // SIDE BAR REF
    const sideBarRef = useRef<HTMLDivElement>(null);
    return (
        <div className="ctn" ref={sideBarRef}>
            <div>
                {/* header */}
                <header>
                    {/* Logo and button */}
                    <div className="logo-ctn">
                        <img src={notion} alt="" />
                        <Button
                            onClick={() => {
                                (
                                    sideBarCtnRef.current as HTMLDivElement
                                ).classList.add('max-w-0');
                                (
                                    sideBarCtnRef.current as HTMLDivElement
                                ).classList.add('hidden');
                                (
                                    contentCtnRef.current as HTMLDivElement
                                ).classList.add('md:w-full');
                                (
                                    openBtnCtnRef.current as HTMLDivElement
                                ).classList.add('opacity-100');
                                (
                                    openBtnCtnRef.current as HTMLDivElement
                                ).classList.remove('pointer-events-none');
                            }}
                            className={`close-btn`}
                        >
                            {<DoubleArrowSvg />}
                        </Button>
                    </div>
                    {/* Profile image and name */}
                    <Profile />
                    {/* button-svgs for setting search Home */}
                    <div className={`gap-4 space-y-0.5 py-6`}>
                        <div
                            className={`flex cursor-pointer items-center gap-2 px-2 py-1 transition-all duration-300 hover:bg-primary`}
                        >
                            <Button>{<SearchBtnSvg />}</Button>
                            <span>Search</span>
                        </div>
                        <div
                            onClick={() => {
                                navigate('/home');
                            }}
                            className={`flex cursor-pointer items-center gap-2 px-2 py-1 transition-all duration-300 hover:bg-primary`}
                        >
                            <Button>{<HomeBtnSvg />}</Button>
                            <span>Home</span>
                        </div>
                        <div
                            className={`flex cursor-pointer items-center gap-2 px-2 py-1 transition-all duration-300 hover:bg-primary`}
                        >
                            <Button>{<SettingsBtnSvg />}</Button>
                            <span>Settings</span>
                        </div>
                    </div>
                </header>
                {/* main */}
                <main className={`main-ctn`}>
                    {/* SavedWhiteboards and SavedWhiteboards */}
                    <SavedWhiteboardsContainer />
                    <SavedNotesContainer />
                </main>
            </div>

            {/* FOOTER */}
            <Footer />
        </div>
    );
}

export default SideBar;
