import { useSearchBoxContext } from "../Context/SearchBoxContext";

const Searchbox = () => {
    const { searchBox, setSearchBox } = useSearchBoxContext();
    return (
        <div className="flex items-center h-fit-content w-full p-3">
            <label
                className="input input-bordered flex items-center"
                style={{ width: "100%" }}
            >
                <input
                    type="text"
                    className="grow"
                    placeholder="Search"
                    value={searchBox}
                    onChange={(e) => {
                        setSearchBox(e.target.value);
                    }}
                />
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="w-[30px] h-[30px] opacity-100"
                >
                    <path
                        fillRule="evenodd"
                        d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                        clipRule="evenodd"
                    />
                </svg>
            </label>
        </div>
    );
};

export default Searchbox;
