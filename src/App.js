import './App.css';
import AppRoutes from './router/AppRoutes';
import React,{useEffect} from 'react';
import WebFont from 'webfontloader';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from 'react-redux';
import { fetchPnrs } from './features/pnr/PnrSlice';
import { fetchCompanies } from './features/company_management/CompanyDetailSlice';




function App() {
  const dispatch =useDispatch();
  useEffect(()=>{
   

    WebFont.load({
      google: { families: ["Public Sans:300,400,500,600,700"] },
      custom: {
        families: [
          "Font Awesome 5 Solid",
          "Font Awesome 5 Regular",
          "Font Awesome 5 Brands",
          "simple-line-icons",
        ],
        urls: ["/assets/css/fonts.min.css"],
      },
      active: function () {
        sessionStorage.fonts = true;
      },
    });
   

    // Fix: Initialize window.Pusher and window.Echo
    

    // Debugging: Log Echo object to verify it's initialized
     // This should print an instance of Echo

    // Listen for events if Echo is initialized
   







    


  },[]);

  useEffect(() => {
    // Dispatch the actions to fetch data when the app first loads
   
    dispatch(fetchPnrs());
   
  }, [dispatch]);


  return (
  
    
    
    <AppRoutes />
    
    );
}

export default App;
