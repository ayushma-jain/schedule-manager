import TabsComponent from '@/Components/TabsComponent'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import React from 'react'

const Expense = ({navComponents}) => {
  return (
    <AuthenticatedLayout header={<h2 className='font-semibold text-xl text-gray-800 leading-tight'>Expenses</h2>}>
        <Head title='Expenses' />
 
        <TabsComponent navComponents ={navComponents}/>
    </AuthenticatedLayout>
  )
}

export default Expense
