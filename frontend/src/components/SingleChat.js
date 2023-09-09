import React from "react";
import { ChatState } from "../Context/ChatProvider";
import { Box, IconButton, Text } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import ProfileModal from './miscellaneous/ProfileModal';
import { getSender, getSenderFull } from "../config/chatLogics";
import UpdateGroupChatModal from "./miscellaneous/UpdateGroupChatModal";

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const { user, selectedChat, setSelectedChat, chats, setChats } = ChatState();

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
        justifyContent={{base: "space-between"}}
        >
           <IconButton 
           display={{base: "flex", md: "none"}}
           icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat("")}
           /> 
           {!selectedChat.isGroupChat? (
            <>
            {getSender(user, selectedChat.users)}
            <ProfileModal user={getSenderFull(user, selectedChat.users)} /></>
           ) : (
                <>
                    {selectedChat.chatName.toUpperCase()}
                    <UpdateGroupChatModal fetchAgain={fetchAgain} setFetchAgain= {setFetchAgain} />
                
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
        w = {'100%'}
        
        borderRadius={'lg'}
        overflowY={'hidden'}
        

        >
            <br/>
            
            {/* messages here */}
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
