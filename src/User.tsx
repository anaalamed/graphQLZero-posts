import React, { useEffect, useState } from "react";
import styled from "styled-components";

interface Props {
    id
}

interface User {
    id
    name
    username
    website
    company: { name }
    address: { suite, street }
    email
}

const getUser = async (id) => {
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
                user(id: $id) {
                id
                name
                username
                website
                company {
                    name
                }
                address {
                    street
                }
                email
              }
            }`
        })
    })
    const data = await res.json();
    return data.data.user;
}

const Post: React.FC<Props> = ({ id }) => {
    const [user, setUser] = useState<User>();

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getUser(id);
                // console.log(data);
                setUser(data);
            } catch (error) {
                console.log('error', error);
            }
        };
        fetchData();
    }, [id])


    return (
        <Box>
            <Title>{user?.name}</Title>
            <p>Username: {user?.username}</p>
            <p>Company: {user?.company.name}</p>
            <p>Website: {user?.website}</p>
            <p>Email: {user?.email}</p>
            <p>Address: {user?.address.street}</p>



        </Box>
    );
};

export default Post;

const Box = styled.div`
  /* width: 50%; */
  height: max-content;
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
  `;

const Author = styled.div`
  font-size: 1.3rem;
  font-weight: bold;
  color: #242475;
`;