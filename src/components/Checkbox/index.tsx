import { FC } from "react";
import { CheckboxLabel, CheckboxInput, CheckboxContainer } from "./style";

interface IProps {
  label: string;
  value: boolean;
  handleChange: any;
}

const Checkbox: FC<IProps> = ({ label, value, handleChange }) => {
  return (
    <CheckboxContainer>
      <CheckboxLabel>
        <CheckboxInput
          type="checkbox"
          checked={value}
          onChange={handleChange}
        />
        {label}
      </CheckboxLabel>
    </CheckboxContainer>
  );
};

export default Checkbox;
