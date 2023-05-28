import { CardNetworkType, IExtendedCardInfo } from "@/utils/type";
import CreditCard from "../CreditCard";
import {
  RegisteredCardsContainer,
  RegisteredCardsContent,
  RegisteredCardsTitle,
} from "./style";
import BlankCard from "../BlankCard";
import { useState } from "react";
import AddNewCardForm from "../AddNewCardForm";
import { useAccount } from "wagmi";
import useFetchUserRegisteredCards from "@/hooks/useFetchUserRegisteredCards";

const RegisteredCards = () => {
  const { address } = useAccount();
  const [showNewCardRegistration, setShowNewCardRegistration] =
    useState<boolean>(false);
  const { data, loading, error, fetchCards } = useFetchUserRegisteredCards(
    address as string
  );

  const handlePostRegistrationCallback = async () => {
    setShowNewCardRegistration(false);
    await fetchCards();
  };

  return (
    <RegisteredCardsContainer>
      <RegisteredCardsTitle>Registered Cards</RegisteredCardsTitle>
      <RegisteredCardsContent>
        {loading ? (
          <></>
        ) : (
          <>
            {data &&
              data.length > 0 &&
              data.map((cardData: IExtendedCardInfo, index: number) => (
                <CreditCard
                  key={cardData.circleCardId}
                  network={CardNetworkType.VISA}
                  last4={cardData.last4}
                  expMonth={cardData.expMonth}
                  expYear={cardData.expYear}
                  active={cardData.active}
                />
              ))}
          </>
        )}
        <BlankCard
          handleClick={() =>
            setShowNewCardRegistration(!showNewCardRegistration)
          }
        />
      </RegisteredCardsContent>

      {showNewCardRegistration && (
        <AddNewCardForm callback={handlePostRegistrationCallback} />
      )}
    </RegisteredCardsContainer>
  );
};

export default RegisteredCards;
