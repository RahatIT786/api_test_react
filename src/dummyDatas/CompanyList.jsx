import React, { useEffect, useState } from 'react'
import Company from '../pages/company_management/Company';
import axios from 'axios';

const CompanyList = () => {
    const [companies, setCompanies] = useState([]);

  useEffect(() => {
    // Check if companies data exists in localStorage
    // const storedData = localStorage.getItem('companies');

    // if (!storedData) {
    //   // Dummy data to simulate data in localStorage
    //   const dummyData = [
    //     {
    //       companyName: "Company One",
    //       companyDisplayName: "Company One Display",
    //       contactPerson: "John Doe",
    //       mobileNumber: "1234567890",
    //       landlineNumber: "0987654321",
    //       email: "john@example.com",
    //       website: "https://companyone.com",
    //       registeredAddress: "123 Main St.",
    //       aboutCompany: "A brief description of Company One.",
    //       companyLogo: "logo1.png",
    //       country: "USA",
    //       state: "California",
    //       city: "Los Angeles"
    //     },
    //     {
    //       companyName: "Company Two",
    //       companyDisplayName: "Company Two Display",
    //       contactPerson: "Jane Smith",
    //       mobileNumber: "9876543210",
    //       landlineNumber: "1122334455",
    //       email: "jane@example.com",
    //       website: "https://companytwo.com",
    //       registeredAddress: "456 Second St.",
    //       aboutCompany: "A brief description of Company Two.",
    //       companyLogo: "logo2.png",
    //       country: "UK",
    //       state: "England",
    //       city: "London"
    //     }
    //   ];

    //   // Save dummy data to localStorage only if no data exists
    //   localStorage.setItem('companies', JSON.stringify(dummyData));
    // }

    // // Fetch companies from localStorage and update state
    // const savedCompanies = JSON.parse(localStorage.getItem('companies'));
    // setCompanies(savedCompanies);

     const  getCompanies=async()=>{
                try{
                  const token = sessionStorage.getItem("token");
                    const response =await axios.get('/api/getcompany',{
                      headers:{
                        Authorization: `Bearer ${token}`,
                      }
                    });
                    setCompanies(response.data);
                    console.log("your response is : ",response.data);
                }catch(error){
                    console.error("Error fetching companies: ",error);
                    
                }
            };
    getCompanies();
  }, []);

  return (
    <div>
      <h1>Company List</h1>
    
    </div>
  );
}

export default CompanyList