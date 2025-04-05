import React, { useEffect, useState } from "react";
import AddFormButton from "../../components/ui/AddFormButton";
import DelBtn from "../../components/ui/button/DelBtn";
import EditBtn from "../../components/ui/button/EditBtn";
import { FiEye } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const Company = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const token = sessionStorage.getItem("token");
    try {
      const response = await axios.get("/api/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Raw response:", response.data);
      setData(response.data.original.products);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
      console.error("Error fetching products:", error);
    }
  };

  const handleDeleteCompany = (id) => {
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
          const token = sessionStorage.getItem('token'); // or wherever your token is stored
  
          const response = await axios.post(`/api/product/delete/${id}`, null, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
  
          Swal.fire("Deleted!", "The product has been deleted.", "success");
          fetchData();
        } catch (error) {
          Swal.fire("Error!", "Something went wrong while deleting.", "error");
          console.error(error);
        }
      }
    });
  };
  

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const filteredData = data.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="card">
        <div className="card-header d-flex justify-content-between">
          <div className="card-title">Product List</div>
          <div className="d-flex align-items-center">
            {/* 👇 Search input */}
            <input
              type="text"
              placeholder="Search product..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-control me-2"
              style={{ width: "200px" }}
            />
            <AddFormButton link="/addcompany" buttonName="+ ADD PRODUCT" />
          </div>
          {/* <AddFormButton link="/addcompany" buttonName="+ ADD PRODUCT" /> */}
        </div>
        <div className="card-body">
          <table className="table table-head-bg-primary mt-4">
            <thead>
              <tr>
                <th>#</th>
                <th>Product Image</th>
                <th>Product Name</th>
                <th>Product Category</th>
                <th>Stock</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((product, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <img
                        src={product.product_image_url}
                        alt="product"
                        style={{ width: 50, height: 50, objectFit: "cover" }}
                      />
                    </td>
                    <td>{product.name}</td>
                    <td>{product.category}</td>
                    <td>{product.stock}</td>
                    <td>
                      <DelBtn onClick={() => handleDeleteCompany(product.id)} />
                      <EditBtn onClick={() => navigate(`/edit-product/${product.id}`)} />
                      <FiEye
                        style={{ cursor: "pointer", color: "green", marginLeft: 8 }}
                        onClick={() => navigate(`/product/${product.id}`)}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">No Products found matching your search</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Company;
