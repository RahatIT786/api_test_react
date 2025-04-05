import * as React from 'react';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function DatePickerInput({label="Date",onChange, name,value}) {
  const [localValue, setLocalValue] = React.useState(React.useState(dayjs(value) || dayjs()));
  // const [value, setValue] = React.useState(dayjs());

  const handleOnchange = (newValue) => {
    setLocalValue(newValue);
   if(onChange){
    onChange({target:{name, value:newValue.format('YYYY-MM-DD')}});
   };
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker', 'DatePicker']}>
       
        <DatePicker
          label={label}
          value={value}
          // onChange={(newValue) => setValue(newValue)}
          onChange={handleOnchange}
          name={name}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
