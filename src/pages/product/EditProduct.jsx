import React,{useEffect, useState} from 'react'
import { useParams } from "react-router-dom";
import axios from "axios";

const EditProduct = () => {
    const { id } = useParams();

    const [categories, setCategories] = useState([]);
    const [loadingCategories, setLoadingCategories] = useState(true);
    const [categoryError, setCategoryError] = useState(null);
    const [file,setFile] = useState(null);
    const [preview,setPreview] = useState(null);

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
          const token = sessionStorage.getItem("token");
    
          try {
            const response = await axios.get(`/api/product/${id}`, {
              headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
              },
            });
    
            console.log("Fetched product:", response.data);
            setProduct(response.data);
          } catch (error) {
            console.error("Error fetching product:", error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchProduct();
      }, [id]);

    return (
        <div>
            
        </div>
    )
}

export default EditProduct
