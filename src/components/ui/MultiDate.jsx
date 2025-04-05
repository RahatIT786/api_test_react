import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers-pro/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { useState } from 'react';
import { TextField } from '@mui/material';

export default function MultiDate() {
  // State to manage the selected date range
  const [value, setValue] = useState([null, null]);

  // Handle change when a date is selected
  const handleDateChange = (newValue) => {
    setValue(newValue); // Update state with selected date range
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateRangePicker']}>
        <DateRangePicker
          startText="Check-in" // Custom label for the start date
          endText="Check-out" // Custom label for the end date
          value={value} // Controlled value for the date range
          onChange={handleDateChange} // Update state on date change
          renderInput={(startProps, endProps) => (
            <>
              <TextField {...startProps} fullWidth sx={{ marginBottom: '16px' }} /> {/* Start Date input */}
              <TextField {...endProps} fullWidth /> {/* End Date input */}
            </>
          )}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
