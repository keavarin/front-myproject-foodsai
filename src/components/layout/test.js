import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Text
  } from "@chakra-ui/react"
  import { useDisclosure } from "@chakra-ui/react"
const CustomModal = ({ showModalButtonText, modalHeader, modalBody }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
      <>
        <Text colorScheme="red" size="xs" onClick={onOpen}>
          {showModalButtonText}
        </Text>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{modalHeader}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>{modalBody}</ModalBody>
  
            <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  alert(1);
                }}
              >
                Delete
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  };
  
  export default function Test() {
    return (
      <div className="Test">
        <CustomModal
          showModalButtonText="Edit"
          modalHeader="Edit Modal"
          modalBody="Edit Modal"
        />
        <CustomModal
          showModalButtonText="Delete"
          modalHeader="Delete Shipping Address"
          modalBody="Are you sure you want to delete the shipping address?"
        />
      </div>
    );
  }