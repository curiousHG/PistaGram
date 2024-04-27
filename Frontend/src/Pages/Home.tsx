import Sidebar from "../Components/Sidebar";
import MessageContainer from "../Components/MessageContainer";

const Home = () => {
    return (
        <div className="h-full max-h-[700px] w-full max-w-[900px] flex rounded-xl overflow-hidden bg-white-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
            <Sidebar />
            <MessageContainer />
        </div>
    );
};

export default Home;

// 465px is breakpoint
