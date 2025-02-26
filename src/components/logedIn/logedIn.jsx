import React, { useEffect, useState } from "react";
import "./logedIn.css";
import cookie_simbol from "../../imgs/black_cookie_simbol.png";
import cookie from "../../imgs/cookie.png";

function logedIn({setPage}) {
  const [cookieExist, setCookieExist] = useState(
    document.cookie ? true : false
  );

  const [hableToEnter, setHableToEnter] = useState({
    name: "",
    cookie: document.cookie || "",
  });

  function renderingCookieBakeBTN() {
    if (!cookieExist) {
      return (
        // cookie nao existe
        <>
          <div className="img">
            <img src={cookie_simbol} alt="cookie simbol" />
          </div>
          <p>Bake a Cookie</p>
        </>
      );
    } else {
      //cookie existe
      return (
        <>
          <div className="img">
            <img src={cookie_simbol} alt="cookie simbol" />
          </div>
          <p>Cookie Baked!</p>
        </>
      );
    }
  }

  const bakeCookie = async () => {
    // criar um cookie
    if (!cookieExist) {
      var cookieBaked = await fetch("http://localhost:3000/setCookie", {
        credentials: "include",
      });
      console.log("cookie criado com sucesso");
      cookieBaked = await cookieBaked.json();
      setCookieExist(true);
      setHableToEnter((x) => {
        return { ...x, cookie: cookieBaked.cookie };
      });
    } else {
      console.log("cookie ja existe!");
    }
  };

  async function entering(){
    let x = await fetch("http://localhost:3000/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: 'include',
        body: JSON.stringify(hableToEnter.name)
    })
    if(x.status == 200){
        location.reload()
      }else{
      location.reload()
    }
  }
  return (
    <div className="container">
      <div id="title-text">
        <h2>Eat a Cookie</h2>
        <p>Lets create a Register to you Eat all the Cookies.</p>
        <hr />
      </div>

      <div id="createRegister-fields">
        <div id="createRegister-field">
          <label>Nome:</label>
          <input
            type="text"
            onChange={(inp) =>
              setHableToEnter((x) => {
                return { ...x, name: inp.target.value };
              })
            }
          />
        </div>
        <button id="bakeCookie-btn" onClick={() => bakeCookie()}>
          {renderingCookieBakeBTN()}
        </button>
      </div>

      <button
        className={
          hableToEnter.name && hableToEnter.cookie
            ? "enter-btn"
            : "enter-btn enter-btn_disabled"
        }
        onClick={() =>
          (hableToEnter.name != "") & (hableToEnter.cookie != "")
            ? entering()
            : console.log("Acesso Negado!")
        }
      >
        <div
          className={
            hableToEnter.name && hableToEnter.cookie
              ? "img cookie1 img-animate"
              : "img cookie1"
          }
        >
          <img src={cookie} draggable="false" />
        </div>
        <div
          className={
            hableToEnter.name && hableToEnter.cookie
              ? "img cookie2 img-animate"
              : "img cookie2"
          }
        >
          <img src={cookie} draggable="false" />
        </div>
        {/* <div className="img"> <img src={cookie} /></div> */}
        <p>Enter</p>
      </button>
    </div>
  );
}

export default logedIn;
