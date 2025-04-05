import React, {useEffect, useState} from 'react'
import axios from "axios";

const Enquiry = () => {
      const [data, setData] = useState([]);
      const [pagination, setPagination] = useState({});
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);
      const [currentPage, setCurrentPage] = useState(1);
      const [searchTerm, setSearchTerm] = useState("");

      useEffect(() => {
        fetchData(currentPage);
      }, [currentPage]);

      const handlePageChange = (page) => {
        setCurrentPage(page);
      };

    const fetchData = async (page = 1) => {
        const token = sessionStorage.getItem("token");
        try {
          const response = await axios.get(`/api/enquires?page=${page}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
    
          console.log("Raw response:", response.data);
          setData(response.data.data);
          setPagination({
            current_page: response.data.current_page,
            last_page: response.data.last_page,
          });
          setCurrentPage(response.data.current_page);
          setLoading(false);
        } catch (error) {
          setError(error);
          setLoading(false);
          console.error("Error fetching enquiries:", error);
        }
      };

    if (loading) return <p>Loading products...</p>;
    if (error) return <p>Error: {error.message}</p>;

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
          </div>
        </div>
        <div className="card-body">
          <table className="table table-head-bg-primary mt-4">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Product Name</th>
                    <th>Mobile</th>
                    <th>Email</th>
                    <th>Message</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody>
                {data.length > 0 ? (
                    data.map((enquiry, index) => (
                    <tr key={enquiry.id}>
                        <td>{(currentPage - 1) * 10 + index + 1}</td>
                        <td>{enquiry.name}</td>
                        <td>{enquiry.product_name}</td>
                        <td>{enquiry.mobile}</td>
                        <td>{enquiry.email}</td>
                        <td>{enquiry.message}</td>
                        <td>{new Date(enquiry.created_at).toLocaleString()}</td>
                    </tr>
                    ))
                ) : (
                    <tr>
                    <td colSpan="7" className="text-center">
                        No enquiries found.
                    </td>
                    </tr>
                )}
            </tbody>
          </table>
            <div className="d-flex justify-content-end mx-5">
             <nav>
                <ul className="pagination">
                    {Array.from({ length: pagination.last_page }, (_, index) => (
                    <li
                        key={index}
                        className={`page-item ${
                        pagination.current_page === index + 1 ? "active" : ""
                        }`}
                    >
                        <button
                        className="page-link"
                        onClick={() => handlePageChange(index + 1)}
                        >
                        {index + 1}
                        </button>
                    </li>
                    ))}
                </ul>
              </nav>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Enquiry
