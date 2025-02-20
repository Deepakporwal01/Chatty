import React from "react";
import { NavLink } from "react-router-dom";
import useLogin from "../hooks/useLogin";
import { useState } from "react";

const Login = () => {
  const [input, setInput] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,  
    }));
  };
 
  const { login, loading } = useLogin();
  // Form submission
  const submitHandler = async(e) => {
    e.preventDefault();
   await login(input);
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-[24rem] mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Login
        </h1>
        <form className="mt-6" onSubmit={submitHandler}>
          <div>
            <label className="block text-sm text-gray-300">username</label>
            <input
              type="text"
              className="w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Enter Your username Name "
              onChange={handleChange}
              name="username"
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm text-gray-300">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Enter Your Password"
              onChange={handleChange}
              name="password"
            />
          </div>
          <div className="mt-6">
            <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
              Login
            </button>
          </div>
        </form>
        <NavLink
          to={"/signup"}
          className="mt-8 text-xs font-light text-center text-gray-300 "
        >
          Don't have an account?{" "}
        </NavLink>
      </div>
    </div>
  );
};

export default Login;
