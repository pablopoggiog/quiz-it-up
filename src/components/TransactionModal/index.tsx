import { FunctionComponent } from "react";
import {
  Modal,
  Text,
  ModalContent,
  ModalOverlay,
  ModalCloseButton,
  ModalBody,
  VStack,
  Spinner,
  Link
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { ROPSTEN_ETHERSCAN_URL } from "@constants";

const AnimatedModalContent = motion(ModalContent);

interface Props {
  isOpen: boolean;
  onClose: () => void;
  transactionHash?: string;
  errorMessage?: string;
}

export const TransactionModal: FunctionComponent<Props> = ({
  isOpen,
  onClose,
  transactionHash,
  errorMessage
}) => (
  <Modal
    isOpen={isOpen}
    onClose={onClose}
    closeOnOverlayClick={!!errorMessage}
    closeOnEsc={!!errorMessage}
    onCloseComplete={onClose}
  >
    <ModalOverlay />
    <AnimatedModalContent
      initial={{ opacity: 0, y: -1000 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 200 }}
      w="fit"
      p={6}
      maxW="90%"
      textAlign="center"
      bgColor="gray.700"
      color="whiteAlpha.900"
    >
      {(transactionHash || errorMessage) && (
        <ModalCloseButton color="whiteAlpha" />
      )}
      <ModalBody pt={5}>
        {errorMessage ? (
          <Text>{errorMessage}</Text>
        ) : transactionHash ? (
          <VStack justify="space-evenly" h="full">
            <Text>✅</Text>
            <Link
              href={ROPSTEN_ETHERSCAN_URL + transactionHash}
              fontWeight="bold"
              fontSize="lg"
              textDecor="underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              View it on Etherscan
            </Link>
          </VStack>
        ) : (
          <VStack justify="space-evenly" h="full" gap={2}>
            <Text>Transaction In Progress!</Text>
            <Spinner color="whiteAlpha.900" />
          </VStack>
        )}
      </ModalBody>
    </AnimatedModalContent>
  </Modal>
);
