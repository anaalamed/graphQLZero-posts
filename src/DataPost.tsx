import React, { useEffect, useState } from "react";
import styled from "styled-components";

interface Props {
  id
}

interface Post {
  id
  title
  body
  user
  comments
}

const getPost = async (id) => {
  // console.log(id)
  const res = await fetch("https://graphqlzero.almansi.me/api", {
    "method": "POST",
    "headers": { "content-type": "application/json" },
    "body": JSON.stringify({
      variables: {
        "id": id
      },
      query: `query (
        $id: ID!
      ) {
        post(id: $id) {
          id
          title
          body
          comments {
            data {
              name
            }
          }
          user {
            name
            company {
              name
            }
          }
        }
      }`
    })
  })
  const data = await res.json();
  return data.data.post;
}

const Post: React.FC<Props> = ({ id }) => {
  const [post, setPost] = useState<Post>();

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getPost(id);
        // console.log(data);
        setPost(data);
      } catch (error) {
        console.log('error', error);
      }
    };
    fetchData();
  }, [id])


  return (
    <Box>
      <Title>{post?.title}</Title>
      <p>{post?.body}</p>
      <Author>Author: {post?.user.name} from {post?.user.company.name}</Author>

      <h3>Comments:</h3>
      {post?.comments.data.map(comment => <p>{comment.name}</p>)}
    </Box>
  );
};

export default Post;

const Box = styled.div`
  /* width: 50%; */
  height: min-content;
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

  p {
    margin: 0;
  }
  `;

const Title = styled.p`
  font-size: 2rem;
  font-weight: bold;
  color: #242475;
  font-family: "Yanone Kaffeesatz";
  margin: 0;
  `;

const Author = styled.div`
  font-size: 1.3rem;
  font-weight: bold;
  color: #242475;
`;