import axios from "axios";
import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CrudProvider from "../../provider/CrudProvider";

import logo from "../../assets/images/logo/logo.png";

const sidebarItems = [
  // { label: "Ballina", path: "/", roles: ["35", "5", "61"] },
  //ZKPS staf
  { label: "Aplikimet", path: "/application/index", roles: ["35", "61"] },
  //ZKPS admin
  { label: "Formularet", path: "/formular/index", roles: ["61"] },
  { label: "Revistat", path: "/magazine/index", roles: ["61"] },
  { label: "Revistat Shuma", path: "/magazine/search", roles: ["61"] },
  //ZKPS profesor
  { label: "Aplikimet", path: "/myapplications/search", roles: ["5"] },
];

const Navbar = (props) => {
  const [forms, setForms] = useState([]);

  useEffect(() => {
    CrudProvider.getAll("FormulariAPI").then((res) => {
      if (res) {
        if (res.statusCode === 200) {
          setForms(res.result);
        }
      }
    });
  }, []);

  const token = localStorage.getItem("token");
  const user = token && jwtDecode(token);

  const filteredItems = sidebarItems.filter((item) =>
    item.roles.includes(user?.role)
  );

  const myDiv = document.querySelector < HTMLElement > ".sidebarmobile";
  const toggleBtn = document.querySelector < HTMLElement > ".reportsMobile";
  if (toggleBtn) {
    toggleBtn.addEventListener("click", function () {
      if (myDiv) {
        if (myDiv.classList.contains("block")) {
          myDiv.style.display = "none";
        } else {
          myDiv.classList.add("block");
          myDiv.style.display = "block";
        }
      }
    });
  }
  function openSideBarOnMobile() {
    let button = document.getElementsByClassName("popup-mobile-menu");
    for (let i = 0; i < button.length; i++) {
      const element = button[i];
      element.classList.add("active");
    }
  }

  function closeSideBarOnMobile() {
    let button = document.getElementsByClassName("popup-mobile-menu");
    for (let i = 0; i < button.length; i++) {
      const element = button[i];
      element.classList.remove("active");
    }
  }

  return (
    <>
      <header className="rbt-header rbt-header-10 ">
        <div className="rbt-sticky-placeholder" />
        <div className="rbt-header-wrapper header-space-betwween header-sticky">
          <div className="container-fluid">
            <div className="mainbar-row rbt-navigation-center align-items-center">
              <div className="header-left rbt-header-content">
                <div className="header-info">
                  <div className="logo">
                    <Link to="/">
                      <img src={logo} alt="Education Logo Images" />
                      {/* <div className="d-block">
                        <span className="first-logo">ZKPS</span>
                        <span className="second-logo">
                          Zyra për Kërkime dhe Projekte të Sponsorizuara
                        </span>
                      </div> */}
                    </Link>
                  </div>
                </div>
              </div>
              <div className="rbt-main-navigation d-none d-xl-block">
                <nav className="mainmenu-nav">
                  <ul className="mainmenu">
                    <li className=" position-static">
                      <Link to={"/"}>Ballina</Link>
                    </li>
                    {filteredItems.length > 0 &&
                      filteredItems.map((item, index) => (
                        <li key={index} className=' position-static'>
                          <Link to={item.path} key={item.path}>
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    {user?.role == 5 && (
                      <>
                        {forms.length > 0 &&
                          forms.map((obj, index) => {
                            return (
                              <li key={index} className=' position-static'>
                                <Link
                                  to={`/application/create/${btoa(
                                    obj.formulariId
                                  )}`}
                                >
                                  {obj.pershkrimi}
                                </Link>
                              </li>
                            );
                          })}
                      </>
                    )}
                    {props.isAuth.isAuthenticated === false && (
                      <li className=' position-static'>
                        <Link to={"/login"}>Login</Link>
                      </li>
                    )}
                  </ul>
                </nav>
              </div>
              <div className="header-right">
                <ul className="quick-access">
                  {props.isAuth.isAuthenticated === true ? (
                    <>
                      <li className="access-icon">
                        <Link
                          className="search-trigger-active rbt-round-btn"
                          to="#"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={16}
                            height={16}
                            fill="currentColor"
                            className="bi bi-translate"
                            viewBox="0 0 16 16"
                          >
                            <path d="M4.545 6.714 4.11 8H3l1.862-5h1.284L8 8H6.833l-.435-1.286H4.545zm1.634-.736L5.5 3.956h-.049l-.679 2.022H6.18z" />
                            <path d="M0 2a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v3h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-3H2a2 2 0 0 1-2-2V2zm2-1a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H2zm7.138 9.995c.193.301.402.583.63.846-.748.575-1.673 1.001-2.768 1.292.178.217.451.635.555.867 1.125-.359 2.08-.844 2.886-1.494.777.665 1.739 1.165 2.93 1.472.133-.254.414-.673.629-.89-1.125-.253-2.057-.694-2.82-1.284.681-.747 1.222-1.651 1.621-2.757H14V8h-3v1.047h.765c-.318.844-.74 1.546-1.272 2.13a6.066 6.066 0 0 1-.415-.492 1.988 1.988 0 0 1-.94.31z" />
                          </svg>
                        </Link>
                      </li>
                      <li className="account-access rbt-user-wrapper d-none d-xl-block">
                        <a href="#">
                          <span className="pe-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width={18}
                              height={18}
                              fill="currentColor"
                              className="bi bi-person"
                              viewBox="0 0 16 16"
                            >
                              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
                            </svg>
                          </span>
                          {user.role == 5 ? "Profesor" : "Staf"}
                        </a>
                        <div className="rbt-user-menu-list-wrapper">
                          <div className="inner">
                            <ul className="user-list-wrapper">
                              <li>
                                <a onClick={props.logout} type='button'>
                                  <i className='feather-log-out' />
                                  <span>Logout</span>
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </li>
                    </>
                  ) : (
                    <li className=' position-static'></li>
                  )}
                </ul>
                {/* Start Mobile-Menu-Bar */}
                <div className="mobile-menu-bar d-block d-xl-none">
                  <div className="hamberger">
                    <button
                      className="hamberger-button rbt-round-btn"
                      onClick={openSideBarOnMobile}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={20}
                        height={20}
                        fill="currentColor"
                        className="bi bi-list"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      {/*-----------------------Pjesa per mobile---------------------------------------------*/}
      {/*-----------------------Pjesa per mobile---------------------------------------------*/}
      {/*-----------------------Pjesa per mobile---------------------------------------------*/}
      {/*-----------------------Pjesa per mobile---------------------------------------------*/}
      <div className="popup-mobile-menu">
        <div className="inner-wrapper">
          <div className="inner-top">
            <div className="content">
              <div className="logo">
                <a href="index.html">
                  <img
                    src="https://uni-pr.edu/images/logosmall.png"
                    alt="Education Logo Images"
                  />
                </a>
              </div>
              <div className="rbt-btn-close">
                <button
                  className="close-button rbt-round-btn"
                  onClick={closeSideBarOnMobile}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={16}
                    height={16}
                    fill="currentColor"
                    className="bi bi-x-lg"
                    viewBox="0 0 16 16"
                  >
                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <nav className='mainmenu-nav'>
            <ul className='mainmenu'>
              <li className=' position-static'>
                <Link to={"/"} onClick={closeSideBarOnMobile()}>
                  Ballina
                </Link>
              </li>
              {filteredItems.length > 0 &&
                filteredItems.map((item, index) => (
                  <li key={index} className=' position-static'>
                    <Link
                      onClick={closeSideBarOnMobile()}
                      to={item.path}
                      key={item.path}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              {user?.role == 5 && (
                <>
                  {forms.length > 0 &&
                    forms.map((obj, index) => {
                      return (
                        <li key={index} className=' position-static'>
                          <Link
                            onClick={closeSideBarOnMobile()}
                            to={`/application/create/${btoa(obj.formulariId)}`}
                          >
                            {obj.pershkrimi}
                          </Link>
                        </li>
                      );
                    })}
                </>
              )}
              {props.isAuth.isAuthenticated === false ? (
                <li className=' position-static'>
                  <Link onClick={closeSideBarOnMobile()} to={"/login"}>
                    Login
                  </Link>
                </li>
              ) : (
                <li className=' position-static'>
                  <a
                    onClick={(props.logout, closeSideBarOnMobile())}
                    type='button'
                  >
                    <i className='feather-log-out' />
                    <span>Logout</span>
                  </a>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};
export default Navbar;
