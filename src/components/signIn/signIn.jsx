import React from "react";
import "./signin.css";
import cookie_img from "../../imgs/cookie.png";

function signIn({ userInfo }) {

  async function deletCookiOnServer(){
    const req = await fetch("http://localhost:3000/clearCookie", {credentials: "include"})
    location.reload()
  }

  return (
    <div className="container">
      <h2>{userInfo.name}</h2>
      <div id="cookieCard">
        <p>{userInfo.cookie}</p>
        <div className="img">
          <img src={cookie_img} />
        </div>
      </div>
      <p id="dateRegistred-container">Registered in: {userInfo.date?.substring(0, 10)}</p>
      <button id="burnYourCookie-btn" onClick={()=> deletCookiOnServer()}>Burn you cookie</button>
    </div>
  );
}

export default signIn;
