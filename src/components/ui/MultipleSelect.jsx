import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 0;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, selectedValues, theme) {
  return {
    fontWeight: selectedValues.includes(name)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

export default function MultipleSelect({ label, options, selectedValues, setSelectedValues }) {
  const theme = useTheme();

  const handleChange = (event) => {
    const { value } = event.target;
    setSelectedValues(typeof value === 'string' ? value.split(',') : value);
  };

  return (
    <div>
      <FormControl sx={{ m: 0, width: 300 }}>
        <InputLabel id="dynamic-multiple-select-label">{label}</InputLabel>
        <Select
          labelId="dynamic-multiple-select-label"
          multiple
          value={selectedValues}
          onChange={handleChange}
          input={<OutlinedInput label={label} />}
          MenuProps={MenuProps}
        >
          {options.map((option) => (
            <MenuItem key={option} value={option} style={getStyles(option, selectedValues, theme)}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
