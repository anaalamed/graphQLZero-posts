import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const TopBar: React.FC = () => {

    return (
        <Header >

            <Nav>
                <li>
                    <StyledLink to="/">Home</StyledLink>
                </li>
                <li>
                    <StyledLink to="/browse">Browse</StyledLink>
                </li>
                <li>
                    <StyledLink to="/create">Create</StyledLink>
                </li>
            </Nav>

        </Header >
    );
};
export default TopBar;


const Header = styled.header`
  background: midnightblue;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.2);
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 100;
  padding: 0.4rem 2rem;
  width: 100%;
  height: 5rem;
`;

const Nav = styled.ul`
  list-style: none;
  display: flex;
`;

const StyledLink = styled(Link)`
    color: mintcream;
    text-decoration: none;
    padding: 3rem;
    font-size: 2rem;
    font-weight: bold;
  `;