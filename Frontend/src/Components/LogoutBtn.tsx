import React from "react";
import { BiLogOut } from "react-icons/bi";

const LogoutBtn = () => {
    return (
        <div className="p-6 cursor-pointer z-10 ">
            <BiLogOut className="mt-auto rounded-xl w-7 h-7 hover:bg-gray-500" />
        </div>
    );
};

export default LogoutBtn;
