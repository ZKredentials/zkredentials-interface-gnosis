import Image from "next/image";
import { BlankCardContainer, BlankCardIcon, BlankCardSection } from "./style";
import { FC, SetStateAction } from "react";
import PlusIcon from "@/assets/icons/PlusIcon.svg";

interface IProps {
  handleClick: () => void;
}

const BlankCard: FC<IProps> = ({ handleClick }) => {
  return (
    <BlankCardContainer onClick={handleClick}>
      <BlankCardSection>
        <BlankCardIcon>
          <Image src={PlusIcon} alt="Visa" fill />
        </BlankCardIcon>
      </BlankCardSection>
    </BlankCardContainer>
  );
};

export default BlankCard;
