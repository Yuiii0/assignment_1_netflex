// const imageOrigin = "https://image.tmdb.org/t/p/w500";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.REACT_APP_TMDB_ACCESS_TOKEN}`,
  },
};

const getMovies = async (type) => {
  const endpoints = {
    nowPlaying:
      "https://api.themoviedb.org/3/movie/now_playing?language=ko-KR&page=1&region=KR",
    topRated:
      "https://api.themoviedb.org/3/movie/top_rated?language=ko-KR&page=1&region=KR",
  };

  const response = await fetch(endpoints, options);
  const data = await response.json();
  const movies = data.results;

  return movies;
};

const getMovie = async (movieId) => {
  const endpoint = `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`;
  const response = await fetch(endpoint, options);
  const data = await response.json();
  const movie = data.results;

  return movie;
};
export const moviesAPI = {
  getMovies,
  getMovie,
};
