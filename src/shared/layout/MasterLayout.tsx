import SideBar from '../components/SideBar/SideBar';
import './MasterLayout.css';
import { useRef } from 'react';
import Button from '../button/Button.tsx';
import DoubleArrowSvg from '../../assets/button-svgs/DoubleArrowSvg.tsx';
function MasterLayout() {
    const sideBarCtnRef = useRef<HTMLDivElement>(null);
    const contentCtnRef = useRef<HTMLDivElement>(null);
    const openBtnCtnRef = useRef<HTMLDivElement>(null);
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
                <div
                    ref={openBtnCtnRef}
                    className={`pointer-events-none absolute inset-1 opacity-0 transition-all duration-300`}
                >
                    {/* open button that will be seen only when the sidebar is not shown*/}
                    <Button
                        onClick={() => {
                            (
                                sideBarCtnRef.current as HTMLDivElement
                            ).classList.remove('max-w-0');
                            console.log(sideBarCtnRef.current);
                            (
                                contentCtnRef.current as HTMLDivElement
                            ).classList.remove('w-full');
                            (
                                openBtnCtnRef.current as HTMLDivElement
                            ).classList.remove('opacity-100');
                            (
                                openBtnCtnRef.current as HTMLDivElement
                            ).classList.add('pointer-events-none');
                        }}
                        className={`rotate-180 p-2`}
                    >
                        <DoubleArrowSvg />
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default MasterLayout;
