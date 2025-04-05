import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputBox from "../../components/ui/InputBox";
const AddBankDetails = () => {
    const navigate = useNavigate();
    const [bankDetails, setBankDetails] = useState([]);
    const [formData, setFormData] = useState({
        companyName: "",
        accountName: "",
        accountNo: "",
        ifscSwift: "",
        ibanNo: "",
        bank: "",
        branch: "",
        gst: "",
        panCard: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let banks = JSON.parse(localStorage.getItem("bankDetails")) || [];

        const newBankData = { ...formData, id: new Date().getTime() };
        banks.push(newBankData);
        // formData.id = new Date().getTime();
        // banks.push(formData);
        localStorage.setItem("bankDetails", JSON.stringify(banks));
       
     
        console.log("Bank Details Saved:", newBankData); 
        navigate("/list/banklist");
    };

    return (
        <div className="container py-5">
            <div className="card">
                <div className="card-header bg-primary text-white text-center">
                    <h3>Add Bank Details</h3>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-md-6">
                                
                                <InputBox
                                    type="text"
                                    name="companyName"
                                    value={formData.companyName}
                                    onChange={handleInputChange}
                                    className="form-control"
                                    label="Company Name"
                                    placeholder="Enter Company Name"
                                   
                                />
                            </div>
                            <div className="col-md-6">
                              
                                <InputBox
                                    type="text"
                                    name="accountName"
                                    value={formData.accountName}
                                    onChange={handleInputChange}
                                    className="form-control"
                                    label="Account Name"
                                    placeholder="Enter Account Name"
                                   
                                />
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className="col-md-6">
                                
                                <InputBox
                                    type="text"
                                    name="accountNo"
                                    value={formData.accountNo}
                                    onChange={handleInputChange}
                                    className="form-control"
                                    label="Account No"
                                    placeholder="Enter Account No"
                                />
                            </div>
                            <div className="col-md-6">
                              
                                <InputBox
                                    type="text"
                                    name="ifscSwift"
                                    value={formData.ifscSwift}
                                    onChange={handleInputChange}
                                    className="form-control"
                                    label="IFSC / SWIFT"
                                    placeholder="Enter IFSC / SWIFT"
                                />
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className="col-md-6">
                              
                                <InputBox
                                    type="text"
                                    name="ibanNo"
                                    value={formData.ibanNo}
                                    onChange={handleInputChange}
                                    className="form-control"
                                    label="IBAN No"
                                    placeholder="Enter IBAN No"
                                />
                            </div>
                            <div className="col-md-6">
                                
                                <InputBox
                                    type="text"
                                    name="bank"
                                    value={formData.bank}
                                    onChange={handleInputChange}
                                    className="form-control"
                                    label="Bank Name"
                                    placeholder="Enter Bank Name"
                                />
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className="col-md-6">
                              
                                <InputBox
                                    type="text"
                                    name="branch"
                                    value={formData.branch}
                                    onChange={handleInputChange}
                                    className="form-control"
                                    label="Branch"
                                    placeholder="Enter Branch"
                                />
                            </div>
                            <div className="col-md-6">
                                
                                <InputBox
                                    type="text"
                                    name="gst"
                                    value={formData.gst}
                                    onChange={handleInputChange}
                                    className="form-control"
                                    label="GST"
                                    placeholder="Enter GST Number"
                                />
                            </div>
                        </div>

                        <div className="mt-4">
                          
                            <InputBox
                                type="text"
                                name="panCard"
                                value={formData.panCard}
                                onChange={handleInputChange}
                                className="form-control"
                                label="PAN Card Number"
                                    placeholder="Enter PAN Card Number"
                            />
                        </div>

                        <div className="d-flex justify-content-end mt-4">
                            <button type="submit" className="btn btn-primary">
                                Save Bank Details
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddBankDetails;
