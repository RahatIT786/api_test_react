import React, { useEffect, useState } from "react";
import AddFormButton from "../../components/ui/AddFormButton";
import DelBtn from "../../components/ui/button/DelBtn";
import EditBtn from "../../components/ui/button/EditBtn";
import { FiEye } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import Swal from 'sweetalert2';

const StaffList = () => {
  const [staff, setStaff] = useState([]);
  const navigate = useNavigate();

  const token = sessionStorage.getItem("token");

  // Fetch data from API
  const fetchData = async () => {
    try {
      const response = await axios.get("/api/get-staff", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setStaff(response.data); // Set fetched data to state
    } catch (error) {
      console.error("There was an error fetching the staff data!", error);
    }
  };


  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  
    const handleConfirmDelete = async (id) => {
      const token = sessionStorage.getItem("token");
  
      if (!token) {
          toast.error("Authentication failed! Please log in.", { position: "top-right" });
          return;
      }
  
      try {
          const response = await axios.put(`/api/staff/${id}/delete`, {}, {
              headers: {
                  "Authorization": `Bearer ${token}`
              }
          });
  
          if (response.status === 200) {
              // toast.success("Staff deleted successfully!", { position: "top-right" });
              // Refresh the list after deletion
              setStaff((prevStaff) => prevStaff.filter(member => member.id !== id));
          }
      } catch (error) {
          console.error("Error deleting staff:", error);
          toast.error("Failed to delete staff!", { position: "top-right" });
      }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        handleConfirmDelete(id);
        Swal.fire("Deleted!", "The role has been deleted.", "success");
      }
    });
  }


  

  return (
    <div>
      <ToastContainer position="top-right" autoClose={2000} />
      <div className="card">
        <div className="card-header d-flex justify-content-between">
          <div className="card-title">STAFF LIST</div>
          <div>
            <AddFormButton link="/staff_management/staff_add" buttonName="+ ADD STAFF" />
          </div>
        </div>
         <div className="card-body">
          <table className="table table-head-bg-primary mt-4">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th>NAME</th>
                <th>DEPARTMENT</th>
                <th>MOBILE NUMBER</th>
                <th>EMAIL</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {staff.length > 0 ? (
                staff.map((member, index) => (
                  <tr key={member.id}>
                    <td>{index + 1}</td>
                    <td>{member.first_name + " " + member.last_name}</td>
                    <td>{member.department}</td>
                    <td>{member.mobile}</td>
                    <td>{member.email}</td>
                    <td>
                      <DelBtn  onClick={() => handleDelete(member.id)} />
                      <EditBtn onClick={() => navigate(`/staff_management/staff_edit/${member.id}`)} />
                      <FiEye 
                        style={{ cursor: "pointer", color: "green" }}
                       
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7">No staff available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default StaffList
