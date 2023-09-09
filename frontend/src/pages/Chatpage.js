import React, {  useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import { Box } from '@chakra-ui/react';
import SideDrawer from "../components/miscellaneous/SideDrawer";
import MyChats from "../components/MyChats";
import ChatBox from "../components/ChatBox";
const Chatpage = () => {
  const {user} = ChatState();
  const [fetchAgain, setFetchAgain] = useState(false)
  return (
    <div style={{width: "100%"}}>
      { user && <SideDrawer /> }
      <Box
      display={'flex'}
      flexDir={'row'}
      justifyContent={'space-between'}
      gap={1}
      
      >
        {user && <MyChats fetchAgain={fetchAgain}  />}
        {user && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
      </Box>
    </div>
  );
};

export default Chatpage;
