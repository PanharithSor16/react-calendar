/* eslint-disable no-unused-vars */
import { useState } from "react";
import { IoPersonCircleOutline } from "react-icons/io5";
// import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { FaRegCalendarAlt } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { TimePicker } from "@hilla/react-components/TimePicker.js";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";

const localizer = momentLocalizer(moment);

export const MyBookingCalendar = () => {
  const [visible, setVisible] = useState(false);
  const [selectedTime, setSelectedTime] = useState(new Date());
  
  
  const [bookings, setBookings] = useState([{
    start: new Date(),
    end: new Date(),
    title: `Booking One`,
    type: "Room A"
  }]);
  const [value, onChange] = useState("00:00");
  const handleEventClick = () => {
    // console.log("event clicked!", e);
    setVisible(true);
    // setSelectedTime(e.slots[0]);
  };
  const handleEventSetVisible = () => {
    setVisible(false);
  };
  const setHandleClick = (time) => {
    const newBooking = {
      start: new Date(new Date(selectedTime).setHours(time, 0, 0)),
      end: new Date(new Date(selectedTime).setHours(time + 2, 0, 0)),
      title: `Booking at ${time}`,
    };

    // Check if the new booking overlaps with existing bookings
    const isOverlap = bookings.some(
      (booking) =>
        (newBooking.start >= booking.start && newBooking.start < booking.end) ||
        (newBooking.end > booking.start && newBooking.end <= booking.end)
    );

    if (isOverlap) {
      alert("This time slot is already booked. Please choose another time.");
    } else {
      setBookings((prev) => [...prev, newBooking]);
      setVisible(false);
    }
  };
 

  const PickerModal = () => {
    return (
      <div className=" w-full place-content-around bg-slate-50 mt-4 text-center">
        <div className=" flex place-content-around text-center">
          <h2> </h2>
          <div className="">
          <button
            className=" flex bg-green-300 p-3 rounded-md"
            onClick={handleEventSetVisible}
          >
            {" "}
            Cancel
            <MdCancel className=" m-1 scale-150 text-red-600" />
          </button>
          </div>
        </div>
        <div className=" grid-cols-3 sm:flex place-content-around  text-center mt-5">
          {[1, 8, 9, 10, 11, 12, 23].map((time) => (
            <div
              key={time}
              onClick={() => {
                setHandleClick(time);
              }}
              className=" space-x-4 bg-red-50"
            >
              <div> {`${time}:00`}</div>
            </div>
          ))}

          {/* <input type="hours" onClick={() => setHandleClick()} /> */}
          {/* <MobileTimePicker /> */}
        </div>
        <div className=" w-full mt-10">
          <TimePicker
            label="Start Meeting"
            value="07:30"
            step={60 * 30}
            autoOpenDisabled
          />
        </div>
        <div className=" w-full mt-5">
          <TimePicker
            label="End Meeting"
            value="04:40"
            step={60 * 30}
            autoOpenDisabled
          />
        </div>
      </div>
    );
  };

  return (
    <div className=" mt-2">
      <div className=" flex place-content-around mb-2 items-center scale-75 sm:scale-100 space-x-1">
        <button
          id="clickBooking"
          onClick={handleEventClick}
          className="  flex text-center item-center bg-pink-700 p-3 rounded-md text-purple-50"
        >
          Booking
          <FaRegCalendarAlt className=" m-1 scale-150" />

        </button>
        <div className=" ">
          <select name="selectedFruit" className=" bg-red-400 p-3 rounded-md">
            <option value="All">All</option>
            <option value="Room A">Guest Room</option>
            <option value="Room B">Office Meeting Room</option>
            
          </select>
        </div>
        <button className=" bg-green-400 p-3 rounded-md flex text-center items-center">
          Profile
          <IoPersonCircleOutline className="m-1 scale-125" />
        </button>
      </div>
      {!visible && (
        <Calendar
          className=" text-pink-900 font-semibold "
          // view={ month: true, week: false, day: false, agenda: false }
        
          
          localizer={localizer}
          events={bookings}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 550 }}
          selectable={true}
          //   onSelectSlot={handleEventClick}
        />
      )}
      {visible && <PickerModal />}
    </div>
  );
};
