import { useContext } from "react";
import { Web3Context } from "src/contexts";

export const useWeb3 = () => {
  const context = useContext(Web3Context);
  return context;
};
