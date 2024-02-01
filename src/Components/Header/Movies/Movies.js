import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { useProfile } from "../../../contexts/Profile.context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { CancleBtn } from "../../../pages/Mypage/MyPage";

const imageOrigin = "https://image.tmdb.org/t/p/w500";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.REACT_APP_TMDB_ACCESS_TOKEN}`,
  },
};
function Movies({ title, url, isLoggedIn }) {
  const {
    likedMovies,
    setLikedMovies,
    handleClickLikeBtn,
    handleClickCancleLike,
  } = useProfile();

  const [movies, setMovies] = useState([]);

  //좋아요
  const handleClickLike = (movie) => {
    handleClickLikeBtn(movie);
  };

  //좋아요 취소
  const handleclickCancel = (movie) => {
    handleClickCancleLike(movie);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(url, options);
      const data = await response.json();
      setMovies(data.results);
    };

    fetchData();
  }, [url]);

  return (
    <Wrapper>
      <h4>{title}</h4>
      <MovieSwiper spaceBetween={50} slidesPerView={5}>
        {movies?.map((movie) => (
          <SwiperSlide key={movie?.id}>
            <MovieContainer>
              <MovieItem to={`/movies/${movie?.id}`}>
                <MovieImg
                  src={`${imageOrigin}${movie.backdrop_path}`}
                  alt={movie?.title}
                />
                <h6>{movie?.title}</h6>
              </MovieItem>
              {!likedMovies.some(
                (likedMovie) => likedMovie.title === movie.title
              ) ? (
                <span
                  class="material-symbols-outlined"
                  onClick={() => handleClickLike(movie)}
                  style={{ color: "red", cursor: "pointer" }}
                >
                  favorite
                </span>
              ) : (
                <span
                  class="material-symbols-outlined"
                  onClick={() => handleclickCancel(movie)}
                  style={{ color: "red", cursor: "pointer" }}
                >
                  heart_check
                </span>
              )}
            </MovieContainer>
          </SwiperSlide>
        ))}
      </MovieSwiper>
    </Wrapper>
  );
}

export default Movies;

const Wrapper = styled.div`
  padding: 3rem;

  a {
    color: white;
    text-decoration: none;
    text-align: center;
  }
`;

const MovieSwiper = styled(Swiper)`
  .swiper-container {
    overflow: hidden;
  }

  .swiper-button-prev,
  .swiper-button-next {
    color: white;
  }
  display: flex;
`;

const MovieItem = styled(Link)`
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;

  h6 {
    margin-top: 10px;
    align-self: center;
  }
`;
const MovieContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: center;
`;
const MovieImg = styled.img`
  object-fit: cover;
  width: 200px;
  border-radius: 4px;
  transition: 0.2s;

  &:hover {
    transform: scale(1.1);
  }
`;

const LikeBtn = styled.button`
  width: 70px;
  border: 1px solid red;
  background-color: transparent;
  padding: 8px 20px;
  border-radius: 16px;
  transition: all 0.2s;
  color: red;

  &:hover {
    background-color: red;
    cursor: pointer;
    color: white;
  }
`;

const LinkedBtn = styled.div``;
