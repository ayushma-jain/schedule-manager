import TabsComponent from '@/Components/TabsComponent'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import React from 'react'

const Task = ({navComponents}) => {
    
  return (
   <AuthenticatedLayout header={<h2 className='font-semibold text-xl text-gray-800 leading-tight'>Schedule</h2>}>
        <Head title='Create Task' />   
        <TabsComponent navComponents ={navComponents} />
   </AuthenticatedLayout>
  )
}

export default Task
