import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { BrowserRouter, Route } from "react-router-dom";


import TopBar from './TopBar';
import Posts from './Posts';
import DataPost from './DataPost';
import User from './User';
import Create from './Create'

const getPosts = async () => {
  const res = await fetch("https://graphqlzero.almansi.me/api", {
    "method": "POST",
    "headers": { "content-type": "Browselication/json" },
    "body": JSON.stringify({
      variables: {
        "options": {
          "paginate": {
            "limit": 20
          }
        }
      },
      query: `query (
        $options: PageQueryOptions
      ) {
        posts(options: $options) {
          data {
            id
            title
            user {
              name
              id
            }
          }
          meta {
            totalCount
          }
        }
      }`
    })
  })
  const data = await res.json();
  return data.data.posts.data;
}

interface Props {
  data
}


const Browse: React.FC<Props> = ({ data }) => {
  // const [data, setData] = useState([]);
  const [currentPost, setCurrentPost] = useState(1);
  const [currentUser, setCurrentUser] = useState(1);


  return (
    <div>
      <Box>
        <Posts data={data} setCurrentPost={setCurrentPost} setCurrentUser={setCurrentUser}></Posts>

        <Details>
          <h2>The Post Data:  🚀</h2>
          <DataPost id={currentPost}></DataPost>

          <h2>User's details 🚀</h2>
          <User id={currentUser}></User>
        </Details>

      </Box>
    </div>
  );
}

export default Browse;

const Box = styled.div`
  margin-top: 3.5rem;
  display: flex;
  background: #4775f3;
  border-radius: 1rem;
  justify-content: center;
  width: 100%;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  border-left: 1px solid midnightblue;
  padding-left: 3rem;
  padding-right: 3rem;

  /* width: 100%; */
`;

