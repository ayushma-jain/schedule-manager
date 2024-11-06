import ajaxCall from '@/ajaxCall';
import EventList from '@/Pages/Web/Partials.jsx/EventList';
import React, { useState } from 'react';

const Calendar = ({formRecords}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  console.log(formRecords);
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };
  const [eventName,setEventName] = useState('');
  const [eventList,setEventlist] = useState('');
  const [color,setColor] = useState('')
  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);
    const days = [];

    // Create empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    // Create cells for each day of the month
    for (let i = 1; i <= daysInMonth; i++) {
      const isToday = new Date().getDate() === i && new Date().getMonth() === month && new Date().getFullYear() === year;
      days.push(
        <div  key={`day-${i}`} className={`relative calendar-day ${isToday ? 'today' : ''}`}>
          {
            
              formRecords.map((record, key) => {
                
                const action_date = new Date(record.action_date);

                // Extract year, month, and day
                const action_year = action_date.getFullYear();
                const action_month = action_date.getMonth(); // January is 0
                const action_day = action_date.getDate();

                  // Compare with the provided year, month, and day
                  if (action_year === year && action_month === month && action_day === i) {
                      // Perform any actions you want when the condition is true
                      // For example, you can return or push the record to an array
                      return (
                        <div style={{'position':'absolute',top:'2px',right:'10px'}}>
                        {
                          record.action_id === 1 && (<span className=" text-xs font-medium px-2.5   border text-white bg-red-500" onClick={()=>loadEvents(1,'Schedules','red')}></span>)
                        }
                        {
                          record.action_id === 2 && (<span className=" text-xs font-medium px-2.5   border text-white bg-green-500" onClick={()=>loadEvents(2,'Todo','green')}></span>)
                        }
                        {
                          record.action_id === 3 && (<span className="text-xs font-medium px-2.5   border text-white bg-yellow-500" onClick={()=>loadEvents(3,'Goal','yellow')}></span>)
                        }
                        
                        {
                          record.action_id === 3 && (<span className="text-xs font-medium px-2.5   border text-white bg-blue-500" onClick={()=>loadEvents(4,'Expense','blue')}></span>)
                        }
                        
                      </div>
                      );
                  }
    
                  // Return null or a placeholder if the condition is not met
                  return null;
                })
          }
          
          {i}
        </div>
      );
    }

    return days;
  };

  const changeMonth = (increment) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + increment);
    setCurrentDate(newDate);
  };
  const loadEvents = async (id,event,color) => {
   
    const response = await ajaxCall('/get-event-data/'+id,'GET')
    setEventName(event);
    setColor(color)
  }
  return (
    <>
    <div className="col-span-8 p-4">
    <div className="calendar">
      <div className='mb-3'>
        <span class=" text-xs font-medium me-2 px-2.5 py-2  border text-white bg-red-500" >Schedules</span>
        <span class="text-xs font-medium me-2 px-2.5 py-2  border text-white bg-green-500" >Todo </span>
        <span class=" text-xs font-medium me-2 px-2.5 py-2  border text-white bg-yellow-500" >Goal</span>
        <span class=" text-xs font-medium me-2 px-2.5 py-2  border text-white bg-blue-500" >Expense</span>
      </div>
      <div className="calendar-header">
  
        <button onClick={() => changeMonth(-1)}>Prev</button>
        <h2>
          {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}
        </h2>
        <button onClick={() => changeMonth(1)}>Next</button>
      </div>
      <div className="calendar-grid">
        {renderCalendar()}
      </div>
    </div>
    </div>
    <div className="col-span-4 p-4 border border-blue-500 p-4">
      
        <EventList eventName={eventName} eventList={eventName} color={color}></EventList>
    </div>
                </>
  );
};

export default Calendar;
