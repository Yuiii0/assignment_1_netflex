import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import AuthContext from "../../contexts/Auth.context";
import { useProfile } from "../../contexts/Profile.context";

function Header() {
  const { isLoggedIn, logOut } = useContext(AuthContext);
  const { nickName, setNickName } = useProfile();

  return (
    <NHeader>
      <Title>
        <Link to="/">NETFLEX</Link>
      </Title>

      <NavMenu>
        <NavItem>
          <Link to="/my-page">My page</Link>
        </NavItem>
        {isLoggedIn ? (
          <>
            <NavItem>
              <h5>반가워요 {nickName}님 🤗</h5>
            </NavItem>
            <NavItem>
              <LogOutBtn onClick={logOut}>로그아웃</LogOutBtn>
            </NavItem>
          </>
        ) : (
          <NavItem>
            <Link to="/sign-in">로그인하기</Link>
          </NavItem>
        )}
      </NavMenu>
    </NHeader>
  );
}

export default Header;
const NHeader = styled.header`
  height: 80px;
  background-color: black;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
`;
const Title = styled.h2`
  padding: 1rem;
  margin: 0;
  color: red;
  letter-spacing: -2px;

  a {
    color: red;
    text-decoration: none;
    font-size: 32px;
  }
`;
const NavMenu = styled.ul`
  display: flex;
  gap: 20px;
  align-items: center;
`;
const NavItem = styled.li`
  list-style: none;
  padding-left: 0;

  a {
    color: white;
    text-decoration: none;
    /* font-size: 18px; */
    font-weight: 700;
  }
`;
const LogOutBtn = styled.button`
  border: none;
  border-radius: 8px;
  padding: 6px 12px;
  color: white;
  background-color: red;
`;
