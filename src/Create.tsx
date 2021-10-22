import { assertAbstractType } from "graphql";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, Redirect } from "react-router-dom";


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
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [redirect, setredirect] = useState(false);

  // useEffect(() => {
  async function fetchData({ title, body }) {
    try {
      const newPost = await createPost({ title, body });
      data.unshift(newPost.data.createPost);
      setData(data);
    } catch (error) {
      console.log('error', error);
    }
  };
  // fetchData();
  // }, []);

  const handleSubmit = () => {
    fetchData({ title, body });
    setredirect(true);
  }

  return (
    <Box>
      <Title>Create a new post !!!</Title>

      <Form onSubmit={e => e.preventDefault()}>
        {/* <label>Title</label> */}
        <input
          name="title"
          type="title"
          placeholder="Title"
          onChange={e => setTitle(e.target.value)}
        />

        {/* <label>Body</label> */}
        <input
          name="body"
          type="body"
          placeholder="Body"
          onChange={e => setBody(e.target.value)}
        />

        <input className="button" type="submit" onClick={handleSubmit} />
      </Form>

      {redirect ? (<Redirect to="/browse"></Redirect>) : null}
    </Box>
  )
};

export default Create;

const Box = styled.div`
  margin-top: 3.5rem;
  background: #4775f3;
  border-radius: 1rem;
  justify-content: center;
  width: 100%;
`;

const Title = styled.h1`
  margin-top: 5rem;  
  font-size: 2rem;
  color: midnightblue;
  text-shadow: 2px 2px 10px;
  font-family: cursive;
  text-align: center
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 1rem;
  padding: 1rem;
  width: 20rem;

  input { 
    padding: 1rem;
    margin: 1rem;
    border-radius: 1rem;
  }

  .button {
    background: midnightblue;
    color: white;
  }
`;
