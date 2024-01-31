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
        {isLoggedIn ? (
          <>
            <NavItem>
              <Link to="/my-page">마이 페이지</Link>
            </NavItem>
            <NavItem>
              <Hello>반가워요 {nickName}님 🤗</Hello>
            </NavItem>
            <NavItem>
              <LogBtn onClick={logOut}>로그아웃</LogBtn>
            </NavItem>
          </>
        ) : (
          <NavItem>
            <LogBtn>
              <Link to="/sign-in">로그인</Link>
            </LogBtn>
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
    font-size: 14px;
    font-weight: 500;
  }
`;
const LogBtn = styled.button`
  border: none;
  border-radius: 8px;
  padding: 6px 12px;
  color: white;
  background-color: red;
`;
const Hello = styled.h5``;
