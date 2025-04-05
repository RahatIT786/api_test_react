import React, { useState } from 'react';
import InputBox from '../../components/ui/InputBox';
import ButtonComponent from '../../components/ui/Button';
import axios from 'axios'   

const csrfToken=document.querySelector('meta[name="csrf-token"]').getAttribute('content');

const BranchesForm = () => {

    const [branchName, setBranchName] = useState('');
    const [branchAddress, setBranchAddress] = useState('');
    const [branchManagerName, setBranchManagerName] = useState('');
    const [branchState, setBranchState] = useState('');
    const [branchDistrict, setBranchDistrict] = useState('');
    const [branchPinCode, setBranchPinCode] = useState('');
    const [branchImage, setBranchImage] = useState(null);
    const [contactNumber1, setContactNumber1] = useState('');
    const [contactNumber2, setContactNumber2] = useState('');

    console.log("your csrf: ",csrfToken);

    // Validation states
    const [errors, setErrors] = useState({});

    const handleFileChange = (e) => {
        setBranchImage(e.target.files);
    };

    const validateForm = () => {
        let newErrors = {};

        if (!branchName.trim()) newErrors.branchName = "Branch Name is required.";
        if (!branchAddress.trim()) newErrors.branchAddress = "Branch Address is required.";
        if (!branchManagerName.trim()) newErrors.branchManagerName = "Manager Name is required.";
        if (!branchState.trim()) newErrors.branchState = "State is required.";
        if (!branchDistrict.trim()) newErrors.branchDistrict = "District is required.";
        if (!branchPinCode.trim()) {
            newErrors.branchPinCode = "Pin Code is required.";
        } else if (!/^\d{6}$/.test(branchPinCode)) {
            newErrors.branchPinCode = "Pin Code must be 6 digits.";
        }
        if (!contactNumber1.trim()) {
            newErrors.contactNumber1 = "Contact Number 1 is required.";
        } else if (!/^\d{10}$/.test(contactNumber1)) {
            newErrors.contactNumber1 = "Enter a valid 10-digit number.";
        }
        if (contactNumber2 && !/^\d{10}$/.test(contactNumber2)) {
            newErrors.contactNumber2 = "Enter a valid 10-digit number.";
        }
        if (!branchImage) newErrors.branchImage = "Please upload at least one branch image.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        if (!validateForm()) return;

        console.log({
            branchName,
            branchAddress,
            branchManagerName,
            branchState,
            branchDistrict,
            branchPinCode,
            branchImage,
            contactNumber1,
            contactNumber2,
        });

        try{
            const response =await axios.post('/api/company-management/branches',
                {
                    branchName: branchName,
                    branchAddress: branchAddress,
                    branchManagerName: branchManagerName,
                    branchState: branchState,
                    branchState: branchState,
                    branchDistrict: branchDistrict,
                    branchPinCode: branchPinCode,
                    branchImage: branchImage,
                    contactNumber1: contactNumber1,
                    contactNumber2: contactNumber2
                },
            );
            console.log('Data sent Successfully :',response.data);
        }catch(error){
            console.error('Error sending Data: ',error);
        }

        //alert("Branch details submitted successfully!");
    };

    return (
        <div className="container py-5">
            <div className="page-inner">
                <div className="page-header d-flex justify-content-between mb-4">
                    <div>
                        <ul className="breadcrumbs mb-3" style={{ paddingLeft: '0px' }}>
                            <li className="nav-home">
                                <a href="#"><i className="icon-home"></i></a>
                            </li>
                            <li className="separator"><i className="icon-arrow-right"></i></li>
                            <li className="nav-item"><a href="#">Company Management</a></li>
                            <li className="separator"><i className="icon-arrow-right"></i></li>
                            <li className="nav-item"><a href="#">Branches</a></li>
                        </ul>
                    </div>
                </div>

                <div className="row justify-content-center my-5 py-5">
                    <div className="col-md-8">
                        <div className="card shadow-lg border-0 rounded-lg">
                            <div className="card-header bg-primary text-white text-center py-3">
                                <h3>Branch Details</h3>
                            </div>
                            <div className="card-body p-5">
                                <form onSubmit={handleSubmit}>
                                    {/* Branch Name, Address, and Manager */}
                                    <div className="row my-3">
                                        <div className="col-md-4">
                                            <InputBox label="Enter Branch Name" type="text"
                                                value={branchName} onChange={(e) => setBranchName(e.target.value)}
                                                placeholder="Enter Branch Name" />
                                            {errors.branchName && <p className="text-danger">{errors.branchName}</p>}
                                        </div>
                                        <div className="col-md-4">
                                            <InputBox label="Enter Branch Address" type="text"
                                                value={branchAddress} onChange={(e) => setBranchAddress(e.target.value)}
                                                placeholder="Enter Branch Address" />
                                            {errors.branchAddress && <p className="text-danger">{errors.branchAddress}</p>}
                                        </div>
                                        <div className="col-md-4">
                                            <InputBox label="Enter Branch Manager Name" type="text"
                                                value={branchManagerName} onChange={(e) => setBranchManagerName(e.target.value)}
                                                placeholder="Enter Manager Name" />
                                            {errors.branchManagerName && <p className="text-danger">{errors.branchManagerName}</p>}
                                        </div>
                                    </div>

                                    {/* State, District, and Pin Code */}
                                    <div className="row my-3">
                                        <div className="col-md-4">
                                            <InputBox label="Enter Branch State" type="text"
                                                value={branchState} onChange={(e) => setBranchState(e.target.value)}
                                                placeholder="Enter Branch State" />
                                            {errors.branchState && <p className="text-danger">{errors.branchState}</p>}
                                        </div>
                                        <div className="col-md-4">
                                            <InputBox label="Enter Branch District" type="text"
                                                value={branchDistrict} onChange={(e) => setBranchDistrict(e.target.value)}
                                                placeholder="Enter Branch District" />
                                            {errors.branchDistrict && <p className="text-danger">{errors.branchDistrict}</p>}
                                        </div>
                                        <div className="col-md-4">
                                            <InputBox label="Enter Branch Pin Code" type="text"
                                                value={branchPinCode} onChange={(e) => setBranchPinCode(e.target.value)}
                                                placeholder="Enter Branch Pin Code" />
                                            {errors.branchPinCode && <p className="text-danger">{errors.branchPinCode}</p>}
                                        </div>
                                    </div>

                                    {/* Contact Numbers */}
                                    <div className="row my-3">
                                        <div className="col-md-6">
                                            <InputBox label="Branch Contact Number 1" type="text"
                                                value={contactNumber1} onChange={(e) => setContactNumber1(e.target.value)}
                                                placeholder="Enter Contact Number 1" />
                                            {errors.contactNumber1 && <p className="text-danger">{errors.contactNumber1}</p>}
                                        </div>
                                        <div className="col-md-6">
                                            <InputBox label="Branch Contact Number 2" type="text"
                                                value={contactNumber2} onChange={(e) => setContactNumber2(e.target.value)}
                                                placeholder="Enter Contact Number 2" />
                                            {errors.contactNumber2 && <p className="text-danger">{errors.contactNumber2}</p>}
                                        </div>
                                    </div>

                                    {/* Branch Image */}
                                    <div className="my-3">
                                        <label className="form-label">Branch Image (Multi Select)</label>
                                        <input type="file" multiple onChange={handleFileChange}
                                            accept="image/*" className="form-control" style={{ border: '1px solid black' }} />
                                        {errors.branchImage && <p className="text-danger">{errors.branchImage}</p>}
                                    </div>

                                    {/* Submit Button */}
                                    <div className="d-flex justify-content-center">
                                    {/* <button type="submit" className="btn btn-primary btn-lg px-4 py-2">Submit</button> */}
                                        <ButtonComponent color="primary"  label="Submit Branch Details" />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BranchesForm;
