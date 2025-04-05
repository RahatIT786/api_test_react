import React, { useEffect, useState } from 'react';
import DelBtn from '../../components/ui/button/DelBtn';
import EditBtn from '../../components/ui/button/EditBtn';
import InputBox from '../../components/ui/InputBox';
import Swal from 'sweetalert2';
import axios from 'axios';

const Department = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState("");
    const [editId, setEditId] = useState(null);
    const [editText, setEditText] = useState("");
    const [newRole, setNewRole] = useState("");
    const token = sessionStorage.getItem("token");

    // Fetch data from API when component loads
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
      try {
          const response = await axios.get("/api/get-department", {
              headers: {
                  "Authorization": `Bearer ${token}`,
              },
          });
  
          // Access the correct key (department) inside the response object
          if (Array.isArray(response.data.department)) {
              setData(response.data.department);
          } else {
              console.error("Unexpected response format:", response.data);
              setData([]); // Fallback to empty array
          }
      } catch (error) {
          console.error("Error Fetching data: ", error);
          setData([]); // Fallback to empty array
      }
  };
  

    // Add New Item
    const handleAddRole = async (e) => {
      e.preventDefault();
  
      if (!newRole.trim()) {
          setError("Enter the Role");
          return;
      }
  
      try {
          const response = await axios.post("/api/department", { department: newRole.trim() }, {
              headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${token}`,
              },
          });
  
          // Ensure the correct data structure
          const newDepartment = response.data.department || response.data;
  
          setData((prevData) => [...prevData, newDepartment]);
          setNewRole('');
          setError('');
      } catch (error) {
          console.error("Error while Adding data: ", error);
      }
  };
  

    // Edit Role
    const handleEditRole = (id, name) => {
        setEditId(id);
        setEditText(name);
    };

    // Save Edited Role
    const handleSaveEditRole = async (e) => {
      e.preventDefault();
  
      if (!editText.trim()) {
          setError("Enter the Role");
          return;
      }
  
      try {
          const response = await axios.put(`/api/update-department/${editId}`, { department: editText.trim() }, {
              headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${token}`,
              },
          });
  
          const updatedDepartment = response.data.department;
  
          setData((prevData) =>
              prevData.map((item) =>
                  item.id === editId ? { ...item, department: updatedDepartment.department } : item
              )
          );
  
          // Reset edit state
          setEditId(null);
          setEditText(""); // Clear input field
          setError('');
      } catch (error) {
          console.error("Error while Updating data: ", error);
      }
  };


    // Delete Role
    const handleDeleteRole = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.put(`/api/department-delete/${id}`, {
                        headers: {
                            "Authorization": `Bearer ${token}`,
                        },
                    });

                    setData(data.filter((item) => item.id !== id));
                    Swal.fire("Deleted!", "The role has been deleted.", "success");
                } catch (error) {
                    console.error("Error while Deleting data: ", error);
                }
            }
        });
    };

    return (
        <section className="d-flex justify-content-center mt-5">
            <div className="col-md-6">
                <div className="card">
                    <div className="card-header">
                        <div className="card-title">Department</div>
                        <div className="d-flex justify-content-between">
                            <div></div>
                            <div>
                                {/* Role Adding form */}
                                <form onSubmit={handleAddRole}>
                                    <InputBox
                                        placeholder="Add Role"
                                        label="+ Add Role"
                                        value={newRole}
                                        onChange={(e) => setNewRole(e.target.value)}
                                    />
                                    {error && <p className="text-danger mt-1">{error}</p>}
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Department</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item, index) => (
                                    <tr key={item.id}>
                                        <td>{index + 1}</td>
                                        <td style={{ textTransform: "uppercase" }}>
                                            {editId === item.id ? (
                                                <form onSubmit={handleSaveEditRole}>
                                                    <input
                                                        type="text"
                                                        value={editText}
                                                        onChange={(e) => setEditText(e.target.value)}
                                                    />
                                                    <button type="submit">Save</button>
                                                </form>
                                            ) : (
                                                item.department
                                            )}
                                        </td>
                                        <td>
                                            <div className="form-button-action">
                                                <EditBtn onClick={() => handleEditRole(item.id, item.department)} />
                                                <DelBtn onClick={() => handleDeleteRole(item.id)} />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Department;
