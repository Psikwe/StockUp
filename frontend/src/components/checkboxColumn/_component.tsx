import React from "react";

interface Props {}

const CheckboxColumn = (props: any) => {
  return (
    <td>
      <input
        type="checkbox"
        checked={props.dataItem[props.field]}
        disabled={true}
      />
    </td>
  );
};

export default CheckboxColumn;
