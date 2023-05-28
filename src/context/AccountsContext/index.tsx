import React from "react";
import { PropsWithChildren } from "react";
import { UPDATE_GITHUB_LOGGEDIN, UPDATE_TWITTER_LOGGEDIN } from "../actionType";
import {
  AccountsMetaMapping,
  AccountsType,
  IAccounts,
} from "@/utils/linkedAccounts";

type SET_GITHUB_LOGGEDIN = {
  type: "UPDATE_GITHUB_LOGGEDIN";
  isAccountConnected: boolean;
};

type SET_TWITTER_LOGGEDIN = {
  type: "UPDATE_TWITTER_LOGGEDIN";
  isAccountConnected: boolean;
};

export type ActionType =
  | typeof UPDATE_GITHUB_LOGGEDIN
  | typeof UPDATE_TWITTER_LOGGEDIN;

type Action = SET_GITHUB_LOGGEDIN | SET_TWITTER_LOGGEDIN;

type State = {
  isGithub: boolean;
  isTwitter: boolean;
};

type Dispatch = (action: Action) => void;

const initialState: State = {
  isGithub: false,
  isTwitter: false,
} as const;

const AccountsContext = React.createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined);

function linkedAccountsReducer(state: State, action: Action): State {
  switch (action.type) {
    case UPDATE_GITHUB_LOGGEDIN: {
      const { isAccountConnected } = action;
      return {
        ...state,
        isGithub: isAccountConnected,
      } as State;
    }
    case UPDATE_TWITTER_LOGGEDIN: {
      const { isAccountConnected } = action;
      return {
        ...state,
        isTwitter: isAccountConnected,
      } as State;
    }
    default: {
      return state;
    }
  }
}

function AccountsProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = React.useReducer(
    linkedAccountsReducer,
    initialState
  );
  const value = { state, dispatch };

  return (
    <AccountsContext.Provider value={value}>
      {children}
    </AccountsContext.Provider>
  );
}

function useLinkedAccounts() {
  const context = React.useContext(AccountsContext);
  if (context === undefined) {
    throw new Error("useLinkedAccounts doesn't have proper context");
  }
  return context;
}

export { AccountsProvider, useLinkedAccounts };
