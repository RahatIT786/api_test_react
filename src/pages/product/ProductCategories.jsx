import React from "react";
import TwoFieldForm from "../../components/ui/form/TwoFieldForm";



const ProductCategories = () => {

  return (
    <div>
      <TwoFieldForm 
           apiUrl = "/api/product-category"
      />
    </div>
  )

}

export default ProductCategories
