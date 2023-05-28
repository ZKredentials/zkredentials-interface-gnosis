import { SubscriptionTier } from "@prisma/client";
import {
  TierPlanCardContainer,
  TierPlanCardDescription,
  TierPlanCardDivider,
  TierPlanCardTitle,
} from "./style";
import { FC } from "react";

interface IProps {
  tier: SubscriptionTier;
  description: string[];
  price: number;
  selected: boolean;
  handleSelect: (plan: SubscriptionTier) => void;
}

const TierPlanCard: FC<IProps> = ({
  tier,
  description,
  price,
  selected,
  handleSelect,
}) => {
  return (
    <TierPlanCardContainer
      selected={selected}
      onClick={() => handleSelect(tier)}
    >
      <TierPlanCardTitle>{tier}</TierPlanCardTitle>
      <TierPlanCardDivider />
      <TierPlanCardDescription>
        {description.map((desc) => (
          <li key={desc}>{desc}</li>
        ))}
      </TierPlanCardDescription>
      <TierPlanCardDivider />
      <TierPlanCardTitle>{price} USD/month</TierPlanCardTitle>
    </TierPlanCardContainer>
  );
};

export default TierPlanCard;
