import RegisteredCards from "@/components/RegisteredCards";
import {
  GenericContainer,
  GenericContent,
  GenericTitle,
} from "../GenericLayout";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { getUserAccount } from "@/services/internal";
import RegisterUser from "@/components/RegisterUser";
import CurrentSubscription from "@/components/CurrentSubscription";
import SubscriptionForm from "@/components/SubscriptionForm";
import useFetchUserDepositAddress from "@/hooks/useFetchUserDepositAddress";
import useFetchUserRegisteredCards from "@/hooks/useFetchUserRegisteredCards";

const SubscriptionView = () => {
  const { address } = useAccount();
  const [loading, setLoading] = useState<boolean>(true);
  const [userHasAccount, setUserHasAccount] = useState<boolean>(false);

  const { data: circleDepositAddress, loading: fetchingCircleDepositAddress } =
    useFetchUserDepositAddress(address as string);
  const { data: cardInfo, loading: fetchingCardInfo } =
    useFetchUserRegisteredCards(address as string);

  const fetchUser = async () => {
    setLoading(true);
    const response = await getUserAccount(address as string);
    setUserHasAccount(!!response.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <GenericContainer>
      <GenericTitle>Subscription</GenericTitle>
      <GenericContent>
        {loading ? (
          <></>
        ) : (
          <>
            {userHasAccount ? (
              <>
                <CurrentSubscription />
                <RegisteredCards />
                <SubscriptionForm
                  cardId={
                    cardInfo?.filter((card: any) => card.active === true)[0]
                      .circleCardId
                  }
                  fetchingInfo={
                    fetchingCircleDepositAddress || fetchingCardInfo
                  }
                  activeCardLast4={
                    cardInfo?.filter((card: any) => card.active === true)[0]
                      .last4
                  }
                  circleDepositAddress={circleDepositAddress}
                />
              </>
            ) : (
              <RegisterUser callback={fetchUser} />
            )}
          </>
        )}
      </GenericContent>
    </GenericContainer>
  );
};

export default SubscriptionView;
