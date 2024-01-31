const { createContext, useState, useContext } = require("react");

const profileInitalValue = {
  nickName: "none",
  setNickName: () => {},
  likedMovies: [],
  setLikedMovies: () => {},
};

const ProfileContext = createContext(profileInitalValue);

export function ProfileProvider({ children }) {
  const [nickName, setNickName] = useState("User");
  const [likedMovies, setLikedMovies] = useState([]);
  const value = {
    nickName,
    setNickName,
    likedMovies,
    setLikedMovies,
  };
  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
}

export const useProfile = () => useContext(ProfileContext);

export default ProfileContext;
