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

const Signup = () => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [pic, setPic] = useState();
  const handleClick = () => {
    setShow((show + 1) % 2);
  };

  const postDetails = () => {
    
  };

  const submitHandler = () => {

  }; 
  return (
    <VStack spacing={"5px"}>
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="enter your name"
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>

      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          placeholder="enter your Email"
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

      <FormControl id="confirm-password" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Confirm your Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <InputRightElement>
            <Button h="1.75rem" w={"4.5rem"} onClick={handleClick}>
              {show ? "hide" : "show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id="pic">
        <FormLabel>Upload your picture</FormLabel>
        <Input
          type={"file"}
          p={1.5}
          accept="image/*"
          onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl>

       <Button 
        colorScheme="blue"
        width={"100%"}
        mt={15}
        onClick={submitHandler}
       >
        Sign Up
       </Button>
    </VStack>
  );
};

export default Signup;
