import React, { useEffect, useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import { Box, FormControl, IconButton, Input, Spinner, Text, useToast } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import ProfileModal from './miscellaneous/ProfileModal';
import { getSender, getSenderFull } from "../config/chatLogics";
import UpdateGroupChatModal from "./miscellaneous/UpdateGroupChatModal";
import axios from "axios";
import './style.css'
import ScrollableChat from "./ScrollableChat";
const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const { user, selectedChat, setSelectedChat, chats, setChats } = ChatState();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState()
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  
  
  const fetchMessages = async () => {
    if (!selectedChat) return;
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      setLoading(true);
      const { data } = await axios.get(`/api/message/${selectedChat._id}`, config);
      console.log(messages)
      setMessages(data);

    } catch (error) {
      toast({
        title: "Error fetching messages",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      })
    }
    setLoading(false);
  }
useEffect(() => {
    fetchMessages();
  }, [selectedChat])
  const typingHandler = (e) => {
    setNewMessage(e.target.value);
    // Typing indicator logic here
  };
  const sendMessage = async (e) => {
    if (e.key === "Enter" && newMessage){
      // Send message logic here
      try {
        setLoading(true);
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        setNewMessage('');
        const {data} = await axios.post(`/api/message`, {chatId: selectedChat._id, content: newMessage}, config);
        
        setMessages((prev)=> [...prev, data]);

      } catch (error) {
        toast({
          title: "Error sending the message",
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        })
      }
      setLoading(false);
    }
  };
  return (
    <>
      {selectedChat ? (
        <>
          <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w={"100%"}
            borderBottom={"1px solid #ccc"}
            fontFamily={"work sans"}
            display={"flex"}
            justifyContent={{ base: "space-between" }}
          >
            <IconButton
              display={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat("")}
            />
            {!selectedChat.isGroupChat ? (
              <>
                {getSender(user, selectedChat.users)}
                <ProfileModal user={getSenderFull(user, selectedChat.users)} /></>
            ) : (
              <>
                {selectedChat.chatName.toUpperCase()}
                <UpdateGroupChatModal fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} fetchMessages={fetchMessages} />

              </>
            )}
          </Text>
          <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"flex-end"}
            p={3}
            bg="gray.100"
            h={'100%'}
            w={'100%'}

            borderRadius={'lg'}
            overflowY={'hidden'}


          >
            <br />

            {loading ? ( <Spinner 
              size={"xl"}
              color={"blue.400"}
              display={"flex"}
              alignSelf={"center"}
              margin={"auto"}
            /> ) : (
              <div className="messages"> 
                <ScrollableChat messages={messages} />
              </div>
            )}
            <FormControl  onKeyDown = {sendMessage} isRequired mt={3}  >
                <Input 
                  variant={'filled'}
                  bg={'gray.200'} 
                  placeholder={'Enter a message...'}
                  onChange={typingHandler}
                  value={newMessage}

                />
              </FormControl>
          </Box>

        </>
      ) : (
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          h={"100%"}
        >
          <Text fontSize={"3xl"} color={"gray.500"} fontFamily={"work sans"}>
            click on a chat to start messaging
          </Text>
        </Box>
      )}
    </>
  );
};

export default SingleChat;
