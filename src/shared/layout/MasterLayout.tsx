import SideBar from '../components/SideBar/SideBar';
import './MasterLayout.css';
import { useRef } from 'react';
import Button from '../button/Button.tsx';
import DoubleArrowSvg from '../../assets/button-svgs/DoubleArrowSvg.tsx';
import Notes from '../../components/Notes/Notes.tsx';

function MasterLayout() {
    const sideBarCtnRef = useRef<HTMLDivElement>(null);
    const contentCtnRef = useRef<HTMLDivElement>(null);
    const openBtnCtnRef = useRef<HTMLDivElement>(null);

    const handleSideBarCLick = () => {
        (sideBarCtnRef.current as HTMLDivElement).classList.remove('max-w-0');
        (contentCtnRef.current as HTMLDivElement).classList.remove('w-full');
        (openBtnCtnRef.current as HTMLDivElement).classList.remove(
            'opacity-100',
        );
        (openBtnCtnRef.current as HTMLDivElement).classList.add(
            'pointer-events-none',
        );
    };
    return (
        <div className="layout-ctn">
            {/* sideBar */}
            <div className="sidebar-ctn overflow-hidden" ref={sideBarCtnRef}>
                <SideBar
                    contentCtnRef={contentCtnRef}
                    sideBarCtnRef={sideBarCtnRef}
                    openBtnCtnRef={openBtnCtnRef}
                />
            </div>
            {/* Content */}
            <div
                ref={contentCtnRef}
                className="relative h-[100vh] w-[80%] overflow-auto bg-primary transition-all duration-200"
            >
                {/* Following this the button to open the closed sideBar */}
                <span
                    ref={openBtnCtnRef}
                    className={`place-center pointer-events-none absolute inset-1 z-20 flex max-h-[35px] max-w-[35px] rounded-lg opacity-0 transition-all duration-300 hover:bg-primary-700`}
                >
                    {/* open button that will be seen only when the sidebar is not shown*/}
                    <Button
                        onClick={handleSideBarCLick}
                        className={`z-20 rotate-180 p-2`}
                    >
                        <DoubleArrowSvg />
                    </Button>
                </span>
                {/* Content Component */}
                <Notes />
            </div>
        </div>
    );
}

export default MasterLayout;
