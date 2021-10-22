import { assertAbstractType } from "graphql";
import React, { useState, useEffect } from "react";
import styled from "styled-components";

const createPost = async (input) => {
  const res = await fetch("https://graphqlzero.almansi.me/api", {
    "method": "POST",
    "headers": { "content-type": "application/json" },
    "body": JSON.stringify({
      variables: {
        "input": { ...input }
      },
      query: `mutation (
        $input: CreatePostInput!
      ) {
        createPost(input: $input) {
          id
          title
          body
        }
      }`
    })
  })
  const data = await res.json();
  return data;
}

interface Props {
  setData
  data
}

const Create: React.FC<Props> = ({ setData, data }) => {
  const [info, setinfo] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        const newPost = await createPost({ title: 'aa', body: 'bbb' });

        // console.log(data);
        data.unshift(newPost.data.createPost);
        // console.log(data);

        setData(data);
      } catch (error) {
        console.log('error', error);
      }
    };
    fetchData();
  }, []);


  // console.log(info);

  return (
    <>
      <Title>Create a new post !!!</Title>
      <p>aaaa</p>
    </>
  )
};

export default Create;

const Title = styled.h1`
  margin-top: 5rem;  
  font-size: 2rem;
  color: midnightblue;
  text-shadow: 2px 2px 10px;
  font-family: cursive;
`;
