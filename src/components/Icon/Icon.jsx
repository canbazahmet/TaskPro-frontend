import { memo } from "react";
import Icons from "../../../src/images/icons.svg";

const Icon = ({ name, ...props }) => {
  return (
    <svg {...props}>
      <use href={`${Icons}#${name}`}></use>
    </svg>
  );
};

export default memo(Icon);
