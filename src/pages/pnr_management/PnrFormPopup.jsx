import React, { useState } from 'react';
import InputBox from '../../components/ui/InputBox';
import ButtonComponent from '../../components/ui/Button';
import DatePickerInput from '../../components/ui/DatePickerInput';
import axios from 'axios';
import { data } from 'react-router';
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';
import { addPnr } from '../../features/pnr/PnrSlice';

import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';
const PnrFormPopup = () => {

    const navigate=useNavigate();

    const dispatch =useDispatch();
   
      // State to hold form data and validation errors
      const [formData, setFormData] = useState({
        pnr_code: '',
        pnr_date: '',
        airline: '',
        total_seat: '',
        city: ''
    });

    const [errors, setErrors] = useState({
        pnr_code: '',
        pnr_date: '',
        airline: '',
        total_seat: '',
        city: ''
     });

    // Handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev)=>({
            ...prev,
            [name]: value,
        }));

        setErrors((prevErrors)=>({
            ...prevErrors,
            [name]: '',
        }));
        // setFormData({
        //     ...formData,
        //     [name]: value
        // }); 
    };

    // Validate form fields
    const validateForm = () => {
        let validationErrors = {};


        // Check if PNR code is empty
        if (!formData.pnr_code.trim()) {
            validationErrors.pnr_code = 'PNR Code is required';
        }

        // Check if PNR Date is valid
        if (!formData.pnr_date.trim()) {
            validationErrors.pnr_date = 'PNR Date is required';
        }

        // Check if Airline Name is empty
        if (!formData.airline.trim()) {
            validationErrors.airline = 'Airline Name is required';
        }

        // // Check if PNR Seats is a positive number
        // if (!formData.total_seat || formData.total_seat <= 0 ) {
        //     newErrors.total_seat = 'PNR Seats must be a positive number';
        // }

        // Check if City Name is empty
        if (!formData.city.trim()) {
            validationErrors.city = 'City Name is required';
        }
        if (!formData.total_seat.trim()) {
            validationErrors.total_seat = 'City Name is required';
        }

        setErrors(validationErrors);
        return Object.keys(validationErrors).length === 0;
    };

    // Handle form submission
    const handleSubmit = async(e) => {
        e.preventDefault();
        const response= dispatch(addPnr(formData));
        toast.success("PNR DETAILS ADDED SUCCESSFULLY",
            {position:"top-right"});
            setTimeout(()=>{
                navigate("/pnr_management/pnr_list");
            },3000);

        // if(response?.payload?.success){
        //     toast.success("PNR DETAILS ADDED SUCCESSFULLY",
        //         {position:"top-right"});
        //         setTimeout(()=>{
        //             navigate("/pnr_management/pnr_list");
        //         },3000);
        // }

        setFormData({
            pnr_code: '',
            pnr_date: '',
            airline: '',
            total_seat: '',
            city: ''
          });

        if (!validateForm()) {
            console.log("Validation failed", formData, '||','Errors:', errors);
            return; // Stop submission if validation fails
          }


        // await axios.get('/sanctum/csrf-cookie');
        // try{
        //     const response=await axios.post(
        //         '/api/add/pnr',
        //         {data:formData}
        //     );
        //     console.log('Form data submited: ', formData, 'server response: ', response.data.message);
        // }catch(error){
        //     console.log('Form data submited: ', formData,error);
        // }
        
        
        // Validate before submitting
        if (validateForm()) {

          
            // Add your form submission logic here (e.g., send to server)
            console.log('Form submitted with data: ', formData);
        }
    };










    return (

        <div className="container py-5">
             <ToastContainer position="top-right" autoClose={2000} />
        <div className="page-inner">
            <div className="page-header d-flex justify-content-between mb-4">
                {/* Add header content here */}
            </div>

            <div className="row justify-content-center my-5 py-5">
                <div className="col-md-8">
                    <div className="card shadow-lg border-0 rounded-lg">
                        <div className="card-header bg-primary text-white text-center py-3">
                            <h3>PNR Details</h3>
                        </div>
                        <div className="card-body p-5">
                            <form onSubmit={handleSubmit}>
                                {/* PNR Code, PNR Date, and Airline Name */}
                                <div className="row my-3">
                                    <div className="col-md-4 mt-2">
                                        <InputBox
                                            label="PNR code"
                                            type="text"
                                            name="pnr_code"
                                            value={formData.pnr_code}
                                            placeholder="Enter PNR code"
                                            onChange={handleInputChange}
                                            
                                        />
                                        <div className="invalid-feedback">{errors.pnr_code}</div>
                                    </div>
                                    <div className="col-md-4">
                                        <DatePickerInput
                                            label="PNR Date"
                                            value={ dayjs(formData.pnr_date)}
                                           name={'pnr_date'}
                                            
                                            onChange={handleInputChange}
                                            
                                        />
                                        {errors.pnr_date && <div className="invalid-feedback">{errors.pnr_date}</div>}
                                    </div>
                                    <div className="col-md-4 mt-2">
                                        <InputBox
                                            label="Airline Name"
                                            type="text"
                                            name="airline"
                                            value={formData.airline}
                                            placeholder="Enter Airline Name"
                                            onChange={handleInputChange}
                                           
                                        />
                                         {errors.airline && (
        <div className="invalid-feedback">{errors.airline}</div>
      )}
                                    </div>
                                </div>

                                {/* PNR Seats and City Name */}
                                <div className="row my-3">
                                    <div className="col-md-6">
                                        <InputBox
                                            label="PNR Seats"
                                            type="number"
                                            name="total_seat"
                                            value={formData.total_seat}
                                            placeholder="Enter PNR Seats"
                                            onChange={handleInputChange}
                                           
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <InputBox
                                            label="City Name"
                                            type="text"
                                            name="city"
                                            value={formData.city}
                                            placeholder="Enter City Name"
                                            onChange={handleInputChange}
                                           
                                        />
                                         {errors.total_seat && (
        <div className="invalid-feedback">{errors.total_seat}</div>
      )}
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <div className="d-flex justify-content-end">
                                    <ButtonComponent color="primary" label="SAVE"  />
                                    {/* <button type="submit" className="btn btn-primary">Save</button> */}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    );
};

export default PnrFormPopup;
