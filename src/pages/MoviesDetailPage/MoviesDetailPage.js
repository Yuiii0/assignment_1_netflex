import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import getTMDBImgSrc from "../../utils/getTMDBImgSrc";
import { useProfile } from "../../contexts/Profile.context";
// import api from "../../api/api";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.REACT_APP_TMDB_ACCESS_TOKEN}`,
  },
};
function MoviesDetailPage() {
  const { movieId } = useParams();
  const { likedMovies, handleClickLikeBtn, handleClickCancleLike } =
    useProfile();
  const [movie, setMovie] = useState({});

  //gegMovie(movieId)로 변경
  // useEffect(() => {
  //   api.movies.getMovie(movieId).then((movie) => setMovie(movie));
  // }, [movieId]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`,
      options
    )
      .then((response) => response.json())
      .then((movie) => setMovie(movie));
  }, [movieId]);
  if (movie === null) return null;
  //좋아요
  const handleClickLike = (movie) => {
    handleClickLikeBtn(movie);
  };
  //좋아요 취소
  const handleclickCancel = (movie) => {
    handleClickCancleLike(movie);
  };

  return (
    <Wrapper>
      <Section>
        <PostImg>
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={movie.title}
          />
        </PostImg>
        <MovieTextContainer>
          <h2>{movie.title}</h2>
          {!likedMovies.some(
            (likedMovie) => likedMovie.title === movie.title
          ) ? (
            <span
              class="material-symbols-outlined"
              onClick={() => handleClickLike(movie)}
              style={{ color: "red" }}
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
          <p>{movie.overview}</p>
          <GenreList>
            {/* {movie?.genres.map((genre) => {
              <li key={genre.id}>{genre.name}</li>;
            })} */}
          </GenreList>
          <strong>{movie.vote_average}</strong>
        </MovieTextContainer>
      </Section>
      <imgSection>
        <img src={getTMDBImgSrc(movie.backdrop_path)} alt={movie.title} />
      </imgSection>
    </Wrapper>
  );
}

export default MoviesDetailPage;
const Wrapper = styled.div`
  margin: auto;
  max-width: 1024px;
`;
const Section = styled.section`
  display: flex;
`;

const PostImg = styled.div`
  img {
    width: 300px;
    border-radius: 16px;
  }
`;

const MovieTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-left: 3rem;

  strong {
    color: red;
  }
`;

const GenreList = styled.ul`
  display: flex;
  gap: 1rem;
  padding-left: 0;
`;
const imgSection = styled.section`
  img {
    text-align: center;
    border-radius: 16px;
    overflow: hidden;
  }
`;
