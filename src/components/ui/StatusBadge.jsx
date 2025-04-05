import axios from "axios";
import { useState } from "react";

const StatusBadge = ({ status, onChangeStatus}) => {
  const [isOpen, setIsOpen] = useState(false);

  const getStatusText = (status) => {
    switch (status) {
      case 1:
        return { text: "Pending", class: "badge bg-warning text-dark" };
      case 2:
        return { text: "Confirmed", class: "badge bg-success" };
      case 3:
        return { text: "Cancelled", class: "badge bg-danger" };
      default:
        return { text: "Unknown", class: "badge bg-secondary" };
    }
  };

  const statusInfo = getStatusText(status);

  const handleStatusChange = async (newStatus) => {
    // console.log("New status: ", newStatus);
    onChangeStatus(newStatus);

    
      // Call parent to update status
    setIsOpen(false);           // Close dropdown after selection
  };

  return (
    <div className="position-relative d-inline-block">
      {/* Status Badge */}
      <span
        className={statusInfo.class}
        onClick={() => setIsOpen(!isOpen)}
        style={{ cursor: "pointer" }}
      >
        {statusInfo.text}
      </span>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="dropdown-menu show" style={{ position: "absolute" }}>
          {/* <button className="dropdown-item text-warning"  onClick={() => handleStatusChange(1)} >
            Pending
          </button> */}
          <button className="dropdown-item text-success" onClick={() => handleStatusChange(2)}>
            Confirmed
          </button>
          <button className="dropdown-item text-danger" onClick={() => handleStatusChange(3)}>
            Cancelled
          </button>
        </div>
      )}
    </div>
  );
};

export default StatusBadge;
