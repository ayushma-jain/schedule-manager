import Calender from '@/Components/Calender';
// import CreateTask from '@/Components/CreateTask';
import GuestLayout from '@/Layouts/GuestLayout';
import { Button } from '@headlessui/react';
import { Head, Link } from '@inertiajs/react';
import EventList from './Partials.jsx/EventList';
import { useState } from 'react';

export default function Dashboard({formRecords}) {
   
    return (
        <GuestLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Home" />
            <div className='home_front'>
           
                <div className="headline">
                    Manage your schedule and finanace
                </div>
            </div>
            <div className="grid grid-cols-12 gap-4 mx-auto px-4 pt-5">
                
                <div className="col-span-6 text-xl border text-white bg-red-500 p-4">
                    <Link href={route('task.list')}>Manage your scedule</Link>
                </div>
                <div className="col-span-6 text-xl border text-white bg-green-500 p-4">
                <Link href={route('todo.view')}>Add Todo</Link>
                </div>
                <div className="col-span-6 text-xl border text-white bg-yellow-500 p-4">
                    <Link href={route('goal.view')}>Manage Goals</Link>
                </div>
                <div className="col-span-6 text-xl border text-white bg-blue-500 p-4">
                <Link href={route('expenses')}>Manage Budget </Link>
                </div>
                {/* <div className="col-span-4 p-4 border border-blue-500 p-4">
                   <CreateTask></CreateTask>
                </div> */}
            </div>
            <div className="grid grid-cols-12 gap-4 mx-auto px-4 pt-5">
            <Calender formRecords={formRecords}></Calender>
                {/* <div className="col-span-8 p-4">
                    <Calender formRecords={formRecords}></Calender>
                </div>
                <div className="col-span-4 p-4 border border-blue-500 p-4">
                   <EventList eventName={eventName} eventList={eventName} color={color}></EventList>
                </div> */}
            </div>

        </GuestLayout>
    );
}
