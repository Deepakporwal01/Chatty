import { NavLink } from "react-router-dom";
import GenderCheckbox from "../utility/GenderCheckbox";
import { useState } from "react";
import useSignup from "../hooks/useSignup.js"

const SignUp = () => {
    const [input, setInput] = useState({ fullName: "", username: "", password: "", confirmPassword: "", gender: "" });

    // Handle text input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput((prevInput) => ({
            ...prevInput,
            [name]: value, // ;
        }));
    };
	const { loading, signup } = useSignup();
    // Handle gender selection
    const handleGenderChange = (gender) => {
        setInput((prevInput) => ({
            ...prevInput,
            gender,
        }));
    };

    // Signup hook
    // Form submission
    const submitHandler = (e) => {
        e.preventDefault();
         signup(input);
    };

    return (
        <div className="flex  min-h-[90vh] flex-col items-center justify-center min-w-96 mx-auto">
            <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
                <h1 className="text-3xl font-semibold text-center text-gray-300">
                    Sign Up <span className="text-blue-500"> ChatApp</span>
                </h1>

                <form onSubmit={submitHandler}>
                    {/* Full Name */}
                    <div>
                        <label className="label p-2">
                            <span className="text-base label-text">Full Name</span>
                        </label>
                        <input
                            onChange={handleChange}
                            value={input.fullName}
                            type="text"
                            name="fullName"
                            placeholder="John Doe"
                            className="w-full input input-bordered h-10"
                            required
                        />
                    </div>

                    {/* Username */}
                    <div>
                        <label className="label p-2">
                            <span className="text-base label-text">Username</span>
                        </label>
                        <input
                            onChange={handleChange}
                            value={input.username}
                            name="username"
                            type="text"
                            placeholder="johndoe"
                            className="w-full input input-bordered h-10"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="label">
                            <span className="text-base label-text">Password</span>
                        </label>
                        <input
                            onChange={handleChange}
                            value={input.password}
                            type="password"
                            name="password"
                            placeholder="Enter Password"
                            className="w-full input input-bordered h-10"
                            autoComplete="new-password"
                            required
                        />
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="label">
                            <span className="text-base label-text">Confirm Password</span>
                        </label>
                        <input
                            onChange={handleChange}
                            value={input.confirmPassword}
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            className="w-full input input-bordered h-10"
                            autoComplete="new-password"
                            required
                        />
                    </div>

                    {/* Gender Selection */}
                    <GenderCheckbox onCheckboxChange={handleGenderChange} selectedGender={input.gender} />

                    {/* Already have an account? */}
                    <NavLink to="/login" className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block">
                        Already have an account?
                    </NavLink>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            className="btn btn-block btn-sm mt-2 border border-slate-700"
                             // ✅ FIXED: Show loading state
                        >
                            {loading ? "Signing up..." : "Sign Up"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
