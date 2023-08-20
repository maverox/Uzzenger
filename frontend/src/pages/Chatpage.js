import React, { useEffect, useState } from "react";
import axios from "axios";
const Chatpage = () => {
  const [chats, setChats] = useState([]);
  const fetchChats = async () => {
    const {data} = await axios.get("/api/chats");
    setChats(data);
    console.log(data)
  };

  useEffect(() => {
    fetchChats();
  }, []);

  return (
    <div>
      {chats.map( (chat => (
        <div key={chat.id}> {chat.body}</div>
      )))}
    </div>
  );
};

export default Chatpage;
