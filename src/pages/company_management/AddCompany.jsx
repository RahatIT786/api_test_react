import React, { useState, useEffect } from "react";
import InputBox from "../../components/ui/InputBox";
import { ToastContainer,toast } from "react-toastify";
// import DatePickerInput from "../../components/ui/DatePickerInput";
import ButtonComponent from "../../components/ui/Button";
import { useNavigate } from "react-router-dom";
import SingleSelect from "../../components/ui/SingleSelect";

import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// import FileUpload from "../../components/ui/FileUpload";
import axios from "axios";

// --☑✅---SCHEMA-FORM-VALIDATION-START-------------------------------
const schema=yup.object().shape({
    product_name: yup.string().required("Product Name is Required").max(40,"Product Name must below 40 character "),
    product_category: yup.string().required("Product Category is Required"),
    price: yup.string().required("Price is Required"),
    stock: yup.string().required("Stock is required"),
    discription: yup.string().required("Discription is Required"),
    product_image: yup.mixed().test("FileSize","File size must be less than 2MB",(value)=>{
        return !value || (value && value[0] ?.size <=2 *1024 *1024);
    }),
});
// ---✅---SCHEMA-FORM-VALIDATION-END--------------------------------



const AddCompany = () => {
   

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [categoryError, setCategoryError] = useState(null);
    
       
    useEffect(() => {
          fetchCategory();
    }, []);

    const fetchCategory = async () => {
      const token = sessionStorage.getItem("token");
      setLoadingCategories(true);
      try {
        const response = await axios.get("/api/product-category", {
          headers: {
            Authorization: `Bearer ${token}`,
           "Content-Type": "multipart/form-data",
          },
        });
    
        const categoryList = response.data.product_category;
    
        if (Array.isArray(categoryList)) {
          setCategories(categoryList);
          console.log("Fetched Categories:", categoryList);
        } else {
          setCategoryError("Invalid category data format");
          setCategories([]);
        }
    
      } catch (error) {
        console.error("Error Fetching Categories:", error);
        setCategoryError("Failed to load categories");
        setCategories([]);
      } finally {
        setLoadingCategories(false);
      }
    };
    
        const {
            register,
            handleSubmit,
            setValue,
            reset,
            formState: { errors },
        } = useForm({
            resolver: yupResolver(schema),
            mode: "onChange"
        });
    
     const [file,setFile]=useState(null);
     const[preview,setPreview]=useState(null);

      // Handle file change and generate preview
      const onFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
          
            setPreview(URL.createObjectURL(selectedFile));
        }
    };


    const navigate=useNavigate();

    const onSubmit = async(data) => {
        // e.preventDefault();
        console.log(data); 

        try {
            
          const formData = new FormData();
          formData.append("name", data.product_name);
          formData.append("category", data.product_category);
          formData.append("price", data.price);
          formData.append("stock", data.stock);
          formData.append("description", data.discription);
          // formData.append("product_image", data.product_image);

          // Ensure file is appended correctly
          if (data.product_image[0]) {
              formData.append("product_image", data.product_image[0]); // `product_image[0]` gets the first selected file
          }

          console.log([...formData.entries()]); // Debugging - See what's inside FormData


            const token = sessionStorage.getItem("token"); // Retrieve JWT token
    
            if (!token) {
                toast.error("Authentication failed! Please log in.", { position: "top-right" });
                return;
            }
    
            // Make API request to submit form data
            const response = await axios.post(
                "api/product",  // Update with your API endpoint
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Send JWT token
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            toast.success("Company Details Added Successfully..!",{   position: "top-right", // Customize position if needed
            });
            setTimeout(() => {
                navigate("/company");
              },3000);

        }catch (error) {
            console.error("Submission error:", error);
    
            // Show error notification
            toast.error("Failed to add company details. Please try again.", { position: "top-right" });
        }
        
      
    };
    
     

    return (
      <div className="container py-1">
        <ToastContainer position="top-right" autoClose={2000} />
        <div className="page-inner">
          <div className="page-header d-flex justify-content-between mb-4">
            {/* Add header content here */}
          </div>

          <div className="row justify-content-center my-5 py-5">
            <div className="col-md-8">
              <div className="card shadow-lg border-0 rounded-lg">
                <div className="card-header bg-primary text-white text-center py-3">
                  <h3>Product Details</h3>
                </div>
                <div className="card-body p-5">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Company Name and Display Name */}
                    <div className="row my-3">
                      <div className="col-md-6 mt-2">
                        <InputBox
                          {...register("product_name")}
                          label="Product Name"
                          type="text"
                          name="product_name"
                          placeholder="Enter Product Name"
                        />
                        {errors.product_name && (
                          <p className="text-danger">
                            {errors.product_name.message}
                          </p>
                        )}
                      </div>
                      <div className="col-md-6 mt-2">
                      <SingleSelect
                          label="Product Category"
                          options={categories.map(category => ({
                            value: category.category_name,  
                            label: category.category_name, 
                        }))}
                        selectedValue={selectedCategory}
                        setSelectedValue={(value) => {
                            setSelectedCategory(value);
                            setValue("product_category", value);
                        }}
                        />
                        {errors.product_category && (
                          <p className="text-danger">
                            {errors.product_category.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Contact Person and Mobile Number */}
                    <div className="row my-3">
                      <div className="col-md-6 mt-2">
                        <InputBox
                          {...register("price")}
                          label="Price"
                          type="number"
                          name="price"
                          placeholder="Enter price"
                        />
                        {errors.price && (
                          <p className="text-danger">
                            {errors.price.message}
                          </p>
                        )}
                      </div>
                      <div className="col-md-6 mt-2">
                        <InputBox
                          {...register("stock")}
                          label="Total Stock"
                          type="text"
                          name="stock"
                          placeholder="Enter Total Stock"
                        />
                        {errors.stock && (
                          <p className="text-danger">
                            {errors.stock.message}
                          </p>
                        )}

                        <div className="invalid-feedback">
                          {errors.stock?.message}
                        </div>
                      </div>
                    </div>

                    {/* Company Logo */}
                    <div className="row my-3">
                      <div className="col-md-6 mt-4">
                        <InputBox
                          {...register("discription")}
                          label="Discription"
                          type="text"
                          name="discription"
                          placeholder="Enter Discription"
                        />
                        {errors.discription && (
                          <p className="text-danger">
                            {errors.discription.message}
                          </p>
                        )}

                        <div className="invalid-feedback">
                          {errors.discription?.message}
                        </div>
                      </div>
                      <div className="col-md-6 mt-2">
                        <label>Company Logo</label>
                      <div>
                      {/* <FileUpload onChange={onFileChange}/> */}
                      </div>
                        <input
                          {...register("product_image")}
                          onChange={(e) => {
                            onFileChange(e);
                          }}
                          type="file"
                          name="product_image"
                          className="form-control"
                          accept="image/*"
                           
                        />
                        {errors.product_image && (
                          <p className="text-danger">
                            {errors.product_image.message}
                          </p>
                        )}
                        <div>
                          {/* Show Preview */}
                          {preview && (
                            <div>
                              <p>Preview:</p>
                              <img
                                src={preview}
                                alt="Company Logo Preview"
                                style={{
                                  width: "200px",
                                  height: "100px",
                                  objectFit: "cover",
                                }}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="d-flex justify-content-end">
                      <ButtonComponent
                        color="primary"
                        label="SAVE COMPANY DETAILS"
                        type="submit"
                      />
                      {/* <button type="submit">submit</button> */}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default AddCompany;
