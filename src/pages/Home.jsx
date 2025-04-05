
import React from 'react';
import CountLabel from '../components/ui/CountLabel';

const Home = () => {

  return (
   
           
       <div>
                
            <div className="d-flex align-items-left align-items-md-center flex-column flex-md-row pt-2 pb-4">
              <div>
                <h3 className="fw-bold mb-3"><a href="/dashboard">Dashboard</a></h3>
               
              </div>
              <div className="ms-md-auto py-2 py-md-0">
                <a href="#" className="btn btn-label-info btn-round me-2">Manage</a>
                <a href="#" className="btn btn-primary btn-round">Add Customer</a>
              </div>
            </div>
            <div className="row">
              <CountLabel icon="fa-check-circle" category="SignUp" value="23" color='icon-primary' />
              <CountLabel icon="fa-users" category="SignUp" value="23" color='icon-info' />
              <CountLabel icon="fa-luggage-cart" category="SignUp" value="23" />
              <CountLabel icon="fa-check-circle" category="SignUp" value="23" color='icon-secondary' />
            </div>
       </div> 
     
  );
}

export default Home;
