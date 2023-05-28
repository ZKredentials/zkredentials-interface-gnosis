import { getUserRegisteredCards } from "@/services/internal";
import { useEffect, useState } from "react";

const useFetchUserRegisteredCards = (address: string) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const fetchCards = async () => {
    setLoading(true);
    setError("");

    const response = await getUserRegisteredCards(address);

    if (!response.data || response.error) {
      setError(response.error);
      setData(null);
      setLoading(false);
      return;
    }

    setData(response.data.sort((x, y) => Number(y.active) - Number(x.active)));
    setLoading(false);
  };

  useEffect(() => {
    fetchCards();
  }, [address]);

  return { data, loading, error, fetchCards };
};

export default useFetchUserRegisteredCards;
