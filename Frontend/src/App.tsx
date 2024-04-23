import Login from "./Pages/Login";
import SignUp from "./Pages/Signup";
import Home from "./Pages/Home";
import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./Context/AuthContext";

function App() {
    const { authUser } = useAuthContext();

    return (
        <div className="flex items-center justify-center overflow-hidden h-5/6 max-[640]:w-full min-[640]:w-5/6 p-4">
            <Routes>
                <Route path="/" element={authUser ? <Home /> : <Login />} />
                <Route
                    path="/login"
                    element={authUser ? <Navigate to="/" /> : <Login />}
                />
                <Route
                    path="/signup"
                    element={authUser ? <Navigate to="/" /> : <SignUp />}
                />
                <Route
                    path="*"
                    element={
                        authUser ? (
                            <Navigate to="/" />
                        ) : (
                            <Navigate to="/login" />
                        )
                    }
                />
            </Routes>
            <Toaster
                position="top-center"
                toastOptions={{
                    duration: 5000,
                }}
            />
        </div>
    );
}

export default App;
