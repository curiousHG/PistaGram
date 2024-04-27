import Searchbox from "./Searchbox";
import Rooms from "./Rooms";
import LogoutBtn from "./LogoutBtn";

const Sidebar = () => {
    return (
        <div className="flex flex-col justify-between gap-0 w-fullp-2">
            <div className="h-full">
                <div className="h-1/6">
                    <Searchbox />
                    <div className="divider px-1"></div>
                </div>
                <div className="h-5/6 max-h-[500px] overflow-y-auto">
                    <Rooms />
                </div>
            </div>
            <div className="h-10 my-2">
                <LogoutBtn />
            </div>
        </div>
    );
};

export default Sidebar;
