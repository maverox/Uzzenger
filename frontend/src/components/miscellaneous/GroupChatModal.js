import {
  Box,
  Button,
  FormControl,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { ChatState } from "../../Context/ChatProvider";
import { set } from "mongoose";
import axios from "axios";
import UserListItem from "../UserCards/UserListItem";
import UserBadgeItem from "../UserCards/UserBadgeItem";
import Homepage from "./../../pages/Homepage";

const GroupChatModal = ({ children }) => {
  //this children is the button that opens the modal as in {MyChats.js} line 45 <GroupChatModal> <Button>Open Modal</Button> </GroupChatModal>
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupChatName, setGroupChatName] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const { user, chats, setChats } = ChatState();
  const toast = useToast();

  const handleSelection = (user) => {
    if (selectedUsers.includes(user)) {
      toast({
        title: "User already selected.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    setSelectedUsers((prev) => [...prev, user]);
  };

  const handleDelete = (user) => {
    if (selectedUsers.includes(user)) {
      setSelectedUsers((prev) => prev.filter((u) => u !== user));
    }

  };

  const searchUser = async (query) => {
    setSearch(query);
    if (!query.length) {
      return setSearchResults([]);
    }
    try {
      setLoading(true);
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`/api/user?search=${query}`, config);
      setSearchResults(data);
      setLoading(false);
    } catch (error) {
      toast({
        title: "An error occurred.",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!groupChatName || !selectedUsers.length) {
      return toast({
        title: "Please Fill all the fields",
        status: "error",
        duration: 5000,
        isClosable: true,
      });

    }

    try {
      if (selectedUsers.length <= 2) {
        return toast({
          title: "Please select more than 2 users",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      }
      const { data } = await axios.post('/api/chat/group', {
          name: groupChatName,
          users: JSON.stringify(selectedUsers.map((user) => user._id))
        },
        config
      );
      setChats([data, ...chats]);
      onClose();
      toast({
        title: "Chat Created",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      console.log(data);
    } catch (error) {
      toast({
        title: "An error occurred.",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };
  return (
    <>
      <span onClick={onOpen}>{children}</span>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            display="flex"
            justifyContent="center"
            fontFamily={"Work sans"}
            fontSize={"2rem"}
          >
            Create Group Chat
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display="flex"
            flexDirection="column"
            alignItems={"center"}
          >
            <FormControl>
              <Input
                placeholder="Chat Name"
                mb={3}
                onChange={(e) => {
                  setGroupChatName(e.target.value);
                }}
              />
            </FormControl>
            <FormControl>
              <Input
                placeholder="Search Users"
                mb={3}
                onChange={(e) => {
                  searchUser(e.target.value);
                }}
              />
            </FormControl>
            <Box w={'100'} display={'flex'} mb={2}>
              {selectedUsers.map((user) => (
                <UserBadgeItem
                  key={user._id}
                  user={user}
                  handleFunction={() => handleDelete(user)}
                />
              ))}
            </Box>
            {loading ? (
              <p>Loading...</p>
            ) : (
              searchResults
                ?.slice(0, 4)
                .map((user) => (
                  <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={() => handleSelection(user)}
                  />
                ))
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              Create Chat
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GroupChatModal;
