import { Link } from '@inertiajs/react';
import React from 'react';
import { MdDashboard } from "react-icons/md";
import { FaMoneyCheckAlt,FaTasks } from "react-icons/fa";
import { AiFillSchedule } from "react-icons/ai";
import { GoGoal } from "react-icons/go";
import { IoIosSettings } from "react-icons/io";
import Tooltip from './Tooltip';



const SideNav = () => {
  return (
    <div className='sidebar'>
        <div className='menu'>
            <ul>
                <li><Tooltip title="Dashboard" ><Link href={route('dashboard')} className='text-2xl'><MdDashboard/></Link></Tooltip></li>
                <li><Tooltip title="Schedule" ><Link href={route('task.list')} className='text-2xl'><AiFillSchedule/></Link></Tooltip></li>
                <li><Tooltip title="Todo" ><Link href={route('todo.view')} className='text-2xl'><FaTasks/></Link></Tooltip></li>
                <li><Tooltip title="Goals" ><Link href={route('goal.view')} className='text-2xl'><GoGoal/></Link></Tooltip></li>
                <li><Tooltip title="Expenses" ><Link href={route('expenses')} className='text-2xl'><FaMoneyCheckAlt/></Link></Tooltip></li>
                <li><Tooltip title="Settings" ><Link href={route('setting')} className='text-2xl'><IoIosSettings/></Link></Tooltip></li>
            </ul>
        </div>
    </div>
  )
}

export default SideNav
