import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

const Login = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const history = useHistory();

  const handleClick = () => {
    setShow((show + 1) % 2);
  }; 
  const submitHandler = async () => {
    setLoading(true);
    //check for empty fields
    if (!email || !password) {
      toast({
        title: "Please fill all the fields!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(  
        "/api/user/login",
        { email, password },
        config
      );

      console.log(data);
      toast({
        title: "Logged in Successfully!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data)); //store user info in local storage
      setLoading(false);
      history.push("/chats");
    } catch (err) {
      console.log(err);
      toast({
        title: "Something went wrong!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
    
  }; 
  return (
    <VStack spacing={"5px"}>
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          placeholder="enter your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>

      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="enter your Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement>
            <Button h="1.75rem" w={"4.5rem"} onClick={handleClick}>
              {show ? "hide" : "show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
       <Button 
        colorScheme="blue"
        width={"100%"}
        mt={15}
        onClick={submitHandler}
        isLoading={loading}
       >
        Login
       </Button>

       <Button 
        colorScheme="red"
        width={"100%"}
        mt={15}
        onClick={() => {
          setEmail("uzzuboi@gmail.com");
          setPassword("123456789");
        }}
       >
        Get Guest User Credentials
       </Button>
    </VStack>
  )
}

export default Login