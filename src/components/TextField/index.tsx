import { FC, useState } from "react";
import {
  TextFieldAreaContainer,
  TextFieldAreaInput,
  TextFieldContainer,
  TextFieldInput,
  TextFieldLabel,
} from "./style";

interface IProps {
  label: string;
  value?: string;
  type: string;
  handleChange: (text: string) => void;
}

const TextField: FC<IProps> = ({ label, type, value, handleChange }) => {
  const [text, setText] = useState<string>(value || "");
  const [focus, setFocus] = useState<boolean>(false);

  const handleChangeText = (e: string) => {
    handleChange(e);
    setText(e);
  };

  if (type === "textarea") {
    return (
      <TextFieldAreaContainer>
        <TextFieldAreaInput
          value={text}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          onChange={(e) => handleChangeText(e.target.value)}
        ></TextFieldAreaInput>
        <TextFieldLabel isText={text.length > 0} isFocus={focus}>
          {label}
        </TextFieldLabel>
      </TextFieldAreaContainer>
    );
  }
  return (
    <TextFieldContainer>
      <TextFieldInput
        type={type}
        value={text}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        onChange={(e) => handleChangeText(e.target.value)}
      ></TextFieldInput>
      <TextFieldLabel isText={text.length > 0} isFocus={focus}>
        {label}
      </TextFieldLabel>
    </TextFieldContainer>
  );
};

export default TextField;
