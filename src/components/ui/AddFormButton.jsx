import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom'; // Import Link for navigation

export default function AddFormButton({ buttonName, buttonColor, buttonIcon, link }) {
  return (
    <Stack direction="row" spacing={2}>
      {/* Conditional rendering of the button with dynamic properties */}
      <Link to={link} style={{ textDecoration: 'none' }}>
        <Button 
          variant="contained" 
          startIcon={buttonIcon} 
          style={{ backgroundColor: buttonColor }}
        >
          {buttonName}
        </Button>
      </Link>
    </Stack>
  );
}

