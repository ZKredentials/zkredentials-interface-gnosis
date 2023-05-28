import { AccountsMetaMapping } from "@/utils/linkedAccounts";
import {
  GenericContainer,
  GenericContent,
  GenericTitle,
} from "../GenericLayout";
import LinkedAccountsConnector from "@/components/LinkedAccountsConnector";

const LinkedAccountsView = () => {
  return (
    <GenericContainer>
      <GenericTitle>Linked Accounts</GenericTitle>
      <GenericContent>
        {Object.values(AccountsMetaMapping).map((account) => (
          <LinkedAccountsConnector key={account.label} type={account.type} />
        ))}
      </GenericContent>
    </GenericContainer>
  );
};

export default LinkedAccountsView;
