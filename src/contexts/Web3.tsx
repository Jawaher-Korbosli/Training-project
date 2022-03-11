import React, {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useReducer,
  } from "react";
  import Web3 from "web3";
  import { subscribeToAccount, subscribeToNetId, subscribeToBalance } from "../api/web3";
  
  interface State {
    account: string;
    balance: string;
    web3: Web3 | null;
    netId: number;
  }
  
  const INITIAL_STATE: State = {
    account: "qsd",
    balance: "0",
    web3: null,
    netId: 0,
  };
  
  const UPDATE_ACCOUNT = "UPDATE_ACCOUNT";
  const UPDATE_NET_ID = "UPDATE_NET_ID";
  const UPDATE_BALANCE = "UPDATE_BALANCE";
  
  interface UpdateAccount {
    type: "UPDATE_ACCOUNT";
    account: string;
    web3?: Web3;
  }
  
  interface UpdateNetId {
    type: "UPDATE_NET_ID";
    netId: number;
  }

  interface UpdateBalance {
    type: "UPDATE_BALANCE";
    balance: string;
  }
  
  type Action = UpdateAccount | UpdateNetId | UpdateBalance;
  
  function reducer(state: State = INITIAL_STATE, action: Action) {
    switch (action.type) {
      case UPDATE_ACCOUNT: {
        const web3 = action.web3 || state.web3;
        const { account } = action;
  
        return {
          ...state,
          web3,
          account,
        };
      }
      case UPDATE_NET_ID: {
        const { netId } = action;
  
        return {
          ...state,
          netId,
        };
      }

      case UPDATE_BALANCE: {
        const { balance } = action;
        return {...state , balance};
      }
      default:
        return state;
    }
  }
  
  const Web3Context = createContext({
    state: INITIAL_STATE,
    updateAccount: (_data: { account: string; web3?: Web3 }) => {},
    updateNetId: (_data: { netId: number }) => {},
    updateBalance: (_data: {balance: string}) => {}
  });
  
  export function useWeb3Context() {
    return useContext(Web3Context);
  }
  
  interface ProviderProps {}
  
  export const Provider: React.FC<ProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  
    function updateAccount(data: { account: string; web3?: Web3 }) {
      dispatch({
        type: UPDATE_ACCOUNT,
        ...data,
      });
    }
  
    function updateNetId(data: { netId: number }) {
      dispatch({
        type: UPDATE_NET_ID,
        ...data,
      });
    }

    function updateBalance(data: {balance: string}) {
      dispatch({
        type: UPDATE_BALANCE,
        ...data,
      });

    }
  
    return (
      <Web3Context.Provider
        value={useMemo(
          () => ({
            state,
            updateAccount,
            updateNetId,
            updateBalance,
          }),
          [state]
        )}
      >
        {children}
      </Web3Context.Provider>
    );
  };
  
  export function Updater() {
    const { state, updateNetId , updateBalance } = useWeb3Context();
  
    useEffect(() => {
      if (state.web3) {
        const unsubscribe = subscribeToAccount(state.web3, (error, account) => {
          if (error) {
            console.error(error);
          }
          if (account !== undefined && account !== state.account) {
            window.location.reload();
          }
        });
  
        return unsubscribe;
      }
    }, [state.web3, state.account]);
  
    useEffect(() => {
      if (state.web3) {
        const unsubscribe = subscribeToNetId(state.web3, (error, netId) => {
          if (error) {
            console.error(error);
          }
          if (netId) {
            if (state.netId === 0) {
              updateNetId({ netId });
            } else if (netId !== state.netId) {
              window.location.reload();
            }
          }
        });
  
        return unsubscribe;
      }
    }, [state.web3, state.netId, updateNetId]);

    useEffect(() => {
      if (state.web3) {
        const unsubscribe = subscribeToBalance(state.web3, (error, balance) => {
          if (error) {
            console.error(error);
          }
          if (balance) {
            if (state.balance === "0") {
              updateBalance({ balance });
            } else if (balance !== state.balance) {
           //   alert("reloading 3");
           //   window.location.reload();
            }
          }
        });
  
        return unsubscribe;
      }
    }, [state.web3, state.netId, updateNetId]);
  
    return null;
  }
  