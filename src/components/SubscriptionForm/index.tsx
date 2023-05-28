import { CurrencyType, SubscriptionTier } from "@prisma/client";
import TierPlanCard from "../TierPlanCard";
import {
  SubscriptionFormContainer,
  SubscriptionFormContent,
  SubscriptionFormPaymentActionContainer,
  SubscriptionFormPaymentActionText,
  SubscriptionFormPaymentContainer,
  SubscriptionFormPaymentOption,
  SubscriptionFormPaymentOptions,
  SubscriptionFormPaymentSelector,
  SubscriptionFormPaymentSelectorContainer,
  SubscriptionFormTierOptions,
  SubscriptionFormTitle,
} from "./style";
import { FC, useState } from "react";
import ActionButton from "../ActionButton";
import {
  createPaymentIntent,
  getDepositAddressFromPaymentIntent,
  payWithCard,
} from "@/services/circle";
import { SubscriptionPlans } from "@/utils/subscriptionPlans";
import { initializeSubscription } from "@/services/internal";
import { useAccount } from "wagmi";

interface IProps {
  cardId: string;
  activeCardLast4: string;
  circleDepositAddress: string;
  fetchingInfo: boolean;
}

const SubscriptionForm: FC<IProps> = ({
  cardId,
  activeCardLast4,
  circleDepositAddress,
  fetchingInfo,
}) => {
  const { address } = useAccount();
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionTier>(
    SubscriptionTier.SILVER
  );
  const [selectedPaymentPlan, setSelectedPaymentPlan] = useState<CurrencyType>(
    CurrencyType.USD
  );
  const [paymentDepositAddresses, setPaymentDepositAddresses] = useState<{
    [SubscriptionTier.BRONZE]: string;
    [SubscriptionTier.SILVER]: string;
    [SubscriptionTier.GOLD]: string;
  }>({
    [SubscriptionTier.BRONZE]: "",
    [SubscriptionTier.SILVER]: "",
    [SubscriptionTier.GOLD]: "",
  });
  const [paying, setPaying] = useState<boolean>(false);

  const handleSelectPlan = (plan: SubscriptionTier) => {
    setSelectedPlan(plan);
  };

  const handleSelectPaymentPlan = (type: CurrencyType) => {
    setSelectedPaymentPlan(type);
  };

  const triggerUSDPayment = async () => {
    setPaying(true);
    console.log("Triggering USD Payment");
    const response = await payWithCard(
      SubscriptionPlans[selectedPlan].price,
      cardId
    );
    console.log("paid with card", response);
    await initializeSubscription(
      address as string,
      response.data,
      selectedPlan,
      selectedPaymentPlan
    );
    setPaying(false);
  };

  const triggerUSDCPayment = async () => {
    setPaying(true);
    console.log("Triggering USDC Payment");
    const paymentIntentId = await createPaymentIntent(
      SubscriptionPlans[selectedPlan].price
    );
    console.log("paymentIntentId", paymentIntentId.data);
    const depositAddr = await getDepositAddressFromPaymentIntent(
      paymentIntentId.data
    );
    console.log("depositAddr", depositAddr.data);
    setPaymentDepositAddresses({
      ...paymentDepositAddresses,
      [selectedPlan]: depositAddr.data,
    });
    await initializeSubscription(
      address as string,
      paymentIntentId.data,
      selectedPlan,
      selectedPaymentPlan
    );
    setPaying(false);
  };

  const getActionButtonLabel = () => {
    switch (selectedPaymentPlan) {
      case CurrencyType.USD:
        return "Subscribe";
      case CurrencyType.USDC:
        return "Get Payment Address";
      default:
        return "";
    }
  };

  return (
    <SubscriptionFormContainer>
      <SubscriptionFormTitle>Subscription Selection</SubscriptionFormTitle>
      <SubscriptionFormContent>
        <SubscriptionFormTierOptions>
          {Object.values(SubscriptionPlans).map((plan) => (
            <TierPlanCard
              key={plan.tier}
              tier={plan.tier}
              description={plan.description}
              price={plan.price}
              selected={selectedPlan === plan.tier}
              handleSelect={handleSelectPlan}
            />
          ))}
        </SubscriptionFormTierOptions>

        {!fetchingInfo && (
          <SubscriptionFormPaymentContainer>
            <SubscriptionFormPaymentOptions>
              <SubscriptionFormPaymentOption
                onClick={() => handleSelectPaymentPlan(CurrencyType.USD)}
              >
                <p>{CurrencyType.USD}</p>
              </SubscriptionFormPaymentOption>
              <SubscriptionFormPaymentOption
                onClick={() => handleSelectPaymentPlan(CurrencyType.USDC)}
              >
                <p>{CurrencyType.USDC}</p>
              </SubscriptionFormPaymentOption>
            </SubscriptionFormPaymentOptions>
            <SubscriptionFormPaymentSelectorContainer>
              <SubscriptionFormPaymentSelector
                selectedUSD={selectedPaymentPlan === CurrencyType.USD}
              />
            </SubscriptionFormPaymentSelectorContainer>

            <SubscriptionFormPaymentActionContainer>
              {selectedPaymentPlan === CurrencyType.USD && (
                <SubscriptionFormPaymentActionText>
                  {SubscriptionPlans[selectedPlan].price} USD will be charged
                  your active card ending {activeCardLast4}
                </SubscriptionFormPaymentActionText>
              )}
              {selectedPaymentPlan === CurrencyType.USDC && (
                <>
                  <SubscriptionFormPaymentActionText>
                    Click the button to get a one-time deposit address.
                  </SubscriptionFormPaymentActionText>
                  {paymentDepositAddresses[selectedPlan] && (
                    <SubscriptionFormPaymentActionText>
                      Transfer {SubscriptionPlans[selectedPlan].price} USDC into{" "}
                      {paymentDepositAddresses[selectedPlan]}
                    </SubscriptionFormPaymentActionText>
                  )}
                </>
              )}
              <ActionButton
                loading={paying}
                label={getActionButtonLabel()}
                handleClick={() => {
                  switch (selectedPaymentPlan) {
                    case CurrencyType.USD:
                      triggerUSDPayment();
                      break;
                    case CurrencyType.USDC:
                      triggerUSDCPayment();
                      break;
                    default:
                      break;
                  }
                }}
              />
            </SubscriptionFormPaymentActionContainer>
          </SubscriptionFormPaymentContainer>
        )}
      </SubscriptionFormContent>
    </SubscriptionFormContainer>
  );
};

export default SubscriptionForm;
