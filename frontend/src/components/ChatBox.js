import React from 'react'
import { ChatState } from '../Context/ChatProvider';
import { Box } from '@chakra-ui/react';
import SingleChat from './SingleChat';

const ChatBox = ({fetchAgain, setFetchAgain}) => {
  const { selectedChat } = ChatState();
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
    h={{ base: "100vh", md: "100vh" }}
    borderRadius="lg"
    borderWidth="1px"
    >
  <SingleChat  fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
  </ Box >)
}

export default ChatBox