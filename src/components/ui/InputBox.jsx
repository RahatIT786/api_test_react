import React from 'react'; // Import React and useState only once
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

// DynamicInputField component definition
const DynamicInputField = React.forwardRef(
({
  type = 'text',             
  placeholder = '',         
  value,                    
  onChange,
               
  id,                       
  name,                     
  className = '',           
  label = 'Input Field', 
  ...rest
},ref) => {
  return (
    <TextField
      type={type}              
      placeholder={placeholder} 
      value={value}            
      onChange={onChange}      
      id={id}                  
      name={name}              
      className={className}    
      label={label}            
      variant="outlined"       
      fullWidth 
      inputRef={ref}
      {...rest}
      
     
    />
  );
}
);

// InputBox component definition
const InputBox = ({ type = 'text', placeholder = '', value, onChange, id, name, className, label = 'Input Field',ref,props }) => {
  return (
    <DynamicInputField
      type={type}             
      placeholder={placeholder} 
      value={value}           
      onChange={onChange}     
      id={id}                 
      name={name}             
      className={className}   
      label={label}  
      ref={ref}
      {...props}
      
     
    />
  );
};

export default InputBox;

