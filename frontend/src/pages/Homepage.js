import React, { useEffect } from "react";
import { Container, Box, Text, Tabs, TabPanels, TabPanel, TabList, Tab } from "@chakra-ui/react";
import Login from './../components/Authentication/Login';
import Signup from "../components/Authentication/Signup";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Homepage = () => {
  const history = useHistory();
  useEffect(() => { 
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo) {
      history.push('/chats');
    }
    } catch (error) {
      console.log(error);
    }
  }, [history])

  return (
    <Container maxW="xl" centerContent>
      <Box
        d="flex"
        justifyContent="center"
        p={3}
        bg={"gray.200"}
        w="100%"
        m={"20px 0 15px 0"}
        borderRadius="lg"
        borderWidth={"1px"}
        textAlign={"center"}
        filter={"auto"}
        blur={'10'}
        boxShadow="0px 8px  20px 2px #335599"
        transition={"box-shadow 0.4s ease-in-out"}
        _hover={{
          boxShadow: "0px 3px  18px 2px #777799",
        }}
      >
        <Text fontSize={"4xl"} fontFamily={"Work sans"} color={"blue.900"}>
          Uzzenger
        </Text>
      </Box>
      <Box
        d="flex"
        justifyContent="center"
        p={3}
        bg={"gray.200"}
        w="100%"
        m={"10px 0 15px 0"}
        borderRadius="lg"
        borderWidth={"1px"}
        textAlign={"center"}
        boxShadow="0px 8px  20px 2px #335599"
        transition={"box-shadow 0.4s ease-in-out"}
        _hover={{
          boxShadow: "0px 3px  18px 2px #777799",
        }}
      >
        <Tabs  isFitted variant="soft-rounded" colorScheme="blue">
          <TabList mb="1em">
            <Tab>Login</Tab>
            <Tab>Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default Homepage;
