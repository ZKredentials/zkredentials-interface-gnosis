export enum EChain {
  MUMBAI = "MUMBAI",
  GOERLI = "GOERLI",
  SCROLL = "SCROLL",
  CHIADO = "CHIADO", // Gnosis Testnet
  TAIKO = "TAIKO", // Taiko Testnet
  POLYGON = "POLYGON",
  LINEA = "LINEA",
}

export const ChainNameToChainId = {
  [EChain.MUMBAI]: "80001",
  [EChain.GOERLI]: "5",
  [EChain.SCROLL]: "534353",
  [EChain.CHIADO]: "10200",
  [EChain.TAIKO]: "167004",
  [EChain.POLYGON]: "137",
  [EChain.LINEA]: "59140",
};

export const ChainIdToChainName: { [key: string]: string } = {
  "80001": EChain.MUMBAI,
  "5": EChain.GOERLI,
  "534353": EChain.SCROLL,
  "10200": EChain.CHIADO,
  "167004": EChain.TAIKO,
  "59140": EChain.LINEA,
};
