import { FunctionComponent } from "react";
import Modal from "react-modal";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  transactionHash?: string;
}

export const TransactionModal: FunctionComponent<Props> = ({
  isOpen,
  onClose,
  transactionHash
}) => {
  return (
    <Modal key="address-modal" isOpen={isOpen} ariaHideApp={false}>
      <button onClick={onClose}>X</button>
      {transactionHash ? (
        <div>Transaction ok! Hash: {transactionHash}</div>
      ) : (
        <div>Transaction In Progress!</div>
      )}
    </Modal>
  );
};
