import React from "react";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

const DynamicCheckbox = ({
  label = "Checkbox demo", // Dynamic Label
  defaultChecked = false, // Default Checked State
  color = "primary", // MUI Color (primary, secondary, default, etc.)
  customColor = "", // Custom Color (Overrides MUI Color)
  value = "", // Checkbox Value
  onChange, // Event Handler for Checkbox Change
  ...props
}) => {
  return (
    <FormControlLabel
      control={
        <Checkbox
          {...props}
          defaultChecked={defaultChecked}
          color={color}
          value={value} // Pass value to the checkbox
          onChange={onChange}
          sx={{
            color: customColor || undefined, // Use custom color if provided
            "&.Mui-checked": {
              color: customColor || undefined,
            },
          }}
        />
      }
      label={label}
    />
  );
};

export default DynamicCheckbox;
