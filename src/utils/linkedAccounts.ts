import { ActionType } from "@/context/AccountsContext";
import {
  UPDATE_GITHUB_LOGGEDIN,
  UPDATE_TWITTER_LOGGEDIN,
} from "@/context/actionType";
import {
  LOCAL_STORAGE_GITHUB_ACCESS_TOKEN,
  LOCAL_STORAGE_TWITTER_ACCESS_TOKEN,
} from "./constants";
import GithubLogo from "@/assets/logo/Github.svg";
import TwitterLogo from "@/assets/logo/Twitter.svg";
import config from "./config";

export enum AccountsType {
  GITHUB = "GITHUB",
  TWITTER = "TWITTER",
}

export interface IAccounts {
  label: string;
  logo: string;
  localStorage: string;
  dispatchType: ActionType;
  backendUrl: string;
  contextVariable: string;
  type: AccountsType;
}

export const AccountsMetaMapping: { [key: string]: IAccounts } = {
  [AccountsType.GITHUB]: {
    label: "Github",
    logo: GithubLogo,
    type: AccountsType.GITHUB,
    localStorage: LOCAL_STORAGE_GITHUB_ACCESS_TOKEN,
    dispatchType: UPDATE_GITHUB_LOGGEDIN,
    backendUrl: `${config.BACKEND_API_URL}/github/login`,
    contextVariable: "isGithub",
  },
  [AccountsType.TWITTER]: {
    label: "Twitter",
    logo: TwitterLogo,
    type: AccountsType.TWITTER,
    localStorage: LOCAL_STORAGE_TWITTER_ACCESS_TOKEN,
    dispatchType: UPDATE_TWITTER_LOGGEDIN,
    backendUrl: `${config.BACKEND_API_URL}/twitter/login`,
    contextVariable: "isTwitter",
  },
};
