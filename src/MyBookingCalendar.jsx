import { useState } from "react";

import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
const localizer = momentLocalizer(moment);

export const MyBookingCalendar = () => {
  const [visible, setVisible] = useState(false);
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [bookings, setBookings] = useState([
    {
      
    },
  ]);

  const handleEventClick = (e) => {
    console.log("event clicked!", e);
    setVisible(true);
    setSelectedTime(e.slots[0]);
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
      <div
        style={{
          width: "50vw",
          height: "70vh",
          backgroundColor: "#ccc",
          zIndex: 10,
          margin: "auto",
        }}
      >
        Available Slots:
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            flexWrap: "wrap",
          }}
        >
          {[1, 8, 10, 11, 12, 23].map((time) => (
            <div
              key={time}
              onClick={() => {
                setHandleClick(time);
              }}
              className=" bg-red-50 ml-5"
            >
              {`${time}:00`}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className=" mt-4">
        <div className=" flex place-content-around mb-8">
            <button className=" bg-pink-700 p-3 rounded-sm">Booking</button>
            <button>Profile</button>
        </div>
      {!visible && (
        <Calendar 
        className=" text-pink-900 font-semibold"
          localizer={localizer}
          events={bookings}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 550 }}
          selectable={true}
          onSelectSlot={handleEventClick}
        />
      )}
      {visible && <PickerModal />}
    </div>
  );
};
