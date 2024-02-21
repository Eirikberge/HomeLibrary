import React from 'react';

function Checkbox({ label, isRead, onChange }) {
  const handleCheckboxChange = () => {
    onChange(!isRead);
  };

  return (
    <span>
      <label>
        <input
          type="checkbox"
          checked={isRead}
          onChange={handleCheckboxChange}
        />
        {label}
      </label>
    </span>
  );
}

export default Checkbox;