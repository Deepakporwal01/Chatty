import React from 'react';
import { NavLink } from 'react-router-dom';

const Login = () => {
    return (
        <div className='flex flex-col items-center justify-center min-w-[24rem] mx-auto'>
            <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
                <h1 className='text-3xl font-semibold text-center text-gray-300'>
                    Login
                </h1>
                <form className='mt-6'>
                    <div>
                        <label className='block text-sm text-gray-300'>Email</label>
                        <input
                            type='email'
                            className='w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40'
                            placeholder="Enter Your Name"
                        />
                    </div>
                    <div className='mt-4'>
                        <label className='block text-sm text-gray-300'>Password</label>
                        <input
                            type='password'
                            className='w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40'
                            placeholder="Enter Your Password"
                        />
                    </div>
                    <div className='mt-6'>
                        <button className='w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600'>
                            Login
                        </button>
                    </div>
                </form>
                <p className='mt-8 text-xs font-light text-center text-gray-300'>
                    Don't have an account?{' '}
                </p>
            </div>
        </div>
    );
};

export default Login;