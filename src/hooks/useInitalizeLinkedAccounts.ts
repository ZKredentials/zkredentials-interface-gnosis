import { useLinkedAccounts } from "@/context/AccountsContext";
import { AccountsMetaMapping } from "@/utils/linkedAccounts";
import { useEffect } from "react";

const useInitializeLinkedAccounts = () => {
  const { dispatch } = useLinkedAccounts();

  const fetchAccounts = async () => {
    Object.values(AccountsMetaMapping).map((account) => {
      const token = localStorage.getItem(account.localStorage);
      if (token) {
        dispatch({
          type: account.dispatchType,
          isAccountConnected: true,
        });
      }
    });
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  return { fetchAccounts };
};

export default useInitializeLinkedAccounts;
