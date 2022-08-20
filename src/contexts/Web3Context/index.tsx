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
  provider: {} as ethers.providers.Web3Provider
});

export const Web3ContextProvider: FunctionComponent<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState<string>("");
  const [provider, setProvider] = useState<ethers.providers.Web3Provider>();

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(provider);
  }, []);

  return (
    <Web3Context.Provider
      value={{
        currentAccount,
        provider: provider as ethers.providers.Web3Provider
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};
