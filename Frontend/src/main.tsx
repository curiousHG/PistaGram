import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./Context/AuthContext.tsx";
import { SearchBoxContextProvider } from "./Context/SearchBoxContext.tsx";
import { SocketContextProvider } from "./Context/SocketContext.tsx";
import { RoomContextProvider } from "./Context/RoomContext.tsx";
import { SidebarContextProvider } from "./Context/SidebarContext.tsx";
import { UserInfoContextProvider } from "./Context/UserInfoPopupContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
        <AuthContextProvider>
            <SidebarContextProvider>
                <RoomContextProvider>
                    <UserInfoContextProvider>
                        <SocketContextProvider>
                            <SearchBoxContextProvider>
                                <App />
                            </SearchBoxContextProvider>
                        </SocketContextProvider>
                    </UserInfoContextProvider>
                </RoomContextProvider>
            </SidebarContextProvider>
        </AuthContextProvider>
    </BrowserRouter>
);
