import React from 'react'
import { ChatState } from '../Context/ChatProvider';
import { Box } from '@chakra-ui/react';
import SingleChat from './SingleChat';

const ChatBox = ({fetchAgain, setFetchAgain}) => {
  const { user, selectedChat, setSelectedChat, chats, setChats } = ChatState();
  return (
    < Box
    mt={"1"}
    display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
    flexDir="column"
    alignItems="center"
    justifyContent={'space-between'}
    p={3}
    bg="white"
    w={{ base: "100%", md: "69%" }}
    borderRadius="lg"
    borderWidth="1px"
    >
  <SingleChat props = {{fetchAgain, setFetchAgain}} />
  </ Box >)
}

export default ChatBox