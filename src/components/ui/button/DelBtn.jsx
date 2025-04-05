import { FiveKRounded } from '@mui/icons-material'
import React from 'react'

const DelBtn = ({onClick}) => {
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
    className="btn btn-link btn-danger"
    data-original-title="Remove"
    onClick={onClick}
  >
    <i className="fa fa-times"></i>
  </button>

  )
}

export default DelBtn