import { useQuery, gql } from "@apollo/client";
import React, { useState, useEffect } from 'react';
import Posts from './Posts'

const getPosts = async () => {
  const res = await fetch("https://graphqlzero.almansi.me/api", {
    "method": "POST",
    "headers": { "content-type": "application/json" },
    "body": JSON.stringify({
      variables: {
        "options": {
          "paginate": {
            "page": 1,
            "limit": 100
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
            }
            body
          }
          meta {
            totalCount
          }
        }
      }`
    })
  })
  const data = await res.json();
  return data;
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

const ExchangeRates: React.FC = () => {
  const [info, setinfo] = useState();

  useEffect(() => {

    async function fetchData() {
      try {
        setinfo(await getPosts());
        // setinfo(await createPost({ title: "a", body: 'b' }));
        // setinfo(await deletePost(1));
      } catch (error) {
        console.log('error', error);
      }
    };
    fetchData();
  }, [])


  console.log(info);

  return <p>data</p>
  // return <Posts posts={info.data.data}></Posts>

}

export default ExchangeRates;

