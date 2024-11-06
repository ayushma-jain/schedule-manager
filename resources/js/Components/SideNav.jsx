import { Link } from '@inertiajs/react';
import React, { useState } from 'react';
import ResponsiveNavLink from './ResponsiveNavLink';

const SideNav = ({type}) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  // State to track submenu visibility
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);

  // Toggle submenu visibility
  const toggleSubmenu = () => {
    setIsSubmenuOpen(!isSubmenuOpen);
  };
  return (
    <>
    {(type && type ===  'Responsive' ? (
      <> <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
      <span >Dashboard</span>
    </ResponsiveNavLink>
    <ResponsiveNavLink href={route('task.list')} active={route().current('task.list')}>
      <span >Schedule</span>
    </ResponsiveNavLink>
    <ResponsiveNavLink href={route('todo.view')} active={route().current('todo.view')}>
      <span >Todo</span>
    </ResponsiveNavLink>

    <ResponsiveNavLink href={route('goal.view')} active={route().current('goal.view')}>
      <span >Goals</span>
    </ResponsiveNavLink>
    <ResponsiveNavLink href={route('expenses')} active={route().current('expenses')}>
      <span >Expenses</span>
    </ResponsiveNavLink>
    <ResponsiveNavLink href={route('action-form')} active={route().current('action-form')}>
      <span >Settings</span>
    </ResponsiveNavLink></>
    ):(
      <>
        <Link href={route('dashboard')} className="block w-full py-2 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none border-transparent hover:text-gray-700 hover:bg-gray-300 focus:bg-gray-300 focus:text-gray-700" active={route().current('dashboard')}>
          <span >Dashboard</span>
        </Link>
        <Link href={route('task.list')} className="block w-full py-2 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none border-transparent hover:text-gray-700 hover:bg-gray-300 focus:bg-gray-300 focus:text-gray-700" active={route().current('task.list')}>
          <span >Schedule</span>
        </Link>
        <Link href={route('todo.view')} className="block w-full py-2 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none border-transparent hover:text-gray-700 hover:bg-gray-300 focus:bg-gray-300 focus:text-gray-700" active={route().current('todo.view')}>
          <span >Todo</span>
        </Link>
    
        <Link href={route('goal.view')} className="block w-full  py-2 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none border-transparent hover:text-gray-700 hover:bg-gray-300 focus:bg-gray-300 focus:text-gray-700" active={route().current('goal.view')}>
          <span >Goals</span>
        </Link>
        <Link href={route('expenses')} className="block w-full  py-2 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none border-transparent hover:text-gray-700 hover:bg-gray-300 focus:bg-gray-300 focus:text-gray-700" active={route().current('expenses')}>
          <span >Expenses</span>
        </Link>
        <li onClick={toggleSubmenu} className="relative block w-full  py-2 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none border-transparent hover:text-gray-700 hover:bg-gray-300 focus:bg-gray-300 focus:text-gray-700" active={route().current('action-form')}>
          <span >Settings</span>
          <span style={{ marginLeft: '8px' }}>
              {isSubmenuOpen ? '▼' : '▶'} 
            </span>
          {isSubmenuOpen && (
            <div className="absolute left-0 mt-1 bg-white border border-gray-300 rounded shadow-lg w-full z-10">
              {/* <Link
                className="block w-full py-2 px-4 text-sm text-gray-700 hover:bg-gray-100"
              >
                Profile
              </Link>
              <Link
                className="block w-full py-2 px-4 text-sm text-gray-700 hover:bg-gray-100"
              >
                Profile
              </Link> */}
              <Link href={route('action-form')} className="block w-full py-2 px-4 text-sm text-gray-700 hover:bg-gray-100" active={route().current('action-form')}>Create Action Type</Link>
              <Link href={route('generate-form')} className="block w-full py-2 px-4 text-sm text-gray-700 hover:bg-gray-100" active={route().current('generate-form')}>Create Form</Link>
            </div>
          )}
        </li>
      </>
    ))}
  </>
  )
}

export default SideNav
