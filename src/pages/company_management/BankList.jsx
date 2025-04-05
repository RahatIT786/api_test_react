import { useState, useEffect } from "react";
import DelBtn from "../../components/ui/button/DelBtn";
import EditBtn from "../../components/ui/button/EditBtn";
import { FiEye } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import AddFormButton from "../../components/ui/AddFormButton";
const BankList = () => {
    const navigate = useNavigate();

    const [bankDetails, setBankDetails] = useState([]);
    const [filteredCompany, setFilteredCompany] = useState("");
    const [companies, setCompanies] = useState([]);

    localStorage.setItem("bankDetails", JSON.stringify([
        { companyName: "ABC Corp", accountName: "John Doe", accountNo: "123456789", ifscSwift: "IFSC123", ibanNo: "IBAN123", bank: "XYZ Bank", branch: "Downtown", gst: "GST123", panCard: "PAN123" },
        { companyName: "ABC Corp", accountName: "Jane Doe", accountNo: "987654321", ifscSwift: "IFSC456", ibanNo: "IBAN456", bank: "XYZ Bank", branch: "Uptown", gst: "GST456", panCard: "PAN456" },
        { companyName: "DEF Ltd", accountName: "Alice", accountNo: "555666777", ifscSwift: "IFSC789", ibanNo: "IBAN789", bank: "LMN Bank", branch: "City Center", gst: "GST789", panCard: "PAN789" },
        { companyName: "AL DEAFA", accountName: "Nasim", accountNo: "553246777", ifscSwift: "IFSC789", ibanNo: "IBAN789", bank: "LMN Bank", branch: "Delhi", gst: "GST789", panCard: "PAN789" },
        { companyName: "AL DEAFA", accountName: "Nasim", accountNo: "553246777", ifscSwift: "IFSC789", ibanNo: "IBAN789", bank: "LMN Bank", branch: "Delhi", gst: "GST789", panCard: "PAN789" },
        { companyName: "AL DEAFA", accountName: "Nasim", accountNo: "553246777", ifscSwift: "IFSC789", ibanNo: "IBAN789", bank: "LMN Bank", branch: "Delhi", gst: "GST789", panCard: "PAN789" },
        
      ]));

      
    useEffect(() => {
        // Fetch bank details from localStorage (dummy data)
        const savedBankDetails = JSON.parse(localStorage.getItem("bankDetails")) || [];
        
        // Ensure data is always an array
        setBankDetails(Array.isArray(savedBankDetails) ? savedBankDetails : []);

        // Extract unique companies from bank details
        const uniqueCompanies = [...new Set(savedBankDetails.map(detail => detail.companyName))];
        setCompanies(uniqueCompanies);
    }, []);

    // ✅ Grouping bank details by company
    const groupedBankDetails = bankDetails
        .filter(detail => !filteredCompany || detail.companyName === filteredCompany)
        .reduce((acc, detail) => {
            if (!acc[detail.companyName]) acc[detail.companyName] = [];
            acc[detail.companyName].push(detail);
            return acc;
        }, {});

        return (
            <div>
                <div className="card">
                    <div className="card-header d-flex justify-content-between">
                        <div className="card-title">BANK DETAILS</div>
                        <div>
                            <AddFormButton link="/add/bankdetails" buttonName="+ ADD BANK" />
                        </div>
                    </div>
    
                    <div className="card-body">
                        <div className="mb-3">
                            <select
                                className="form-select w-25"
                                onChange={(e) => setFilteredCompany(e.target.value)}
                            >
                                <option value="">All Companies</option>
                                {companies.map((company, index) => (
                                    <option key={index} value={company}>
                                        {company}
                                    </option>
                                ))}
                            </select>
                        </div>
    
                        <table className="table table-head-bg-primary mt-4">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Company Name</th>
                                    <th>Account Name</th>
                                    <th>Account No</th>
                                    <th>IFSC / SWIFT</th>
                                    <th>IBAN No</th>
                                    <th>Bank</th>
                                    <th>Branch</th>
                                    <th>GST</th>
                                    <th>PAN Card</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.entries(groupedBankDetails).length > 0 ? (
                                    Object.entries(groupedBankDetails).map(([company, details], compIdx) =>
                                        details.map((bank, idx) => (
                                            <tr key={`${compIdx}-${idx}`}>
                                                <td>{idx + 1}</td>
                                                <td>{company}</td>
                                                <td>{bank.accountName || "-"}</td>
                                                <td>{bank.accountNo || "-"}</td>
                                                <td>{bank.ifscSwift || "-"}</td>
                                                <td>{bank.ibanNo || "-"}</td>
                                                <td>{bank.bank || "-"}</td>
                                                <td>{bank.branch || "-"}</td>
                                                <td>{bank.gst || "-"}</td>
                                                <td>{bank.panCard || "-"}</td>
                                                <td>
                                                    <DelBtn onClick={() => console.log("Delete", idx)} />
                                                    <EditBtn onClick={() => navigate(`/editbank/${idx}`)} />
                                                    <FiEye
                                                        style={{ cursor: "pointer", color: "green" }}
                                                        onClick={() => navigate(`/bank-details/${idx}`)}
                                                    />
                                                </td>
                                            </tr>
                                        ))
                                    )
                                ) : (
                                    <tr>
                                        <td colSpan="11" className="text-center">
                                            No bank details available
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
};

export default BankList;
