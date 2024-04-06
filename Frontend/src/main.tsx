import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./Context/AuthContext.tsx";
import { RoomContextProvider } from "./Context/SelectedRoomContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthContextProvider>
                <RoomContextProvider>
                    <App />
                </RoomContextProvider>
            </AuthContextProvider>
        </BrowserRouter>
    </React.StrictMode>
);
