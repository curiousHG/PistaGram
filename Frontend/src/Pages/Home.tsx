import Sidebar from "../Components/Sidebar";
import MessageContainer from "../Components/MessageContainer";
import { useSidebarContext } from "../Context/SidebarContext";

const Home = () => {
    const { sidebarOpen } = useSidebarContext();
    return (
        <div className="h-full max-h-[800px] m-2 w-full max-w-[1000px] flex rounded-xl overflow-hidden bg-white-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
            <div className="w-1/2 xs:hidden">
                <Sidebar />
            </div>
            <div
                className={`bg-gray-500 absolute left-0 top-0 h-full w-4/6 transition-transform duration-300 z-10 rounded-2xl p-2 ${
                    sidebarOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <Sidebar />
            </div>
            <MessageContainer />
        </div>
    );
};

export default Home;
