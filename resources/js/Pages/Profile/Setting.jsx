import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import { BrowserRouter as Router, Route, Routes,Link } from 'react-router-dom'
import CreateActionForm from './Partials/CreateActionForm'
import GenerateNewForm from './Partials/GenerateNewForm'

const Setting = ({userActions,userActionType,formfields,formDetails}) => {
  return (
    <AuthenticatedLayout header={<h2 className='font-semibold text-xl text-gray-800 leading-tight'>Settings</h2>}>
        <Head title='Settings' />

        {/* <Router basename='/setting'> */}
            <div className="grid grid-cols-12 gap-4 mx-auto px-4 pt-5">
                <div className="col-span-3">
                    {/* <aside id="default-sidebar" className="z-40 w-64 transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
                        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                            <ul className="space-y-2 font-medium">
                                <Link to="/action-form" className="flex active items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">Create Action Type</Link>
                                <Link to="/generate-form/*" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">Create Form</Link>
                            </ul>
                        </div>
                    </aside> */}
                </div>
                <div className="col-span-12 p-2">
                    <Routes>
                        <Route exact path="/action-form" element={<CreateActionForm userActions={userActions}/>}/>
                        <Route path='/generate-form/*' element={<GenerateNewForm userActions={userActions}  formfields={formfields} formDetails={formDetails}/>}/>
                    </Routes>
                </div>
            </div>
        {/* </Router> */}
   </AuthenticatedLayout>
  )
}

export default Setting
