import React, { useState, useEffect } from 'react';
import styled from "styled-components";

import Post from './Post'

interface Props {
    data
    setCurrentPost
    setCurrentUser
}

const Posts: React.FC<Props> = ({ data, setCurrentPost, setCurrentUser }) => {

    return (
        <Box>
            {data?.map(post => (
                <div onClick={() => {
                    setCurrentPost(post.id);
                    setCurrentUser(post.user.id)
                }}>
                    <Post key={post.id} post={post} ></Post>
                </div>))
            }
        </Box >
    );
}

export default Posts;

const Box = styled.div`
  height: 80vh;
  overflow-y: scroll;
`;
