import SideBar from "../components/SideBar/SideBar";
import "./MasterLayout.css";
function MasterLayout() {
    return (
        <div className="layout-ctn">
            {/* sideBar */}
            <div className="sidebar-ctn">
                <SideBar/>
            </div>
            {/* Content */}
            <div className="col-span-10 h-[100vh] overflow-auto bg-primary">

            </div>
        </div>
    )
}

export default MasterLayout