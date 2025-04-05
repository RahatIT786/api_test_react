import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import InputBox from '../../components/ui/InputBox'
import FileUpload from '../../components/ui/FileUpload'
import ButtonComponent from '../../components/ui/Button'
import * as yup from "yup";
import SingleSelect from '../../components/ui/SingleSelect'
import { ToastContainer, toast } from "react-toastify";

const schema = yup.object().shape({
    first_name: yup.string().required("First Name is required"),
    last_name: yup.string().required("Last Name is required"),
    email: yup.string().required("Invalid email format").email("Email is required"),
    mobile: yup.string().matches(/^[0-9]{10}$/, "Mobile number must be 10 digits").required("Mobile number is required"),
    // role: yup.string().required("Role is required"),
    salary: yup.number().positive().integer().required("Salary is required"),
    password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    department: yup.string().required("Department is required"),
    office_no: yup.string().required("Office No is required"),
    details: yup.string().required("Details are required"),
    country: yup.string().required("Country is required"),
    city: yup.string().required("City is required"),
    postal_code: yup.string().matches(/^[0-9]{6}$/, "Postal Code must be 6 digits").required("Postal Code is required"),
    address: yup.string().required("Address is Required"),
});

const EditStaff = () => {
  const { id } = useParams(); // Get staff ID from URL
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const { 
    register,
    handleSubmit, 
    setValue , 
    formState: { errors },} = useForm();

    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [staffData, setStaffData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        mobile: '',
        role: '',
        salary: '',
        password: '',
        department: '',
        office_no: '',
        details: '',
        country: '',
        city: '',
        postal_code: '',
        address: '',
        staff_image: '',
        delete_status: ''
      });


  useEffect(() => {
    if (!token) {
      toast.error("Authentication failed! Please log in.");
      navigate("/login");
      return;
    }

    // Fetch staff details
    axios
      .get(`/api/get-staff-details/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const staff = response.data;
        setStaffData(staff);
        Object.keys(staff).forEach((key) => setValue(key, staff[key]));
        setSelectedDepartment(staff.department);
      })
      .catch(() => {
        toast.error("Failed to load staff details.");
      });
  }, [id, navigate, token, setValue]);

  // Handle input changes

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStaffData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setValue(name, value);
    if (name === "department") {
        setSelectedDepartment(value);
      }
  };

  // Submit the updated data
  const onSubmit = async (data) => {
    try {
        console.log(data);
      await axios.put(`/api/staff-update/${id}`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Staff updated successfully!");
      setTimeout(() => {
        navigate("/staff_management/staff_list");
      },3000);
    } catch (error) {
      toast.error("Failed to update staff!");
    }
  };

  return (
    <div>
    <ToastContainer position="top-right" autoClose={2000} />
    <div className="page-header d-flex justify-content-between mb-4">
        <div>
            <ul className="breadcrumbs mb-3" style={{ paddingLeft: '0px' }}>
                <li className="nav-home">
                    <a href="#"><i className="icon-home"></i></a>
                </li>
                <li className="separator"><i className="icon-arrow-right"></i></li>
                <li className="nav-item"><a href="#">Staff  Management</a></li>
                <li className="separator"><i className="icon-arrow-right"></i></li>
                <li className="nav-item"><a href="#"></a></li>
            </ul>
        </div>
    </div>

    <div className="row justify-content-center my-5 py-5">
        <div className="col-md-10">
            <div className="card shadow-lg border-0 rounded-lg">
                <div className="card-header bg-primary text-white text-center py-3">
                    <h3>Create Staff </h3>
                </div>
                <div className="card-body p-5">
                    <form onSubmit={handleSubmit(onSubmit)} >

                        <div className="row my-0">

                            <div className="col-md-4">
                                <InputBox
                                    {...register('first_name')}
                                    label="Staff First Name"
                                    type="text"
                                    placeholder="Staff First Name"
                                    value={staffData.first_name}
                                    onChange={handleChange}
                                />
                                {errors.first_name && <p className="text-danger">{errors.first_name.message}</p>}
                            </div>
                            <div className="col-md-4">
                                <InputBox
                                    {...register('last_name')}
                                    label="Staff Last Name"
                                    type="text"
                                    placeholder="Staff Last Name"
                                    value={staffData.last_name}
                                    onChange={handleChange}
                                />
                                {errors.last_name && <p className="text-danger">{errors.last_name.message}</p>}
                            </div>
                            <div className="col-md-4">
                                <SingleSelect
                                    label="Department"
                                    options={[
                                        { value: "Sales", label: "Sales" },
                                        { value: "Accounts", label: "Accounts" },
                                        { value: "Procurement", label: "Procurement" },
                                    ]}
                                    selectedValue={selectedDepartment}  // ✅ Corrected
                                    // setSelectedValue={setSelectedDepartment}  // ✅ Corrected
                                    setSelectedValue={(value) => {
                                        setSelectedDepartment(value);
                                        setValue("department", value);
                                    }}
                                />

                                {errors.department && <p className="text-danger">{errors.department.message}</p>}
                            </div>

                        </div>


                        <div className="row my-5">

                        <div className="col-md-6">
                                <InputBox
                                    {...register('salary')}
                                    label="Salary"
                                    type="number"
                                    placeholder="Enter Salary"
                                    value={staffData.salary}
                                    onChange={handleChange}
                                />
                                {errors.salary && <p className="text-danger">{errors.salary.message}</p>}
                            </div>

                            <div className="col-md-6">
                                <InputBox
                                    {...register('password')}
                                    label="Password"
                                    type="text"
                                    placeholder="Enter Password"
                                    value={staffData.password}
                                    onChange={handleChange}
                                />
                                {errors.password && <p className="text-danger">{errors.password.message}</p>}
                            </div>
                        </div>


                        <div className="row my-5">

                            <div className="col-md-6">
                                <InputBox
                                    {...register('mobile')}
                                    label="Mobile"
                                    type="number"
                                    placeholder="Enter Mobile Number"
                                    value={staffData.mobile}
                                    onChange={handleChange}
                                />
                                {errors.mobile && <p className="text-danger">{errors.mobile.message}</p>}
                            </div>



                            <div className="col-md-6">
                                <InputBox
                                    {...register('email')}
                                    label=" Email"
                                    type="email"
                                    placeholder="Enter Staff Email"
                                    value={staffData.email}
                                    onChange={handleChange}
                                />
                                {errors.email && <p className="text-danger">{errors.email.message}</p>}
                            </div>

                        </div>

                        {/* Contact Numbers */}

                        <h4>More Information</h4>
                        {/* Branch Image */}
                        <div className="row my-5">

                            <div className="col-md-6">
                                <InputBox
                                    {...register('office_no')}
                                    label="Office No*"
                                    type="text"
                                    placeholder="Enter Office No*"
                                    value={staffData.office_no}
                                    onChange={handleChange}
                                />
                                {errors.office_no && <p className="text-danger">{errors.office_no.message}</p>}
                            </div>


                            <div className="col-md-6">
                                <InputBox
                                    {...register('details')}
                                    label="Details"
                                    type="text"
                                    placeholder="Enter Details"
                                    value={staffData.details}
                                    onChange={handleChange}
                                />
                                {errors.details && <p className="text-danger">{errors.details.message}</p>}
                            </div>
                        </div>

                        <h4>Staff Address</h4>
                        <div className="row my-5">

                            <div className="col-md-4">
                                <InputBox
                                    {...register('country')}
                                    label="Country "
                                    type="text"
                                    placeholder="Enter Country"
                                    value={staffData.country}
                                    onChange={handleChange}
                                />
                                {errors.country && <p className="text-danger">{errors.country.message}</p>}
                            </div>
                            <div className="col-md-4">
                                <InputBox
                                    {...register('city')}
                                    label="City"
                                    type="text"
                                    placeholder="Enter City"
                                    value={staffData.city}
                                    onChange={handleChange}
                                />
                                {errors.city && <p className="text-danger">{errors.city.message}</p>}
                            </div>
                            <div className="col-md-4">
                                <InputBox
                                    {...register('postal_code')}
                                    label="Postal Code"
                                    type="text"
                                    placeholder="Enter Postal Code"
                                    value={staffData.postal_code}
                                    onChange={handleChange}
                                />
                                {errors.postal_code && <p className="text-danger">{errors.postal_code.message}</p>}
                            </div>
                        </div>
                        
                        <div className="row">
                            <div className="col-md-12">
                                <InputBox
                                    {...register('address')}
                                    label="Address"
                                    type="text"
                                    placeholder="Enter Address"
                                    value={staffData.address}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        {/* Submit Button */}
                        <div className="d-flex justify-content-center my-4">
                            <ButtonComponent color="primary" label="Submit Staff Details" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
  );
};

export default EditStaff;

