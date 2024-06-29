import './button.css';
import React from 'react';

interface props {
    children: React.ReactNode;
    className?: string;
    onClick?: (e?: any) => unknown;
    type?: 'button' | 'submit' | 'reset' | undefined;
    id?: string;
}

function Button({ children, className, onClick, type, id }: props) {
    return (
        <button id={id} onClick={onClick} className={className} type={type}>
            {children}
        </button>
    );
}

export default Button;
