import { getGithubStats } from "@/services/internal";
import { useEffect, useState } from "react";

export interface IBaseGithubStats {
  sponsors: number;
  starred: number;
  prs: number;
}

const EmptyData: IBaseGithubStats = {
  sponsors: 0,
  starred: 0,
  prs: 0,
};

const useGithubOptions = () => {
  const [data, setData] = useState<IBaseGithubStats>(EmptyData);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const fetchGithubStats = async () => {
    setLoading(true);

    const response = await getGithubStats();
    if (response.data && !response.error) {
      setData(response.data as IBaseGithubStats);
      setError("");
      setLoading(false);
      return;
    }

    setData(EmptyData);
    setError("Unable to fetch stats from Github");
    setLoading(false);
  };

  useEffect(() => {
    fetchGithubStats();
  }, []);

  return { data, loading, error };
};

export default useGithubOptions;
