import {
  FunctionComponent,
  createContext,
  useState,
  useEffect,
  useCallback
} from "react";
import { ethers } from "ethers";

export const Web3Context = createContext({
  currentAccount: "",
  provider: {} as ethers.providers.Web3Provider,
  connectWallet: () => {}
});

export const Web3ContextProvider: FunctionComponent<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState<string>("");
  const [provider, setProvider] = useState<ethers.providers.Web3Provider>();

  const connectWallet = useCallback(async () => {
    try {
      if (provider) {
        const accounts = await provider.send("eth_requestAccounts", []);

        setCurrentAccount(accounts[0]);
      } else {
        alert("Get MetaMask -> https://metamask.io/");
        return;
      }
    } catch (e) {
      console.log("error", e);
    }
  }, [provider]);

  const getAuthorizedAccount = useCallback(async () => {
    if (provider) {
      try {
        const accounts = await provider?.send("eth_accounts", []);

        setCurrentAccount(accounts[0]);
      } catch (error) {
        console.error(error);
      }
    }
  }, [provider]);

  useEffect(() => {
    getAuthorizedAccount();
  }, [getAuthorizedAccount]);

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(provider);
  }, []);

  return (
    <Web3Context.Provider
      value={{
        currentAccount,
        provider: provider as ethers.providers.Web3Provider,
        connectWallet
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};
