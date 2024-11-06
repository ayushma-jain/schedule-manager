import React from 'react'
import { IoMdAdd } from 'react-icons/io'
import { FaRegEdit } from "react-icons/fa";
import { GrView } from "react-icons/gr";

const Table = ({disaplayData}) => {
    console.log(disaplayData.header);
  return (
    <div>
        <table className="table-auto w-full border-collapse border border-gray-300 text-sm">
            <thead>
                <tr className='bg-aquamarine text-center align-middle'>
                {
                    (disaplayData.header && disaplayData.header.length>0 ? disaplayData.header.map((value,index)=>(  
                            <th key={index} className='border bg-aquamarine px-4 py-2'>{value}</th>

                    )): (<>
                    </>))
                
                }
            <th>Action</th>
            </tr>
           </thead>
           <tbody>
           {
                (
                    disaplayData.body && disaplayData.body.length>0 ? disaplayData.body.map((row,index)=>(
                       
                        <tr key={index} className='text-center align-middle'>

                            {disaplayData.header && disaplayData.header.length>0  ? disaplayData.header.map((value,index)=>(  
                                <td key={index} className='border border-gray-300 px-4 py-2'>{row[value]}</td>

                            )):<></>}
                            <td className='border border-gray-300 px-4 py-2'>
                                <FaRegEdit className='font-bold inline m-1'/>
                                <GrView className='font-bold inline m-1'/>
                            </td>
                        </tr>
                    
                    )): 
                    (<>
                    </>)
                )
            }
            </tbody>
        </table>
    </div>
  )
}

export default Table
