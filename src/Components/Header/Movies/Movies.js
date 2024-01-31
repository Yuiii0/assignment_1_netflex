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
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNGNiZjJkZTdhYTk5NDBmZGQyYTRjMjcwZWIxYjU1OSIsInN1YiI6IjY1MDU5NDExNDJkOGE1MDBhYmIzNTBiZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nRdw47sDfUd039YGLbSp5Tx23bOThGP0rrndahvV7xQ",
  },
};
function Movies({ title, url, isLoggedIn }) {
  const { likedMovies, setLikedMovies } = useProfile();

  const [movies, setMovies] = useState([]);

  //좋아요 handler
  const handleClickLikeBtn = (title, poster) => {
    //중복체크
    if (!likedMovies.some((movie) => movie.title === title)) {
      setLikedMovies([
        ...likedMovies,
        { Liked: true, title: title, poster: poster },
      ]);
    }
  };

  //좋아요 취소 handler
  const handleClickLikeCancleBtn = (movie) => {
    const { title } = movie;
    setLikedMovies(
      likedMovies.filter((likedMovie) => likedMovie.title !== title)
    );
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
                  onClick={() =>
                    handleClickLikeBtn(movie.title, movie.poster_path)
                  }
                  style={{ color: "red" }}
                >
                  favorite
                </span>
              ) : (
                <span
                  class="material-symbols-outlined"
                  onClick={() => handleClickLikeCancleBtn(movie)}
                  style={{ color: "red" }}
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
