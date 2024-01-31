import React, { useState } from "react";
import { useProfile } from "../../contexts/Profile.context";
import getTMDBImgSrc from "../../utils/getTMDBImgSrc";
import styled from "styled-components";

function MyPage() {
  const { nickName, setNickName, likedMovies, setLikedMovies } = useProfile();
  const [inputNickName, setInputNickName] = useState("");

  const handleClickNickName = (e) => {
    e.preventDefault();
    setNickName(inputNickName);
  };

  const handleClickCancleLike = (movie) => {
    const { title } = movie;

    setLikedMovies(
      likedMovies.filter((likedMovie) => likedMovie.title !== title)
    );
  };
  console.log(likedMovies);
  return (
    <Wrapper>
      <form>
        <h2>개인 정보 수정</h2>
        <NickNameContainer>
          <label htmlFor="nickName">닉네임</label>
          <NickNameInput
            onChange={(e) => setInputNickName(e.target.value)}
            id="nickName"
            type="text"
            placeholder="닉네임을 설정해주세요"
          />
          <NickNameBtn onClick={handleClickNickName}>수정</NickNameBtn>
        </NickNameContainer>
      </form>
      <div>
        <h2>{nickName}님이 좋아요 한 영화 목록 🎥</h2>
        <LikedMovieList>
          {likedMovies.map((likeMovie) => (
            <LikedMovieItem key={likeMovie.title}>
              <LikedMovieImg
                src={getTMDBImgSrc(likeMovie.poster)}
                alt={likeMovie.title}
              />
              <TextContainer>
                <h5>{likeMovie.title}</h5>
                <CancleBtn onClick={() => handleClickCancleLike(likeMovie)}>
                  ✂️
                </CancleBtn>
              </TextContainer>
            </LikedMovieItem>
          ))}
        </LikedMovieList>
      </div>
    </Wrapper>
  );
}

export default MyPage;

const Wrapper = styled.div`
  max-width: 1024px;
  margin: 0 auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 8rem;
`;
const NickNameContainer = styled.div`
  justify-content: center;
  display: flex;
  align-items: center;
`;
const NickNameInput = styled.input`
  border: none;
  margin-left: 10px;
  margin-right: 8px;
  width: 200px;
  padding: 6px 10px;
  border-radius: 6px;

  &:focus {
    outline: none;
    background-color: lightgray;
  }
`;
const NickNameBtn = styled.button`
  background-color: red;
  border: none;
  color: white;
  padding: 8px 12px;
  border-radius: 6px;
`;
const LikedMovieList = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
`;
const LikedMovieItem = styled.li`
  padding: 3rem 0;
`;
const LikedMovieImg = styled.img`
  width: 200px;
  border-radius: 8px;
`;
const TextContainer = styled.div`
  display: flex;
  justify-content: center;
`;
const CancleBtn = styled.button`
  background-color: transparent;
  border: none;
  padding: 0 10px;
  cursor: pointer;
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.2);
  }
  justify-content: flex-end;
`;
