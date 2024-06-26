import "./button.css";
import React from "react";

interface props {
    children: React.ReactNode;
    className?: string;
}

function Button({children, className}: props) {
    return (
        <div className={className}>
            {children}
        </div>
    )
}

export default Button