import { EChain } from "./chains";

export enum ContractName {
  GITHUB = "GITHUB",
}

const ChainToAddressMapping: { [key: string]: { [key: string]: string } } = {
  [EChain.CHIADO]: {
    [ContractName.GITHUB]: "0x3ca839f1E7E456464e2CEF5bd43E4e64aBFcFBff",
  },
  [EChain.TAIKO]: {
    [ContractName.GITHUB]: "0xfA3422b99515d78D889C0a8Ce866A8444A589fB8",
  },
  [EChain.MUMBAI]: {
    [ContractName.GITHUB]: "0x61225EBA5d5CFaEe6A849211374F8e40572B00Df",
  },
  [EChain.SCROLL]: {
    [ContractName.GITHUB]: "0xFb6bf2E085f4ffB8f521A9E53d70963fa90e9fe8",
  },
  [EChain.LINEA]: {
    [ContractName.GITHUB]: "0xE3641277B8450e174a2Dea656649a3A1EBcEb2BE",
  },
};

export default ChainToAddressMapping;
