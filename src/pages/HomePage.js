import React from "react";
import Header from "../Components/Header/Header";
import Movies from "../Components/Header/Movies/Movies";
const nowPlayingEndpoint =
  "https://api.themoviedb.org/3/movie/now_playing?language=ko-KR&page=1&region=KR";
const topRatedEndpoint =
  "https://api.themoviedb.org/3/movie/top_rated?language=ko-KR&page=1&region=KR";

function HomePage() {
  return (
    <main>
      <Movies title={"현재 상영작"} url={nowPlayingEndpoint} />
      <Movies title={"평점이 높은 영화"} url={topRatedEndpoint} />
    </main>
  );
}

export default HomePage;
