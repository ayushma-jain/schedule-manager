import React from 'react'

const CreateTask = () => {
  return (
    <div className='flex flex-col h-full '>
        <h2>Create Task</h2>
        <hr className='mt-1 mb-5'/>
        <form className="flex-grow">
      
      
        <div className="mb-4">
            <label htmlFor="taskType" className="block text-sm font-medium text-gray-700">Task Type</label>
            <select id="taskType" name="taskType" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
                <option>Choose a task type</option>
                <option value="work">Work</option>
                <option value="personal">Personal</option>
                <option value="other">Other</option>
            </select>
        </div>

        <div className="mb-4">
            <label htmlFor="taskName" className="block text-sm font-medium text-gray-700">Task Name</label>
            <input type="text" id="taskName" name="taskName" required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder="Enter task name"/>
        </div>

        <div className="mb-4">
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Start Date</label>
            <input type="date" id="startDate" name="startDate" required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" /> 
        </div>

        <div className="mb-4">
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">End Date</label>
            <input type="date" id="endDate" name="endDate" required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
        </div>

        <button className='bg-green-500 text-white w-full font-bold py-2 mb-4 px-4 rounded '>Save</button>
        </form>
    </div>
  )
}

export default CreateTask
