import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./Context/AuthContext.tsx";
import { SearchBoxContextProvider } from "./Context/SearchBoxContext.tsx";
import { SocketContextProvider } from "./Context/SocketContext.tsx";
import { RoomContextProvider } from "./Context/RoomContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthContextProvider>
                <RoomContextProvider>
                    <SocketContextProvider>
                        <SearchBoxContextProvider>
                            <App />
                        </SearchBoxContextProvider>
                    </SocketContextProvider>
                </RoomContextProvider>
            </AuthContextProvider>
        </BrowserRouter>
    </React.StrictMode>
);
