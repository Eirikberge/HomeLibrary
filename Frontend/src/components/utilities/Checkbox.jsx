import React, { useState } from 'react';

function Checkbox({ label, isRead }) {
  const [isChecked, setChecked] = useState(false);

  const handleCheckboxChange = () => {
    setChecked(!isChecked);
  };

  return (
    <span>
      <label>
        <input
          type="checkbox"
          checked={isRead ? !isChecked : isChecked}
          onChange={handleCheckboxChange}
        />
        {label}
      </label>
    </span>
  );
}

export default Checkbox;