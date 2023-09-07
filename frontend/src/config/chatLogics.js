import React from 'react'
//it returns the user who is not the logger user
export const getSender = (loggerUser, users) => { 

    return users.find((user) => user._id !== loggerUser._id).name;
};