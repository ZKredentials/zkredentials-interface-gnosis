import { FC, useEffect, useState } from "react";
import {
  LinkedAccountsConnectorButton,
  LinkedAccountsConnectorContainer,
  LinkedAccountsConnectorLogo,
  LinkedAccountsConnectorText,
} from "./styles";
import { useLinkedAccounts } from "@/context/AccountsContext";
import Image from "next/image";
import { AccountsType, AccountsMetaMapping } from "@/utils/linkedAccounts";

interface IProps {
  type: AccountsType;
}

const LinkedAccountsConnector: FC<IProps> = ({ type }) => {
  let externalAccountWindow;
  const currentAccount = AccountsMetaMapping[type];
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [isTokenValid, setIsTokenValid] = useState<boolean>(false);
  const { state, dispatch } = useLinkedAccounts();

  const handleLogin = async () => {
    externalAccountWindow = window.open(
      currentAccount.backendUrl,
      `_blank`,
      `height=500,width=800`
    );
  };

  useEffect(() => {
    const validateToken = () => {
      const token = localStorage.getItem(currentAccount.localStorage);
      if (token) {
        setLoggedIn(true);
        dispatch({
          type: currentAccount.dispatchType,
          isAccountConnected: true,
        });
      }
    };

    validateToken();
    window.addEventListener("storage", validateToken);

    return () => {
      window.removeEventListener("storage", validateToken);
    };
  }, [state.isGithub, state.isTwitter]);

  return (
    <LinkedAccountsConnectorContainer>
      <LinkedAccountsConnectorButton type="button" onClick={handleLogin}>
        <LinkedAccountsConnectorLogo>
          <Image src={currentAccount.logo} alt={currentAccount.label} fill />
        </LinkedAccountsConnectorLogo>
        {loggedIn ? (
          <LinkedAccountsConnectorText>Connected</LinkedAccountsConnectorText>
        ) : (
          <LinkedAccountsConnectorText>
            Login with {currentAccount.label}
          </LinkedAccountsConnectorText>
        )}
      </LinkedAccountsConnectorButton>
    </LinkedAccountsConnectorContainer>
  );
};

export default LinkedAccountsConnector;
