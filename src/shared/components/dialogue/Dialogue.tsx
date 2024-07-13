import { ReactNode, useEffect, useRef } from 'react';
import { TriggerClickWithId } from '../../../utils/TriggerClick.ts';

interface Props {
    children: ReactNode;
    id: string;
}

const Dialogue = ({ children, id }: Props) => {
    const dialogueCtnRef = useRef<HTMLDivElement>(null);
    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            TriggerClickWithId('dialogue-close-btn');
        }
    };
    useEffect(() => {
        if (dialogueCtnRef.current) {
            dialogueCtnRef.current.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            if (dialogueCtnRef.current) {
                dialogueCtnRef.current.removeEventListener(
                    'keydown',
                    handleKeyDown,
                );
            }
        };
    }, [id]);

    return (
        <div
            ref={dialogueCtnRef}
            id={id}
            className="fixed z-40 h-[100vh] w-[100vw]"
            tabIndex={0} // Make the div focusable
        >
            <div className="fixed inset-0 h-[100vh] w-[100vw] bg-secondary bg-opacity-70"></div>
            <div className="fixed left-1/2 top-1/2 z-40 min-h-[20vh] w-[70vw] -translate-x-1/2 -translate-y-1/2 bg-secondary shadow-lg shadow-black md:w-[55vw] lg:w-[40vw]">
                {children}
            </div>
        </div>
    );
};

export default Dialogue;
