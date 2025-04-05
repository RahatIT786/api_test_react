
import React, { useState } from 'react'

import TwoFieldForm from '../../components/ui/form/TwoFieldForm';
import TestForm from '../TestForm';
// import PackageList from './PackageList.jsx';
const Role = () => {

  










  return (
    <div>
        <TwoFieldForm
        title='Staff Role Table'
        apiUrl='/api/createrole'
        inputProps={{
            placeholder:'Enter Role '
            
        }}
      />

      {/* <TestForm/> */}

    </div>
  );
}

export default Role