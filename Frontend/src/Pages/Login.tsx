import { useState } from "react";
import useLogin from "../Hooks/useLogin";

const Login = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const { loading, login } = useLogin();

    const handleSubmitFormHandler = async (e: any) => {
        e.preventDefault();
        await login(formData);
    };

    return (
        <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
            <div className="h-full w-full bg-white-500 p-6 shadow-md rounded-md bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-20 border-4 border-gray-600">
                <h1 className="text-3xl font-semibold text-center text-gray-300">
                    Login
                </h1>
                <form>
                    <div>
                        <label className="label p-2 font-semibold">
                            <span className="text-base label-text">
                                Username
                            </span>
                        </label>
                        <input
                            type="text"
                            className="w-full input input-bordered h-10"
                            value={formData.username}
                            onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    username: e.target.value,
                                });
                            }}
                        />
                    </div>
                    <div>
                        <label className="label p-2 font-semibold">
                            <span className="text-base label-text">
                                Password
                            </span>
                        </label>
                        <input
                            type="password"
                            className="w-full input input-bordered h-10"
                            value={formData.password}
                            onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    password: e.target.value,
                                });
                            }}
                        />
                    </div>
                    <a
                        href="/signup"
                        className="text-sm hover:underline hover:text-gray-100 mt-2 inline-block"
                    >
                        {"Don't"} have an account yet!
                    </a>
                    <div className="flex justify-center">
                        <button
                            className="btn glass btn-md mt-2 mr-auto ml-auto"
                            disabled={loading}
                            onClick={handleSubmitFormHandler}
                        >
                            {loading ? (
                                <span className="loading loading-spinner"></span>
                            ) : (
                                "Login"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
