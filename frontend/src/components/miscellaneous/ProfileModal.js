import React from "react";
import { Button, IconButton, useDisclosure, Image, Text } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";
const ProfileModal = ({ user, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure(); // hook to open and close modal

  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton
          onClick={onOpen}
          icon={<InfoIcon />}
          display={{ base: "flex" }}
        />
      )}
      <Modal size={"lg"}  isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent h={"400px"}>
          <ModalHeader 
            fontSize={"2xl"}
            fontFamily={"Work Sans"}
            display={"flex"}
            justifyContent={"center"}
          >{user.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody 
            display={"flex"}
            fontSize={"xl"}
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Image 
                src={user.pic} 
                alt={user.name}
                borderRadius={"full"}
                boxSize={"150px"} 
            />
            <Text>{user.email}</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileModal;
