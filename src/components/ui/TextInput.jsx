import * as React from "react";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { styled } from "@mui/system";

const StyledTextarea = styled(TextareaAutosize)(({ theme }) => ({
  width: "100%",
  minHeight: "50px",
  padding: "10px",
  fontSize: "16px",
  border: "2px solid gray", // Black border
  borderRadius: "5px", // Rounded corners
  outline: "none",
  "&:focus": {
    borderColor: "gray", // Ensure focus border is also black
    boxShadow: "0 0 5px rgba(236, 231, 231, 0.2)", // Light shadow effect on focus
  },
}));

export default function TextInput({
  placeholder = "Enter text...", // Default placeholder
  value,
  onChange,
  id,
  name,
  className,
  maxRows = 4, // Default to 4 rows if not provided
}) {
  return (
    <StyledTextarea
      maxRows={maxRows}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      id={id}
      name={name}
      className={className}
      aria-label="custom-textarea"
    />
  );
}
