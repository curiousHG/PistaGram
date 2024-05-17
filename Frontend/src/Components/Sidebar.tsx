import Searchbox from "./Searchbox";
import Rooms from "./Rooms";
import LogoutBtn from "./LogoutBtn";
import { BUTTON_DATA } from "../constants";
import { useRoomContext } from "../Context/RoomContext";

const Sidebar = () => {
    const { category, setCategory } = useRoomContext();

    const handleButtonClick = (value: string) => {
        setCategory(value);
    };

    return (
        <div className="flex flex-col justify-between gap-0 w-full p-2 h-full">
            <div className="h-full">
                <div className="h-1/6">
                    <Searchbox />
                    <div className="divider px-1"></div>
                </div>
                <div className="text-base flex flex-wrap items-center gap-2 px-2 whitespace-nowrap">
                    {BUTTON_DATA.map((button, key) => (
                        <button
                            className={`bg-blue-600  ${
                                category === button.value
                                    ? "bg-opacity-100 scale-110 shadow-xl border-solid border-2 bg-gradient-to-r from-violet-600 to-red-500"
                                    : "bg-opacity-50 scale-100"
                            } text-white py-2 px-4 hover:bg-opacity-100 rounded-xl shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-103`}
                            key={key}
                            value={button.value}
                            onClick={() => handleButtonClick(button.value)}
                        >
                            {button.name}
                        </button>
                    ))}
                </div>
                <div className="h-full max-h-[500px] overflow-y-auto my-2">
                    <Rooms category={category} />
                </div>
            </div>
            <div className="h-10 my-3">
                <LogoutBtn />
            </div>
        </div>
    );
};

export default Sidebar;
