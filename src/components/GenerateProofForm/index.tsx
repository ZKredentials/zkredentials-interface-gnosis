import { CurrencyType } from "@prisma/client";
import {
  GenerateProofFormContainer,
  GenerateProofFormOption,
  GenerateProofFormOptions,
  GenerateProofFormSelector,
  GenerateProofFormSelectorContainer,
} from "./style";
import { AccountsType } from "@/utils/linkedAccounts";
import { useEffect, useState } from "react";
import { useLinkedAccounts } from "@/context/AccountsContext";
import GithubForm from "./Forms/GithubForm";
import { capitalizeText } from "@/utils/helper";

const GenerateProofForm = () => {
  const { state } = useLinkedAccounts();
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<AccountsType>(
    AccountsType.GITHUB
  );
  const [availableOptions, setAvailableOptions] = useState<AccountsType[]>([]);

  const initializeOptions = () => {
    setLoading(true);
    let _options = [];

    if (state.isGithub) {
      _options.push(AccountsType.GITHUB);
    }

    if (state.isTwitter) {
      _options.push(AccountsType.TWITTER);
    }

    if (_options.length > 0) {
      setSelectedOption(_options[0]);
    }

    setAvailableOptions(_options);
    setLoading(false);
  };

  useEffect(() => {
    initializeOptions();
  }, []);

  return (
    <GenerateProofFormContainer>
      {loading ? (
        <p>Loading</p>
      ) : (
        <>
          {availableOptions.length > 0 ? (
            <>
              <GenerateProofFormOptions>
                {availableOptions.map((option) => (
                  <GenerateProofFormOption
                    key={option}
                    onClick={() => setSelectedOption(option)}
                  >
                    <p>{capitalizeText(option)}</p>
                  </GenerateProofFormOption>
                ))}
              </GenerateProofFormOptions>
              <GenerateProofFormSelectorContainer>
                <GenerateProofFormSelector
                  numberOfOptions={availableOptions.length}
                  index={availableOptions.indexOf(selectedOption)}
                />
              </GenerateProofFormSelectorContainer>

              {selectedOption === AccountsType.GITHUB && <GithubForm />}
            </>
          ) : (
            <p>You have yet to connect any accounts</p>
          )}
        </>
      )}
    </GenerateProofFormContainer>
  );
};

export default GenerateProofForm;
