import React, { useEffect, useState } from 'react';
import DelBtn from '../button/DelBtn';
import EditBtn from '../button/EditBtn';
import InputBox from '../InputBox';
import Swal from 'sweetalert2';
import axios from 'axios';

const TwoFieldForm = ({
      title = "Detail Title",
      roleColumnName = "Category",
      actionColumnName = "Action",
      apiUrl,
      inputProps = {}
      }) => {
        const [data, setData] = useState([]);
        const [error, setError] = useState("");
        const [editId, setEditId] = useState(null);
        const [editText, setEditText] = useState("");
        const [newRole, setNewRole] = useState("");

        // Fetch Data from API (Dynamic)
        useEffect(() => {
          fetchData();
        }, [apiUrl]);

        const token = sessionStorage.getItem("token");
        const fetchData = async () => {
          try {
            const response = await axios.get(apiUrl,{
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            setData(response.data.product_category);
            // console.log(response.data);
          } catch (error) {
            console.error("Error Fetching data: ", error);
          }
        };

      // Add New Item (Dynamic)
      const handleAddRole = async (e) => {
        e.preventDefault();

        if (!newRole.trim()) {
          setError("Enter the Category");
          return;
        }

            try {
              const response = await axios.post(
                apiUrl,
                { category_name: newRole.trim() },
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                  }
                }
              );
              setData((prevData) => [...prevData, response.data]);
              setNewRole('');
              setError('');
              console.log('Data sent Successfully:', response.data);
            } catch (error) {
              console.error("Error while Adding data: ", error);
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
                  await axios.delete(`${apiUrl}/${id}`);
                  setData(data.filter((item) => item.id !== id));
                  Swal.fire("Deleted!", "The role has been deleted.", "success");
                } catch (error) {
                  console.error("Error while Deleting data: ", error);
                }
              }
            });
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
            const response = await axios.put(`${apiUrl}/${editId}`, { name: editText.trim() });
            setData(data.map((item) => (item.id === editId ? response.data : item)));
            setEditId(null);
          } catch (error) {
            console.error("Error while Updating data: ", error);
          }
        };

      return (
        <section className="d-flex justify-content-center mt-5">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <div className="card-title">{title}</div>
                <div className="d-flex justify-content-between">
                  <div></div>
                  <div>
                    {/* Role Adding form */}
                    <form onSubmit={handleAddRole}>
                      <InputBox
                        placeholder={inputProps.placeholder || "Add Category"}
                        label={inputProps.label || "+ Add Category"}
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
                      <th scope="col">{roleColumnName}</th>
                      <th scope="col">{actionColumnName}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item, index) => (
                      <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td style={{ textTransform: "uppercase" }}>
                          <form onSubmit={handleSaveEditRole}>
                            {editId === item.id ? (
                              <input
                                type="text"
                                value={editText}
                                onChange={(e) => setEditText(e.target.value)}
                              />
                            ) : (
                              item.category_name
                            )}
                          </form>
                        </td>
                        <td>
                          <div className="form-button-action">
                            <EditBtn
                              onClick={() => handleEditRole(item.id, item.name)}
                            />
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

export default TwoFieldForm;