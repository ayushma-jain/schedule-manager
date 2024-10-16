import React, { useState } from 'react'

const Select = ({options,name,id,onChange}) => {
  
   
  return (
    <>
        <select name={name} id={id} onChange={onChange} className="text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500">
        <option value="">--Select--</option>
        {options && options.length > 0 ? (
        options.map((option, index) => (
            <option key={index} value={option.index}>{option.value}</option>
        ))
        ) : (
            <option disabled>No options available</option>  // Optional: Add a default message if the array is empty
        )}
       
    </select>
    </>
  )
}

export default Select
