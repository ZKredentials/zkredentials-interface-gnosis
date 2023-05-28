import Image from "next/image";
import { ExpandableButtonContainer, ExpandableButtonContent } from "./style";
import ChervonIcon from "@/assets/icons/ChervonIcon.svg";
import { FC } from "react";

interface IProps {
  expand: boolean;
}

const ExpandableButton: FC<IProps> = ({ expand }) => {
  return (
    <ExpandableButtonContainer>
      <ExpandableButtonContent expand={expand}>
        <Image src={ChervonIcon} alt="SideNavigation Expansion Button" fill />
      </ExpandableButtonContent>
    </ExpandableButtonContainer>
  );
};

export default ExpandableButton;
