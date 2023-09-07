import React, { useEffect, useState } from 'react'
import { ChatState } from '../Context/ChatProvider';
import axios from 'axios';
import { Box, Button, Stack, Text, Toast, background } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import ChatLoading from './ChatLoading';
import { getSender } from '../config/chatLogics';

const MyChats = () => {
  const [loggedUser, setLoggedUser] = useState()
  const {user, selectedChat, setSelectedChat, chats, setChats} = ChatState();
  const fetchChats = async () => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`
                }
            }
            const {data} = await axios.get('/api/chat', config);
            console.log(data)
            setChats(data);
        } catch (error) {
            Toast({
                title: "error fetching chats",
                description: error.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                location: "bottom-left"
            })
        }
    }
    useEffect(() => {
      setLoggedUser(JSON.parse(localStorage.getItem('userInfo')));
      fetchChats();
    }, [])
    {console.log(selectedChat)}
  return (
    <Box
    mt={"1"}
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      justifyContent={'space-between'}
      p={3}
      bg="white"
      w={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily="Work sans"
        display="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
        fontWeight={600}
      >
        My Chats
        
          <Button
            display="flex"
            fontSize={{ base: "17px", md: "10px", lg: "17px" }}
            rightIcon={<AddIcon />}
            _hover={
              {
                background: "#38B2AC",
                color: "white",
              }
            }
          >
            New Group Chat
          </Button>
        
      </Box>
      <Box
        display="flex"
        flexDir="column"
        p={3}
        bg="#F8F8F8"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="hidden"
      >
        {chats ? (
          <Stack overflowY="scroll">
            {chats.map((chat) => (
              <Box
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                color={selectedChat === chat ? "white" : "black"}
                px={3}
                py={2}
                borderRadius="lg"
                key={chat._id}
              >
                <Text>
                  {!chat.isGroupChat? (
                    getSender(loggedUser, chat.users)
                  ) :
                  (chat.chatName)}
                </Text>
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  )
}

export default MyChats