import { useState } from "react";

export const ColumnLabel = props => {
  const { title, updateLabelValue } = props;
  const [value, setValue] = useState(title ?? "");

  const handleBlur = () => updateLabelValue(value.trim());

  const handleKeyup = e => {
    const { keyCode } = e;
    const target = e.target;

    if (keyCode === 13) updateLabelValue(value.trim());
    else if (keyCode === 27) updateLabelValue(title);
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
