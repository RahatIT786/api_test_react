import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import InputBox from '../../components/ui/InputBox';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { ToastContainer, toast } from "react-toastify";
import SingleSelect from '../../components/ui/SingleSelect';
import ButtonComponent from '../../components/ui/Button';

const schema = yup.object().shape({
  name: yup.string().required("Product Name is Required").max(40, "Product Name must be below 40 characters"),
  category: yup.string().required("Product Category is Required"),
  price: yup.string().required("Price is Required"),
  stock: yup.string().required("Stock is Required"),
  description: yup.string().required("Description is Required"),
  // product_image: yup.mixed().test("FileSize", "File size must be less than 2MB", (value) => {
  //   return !value || (value && value[0]?.size <= 2 * 1024 * 1024);
  // }),
});

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    stock: '',
    product_image: '',
  });

  useEffect(() => {
    if (!token) {
      toast.error("Authentication failed! Please log in.");
      navigate("/login");
      return;
    }
  
    axios.get("/api/product-category", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      setCategories(res.data.product_category || []); // Correct extraction
    })
    .catch(() => toast.error("Failed to load categories."));
  
    axios.get(`/api/product/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      const product = res.data;
      console.log(product);
      
      setProductData(product);
      setSelectedCategory(product.category);
      Object.entries(product).forEach(([key, value]) => {
        setValue(key, value);
      });
    })
    .catch(() => {
      toast.error("Failed to load product details.");
    });
  }, [id, navigate, token, setValue]);
  
  
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setValue(name, value);
  };

  // const onFileChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setSelectedFile(file);
  //     setPreview(URL.createObjectURL(file));
  //   }
  // };

  const onFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProductData({ ...productData, product_image: file });
      setPreview(URL.createObjectURL(file));
    }
  };
  
  

  const onSubmit = async (data) => {
    console.log("data =>", data);
    
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("category", selectedCategory);
      formData.append("price", data.price);
      formData.append("stock", data.stock);
      formData.append("description", data.description);
  
      if (selectedFile) {
        formData.append("product_image", selectedFile);
      }
  
      // To verify what's inside FormData:
      for (const [key, value] of formData.entries()) {
        console.log(key, value);
      }

      Object.entries(data).forEach(([key, value]) => {
        if (key === 'product_image') {
          if (productData.product_image instanceof File) {
            formData.append("product_image", productData.product_image);
          }
        } else {
          formData.append(key, value);
        }
      });

      await axios.post(`/api/products/${id}?_method=PUT`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
  
      toast.success("Product updated successfully!");
      setTimeout(() => {
        navigate("/products");
      }, 2000);
    } catch (error) {
      toast.error("Failed to update product!");
      console.error(error);
    }
  };
  
  return (
    <div>
      <ToastContainer position="top-right" autoClose={2000} />
      <div className="page-header d-flex justify-content-between mb-4">
        <ul className="breadcrumbs mb-3" style={{ paddingLeft: '0px' }}>
          <li className="nav-home"><a href="#"><i className="icon-home"></i></a></li>
          <li className="separator"><i className="icon-arrow-right"></i></li>
          <li className="nav-item"><a href="#">Product Management</a></li>
        </ul>
      </div>

      <div className="row justify-content-center my-5 py-5">
        <div className="col-md-8">
          <div className="card shadow-lg border-0 rounded-lg">
            <div className="card-header bg-primary text-white text-center py-3">
              <h3>Edit Product</h3>
            </div>
            <div className="card-body p-5">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row my-3">
                  <div className="col-md-6 mt-2">
                    <InputBox
                      {...register("name")}
                      label="Product Name"
                      type="text"
                      name="name"
                      value={productData.name}
                      placeholder="Enter Product Name"
                      onChange={handleChange}
                    />
                    {errors.name && <p className="text-danger">{errors.name.message}</p>}
                  </div>
                  <div className="col-md-6 mt-2">

                    <SingleSelect
                      label="Product Category"
                      options={
                        Array.isArray(categories)
                          ? categories.map((category) => ({
                              value: category.category_name,
                              label: category.category_name,
                            }))
                          : []
                      }
                      selectedValue={selectedCategory}
                      setSelectedValue={(value) => {
                        setSelectedCategory(value);
                        setValue("category", value);
                      }}
                    />

                    {errors.category && <p className="text-danger">{errors.category.message}</p>}
                  </div>
                </div>

                <div className="row my-3">
                  <div className="col-md-6 mt-2">
                    <InputBox
                      {...register("price")}
                      label="Price"
                      type="number"
                      name="price"
                      placeholder="Enter Price"
                      value={productData.price}
                      onChange={handleChange}
                    />
                    {errors.price && <p className="text-danger">{errors.price.message}</p>}
                  </div>
                  <div className="col-md-6 mt-2">
                    <InputBox
                      {...register("stock")}
                      label="Stock"
                      type="text"
                      name="stock"
                      placeholder="Enter Stock"
                      value={productData.stock}
                      onChange={handleChange}
                    />
                    {errors.stock && <p className="text-danger">{errors.stock.message}</p>}
                  </div>
                </div>

                <div className="row my-3">
                  <div className="col-md-6 mt-2">
                    <InputBox
                      {...register("description")}
                      label="Description"
                      type="text"
                      name="description"
                      placeholder="Enter Description"
                      value={productData.description}
                      onChange={handleChange}
                    />
                    {errors.description && <p className="text-danger">{errors.description.message}</p>}
                  </div>
                  <div className="col-md-6 mt-2">
                    <label>Product Image</label>
                    <input
                      {...register("product_image")}
                      onChange={onFileChange}
                      type="file"
                      name="product_image"
                      className="form-control"
                      accept="image/*"
                    />
                    {errors.product_image && <p className="text-danger">{errors.product_image.message}</p>}


                    {preview ? (
                   
                      <div className="mt-2">
                        <p>Preview:</p>
                        <img
                          src={preview}
                          alt="Preview"
                          style={{ width: "200px", height: "100px", objectFit: "cover" }}
                        />
                      </div>
                    ) : productData.product_image ? (
                     
                      <div className="mt-2">
                        <p>Current Image:</p>
                        <img
                          src={`http://127.0.0.1:8000${productData.product_image}`}
                          alt="Current"
                          style={{ width: "200px", height: "100px", objectFit: "cover" }}
                        />
                      </div>
                    ) : null}

                  </div>
                </div>

                <div className="d-flex justify-content-end">
                  <ButtonComponent
                    color="primary"
                    label="Update Product"
                    type="submit"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
