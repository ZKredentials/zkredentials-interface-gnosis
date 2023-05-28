import React from "react";
import { PropsWithChildren } from "react";
import { UPDATE_USER_PROOF } from "../actionType";

type SET_USER_PROOF = {
  type: "UPDATE_USER_PROOF";
  proofs: any[];
};

type Action = SET_USER_PROOF;

type State = {
  proofs: any[];
};

type Dispatch = (action: Action) => void;

const initialState: State = {
  proofs: [],
};

const UserProofContext = React.createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined);

function userProofReducer(state: State, action: Action): State {
  switch (action.type) {
    case UPDATE_USER_PROOF: {
      const { proofs } = action;
      return {
        ...state,
        proofs,
      } as State;
    }

    default: {
      return state;
    }
  }
}

function UserProofProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = React.useReducer(userProofReducer, initialState);
  const value = { state, dispatch };

  return (
    <UserProofContext.Provider value={value}>
      {children}
    </UserProofContext.Provider>
  );
}

function useUserProof() {
  const context = React.useContext(UserProofContext);
  if (context === undefined) {
    throw new Error("useUserProof do not have context");
  }
  return context;
}

export { UserProofProvider, useUserProof };
