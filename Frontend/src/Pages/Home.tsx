import React from "react";
import Sidebar from "../Components/Sidebar";

const Home = () => {
    return (
        <div className="flex h-4/5 w-3/5 rounded-xl overflow-hidden bg-white-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 p-3">
            <Sidebar />
            {/* <MessageContainer /> */}
        </div>
    );
};

export default Home;
