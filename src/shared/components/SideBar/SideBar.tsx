import "./SideBar.css";
import notion from "../../../assets/notion.svg";
import Button from "../../button/Button";
import CloseBtn from "../../../assets/buttons/CloseBtn";

function SideBar() {
    return (
        <div className="ctn">
            <header>
                {/* Logo and buton */}
                <div className="logo-ctn">
                    <img src={notion} alt="" />
                    <Button>{<CloseBtn/>}</Button>
                </div>
            </header>
            <main>
                {/* Notes and Whiteboard */}
            </main>
            <footer>
                {/* Logout / check Trash */}
            </footer>
        </div>
    )
}

export default SideBar