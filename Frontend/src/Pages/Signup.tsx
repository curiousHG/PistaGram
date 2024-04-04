import { useState } from "react";
import toast from "react-hot-toast";
import useSignup from "../Hooks/useSignup";

const SignUp = () => {
    const { loading, signup } = useSignup();

    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [formDataError, setFormDataError] = useState({
        firstname: "",
        lastname: "",
        username: "",
        email: "",
        password: "",
    });

    const checkExistingErrors = () => {
        if (
            formDataError.firstname === "" &&
            formDataError.lastname === "" &&
            formDataError.username === "" &&
            formDataError.email === "" &&
            formDataError.password === ""
        ) {
            return false;
        }
        return true;
    };

    const emailValidationHandler = (email: string) => {
        return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
    };

    const confirmPasswordHandler = (e: any) => {
        if (formData.password !== e.target.value) {
            setFormDataError({
                ...formDataError,
                password: "Password and confirm Password does not match!",
            });
        } else {
            setFormDataError({ ...formDataError, password: "" });
        }

        setFormData({ ...formData, confirmPassword: e.target.value });
    };

    const handleSubmitFormHandler = async (e: any) => {
        e.preventDefault();
        if (
            formData.firstname === "" ||
            formData.lastname === "" ||
            formData.username === "" ||
            formData.email === "" ||
            formData.password === "" ||
            formData.confirmPassword === ""
        ) {
            toast.error("Please fill the form correctly");
            return;
        } else if (checkExistingErrors()) {
            toast.error("Some fields filled are wrong!");
        }
        // Signup
        await signup(formData);
    };

    return (
        <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
            <div className="h-full w-full bg-white-500 p-6 shadow-md rounded-md bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-100 border-4 border-gray-600">
                <h1 className="text-3xl font-semibold text-center text-gray-300">
                    Signup
                </h1>
                <form>
                    <div>
                        <label className="label p-2 font-semibold">
                            <span className="text-base label-text">
                                Firstname
                            </span>
                        </label>
                        <input
                            type="text"
                            className="w-full input input-bordered h-10"
                            value={formData.firstname}
                            onChange={(e) => {
                                if (e.target.value === "") {
                                    setFormDataError({
                                        ...formDataError,
                                        firstname: "Firstname cannot be empty!",
                                    });
                                } else {
                                    setFormDataError({
                                        ...formDataError,
                                        firstname: "",
                                    });
                                }
                                setFormData({
                                    ...formData,
                                    firstname: e.target.value,
                                });
                            }}
                        />
                        <p className="text-xs text-red-500">
                            {formDataError.firstname}
                        </p>
                    </div>
                    <div>
                        <label className="label p-2 font-semibold">
                            <span className="text-base label-text">
                                Lastname
                            </span>
                        </label>
                        <input
                            type="text"
                            className="w-full input input-bordered h-10"
                            value={formData.lastname}
                            onChange={(e) => {
                                if (e.target.value === "") {
                                    setFormDataError({
                                        ...formDataError,
                                        lastname: "Firstname cannot be empty!",
                                    });
                                } else {
                                    setFormDataError({
                                        ...formDataError,
                                        lastname: "",
                                    });
                                }
                                setFormData({
                                    ...formData,
                                    lastname: e.target.value,
                                });
                            }}
                        />
                        <p className="text-xs text-red-500">
                            {formDataError.lastname}
                        </p>
                    </div>
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
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    username: e.target.value,
                                })
                            }
                        />
                        <p className="text-xs text-red-500">
                            {formDataError.username}
                        </p>
                    </div>
                    <div>
                        <label className="label p-2 font-semibold">
                            <span className="text-base label-text">Email</span>
                        </label>
                        <input
                            type="text"
                            className="w-full input input-bordered h-10"
                            value={formData.email}
                            onChange={(e) => {
                                if (!emailValidationHandler(e.target.value)) {
                                    setFormDataError({
                                        ...formDataError,
                                        email: "Email entered is not valid",
                                    });
                                } else {
                                    setFormDataError({
                                        ...formDataError,
                                        email: "",
                                    });
                                }
                                setFormData({
                                    ...formData,
                                    email: e.target.value,
                                });
                            }}
                        />
                        <p className="text-xs text-red-500">
                            {formDataError.email}
                        </p>
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
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    password: e.target.value,
                                })
                            }
                        />
                    </div>
                    <div>
                        <label className="label p-2 font-semibold">
                            <span className="text-base label-text">
                                Confirm Password
                            </span>
                        </label>
                        <input
                            type="password"
                            className="w-full input input-bordered h-10"
                            onChange={confirmPasswordHandler}
                        />
                        <p className="text-xs text-red-500">
                            {formDataError.password}
                        </p>
                    </div>
                    <a
                        href="/login"
                        className="text-sm hover:underline hover:text-gray-100 mt-2 inline-block"
                    >
                        Already have an account!
                    </a>
                    <div className="flex justify-center">
                        <button
                            className="btn glass btn-md mt-2 mr-auto ml-auto"
                            onClick={handleSubmitFormHandler}
                            disabled={loading}
                        >
                            {loading ? (
                                <span className="loading loading-spinner"></span>
                            ) : (
                                "Signup"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
