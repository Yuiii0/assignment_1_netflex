import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
// import api from "../../api/api";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNGNiZjJkZTdhYTk5NDBmZGQyYTRjMjcwZWIxYjU1OSIsInN1YiI6IjY1MDU5NDExNDJkOGE1MDBhYmIzNTBiZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nRdw47sDfUd039YGLbSp5Tx23bOThGP0rrndahvV7xQ",
  },
};
function MoviesDetailPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState({});

  //gegMovie(movieId)로 변경
  // useEffect(() => {
  //   api.movies.getMovie(movieId).then((movie)=>setMovie(movie));
  // }, []);
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`,
      options
    )
      .then((response) => response.json())
      .then((movie) => setMovie(movie));
  }, [movieId]);
  if (movie === null) return null;
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
          <p>{movie.overview}</p>
          <GenreList>
            {/* {movie.genres.map((genre) => {
              <li key={genre.id}>{genre.name}</li>;
            })} */}
          </GenreList>
          <strong>{movie.vote_average}</strong>
        </MovieTextContainer>
      </Section>
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
