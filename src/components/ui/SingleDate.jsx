import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextField } from '@mui/material';
import { useState } from 'react';

export default function SingleDate() {
  // State to manage the selected date
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date); // Update state with the selected date
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DatePicker
          label="Select Date" // Custom label
          value={selectedDate} // Controlled value
          onChange={handleDateChange} // Handle date change
          renderInput={(params) => <TextField {...params} fullWidth />} // Customize the input field
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
