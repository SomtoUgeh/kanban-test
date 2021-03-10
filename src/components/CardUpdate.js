import React, { useState } from "react";

export const CardUpdate = props => {
  const { taskText, handleEditUpdate } = props;
  const [value, setValue] = useState(taskText ?? "");

  const handleBlur = () => handleEditUpdate(value.trim());

  const handleKeyup = e => {
    const { keyCode } = e;
    const target = e.target;

    if (keyCode === 13) handleEditUpdate(value.trim());
    else if (keyCode === 27) handleEditUpdate(taskText);
    else setValue(target.value);
  };

  return (
    <input
      autoFocus
      type="text"
      className="edit"
      onBlur={handleBlur}
      defaultValue={value}
      onKeyUp={handleKeyup}
    />
  );
};
