const { createContext, useState, useContext } = require("react");

const profileInitalValue = {
  nickName: "none",
  setNickName: () => {},
  likedMovies: [],
  setLikedMovies: () => {},
  handleClickLikeBtn: () => {},
  handleClickCancleLike: () => {},
};

const ProfileContext = createContext(profileInitalValue);

export function ProfileProvider({ children }) {
  const [nickName, setNickName] = useState("User");
  const [likedMovies, setLikedMovies] = useState([]);

  const handleClickCancleLike = (movie) => {
    const { title } = movie;

    setLikedMovies(
      likedMovies.filter((likedMovie) => likedMovie.title !== title)
    );
  };
  const handleClickLikeBtn = (movie) => {
    const { title, poster_path } = movie;
    if (!likedMovies.some((movie) => movie.title === title)) {
      setLikedMovies([
        ...likedMovies,
        { Liked: true, title: title, poster: poster_path },
      ]);
    }
  };
  const value = {
    nickName,
    setNickName,
    likedMovies,
    setLikedMovies,
    handleClickLikeBtn,
    handleClickCancleLike,
  };
  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
}

export const useProfile = () => useContext(ProfileContext);

export default ProfileContext;
