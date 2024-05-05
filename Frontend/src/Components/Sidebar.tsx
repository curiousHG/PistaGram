import Searchbox from "./Searchbox";
import Rooms from "./Rooms";
import LogoutBtn from "./LogoutBtn";
import { useSidebarContext } from "../Context/SidebarContext";

export const BUTTON_DATA = [
    {
        value: "all",
        name: "All",
    },
    {
        value: "friends",
        name: "Friends",
    },
    {
        value: "discover",
        name: "Discover",
    },
];

const Sidebar = () => {
    const { setCategory } = useSidebarContext();

    return (
        <div className="flex flex-col justify-between gap-0 w-full p-2 h-full">
            <div className="h-full">
                <div className="h-1/6">
                    <Searchbox />
                    <div className="divider px-1"></div>
                </div>
                <div className="text-sm flex gap-2 px-2">
                    {BUTTON_DATA.map((button, key) => (
                        <button
                            className={`bg-gray-500 bg-opacity-20 focus:bg-opacity-100 text-white py-2 px-4 hover:bg-opacity-100 rounded-xl shadow-lg hover:shadow-xl focus:shadow-xl transition duration-300 transform hover:scale-103 focus:scale-103`}
                            key={key}
                            value={button.value}
                            onClick={() => {
                                setCategory(button.value);
                            }}
                        >
                            {button.name}
                        </button>
                    ))}
                </div>
                <div className="h-5/6 max-h-[500px] overflow-y-auto">
                    <Rooms />
                </div>
            </div>
            <div className="h-10 my-5">
                <LogoutBtn />
            </div>
        </div>
    );
};

export default Sidebar;
