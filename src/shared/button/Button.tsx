import "./button.css";

interface props {
    children: React.ReactNode;
}

function Button({children}: props) {
    return (
        <div>
            {children}
        </div>
    )
}

export default Button