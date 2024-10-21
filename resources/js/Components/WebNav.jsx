import UserLoginForm from '@/Pages/Web/Partials.jsx/UserLoginForm';
import UserRegistrationForm from '@/Pages/Web/Partials.jsx/UserRegistrationForm';
import { Button } from '@headlessui/react';
import { Link, usePage } from '@inertiajs/react';
import React, { useState } from 'react'

const WebNav = () => {
    const auth = usePage().props.auth;
    const [isLoginModal,setIsLoginModal] = useState(false);
    const [isSignupModal,setIsSignupModal] = useState(false);
   
    const openLoginModal = () => {
        setIsLoginModal(true);
    };
    const openRegisterModal = () => {
        setIsSignupModal(true);
    }
    
  return (
    
    <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <Link href={route('home')} className="flex items-center">
                <img src="https://flowbite.com/docs/images/logo.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
                <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
            </Link>
            <div className="flex items-center lg:order-2">
            {auth.user ? (
                <Link
                    href={route('dashboard')}
                    className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                >
                    Go to Dashboard
                </Link>
            ) : (
                <>
                    {/* <Link
                        href={route('login')}
                        className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                    >
                        Log in
                    </Link> */}
                    <Button className="px-4" onClick={openLoginModal} >Login</Button>
                    <Button className="px-4" onClick={openRegisterModal} >Register</Button>
                    <Button className="px-4" >Get Started</Button>
                    {/* <Link
                        href={route('register')}
                        className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                    >
                        Register
                    </Link> */}
                </>
            )}
            <button data-collapse-toggle="mobile-menu-2" type="button" className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-2" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                    <svg className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                </button>
            </div>
        
        </div>
        
        <UserLoginForm isLoginModal={isLoginModal} setIsLoginModal={setIsLoginModal}></UserLoginForm>
        <UserRegistrationForm isSignupModal={isSignupModal} setIsSignupModal={setIsSignupModal}></UserRegistrationForm>
    </nav>
    
  )
}

export default WebNav
