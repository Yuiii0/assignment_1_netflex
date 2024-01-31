import React, { useContext, useState } from "react";
import styles from "./SignInPage.module.scss";
import { useAuth } from "../../contexts/Auth.context";

function SignInPage() {
  const { isLoggedIn, signIn } = useAuth();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleClickSignIn = (e) => {
    e.preventDefault();
    if (!userName || !password)
      return alert("아이디 또는 비밀번호를 입력해주세요");

    if (userName === "udemy" && password === "udemy") {
      signIn();
    } else {
      return alert("아이디 또는 비밀번호가 일치하지 않습니다");
    }
  };
  return (
    <div>
      {isLoggedIn ? (
        <div>로그인 성공</div>
      ) : (
        <form className={styles.form}>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="아이디를 입력해주세요"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력해주세요"
          />
          <button onClick={handleClickSignIn}>로그인하기</button>
        </form>
      )}
    </div>
  );
}

export default SignInPage;
