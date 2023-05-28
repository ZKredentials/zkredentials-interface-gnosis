import { FC } from "react";
import { ActionButtonContainer, ActionButtonText } from "./style";

interface IProps {
  loading?: boolean;
  label: string;
  handleClick: () => void;
}

const ActionButton: FC<IProps> = ({ loading = false, label, handleClick }) => {
  if (loading) {
    return (
      <ActionButtonContainer disabled>
        <ActionButtonText>Loading</ActionButtonText>
      </ActionButtonContainer>
    );
  }

  return (
    <ActionButtonContainer onClick={handleClick}>
      <ActionButtonText>{label}</ActionButtonText>
    </ActionButtonContainer>
  );
};

export default ActionButton;
