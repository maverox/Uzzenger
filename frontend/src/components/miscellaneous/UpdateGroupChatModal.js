import React, { useState } from 'react'
import {
    Box,
    Button,
    FormControl,
    IconButton,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Spinner,
    useDisclosure,
    useToast,
} from "@chakra-ui/react";
import { SettingsIcon } from '@chakra-ui/icons';
import { ChatState } from '../../Context/ChatProvider';
import UserBadgeItem from '../UserCards/UserBadgeItem';
import axios from 'axios';
import { set } from 'mongoose';
import UserListItem from '../UserCards/UserListItem';

const UpdateGroupChatModal = ({ fetchAgain, setFetchAgain }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [groupChatName, setGroupChatName] = useState();
    const [search, setSearch] = useState();
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [renameLoading, setRenameLoading] = useState(false);
    const toast = useToast();
    const { selectedChat, user, setSelectedChat } = ChatState();

    const handleSearch = async (query) => {
        setSearch(query);
        if (!query) {
          return;
        }
    
        try {
          setLoading(true);
          const config = {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          };
          const { data } = await axios.get(`/api/user?search=${search}`, config);
          console.log(data);
          setLoading(false);
          setSearchResults(data);
        } catch (error) {
          toast({
            title: "Error Occured!",
            description: "Failed to Load the Search Results",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom-left",
          });
          setLoading(false);
        }
      };
    
      const handleRename = async () => {
        if (!groupChatName) return;
    
        try {
          setRenameLoading(true);
          const config = {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          };
          const { data } = await axios.put(
            `/api/chat/rename`,
            {
              chatId: selectedChat._id,
              chatName: groupChatName,
            },
            config
          );
    
          console.log(data);
          // setSelectedChat("");
          setSelectedChat(data);
          setFetchAgain(!fetchAgain);
          setRenameLoading(false);
        } catch (error) {
          toast({
            title: "Error Occured!",
            description: error.response.data.message,
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
          setRenameLoading(false);
        }
        setGroupChatName("");
      };
    
      const handleAddUser = async (user1) => {
        if (selectedChat.users.find((u) => u._id === user1._id)) {
          toast({
            title: "User Already in group!",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
          return;
        }
    
        if (selectedChat.groupAdmin._id !== user._id) {
          toast({
            title: "Only admins can add someone!",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
          return;
        }
    
        try {
          setLoading(true);
          const config = {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          };
          const { data } = await axios.put(
            `/api/chat/addToGroup`,
            {
              chatId: selectedChat._id,
              userId: user1._id,
            },
            config
          );
    
          setSelectedChat(data);
          setFetchAgain(!fetchAgain);
          setLoading(false);
        } catch (error) {
          toast({
            title: "Error Occured!",
            description: error.response.data.message,
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
          setLoading(false);
        }
        setGroupChatName("");
      };
    
      const handleRemove = async (user1) => {
        if (selectedChat.groupAdmin._id !== user._id && user1._id !== user._id) {
          toast({
            title: "Only admins can remove someone!",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
          return;
        }
    
        try {
          setLoading(true);
          const config = {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          };
          const { data } = await axios.put(
            `/api/chat/removeFromGroup`,
            {
              chatId: selectedChat._id,
              userId: user1._id,
            },
            config
          );
    
          await user1._id === user._id ? setSelectedChat() : setSelectedChat(data);
          setFetchAgain(!fetchAgain);
          setLoading(false);
        } catch (error) {
          toast({
            title: "Error Occured!",
            description: error.response.data.message,
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
          setLoading(false);
        }
        setGroupChatName("");
      };
    
    return (

        <>
            <IconButton display={{ base: 'flex' }} icon={<SettingsIcon />} onClick={onOpen} />

            <Modal isCentered isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent h={"auto"}>
                    <ModalHeader
                        bg={"gray.200"}
                        fontSize={"2xl"}
                        fontFamily={"Work Sans"}
                        display={"flex"}
                        justifyContent={"center"}
                    >{selectedChat.chatName}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody
                        display={"flex"}
                        fontSize={"xl"}
                        flexDirection={"column"}
                        alignItems={"center"}
                        justifyContent={"space-evenly"}
                    >
                        <Box
                            display={"flex"}
                            flexDirection={"row"}
                            justifyContent={"space-between"}
                            alignItems={"center"}
                        >
                            {selectedChat.users.map((user) => (

                                <UserBadgeItem
                                    key={user._id}
                                    user={user}
                                    handleFunction={() => handleRemove(user)}
                                />

                            ))}
                        </Box>
                        <FormControl display='flex' justifyContent={'space-evenly'}>
                            <Input
                                placeholder="Rename Chat Name"
                                mb={3}
                                onChange={(e) => {
                                    setGroupChatName(e.target.value);
                                }}
                            />
                            <Button
                                variant="solid"
                                colorScheme="teal"
                                ml={1}
                                isLoading={renameLoading}
                                onClick={handleRename}
                            >
                                Rename
                            </Button>
                        </FormControl>
                        <FormControl>
                            <Input
                                placeholder="Add users to group"
                                mb={2}
                                onChange={(e) => {
                                    handleSearch(e.target.value);
                                }}
                            />
                        </FormControl>
                        {loading ? (
                            <Spinner size="lg" />
                        ) : (
                            searchResults
                                ?.slice(0, 4)
                                .map((user) => (
                                    <UserListItem
                                        key={user._id}
                                        user={user}
                                        handleFunction={() => handleAddUser(user)}
                                    />
                                ))
                        )}
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="red" mr={3} onClick={() => { handleRemove(user) }}>
                            Leave group
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal></>
    )
}

export default UpdateGroupChatModal