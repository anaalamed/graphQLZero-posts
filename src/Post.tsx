import React, { useEffect, useState } from "react";
import styled from "styled-components";

interface Post {
  post
}

const deletePost = async (id) => {
  console.log(id)
  const res = await fetch("https://graphqlzero.almansi.me/api", {
    "method": "POST",
    "headers": { "content-type": "application/json" },
    "body": JSON.stringify({
      variables: {
        "id": id
      },
      query: `mutation (
        $id: ID!
      ) {
        deletePost(id: $id)
      }
      `
    })
  })
  const data = await res.json();
  return data;
}

const Post: React.FC<Post> = ({ post }) => {

  const handleDelete = () => {
    console.log('delete');
    fetchData(1);
  }

  async function fetchData(id) {
    try {
      const newPost = await deletePost(id);
    } catch (error) {
      console.log('error', error);
    }
  };


  return (
    <Box>
      <Title>{post?.title}</Title>
      <Author>{post?.user?.name}</Author>
      <button onClick={handleDelete}>delete</button>
    </Box>
  );
};

export default Post;

const Box = styled.div`
  /* width: 80%; */
  background: #ebebf9; 
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 2px solid blue;
  border-radius:10px;
  margin: 10px;
  padding: 1rem;
  
  &:hover {
    background: coral;
    transition: 1s;
  }
  &:hover .iconL {
    color: white;
    transition: 1s;
  }
  `;

const Title = styled.p`
  font-size: 2rem;
  font-weight: bold;
  color: #242475;
  font-family: "Yanone Kaffeesatz";
  margin: 0;
  padding-bottom: 1rem;
  `;

const Button = styled.button`
  border-radius: 0.5rem;  
  width: max-Title;
  padding: 0.4rem;
  -webkit-box-shadow: inset -1px 3px 8px 5px #1F87FF, 2px 5px 16px 0px #0B325E, 8px 9px 13px 5px rgba(0,0,0,0.5); 
  box-shadow: inset -1px 3px 8px 5px #1F87FF, 2px 5px 16px 0px #0B325E, 8px 9px 13px 5px rgba(0,0,0,0.5);
`


const Author = styled.div`
  font-size: 1.3rem;
  font-weight: bold;
  color: #242475;
`;

