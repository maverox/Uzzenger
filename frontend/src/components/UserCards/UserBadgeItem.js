import { CloseIcon } from '@chakra-ui/icons';
import { Box } from '@chakra-ui/react';
import React from 'react'

const UserBadgeItem = ({user,  handleFunction }) => {
        return (
          <Box
            onClick={handleFunction}
            cursor="pointer"
            bg="#8c1aff" 
            color= {'white'}
            variant= "outline"
            px={2}
            py={1}
            mb={2}
            m={1}
            borderRadius="lg"
            display={'flex'}
            alignItems={'center'}
            justifyContent={'space-between'}

          > 
            <p>{user.name}</p>
            <CloseIcon ml={1} boxSize={3} color={'red.200'} />
          </Box>
        );
      }; 


export default UserBadgeItem