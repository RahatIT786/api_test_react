import React, { useEffect, useState } from 'react';


/*

📌🚩  THIS IS TESTING PURPOSE COMPONENT ❌❌
📌🚩  DONT USE FOR PROJECT FUNCTIONALITIES ❌❌


*/


const DataComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Listen for the event
    window.Echo.channel('data-channel')
      .listen('.data-stored', (e) => {
        console.log('Received data: ', e.data); // Log the received data to verify

        // Check if the received data corresponds to a specific table (e.g., 'users', 'orders', etc.)
        if (e.data.table === 'departure_cities') {
          // Update only specific data if it belongs to the 'users' table
          setData((prevData) => [...prevData, e.data]);
        } else if (e.data.table === 'orders') {
          // Handle data for 'orders' table
          setData((prevData) => [...prevData, e.data]);
        }
        // Add additional conditions for other tables if necessary
      });

    // Cleanup on unmount
    return () => {
      window.Echo.leave('data-channel');
    };
  }, []); // Empty dependency array, so this runs once on mount

  return (
    <div>
      <h2>Data</h2>
      <ul>
        {data.map((item, index) => (
           <li key={index}>
           {/* Assuming the city name is in item.CityName */}
           {item.CityName}
         </li>
        ))}
      </ul>
    </div>
  );
};

export default DataComponent;
