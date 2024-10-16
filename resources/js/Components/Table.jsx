import React from 'react'

const Table = ({disaplayData}) => {
 console.log(disaplayData);
  return (
    <div>
        
        <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
                <tr className='bg-aquamarine text-center align-middle'>
            {
                
                (disaplayData.header && disaplayData.header.length>0 ? disaplayData.header.map((value,index)=>(  
                        <th className='border bg-aquamarine px-4 py-2'>{value}</th>

                )): (<>
                </>))
                
            }
            
</tr>
           </thead>
           <tbody>
           {
                (
                    disaplayData.body && disaplayData.body.length>0 ? disaplayData.body.map((row,index)=>(
                       
                        <tr className='text-center align-middle'>

                        {disaplayData.header.map((value,index)=>(  
                            <td className='border border-gray-300 px-4 py-2'>{row[value]}</td>

                         ))}
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
