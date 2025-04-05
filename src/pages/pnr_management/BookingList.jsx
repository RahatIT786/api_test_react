import axios from 'axios';
import React, { useEffect, useState } from 'react'
import StatusBadge from '../../components/ui/StatusBadge';

const BookingList = () => {

const [bookings,setBookings]=useState([]);
const [loading,setLoading]=useState(true);

useEffect(()=>{
    const fetchBookings=async()=>{
        try{
            const response = await axios.get('/api/get/bookings');
            console.log("Booking Data: ", response.data.bookings);
            setBookings(response.data.bookings);
        }catch(error){
            console.error("Error fetching data: ", error);
        }finally{
            setLoading(false);
        }
    }
    fetchBookings();
},[]);

const handleStatusUpdate = async (bookingId, newStatus) => {
    // console.log("Updating booking ID:", bookingId); 
    try{
        const response = await axios.post(`/api/bookings/${bookingId}/update-status`,{ status: newStatus });
        console.log(response);
        if(response.status === 200){
            console.log('Status updated successfully');
            
           
        }
        else{
            console.error('Error updating status: ', response);
        }
    }catch(error){
        console.error('Error updating status Error : ', error);
    }
}

  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between">
        <div className="card-title">PNR Booking List</div>
        <div></div>
      </div>
      <div className="card-body">
        <table className="table table-head-bg-primary mt-4">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th>BOOKING_ID</th>
              <th>PNR_CODE</th>
              <th>PASSENGER_NAME</th>
              <th>DATE</th>
              <th>AIRLINE</th>
              <th>PAX</th>
              <th>BOOKING_STATUS</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr key={booking.id || `booking-${index}`}>
                <td>{index + 1}</td>
                <td>{booking.booking_id}</td>
                <td>{booking.booking_pnr_number}</td>
                <td>{booking.booking_psngr_name}</td>
                <td>{booking.booking_date}</td>
                <td>{booking.booking_airline}</td>
                <td>{booking.booking_seats}</td>
                <td>
                <StatusBadge status={booking.pnr_status}
                onChangeStatus={(newStatus) => handleStatusUpdate(booking.id, newStatus)}
               />
                </td>
              </tr>
            ))}

            {/* {pnrData.map((pnr, index) => (
                              <tr key={pnr.id || `pnr-${index}` }  >
                                <td>{index + 1}</td>
                                <td>{pnr.pnr_code}</td>
                                <td>{pnr.airline}</td>
                                <td>{pnr.pnr_date}</td>
                                <td>{pnr.city}</td>
                                <td>{pnr.available_seat}</td>
                              </tr>
                            ))} */}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BookingList