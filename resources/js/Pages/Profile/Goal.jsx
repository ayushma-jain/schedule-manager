import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import React from 'react'

const Goal = () => {
  return (
    
   <AuthenticatedLayout header={<h2 className='font-semibold text-xl text-gray-800 leading-tight'>Goals</h2>}>
        <Head title='Goal' />
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
        <div className="flex flex-wrap p-4">
            <div className="w-full md:w-1/2 lg:w-1/4 p-4">
                Column 1
            </div>
            <div className="w-full md:w-1/2 lg:w-1/2 p-4">
                Column 2
            </div>
            <div className="w-full md:w-1/2 lg:w-1/3 p-4">
                Column 3
            </div>
        </div>

            <div className="w-full md:w-1/2 xl:w-full p-4">
                <div className="goals-nav active flex items-center">
                    <div className="w-12 h-12 mr-4">
                        
                    </div>
                    <div className="goals-nav-text">
                        <h3 className="text-lg font-semibold">Car</h3>
                        <p><strong>$1458.30</strong> / $4580.85</p>
                    </div>
                </div>
            </div>
    
   

            <div className="w-full md:w-1/2 xl:w-full p-4">
                <div className="goals-nav flex items-center">
                    <div className="w-12 h-12 mr-4">
                    
                    </div>
                    <div className="goals-nav-text">
                        <h3 className="text-lg font-semibold">Vacation</h3>
                        <p><strong>$1458.30</strong> / $4580.85</p>
                    </div>
                </div>
            </div>

            <div className="w-full md:w-1/2 xl:w-full p-4">
                <div className="goals-nav flex items-center">
                    <div className="w-12 h-12 mr-4">
                        
                    </div>
                    <div className="goals-nav-text">
                        <h3 className="text-lg font-semibold">Phone</h3>
                        <p><strong>$1458.30</strong> / $4580.85</p>
                    </div>
                </div>
            </div>
        </div>
   </AuthenticatedLayout>
  )
}

export default Goal
