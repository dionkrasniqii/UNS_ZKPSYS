import axios from "axios";
import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CrudProvider from "../../provider/CrudProvider";
import logo from "../../assets/images/logo/logo.png";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

const Navbar = (props) => {
  const [forms, setForms] = useState([]);
  const token = localStorage.getItem("token");
  const user = token && jwtDecode(token);
  const myDiv = document.querySelector < HTMLElement > ".sidebarmobile";
  const toggleBtn = document.querySelector < HTMLElement > ".reportsMobile";
  const { t } = useTranslation();
  const langId = localStorage.getItem("i18nextLng");
  const sidebarItems = [
    //ZKPS staf
    {
      label: `${t("Applications")}`,
      path: "/application/index",
      roles: ["35", "61"],
    },
    //ZKPS admin
    //{ label: "Formularet", path: "/formular/index", roles: ["35"] },
    { label: `${t("Magazines")}`, path: "/magazine/index", roles: ["35"] },
    {
      label: `${t("PriceMagazines")}`,
      path: "/magazine/search",
      roles: ["35"],
    },
    { label: `${t("News")}`, path: "/news/index", roles: ["35"] },
    //ZKPS zyrtar
    {
      label: `${t("Applications")}`,
      path: "/myapplications/search",
      roles: ["5"],
    },
  ];

  const langs = {
    0: { name: "Shqip" },
    2: { name: "English" },
  };
  const filteredItems = sidebarItems.filter((item) =>
    item.roles.includes(user?.role)
  );
  useEffect(() => {
    if (user && user.role == 5) {
      CrudProvider.getAll("FormulariAPI").then((res) => {
        if (res) {
          if (res.statusCode === 200) {
            setForms(res.result);
          }
        }
      });
    }
  }, [token]);

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
        <div className="rbt-header-wrapper header-sticky">
          <div className="container-fluid">
            <div className="mainbar-row rbt-navigation-center align-items-center  header-space-betwween">
              <div className="header-left rbt-header-content">
                <div className="header-info">
                  <div className="logo">
                    <Link to="/">
                      <img src={logo} alt="Education Logo Images" />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="rbt-main-navigation d-none d-xl-block">
                <nav className="mainmenu-nav">
                  <ul className="mainmenu">
                    <li className="">
                      <Link to={"/"}> {t("Home")}</Link>
                    </li>
                    {filteredItems.length > 0 &&
                      filteredItems.map((item, index) => (
                        <li key={index} className="">
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
                              <li key={index} className=" position-static">
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
                      <li className=" position-static">
                        <Link to={"/login"}>{t("Login")}</Link>
                      </li>
                    )}
                    <li className="nav-item-langage">
                      <Link
                        onClick={(e) => i18next.changeLanguage("0")}
                        className="btnFleg order-lg-3"
                      >
                        <img
                          src="https://flagicons.lipis.dev/flags/4x3/al.svg"
                          alt=""
                        />
                      </Link>
                      <Link
                        onClick={(e) => i18next.changeLanguage("2")}
                        className="btnFleg order-lg-3"
                      >
                        <img
                          src="https://flagicons.lipis.dev/flags/4x3/gb.svg"
                          alt=""
                        />
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
              <div className="header-right">
                <ul className="quick-access">
                  {props.isAuth.isAuthenticated === true ? (
                    <>
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
                          {user.role == 5
                            ? "PROFESOR"
                            : user.role == 35
                            ? "ZKPS"
                            : "KOMISION"}
                        </a>
                        <div className="rbt-user-menu-list-wrapper">
                          <div className="inner">
                            <ul className="user-list-wrapper">
                              <li>
                                <a onClick={props.logout} type="button">
                                  <i className="feather-log-out" />
                                  <span>{t("Logout")}</span>
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </li>
                    </>
                  ) : (
                    <li className=" position-static"></li>
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
      <div className="popup-mobile-menu">
        <div className="inner-wrapper">
          <div className="inner-top">
            <div className="content">
              <div className="logo">
                <Link to="/">
                  <img src={logo} alt="Education Logo Images" />
                </Link>
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
          <nav className="mainmenu-nav">
            <ul className="mainmenu">
              <li className=" position-static">
                <Link to={"/"} onClick={closeSideBarOnMobile}>
                  {t("Home")}
                </Link>
              </li>
              {filteredItems.length > 0 &&
                filteredItems.map((item, index) => (
                  <li key={index} className=" position-static">
                    <Link
                      onClick={closeSideBarOnMobile}
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
                        <li key={index} className=" position-static">
                          <Link
                            onClick={closeSideBarOnMobile}
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
                <li className=" position-static">
                  <Link onClick={closeSideBarOnMobile} to={"/login"}>
                    {t("Login")}
                  </Link>
                </li>
              ) : (
                <li className=" position-static">
                  <a onClick={props.logout} type="button">
                    <i className="feather-log-out" />
                    <span>{t("Logout")}</span>
                  </a>
                </li>
              )}
              <li className="language-mobile">
                <Link
                  onClick={(e) => i18next.changeLanguage("0")}
                  className="me-3"
                >
                  <img
                    src="https://flagicons.lipis.dev/flags/4x3/al.svg"
                    alt=""
                  />
                </Link>
                <Link onClick={(e) => i18next.changeLanguage("2")} className="">
                  <img
                    src="https://flagicons.lipis.dev/flags/4x3/gb.svg"
                    alt=""
                  />
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};
export default Navbar;
