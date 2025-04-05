import React from 'react'

const EditBtn = ({onClick}) => {
   {/*
        📌 this BUTTON bundle with below mentioned class
        📌class="form-button-action"
        📌Example :  <div class="form-button-action"> 
                        {your button here 🅱}
                    </div>
        
        */}

  return (
    <button
    type="button"
    data-bs-toggle="tooltip"
    title=""
    className="btn btn-link btn-primary btn-lg"
    data-original-title="Edit Task"
    onClick={onClick}
  >
    <i className="fa fa-edit"></i>
  </button>
  )
}

export default EditBtn