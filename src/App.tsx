import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import './App.css';
import { BrowserRouter, Route } from "react-router-dom";


import TopBar from './TopBar';
import Posts from './Posts';
import DataPost from './DataPost';
import User from './User';
import Create from './Create';
import Browser from './Browse';
import Home from './Home'

const getPosts = async () => {
  const res = await fetch("https://graphqlzero.almansi.me/api", {
    "method": "POST",
    "headers": { "content-type": "application/json" },
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


function App() {
  const [data, setData] = useState([]);
  const [currentPost, setCurrentPost] = useState(1);
  const [currentUser, setCurrentUser] = useState(1);

  console.log(data);


  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getPosts();
        setData(data);
      } catch (error) {
        console.log('error', error);
      }
    };
    fetchData();
  }, [])

  return (

    <BrowserRouter>

      <TopBar></TopBar>

      <Route exact path="/" component={Home} />

      <Route path="/browse"
        render={(props) => (
          <Browser {...props} data={data} />
        )} />

      <Route path="/create"
        render={(props) => (
          <Create {...props} setData={setData} data={data} />
        )} />

    </BrowserRouter>

  );
}

export default App;

