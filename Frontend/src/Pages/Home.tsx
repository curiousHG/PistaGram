import Sidebar from "../Components/Sidebar";
import MessageContainer from "../Components/MessageContainer";

const Home = () => {
    return (
        <div className="flex my-3 max-[640px]:h-full max-[640px]:w-full sm:h-full sm:w-full md:h-4/5 md:w-full lg:h-4/5 lg:w-4/5 xl:h-4/5 xl:w-4/5 2xl:h-4/5 2xl:w-3/5 rounded-xl overflow-auto bg-white-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
            <Sidebar />
            <MessageContainer />
        </div>
    );
};

export default Home;
