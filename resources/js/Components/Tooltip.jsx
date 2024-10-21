import React, { useState } from 'react'

const Tooltip = ({title,children}) => {
    const [isVisible, setIsVisible] = useState(false);
    const showTooltip = () =>{
        setIsVisible(true);
    }
    const hideTooltip = () => {
        setIsVisible(false);
    }
  return (
    <div className="relative inline-block">
            <div onMouseEnter={showTooltip} onMouseLeave={hideTooltip}>
                {children}
            </div>
            {isVisible && (
                <div className="absolute bottom-0 left-8 z-10 p-2 text-white bg-black rounded shadow-lg">
                    {title}
                </div>
            )}
        </div>
  )
}

export default Tooltip
