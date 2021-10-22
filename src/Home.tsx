import React, { useEffect, useState } from "react";
import styled from "styled-components";


const Post: React.FC = ({ }) => {


  return (
    <Box>
      <h1>React</h1>
      <h1>GraphQLZero</h1>
      <h1>Apollo</h1>
      <h1>TypeScript</h1>
    </Box>
  );
};

export default Post;

const Box = styled.div`
  margin-top: 10rem;
  background: #4775f3; 
  border-radius:10px;
  padding:  1rem;
  font-size: 2rem;
  color: white;
  width: 100%;
  `;

const Title = styled.p`
  font-size: 2rem;
  font-weight: bold;
  color: #242475;
  font-family: "Yanone Kaffeesatz";
  margin: 0;
  padding-bottom: 1rem;
  `;
