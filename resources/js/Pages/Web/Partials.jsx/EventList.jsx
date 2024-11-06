import React from 'react'

const EventList = ({eventName,eventList,color}) => {
    console.log(color);
  return (
    <div className='mt-4'>
        <h1 className='text-blue-800 font-bold mb-6 '>{eventName}</h1>
        <div class={`p-4 mb-4 text-sm  rounded-lg bg-${color}-500  text-white`} role="alert">
            <span class="font-medium">Danger alert!</span> Change a few things up and try submitting again.
        </div>
       
       
    </div>
  )
}

export default EventList
