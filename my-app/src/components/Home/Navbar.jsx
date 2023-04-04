import axios from "axios";
import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CrudProvider from "../../provider/CrudProvider";

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

  const token = localStorage.getItem("token");
  const user = token && jwtDecode(token);
  return (
    <>
      <header className='rbt-header rbt-header-10 '>
        <div className='rbt-sticky-placeholder' />
        <div className='rbt-header-wrapper header-space-betwween header-sticky'>
          <div className='container-fluid'>
            <div className='mainbar-row rbt-navigation-center align-items-center'>
              <div className='header-left rbt-header-content'>
                <div className='header-info'>
                  <div className='logo'>
                    <Link to='/'>
                      <img
                        src='https://uni-pr.edu/images/logosmall.png'
                        alt='Education Logo Images'
                      />
                    </Link>
                  </div>
                </div>
              </div>
              <div className='rbt-main-navigation d-none d-xl-block'>
                <nav className='mainmenu-nav'>
                  <ul className='mainmenu'>
                    <li className=' position-static'>
                      <Link to={"/"}>Ballina</Link>
                    </li>
                    {props.isAuth.isAuthenticated === false ? (
                      <li className=' position-static'>
                        <Link to={"/login"}>Login</Link>
                      </li>
                    ) : (
                      <>
                        {user?.role == 35 && (
                          <>
                            <li className=' position-static'>
                              <Link to={"/application/index"}>Aplikimet</Link>
                            </li>
                            <li className=' position-static'>
                              <Link to={"/formular/index"}>Formularet</Link>
                            </li>
                            <li className='has-dropdown has-menu-child-item'>
                              {/* <Link to={"/magazine/index"}>Revistat</Link> */}
                              <a>
                                Revistat
                                <i className='feather-chevron-down'>
                                  <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    width={16}
                                    height={16}
                                    fill='currentColor'
                                    className='bi bi-arrow-up-short'
                                    viewBox='0 0 16 16'
                                  >
                                    <path
                                      fillRule='evenodd'
                                      d='M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5z'
                                    />
                                  </svg>
                                </i>
                              </a>
                              <ul className='submenu'>
                                <li>
                                  <Link to='/magazine/index'>Revistat</Link>
                                </li>
                                <li>
                                  <Link to='/magazine/search'>
                                    Revistat Shuma
                                  </Link>
                                </li>
                              </ul>
                            </li>
                            <li className='has-dropdown has-menu-child-item'>
                              <a>
                                Reports
                                <i className='feather-chevron-down'>
                                  <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    width={16}
                                    height={16}
                                    fill='currentColor'
                                    className='bi bi-arrow-up-short'
                                    viewBox='0 0 16 16'
                                  >
                                    <path
                                      fillRule='evenodd'
                                      d='M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5z'
                                    />
                                  </svg>
                                </i>
                              </a>
                              <ul className='submenu'>
                                <li>
                                  <Link to='#'>Reports 1</Link>
                                </li>
                                <li>
                                  <Link to='#'>Reports 2</Link>
                                </li>
                              </ul>
                            </li>
                          </>
                        )}
                        {user?.role == 5 && (
                          <>
                            <li className=' position-static'>
                              <Link to={"/myapplications/search"}>
                                Aplikimet
                              </Link>
                            </li>
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
                      </>
                    )}
                  </ul>
                </nav>
              </div>
              <div className='header-right'>
                <ul className='quick-access'>
                  {props.isAuth.isAuthenticated === true ? (
                    <>
                      <li className='access-icon'>
                        <Link
                          className='search-trigger-active rbt-round-btn'
                          to='#'
                        >
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width={16}
                            height={16}
                            fill='currentColor'
                            className='bi bi-translate'
                            viewBox='0 0 16 16'
                          >
                            <path d='M4.545 6.714 4.11 8H3l1.862-5h1.284L8 8H6.833l-.435-1.286H4.545zm1.634-.736L5.5 3.956h-.049l-.679 2.022H6.18z' />
                            <path d='M0 2a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v3h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-3H2a2 2 0 0 1-2-2V2zm2-1a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H2zm7.138 9.995c.193.301.402.583.63.846-.748.575-1.673 1.001-2.768 1.292.178.217.451.635.555.867 1.125-.359 2.08-.844 2.886-1.494.777.665 1.739 1.165 2.93 1.472.133-.254.414-.673.629-.89-1.125-.253-2.057-.694-2.82-1.284.681-.747 1.222-1.651 1.621-2.757H14V8h-3v1.047h.765c-.318.844-.74 1.546-1.272 2.13a6.066 6.066 0 0 1-.415-.492 1.988 1.988 0 0 1-.94.31z' />
                          </svg>
                        </Link>
                      </li>
                      <li className='account-access rbt-user-wrapper d-none d-xl-block'>
                        <a href='#'>
                          <span className='pe-2'>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              width={18}
                              height={18}
                              fill='currentColor'
                              className='bi bi-person'
                              viewBox='0 0 16 16'
                            >
                              <path d='M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z' />
                            </svg>
                          </span>
                          {user.role == 5 ? "Profesor" : "Admin"}
                        </a>
                        <div className='rbt-user-menu-list-wrapper'>
                          <div className='inner'>
                            <ul className='user-list-wrapper'>
                              <li>
                                <Link href='#'>
                                  <i className='feather-home' />
                                  <span>My Dashboard</span>
                                </Link>
                              </li>
                            </ul>
                            <hr className='mt--10 mb--10' />
                            <ul className='user-list-wrapper'>
                              <li>
                                <Link href='#'>
                                  <i className='feather-settings' />
                                  <span>Settings</span>
                                </Link>
                              </li>
                              <li>
                                <a onClick={props.logout}>
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
                    <li></li>
                  )}
                </ul>
                {/* Start Mobile-Menu-Bar */}
                <div className='mobile-menu-bar d-block d-xl-none'>
                  <div className='hamberger'>
                    <button
                      className='hamberger-button rbt-round-btn'
                      onClick={openSideBarOnMobile}
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width={20}
                        height={20}
                        fill='currentColor'
                        className='bi bi-list'
                        viewBox='0 0 16 16'
                      >
                        <path
                          fillRule='evenodd'
                          d='M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z'
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                {/* Start Mobile-Menu-Bar */}
              </div>
            </div>
          </div>
          {/* Start Search Dropdown  */}
          <div className='rbt-search-dropdown'>
            <div className='wrapper'>
              <div className='row'>
                <div className='col-lg-12'>
                  <form action='#'>
                    <input
                      type='text'
                      placeholder='What are you looking for?'
                    />
                    <div className='submit-btn'>
                      <a className='rbt-btn btn-gradient btn-md' href='#'>
                        Search
                      </a>
                    </div>
                  </form>
                </div>
              </div>
              <div className='rbt-separator-mid'>
                <hr className='rbt-separator m-0' />
              </div>
              <div className='row g-4 pt--30 pb--60'>
                <div className='col-lg-12'>
                  <div className='section-title'>
                    <h5 className='rbt-title-style-2'>Our Top Course</h5>
                  </div>
                </div>
                {/* Start Single Card  */}
                <div className='col-lg-3 col-md-4 col-sm-6 col-12'>
                  <div className='rbt-card variation-01 rbt-hover'>
                    <div className='rbt-card-img'>
                      <a href='course-details.html'>
                        <img
                          src='assets/images/course/course-online-01.jpg'
                          alt='Card image'
                        />
                      </a>
                    </div>
                    <div className='rbt-card-body'>
                      <h5 className='rbt-card-title'>
                        <a href='course-details.html'>React Js</a>
                      </h5>
                      <div className='rbt-review'>
                        <div className='rating'>
                          <i className='fas fa-star' />
                          <i className='fas fa-star' />
                          <i className='fas fa-star' />
                          <i className='fas fa-star' />
                          <i className='fas fa-star' />
                        </div>
                        <span className='rating-count'> (15 Reviews)</span>
                      </div>
                      <div className='rbt-card-bottom'>
                        <div className='rbt-price'>
                          <span className='current-price'>$15</span>
                          <span className='off-price'>$25</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* End Single Card  */}
                {/* Start Single Card  */}
                <div className='col-lg-3 col-md-4 col-sm-6 col-12'>
                  <div className='rbt-card variation-01 rbt-hover'>
                    <div className='rbt-card-img'>
                      <a href='course-details.html'>
                        <img
                          src='assets/images/course/course-online-02.jpg'
                          alt='Card image'
                        />
                      </a>
                    </div>
                    <div className='rbt-card-body'>
                      <h5 className='rbt-card-title'>
                        <a href='course-details.html'>Java Program</a>
                      </h5>
                      <div className='rbt-review'>
                        <div className='rating'>
                          <i className='fas fa-star' />
                          <i className='fas fa-star' />
                          <i className='fas fa-star' />
                          <i className='fas fa-star' />
                          <i className='fas fa-star' />
                        </div>
                        <span className='rating-count'> (15 Reviews)</span>
                      </div>
                      <div className='rbt-card-bottom'>
                        <div className='rbt-price'>
                          <span className='current-price'>$10</span>
                          <span className='off-price'>$40</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* End Single Card  */}
                {/* Start Single Card  */}
                <div className='col-lg-3 col-md-4 col-sm-6 col-12'>
                  <div className='rbt-card variation-01 rbt-hover'>
                    <div className='rbt-card-img'>
                      <a href='course-details.html'>
                        <img
                          src='assets/images/course/course-online-03.jpg'
                          alt='Card image'
                        />
                      </a>
                    </div>
                    <div className='rbt-card-body'>
                      <h5 className='rbt-card-title'>
                        <a href='course-details.html'>Web Design</a>
                      </h5>
                      <div className='rbt-review'>
                        <div className='rating'>
                          <i className='fas fa-star' />
                          <i className='fas fa-star' />
                          <i className='fas fa-star' />
                          <i className='fas fa-star' />
                          <i className='fas fa-star' />
                        </div>
                        <span className='rating-count'> (15 Reviews)</span>
                      </div>
                      <div className='rbt-card-bottom'>
                        <div className='rbt-price'>
                          <span className='current-price'>$10</span>
                          <span className='off-price'>$20</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* End Single Card  */}
                {/* Start Single Card  */}
                <div className='col-lg-3 col-md-4 col-sm-6 col-12'>
                  <div className='rbt-card variation-01 rbt-hover'>
                    <div className='rbt-card-img'>
                      <a href='course-details.html'>
                        <img
                          src='assets/images/course/course-online-04.jpg'
                          alt='Card image'
                        />
                      </a>
                    </div>
                    <div className='rbt-card-body'>
                      <h5 className='rbt-card-title'>
                        <a href='course-details.html'>Web Design</a>
                      </h5>
                      <div className='rbt-review'>
                        <div className='rating'>
                          <i className='fas fa-star' />
                          <i className='fas fa-star' />
                          <i className='fas fa-star' />
                          <i className='fas fa-star' />
                          <i className='fas fa-star' />
                        </div>
                        <span className='rating-count'> (15 Reviews)</span>
                      </div>
                      <div className='rbt-card-bottom'>
                        <div className='rbt-price'>
                          <span className='current-price'>$20</span>
                          <span className='off-price'>$40</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* End Single Card  */}
              </div>
            </div>
          </div>
          {/* End Search Dropdown  */}
        </div>
        {/* Start Side Vav */}
        <div className='rbt-offcanvas-side-menu rbt-category-sidemenu'>
          <div className='inner-wrapper'>
            <div className='inner-top'>
              <div className='inner-title'>
                <h4 className='title'>Course Category</h4>
              </div>
              <div className='rbt-btn-close'>
                <button className='rbt-close-offcanvas rbt-round-btn'>
                  <i className='feather-x' />
                </button>
              </div>
            </div>
            <nav className='side-nav w-100'>
              <ul className='rbt-vertical-nav-list-wrapper vertical-nav-menu'>
                <li className='vertical-nav-item'>
                  <a href='#'>Course School</a>
                  <div className='vartical-nav-content-menu-wrapper'>
                    <div className='vartical-nav-content-menu'>
                      <h3 className='rbt-short-title'>Course Title</h3>
                      <ul className='rbt-vertical-nav-list-wrapper'>
                        <li>
                          <a href='#'>Web Design</a>
                        </li>
                        <li>
                          <a href='#'>Art</a>
                        </li>
                        <li>
                          <a href='#'>Figma</a>
                        </li>
                        <li>
                          <a href='#'>Adobe</a>
                        </li>
                      </ul>
                    </div>
                    <div className='vartical-nav-content-menu'>
                      <h3 className='rbt-short-title'>Course Title</h3>
                      <ul className='rbt-vertical-nav-list-wrapper'>
                        <li>
                          <a href='#'>Photo</a>
                        </li>
                        <li>
                          <a href='#'>English</a>
                        </li>
                        <li>
                          <a href='#'>Math</a>
                        </li>
                        <li>
                          <a href='#'>Read</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
                <li className='vertical-nav-item'>
                  <a href='#'>Online School</a>
                  <div className='vartical-nav-content-menu-wrapper'>
                    <div className='vartical-nav-content-menu'>
                      <h3 className='rbt-short-title'>Course Title</h3>
                      <ul className='rbt-vertical-nav-list-wrapper'>
                        <li>
                          <a href='#'>Photo</a>
                        </li>
                        <li>
                          <a href='#'>English</a>
                        </li>
                        <li>
                          <a href='#'>Math</a>
                        </li>
                        <li>
                          <a href='#'>Read</a>
                        </li>
                      </ul>
                    </div>
                    <div className='vartical-nav-content-menu'>
                      <h3 className='rbt-short-title'>Course Title</h3>
                      <ul className='rbt-vertical-nav-list-wrapper'>
                        <li>
                          <a href='#'>Web Design</a>
                        </li>
                        <li>
                          <a href='#'>Art</a>
                        </li>
                        <li>
                          <a href='#'>Figma</a>
                        </li>
                        <li>
                          <a href='#'>Adobe</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
                <li className='vertical-nav-item'>
                  <a href='#'>kindergarten</a>
                  <div className='vartical-nav-content-menu-wrapper'>
                    <div className='vartical-nav-content-menu'>
                      <h3 className='rbt-short-title'>Course Title</h3>
                      <ul className='rbt-vertical-nav-list-wrapper'>
                        <li>
                          <a href='#'>Photo</a>
                        </li>
                        <li>
                          <a href='#'>English</a>
                        </li>
                        <li>
                          <a href='#'>Math</a>
                        </li>
                        <li>
                          <a href='#'>Read</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
                <li className='vertical-nav-item'>
                  <a href='#'>Classic LMS</a>
                  <div className='vartical-nav-content-menu-wrapper'>
                    <div className='vartical-nav-content-menu'>
                      <h3 className='rbt-short-title'>Course Title</h3>
                      <ul className='rbt-vertical-nav-list-wrapper'>
                        <li>
                          <a href='#'>Web Design</a>
                        </li>
                        <li>
                          <a href='#'>Art</a>
                        </li>
                        <li>
                          <a href='#'>Figma</a>
                        </li>
                        <li>
                          <a href='#'>Adobe</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
              </ul>
              <div className='read-more-btn'>
                <div className='rbt-btn-wrapper mt--20'>
                  <a
                    className='rbt-btn btn-border-gradient radius-round btn-sm hover-transform-none w-100 justify-content-center text-center'
                    href='#'
                  >
                    <span>Learn More</span>
                  </a>
                </div>
              </div>
            </nav>
            <div className='rbt-offcanvas-footer'></div>
          </div>
        </div>
        {/* <a className='rbt-close_side_menu' href='javascript:void(0);' /> */}
      </header>
      {/*-----------------------Pjesa per mobile---------------------------------------------*/}
      {/*-----------------------Pjesa per mobile---------------------------------------------*/}
      {/*-----------------------Pjesa per mobile---------------------------------------------*/}
      {/*-----------------------Pjesa per mobile---------------------------------------------*/}
      <div className='popup-mobile-menu'>
        <div className='inner-wrapper'>
          <div className='inner-top'>
            <div className='content'>
              <div className='logo'>
                <a href='index.html'>
                  <img
                    src='https://uni-pr.edu/images/logosmall.png'
                    alt='Education Logo Images'
                  />
                </a>
              </div>
              <div className='rbt-btn-close'>
                <button
                  className='close-button rbt-round-btn'
                  onClick={closeSideBarOnMobile}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width={16}
                    height={16}
                    fill='currentColor'
                    className='bi bi-x-lg'
                    viewBox='0 0 16 16'
                  >
                    <path d='M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z' />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <nav className='mainmenu-nav'>
            <ul className='mainmenu'>
              <li className=' position-static'>
                <Link to={"/"}>Home</Link>
              </li>
              <li className=' position-static'>
                <Link to={"/application/index"}>Apply</Link>
              </li>
              <li className=' position-static'>
                <Link to={"/magazine/index"}>Revistat</Link>
              </li>
              <li className='with-megamenu has-menu-child-ittem position-static'>
                <a href='#' className='reportsMobile'>
                  Reports
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width={16}
                    height={16}
                    fill='currentColor'
                    className='bi bi-arrow-down'
                    viewBox='0 0 16 16'
                  >
                    <path
                      fillRule='evenodd'
                      d='M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z'
                    />
                  </svg>
                </a>
                {/* Start Mega Menu  */}
                <div
                  className='rbt-megamenu grid-item-3 sidebarmobile'
                  style={{ display: "block" }}
                >
                  <div className='wrapper'>
                    <div className='row row--15'>
                      <div className='col-lg-12 col-xl-4 col-xxl-4 single-mega-item'>
                        <ul className='mega-menu-item'>
                          <li>
                            <a href='blog-list.html'>Blog List</a>
                          </li>
                          <li>
                            <a href='blog.html'>Blog Grid</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                {/* End Mega Menu  */}
              </li>
            </ul>
          </nav>
          <div className='mobile-menu-bottom'>
            <div className='rbt-btn-wrapper mb--20'>
              <a
                className='rbt-btn btn-border-gradient radius-round btn-sm hover-transform-none w-100 justify-content-center text-center'
                href='#'
              >
                <span>Log out</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Navbar;
