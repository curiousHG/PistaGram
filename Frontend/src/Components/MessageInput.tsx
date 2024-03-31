import { IoSendSharp } from "react-icons/io5";

const MessageInput = () => {
    return (
        <div className="p-2 w-full flex justify-center items-center">
            <label className="w-full input input-bordered flex items-center gap-2">
                <input type="text" className="grow" placeholder="Search" />
                <span className="w-10 h-full badge cursor-pointer hover:scale-110">
                    <IoSendSharp />
                </span>
            </label>
        </div>
    );
};

export default MessageInput;
