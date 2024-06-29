import { ReactNode } from 'react';

interface props {
    children: ReactNode;
    id: string;
}
const Dialogue = ({ children, id }: props) => {
    return (
        <div id={id} className={`hidden`}>
            <div
                className={`fixed inset-0 z-30 h-[100vh] w-[100vw] bg-secondary bg-opacity-70`}
            ></div>
            <div
                className={`fixed left-1/2 top-1/2 z-40 min-h-[20vh] w-[40vw] -translate-x-1/2 -translate-y-1/2 bg-secondary shadow-lg shadow-black`}
            >
                {children}
            </div>
        </div>
    );
};

export default Dialogue;
