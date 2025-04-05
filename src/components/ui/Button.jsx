import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const ColorButton = ({ color = 'primary', variant = 'contained', label = 'Button' ,  type = 'submit',onClick }) => {
  return (
    <Button color={color} variant={variant} type={type} onClick={onClick}>
      {label}
    </Button>
  );
};

export default function ButtonComponent({ color = 'primary', label = 'Click Me', variant = 'contained' ,onClick}) {
  return (
    <Stack direction="row" spacing={2}>
      <ColorButton color={color} variant={variant} label={label} onClick={onClick}/>
    </Stack>
  );
}
