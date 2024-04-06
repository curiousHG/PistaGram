import Sidebar from "../Components/Sidebar";
import MessageContainer from "../Components/MessageContainer";
import { useRoomContext } from "../Context/SelectedRoomContext";

const Home = () => {
    const { selectedRoom } = useRoomContext();
    const noChatSelected = selectedRoom === null;
    return (
        <div className="flex h-4/5 w-3/5 rounded-xl overflow-hidden bg-white-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 p-3">
            <Sidebar />
            <MessageContainer
                defaultView={noChatSelected}
                room={selectedRoom}
            />
        </div>
    );
};

export default Home;
