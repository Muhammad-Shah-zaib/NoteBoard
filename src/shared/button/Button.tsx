import './button.css';
import React from 'react';

interface props {
    children: React.ReactNode;
    className?: string;
    onClick?: (e?: any) => unknown;
}

function Button({ children, className, onClick }: props) {
    return (
        <button onClick={onClick} className={className}>
            {children}
        </button>
    );
}

export default Button;
