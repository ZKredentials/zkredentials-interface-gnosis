import { useAccount } from "wagmi";
import {
  CurrentSubscriptionContainer,
  CurrentSubscriptionTitle,
  CurrentSubscriptionText,
  CurrentSubscriptionContent,
} from "./style";
import useFetchCurrentActiveSubscriptionPlan from "@/hooks/useFetchCurrentActiveSubscriptionPlan";
import { useEffect } from "react";
import { pollSubscriptionPaid } from "@/services/internal";

const CurrentSubscription = () => {
  const { address } = useAccount();
  const { data, loading, error, fetchPlan } =
    useFetchCurrentActiveSubscriptionPlan(address as string);

  const handlePollSubscription = async () => {
    const response = await pollSubscriptionPaid(address as string);
    if (response.data) {
      fetchPlan();
    }
  };

  useEffect(() => {
    handlePollSubscription();
  }, []);

  return (
    <CurrentSubscriptionContainer>
      <CurrentSubscriptionTitle>
        Current Subscription Plan
      </CurrentSubscriptionTitle>
      {loading ? (
        <CurrentSubscriptionText></CurrentSubscriptionText>
      ) : (
        <>
          {data ? (
            <CurrentSubscriptionContent>
              <CurrentSubscriptionText>
                Tier: {data.tier}
              </CurrentSubscriptionText>
              <CurrentSubscriptionText>
                Expires on: {data.endDate.slice(0, 10)}
              </CurrentSubscriptionText>
              <CurrentSubscriptionText></CurrentSubscriptionText>
            </CurrentSubscriptionContent>
          ) : (
            <CurrentSubscriptionText>
              You are currently not subscribed
            </CurrentSubscriptionText>
          )}
        </>
      )}
    </CurrentSubscriptionContainer>
  );
};

export default CurrentSubscription;
