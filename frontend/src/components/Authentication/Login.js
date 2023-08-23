import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import { set } from "mongoose";
import React, { useState } from "react";


const Login = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
 
  const handleClick = () => {
    setShow((show + 1) % 2);
  };

  const postDetails = () => {
    
  };

  const submitHandler = () => {

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
        
          <Input
            type={show ? "text" : "password"}
            placeholder="enter your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
      </FormControl>

       <Button 
        colorScheme="blue"
        width={"100%"}
        mt={15}
        onClick={submitHandler}
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