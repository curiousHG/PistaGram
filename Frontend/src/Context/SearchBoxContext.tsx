import { useContext, useState } from "react";
import { createContext } from "react";

const DEFAULT_SEARCH_BOX: any = "";

export const SearchBoxContext = createContext(DEFAULT_SEARCH_BOX);

export const useSearchBoxContext = () => {
    return useContext(SearchBoxContext);
};

export const SearchBoxContextProvider = (props: any) => {
    const [searchBox, setSearchBox] = useState("");

    return (
        <SearchBoxContext.Provider value={{ searchBox, setSearchBox }}>
            {props.children};
        </SearchBoxContext.Provider>
    );
};
