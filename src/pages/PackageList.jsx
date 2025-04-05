import React, { useEffect, useState } from 'react';
import axios from 'axios';

/*

📌🚩  THIS IS TESTING PURPOSE COMPONENT ❌❌
📌🚩  DONT USE FOR PROJECT FUNCTIONALITIES ❌❌


*/

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }
  
axios.defaults.withCredentials = true;
// Assuming the CSRF token is stored in the cookie
const csrfToken = getCookie('XSRF-TOKEN');
axios.defaults.headers.common['X-XSRF-TOKEN'] = csrfToken;

// Now make the request
// axios.get('http://127.0.0.1:8000/api/packages')
//   .then(response => {
//     console.log('Response:', response);
//   })
//   .catch(error => {
//     console.error('Error:', error);
//   })

const PackageList = () => {
    const [packages, setPackages] = useState([]);  // State to store the list of packages
    const [loading, setLoading] = useState(true);   // Loading state to show a loading indicator
    const [error, setError] = useState(null);       // Error state to handle any API errors
    const [newPackage, setNewPackage] = useState({
        name: '',
       
    });
    useEffect(() => {
        // Fetch the package data from the Laravel API
        axios.get('/api/packages', {
            withCredentials: true, // Ensure cookies (session) are sent with the request
        })
        .then(response => {
            setPackages(response.data); // Set the data in state when request is successful
            setLoading(false);           // Stop loading after data is fetched
        })
        .catch(error => {
            setError(error);            // Handle any errors during the request
            setLoading(false);          // Stop loading on error
        });
    }, []);  // Empty array means this effect runs once, when the component mounts


        // Handle data submission
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            // Send data to the Laravel backend
            await axios.post('/api/packages', newPackage, { withCredentials: true });

            // Optionally update the state optimistically
            setPackages(prevPackages => [...prevPackages, newPackage]);

            // Clear the form fields
            setNewPackage({
                name: '',
               
            });

            // Refetch the data to get the most updated list (optional)
            fetchPackages();
        } catch (error) {
            console.error('Error submitting package:', error);
        }
    };

    // Fetch updated data
    const fetchPackages = async () => {
        try {
            const response = await axios.get('/api/packages', { withCredentials: true });
            setPackages(response.data);
        } catch (error) {
            setError(error);
        }
    };





    if (loading) {
        return <div>Loading...</div>; // Show a loading message while fetching data
    }

    if (error) {
        return <div>Error fetching data: {error.message}</div>; // Handle errors gracefully
    }

    return (
        <div>
            <h1>Available Packages</h1>
            <ul>
                {packages.map(pkg => (
                    <li key={pkg.id}>
                        <h3>{pkg.CityName}</h3>
                        {/* <p>{pkg.description}</p>
                        <p><strong>Price: ${pkg.price}</strong></p> */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PackageList;
