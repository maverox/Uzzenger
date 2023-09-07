import React, { createContext, useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
const ChatContext = createContext();
const ChatProvider = ({children}) => {
    const history = useHistory();
    const [user, setUser] = useState();
    const [selectedChat, setSelectedChat] = useState();
    const [chats, setChats] = useState([]);
    useEffect(() => {
      //fetch user data from local storage and set it to user state
      
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      setUser(userInfo);
        if (!userInfo) {
            history.push('/');
        }
    }, [history])
    
  return (
    <ChatContext.Provider value={{user, setUser, selectedChat, setSelectedChat, chats, setChats}}>{children}</ChatContext.Provider>
  )
}
export const ChatState = () => {
    return useContext(ChatContext)
}
export default ChatProvider