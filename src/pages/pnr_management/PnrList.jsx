import React, { useEffect, useState } from 'react'
import ColorButton from '../../components/ui/Button';
import PnrFormPopup from './PnrFormPopup';
import AddFormButton from '../../components/ui/AddFormButton';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPnrs } from '../../features/pnr/PnrSlice';
const PnrList = () => {

   
  // const [pnrData, setPnrData] = useState([]);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  // const fetchData = async () => {
  //   try{
  //     await axios.get('/sanctum/csrf-cookie');
  //     const response = await axios.get('/api/get/pnrs');
  //     setPnrData(response.data.pnrs);
  //   }catch (error){
  //     console.error("Error fetching data: ", error);
  //   }finally{
  //     setLoading(false);
  //   }


  // };
  // fetchData();
  // }, []);

  // if (loading) return <p>Loading PNR data...</p>;


const dispatch=useDispatch();
const{data:pnrData,status,error}=useSelector((state)=>state.pnr);
useEffect(()=>{
  if(status==='idle'){
    dispatch(fetchPnrs()); // Only fetch if not already fetched
  }
},[dispatch,status]);

if(status==='loading'){
  return <div>Loading...</div>
}
if(status==='failed'){
  return <div>Error: {error}</div>
}




  return (
    <div className="card">
                  <div className="card-header d-flex justify-content-between">
                    <div className="card-title">PNR List</div>
                    <div>
                    <AddFormButton link='/pnr_management/pnr_form'  buttonName={"+ ADD PNR"}/>
                    </div>
                  </div>
                  <div className="card-body">
                   
                    <table className="table table-head-bg-primary mt-4">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">PNR CODE</th>
                          <th scope="col">AIRLINE</th>
                          <th scope="col">DATE</th>
                          <th scope="col">CITY</th>
                          <th scope="col">AVL-SEAT</th>
                        </tr>
                      </thead>
                      <tbody>

                        {pnrData.map((pnr, index) => (
                          <tr key={pnr.id || `pnr-${index}` }  >
                            <td>{index + 1}</td>
                            <td>{pnr.pnr_code}</td>
                            <td>{pnr.airline}</td>
                            <td>{pnr.pnr_date}</td>
                            <td>{pnr.city}</td>
                            <td>{pnr.available_seat}</td>
                          </tr>
                        ))}
                        
                      </tbody>
                    </table>
                  </div>
                  
                </div>

               
  );
}

export default PnrList