import {
  FunctionComponent,
  createContext,
  useState,
  useEffect,
  useCallback
} from "react";
import { ethers } from "ethers";
import {
  NETWORKS,
  QUIZ_CONTRACT_ADDRESS,
  QUIZ_ABI,
  METHODS,
  EVENTS
} from "@constants";
import { SubmitQuizReturn } from "@types";

export const Web3Context = createContext({
  currentAccount: "",
  provider: {} as ethers.providers.Web3Provider,
  isRopsten: false,
  quizBalance: 0,
  connectWallet: () => {},
  switchNetwork: () => {},
  submitQuizToContract: (_: number, __: number[]) => ({} as SubmitQuizReturn)
});

interface Props {
  children: React.ReactNode;
}

export const Web3ContextProvider: FunctionComponent<Props> = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState<string>("");
  const [network, setNetwork] = useState<string>("");
  const [provider, setProvider] = useState<ethers.providers.Web3Provider>();
  const [quizBalance, setQuizBalance] = useState<number>(0);

  const isRopsten = network === NETWORKS[3];

  const connectWallet = useCallback(async () => {
    if (provider) {
      try {
        const accounts = await provider.send(METHODS.eth_requestAccounts, []);
        setCurrentAccount(accounts[0]);

        const network = await provider.getNetwork();
        setNetwork(NETWORKS[network.chainId]);
      } catch (error) {
        console.error(error);
      }
    } else {
      alert("Get MetaMask -> https://metamask.io/");
      return;
    }
  }, [provider]);

  const getAuthorizedAccount = useCallback(async () => {
    if (provider) {
      try {
        const accounts = await provider?.send(METHODS.eth_accounts, []);
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
      await provider?.send(METHODS.wallet_switchEthereumChain, [
        { chainId: "0x3" }
      ]);
    } catch (error) {
      // if the chain wasn't added yet to Metamask, add it
      //  @ts-ignore
      if (error?.code === 4902) {
        try {
          await provider?.send(METHODS.wallet_addEthereumChain, [
            { chainId: "0x3" }
          ]);
        } catch (error) {
          console.error(error);
        }
      }
      console.error(error);
    }
  }, [provider]);

  const updateQuizBalance = useCallback(async () => {
    if (provider && currentAccount) {
      const contract = new ethers.Contract(
        QUIZ_CONTRACT_ADDRESS,
        QUIZ_ABI,
        provider
      );
      const balance = (
        (await contract.balanceOf(currentAccount)) / 1000000000000000000
      ).toString();

      setQuizBalance(Number(balance));
    }
  }, [currentAccount, provider]);

  const submitQuizToContract = async (
    surveyId: number,
    answers: number[]
  ): Promise<[string | undefined, unknown | undefined] | undefined> => {
    if (provider && currentAccount) {
      try {
        const signer = provider.getSigner(currentAccount);
        const contract = new ethers.Contract(
          QUIZ_CONTRACT_ADDRESS,
          QUIZ_ABI,
          signer
        );
        const transactionInProgress = await contract.submit(surveyId, answers);
        const { transactionHash }: { transactionHash: string } =
          await transactionInProgress.wait();

        updateQuizBalance();

        return [transactionHash, undefined];
      } catch (error) {
        //@ts-ignore
        return [undefined, error.message];
      }
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(provider);
    }
  }, []);

  useEffect(() => {
    getAuthorizedAccount();
  }, [getAuthorizedAccount]);

  useEffect(() => {
    if (isRopsten) {
      updateQuizBalance();
    }
  }, [updateQuizBalance, network, isRopsten]);

  useEffect(() => {
    if (window.ethereum) {
      const handleAccountOrChainChanged = () => window.location.reload();

      window.ethereum.on(EVENTS.accountsChanged, handleAccountOrChainChanged);
      window.ethereum.on(EVENTS.chainChanged, handleAccountOrChainChanged);
    }
  }, []);

  return (
    <Web3Context.Provider
      value={{
        currentAccount,
        provider: provider as ethers.providers.Web3Provider,
        isRopsten,
        quizBalance,
        connectWallet,
        switchNetwork,
        submitQuizToContract
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};
