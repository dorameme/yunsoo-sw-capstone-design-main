import { Link } from "react-router-dom";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import { useEffect, useState } from "react";
import { gapi } from "gapi-script";
import "./NavigationBar.css";
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  Container,
  NavDropdown,
  span,
} from "react-bootstrap";
import logo from "../logo.svg";
import "bootstrap/dist/css/bootstrap.min.css";

const clientId =
  "112172327061-95mqb878sgpt8t955rkkdug7mvgco8od.apps.googleusercontent.com";

const NavigationBar = () => {
  // 로그인 여부를 확인할 수 있는 state를 생성
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  console.log(isLoggedIn);

  // 로그인/로그아웃
  useEffect(() => {
    const start = () => {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    };

    gapi.load("client:auth2", start);
  }, []);

  return (
    <>
      <div className="NavigationBar">
        <Navbar bg="myColor" variant="dark">
          <Navbar.Brand href="./">
            <img src={logo} />{" "}
          </Navbar.Brand>
          <Nav>
            <div className="container-fluid">
              <form className="d-flex">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="검색어를 입력하세요"
                  aria-label="Search"
                ></input>
                <button className="btn btn-light" type="submit">
                  Search
                </button>
              </form>
            </div>
            <li className="nav-item">
              <a className="nav-link" href="Create/Novel">
                새 소설 등록
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="Mypage">
                마이페이지
              </a>
            </li>
          </Nav>
          {!isLoggedIn && <LoginButton loginHandler={setIsLoggedIn} />}
          {isLoggedIn && <LogoutButton logoutHandler={setIsLoggedIn} />}
        </Navbar>
      </div>
    </>
  );
};
export default NavigationBar;
