import {
  FunctionComponent,
  createContext,
  useState,
  useEffect,
  useCallback
} from "react";
import { ethers } from "ethers";
import { NETWORKS } from "@constants";

export const Web3Context = createContext({
  currentAccount: "",
  provider: {} as ethers.providers.Web3Provider,
  isRopsten: false,
  connectWallet: () => {},
  switchNetwork: () => {}
});

export const Web3ContextProvider: FunctionComponent<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState<string>("");
  const [network, setNetwork] = useState<string>("");
  const [provider, setProvider] = useState<ethers.providers.Web3Provider>();

  const isRopsten = network === NETWORKS[3];

  const connectWallet = useCallback(async () => {
    try {
      if (provider) {
        const accounts = await provider.send("eth_requestAccounts", []);
        setCurrentAccount(accounts[0]);

        const network = await provider.getNetwork();
        setNetwork(NETWORKS[network.chainId]);
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

        const network = await provider.getNetwork();
        setNetwork(NETWORKS[network.chainId]);
      } catch (error) {
        console.error(error);
      }
    }
  }, [provider]);

  const switchNetwork = useCallback(async () => {
    try {
      await provider?.send("wallet_switchEthereumChain", [{ chainId: "0x3" }]);
    } catch (error: any) {
      // if the chain wasn't added yet to Metamask, add it
      if (error.code === 4902) {
        try {
          await provider?.send("wallet_addEthereumChain", [{ chainId: "0x3" }]);
        } catch (error) {
          console.error(error);
        }
      }
      console.error(error);
    }
  }, [provider]);

  useEffect(() => {
    getAuthorizedAccount();
  }, [getAuthorizedAccount]);

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(provider);
  }, []);

  useEffect(() => {
    const handleAccountOrChainChanged = () => window.location.reload();

    window?.ethereum.on("accountsChanged", handleAccountOrChainChanged);
    window?.ethereum.on("chainChanged", handleAccountOrChainChanged);
  }, []);

  return (
    <Web3Context.Provider
      value={{
        currentAccount,
        provider: provider as ethers.providers.Web3Provider,
        isRopsten,
        connectWallet,
        switchNetwork
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};
