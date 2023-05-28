import Image from "next/image";
import {
  CreditCardContainer,
  CreditCardIcon,
  CreditCardSection,
  CreditCardText,
} from "./style";
import VisaIcon from "@/assets/icons/VisaIcon.svg";
import MastercardIcon from "@/assets/icons/MastercardIcon.svg";
import { CardNetworkType } from "@/utils/type";
import { FC } from "react";
import { CreditCardActiveBlink } from "../RegisteredCards/style";

interface IProps {
  network: CardNetworkType;
  last4: string;
  expMonth: number;
  expYear: number;
  active?: boolean;
}

const CreditCard: FC<IProps> = ({
  network = CardNetworkType.VISA,
  last4 = "0000",
  expMonth = 1,
  expYear = 25,
  active = false,
}) => {
  return (
    <CreditCardContainer>
      {active && <CreditCardActiveBlink />}
      <CreditCardSection>
        <CreditCardIcon>
          <Image
            src={network === CardNetworkType.VISA ? VisaIcon : MastercardIcon}
            alt="Network Logo"
            fill
          />
        </CreditCardIcon>
      </CreditCardSection>
      <CreditCardSection>
        <CreditCardText>**** {last4}</CreditCardText>
        <CreditCardText>
          {expMonth}/{expYear}
        </CreditCardText>
      </CreditCardSection>
    </CreditCardContainer>
  );
};

export default CreditCard;
