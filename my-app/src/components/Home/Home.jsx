import React, { useEffect, useState } from "react";
import photo1 from "../../photos/blog-37.jpg";
import photo2 from "../../photos/photo2.jpg";
import photo3 from "../../photos/photo3.png";
import arrowDown from "../../assets/images/icons/arrow-down.png";
import logoUP from "../../assets/images/icons/up.png";
import quoteImg from "../../assets/images/icons/quote.svg";
import smlogo from "../../assets/images/logo/sm-logo.png";
import CrudProvider from "../../provider/CrudProvider";

const Landing = () => {
  const pathToPhoto = "../../assets";
  const [news, setNews] = useState([]);
  useEffect(() => {
    CrudProvider.getAll("NjoftimetAPI").then((res) => {
      if (res) {
        if (res.statusCode === 200) {
          setNews(res.result);
        }
      }
    });
  }, []);

  function goToNews() {
    let element = document.getElementById("news");
    element.scrollIntoView();
  }

  return (
    <>
      <div className='slider-area rbt-banner-9 bg-gradient-2 header-transperent-spacer'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-10 offset-lg-1 col-xl-6 offset-xl-3'>
              <div className='section-title text-center has-section-before-title mb--150 mt--50 mb_lg--100 mb_md--100 mb_sm--100'>
                <h2 className='rbt-display-1 theme-gradient fw-bolder rbt-display-v'>
                  Zyra për Kërkime dhe <br /> Projekte të Sponzorizuara
                </h2>
                <h3 className='title'>
                  Departament për Kërkime dhe Projekte <br /> Financuara nga
                  Institucione Akademike dhe OJQ-të.
                  <span className='heading-opacity'>
                    <br />
                    Mundësi që ofrojm mbështetje për profesionale dhe shkencore
                    që mundëson financimin për projekte të ndryshme.
                  </span>
                </h3>
                <div className='indicator-icon '>
                  <ul className='social-icon social-default '>
                    <a type='button' onClick={goToNews}>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='30'
                        height='30'
                        fill='currentColor'
                        className='bi bi-arrow-down '
                        viewBox='0 0 16 16'
                      >
                        <path
                          fillRule='evenodd'
                          d='M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z'
                        />
                      </svg>
                    </a>
                  </ul>
                </div>
                <p className='description has-medium-font-size mt--20'>
                  {/* Create a complete education website with a lots of demo page
                  and 250+ section blocks to create a unique site. */}
                </p>
                <div className='section-before-title theme-gradient new-big-heading-gradient'>
                  53+
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='rbt-testimonial-area bg-color-white rbt-section-gap overflow-hidden'>
        {/* <div className='wrapper'>
          <div className='container'>
            <div className='row'>
              <div className='col-lg-12'>
                <div className='section-title text-center mb--10'>
                  <span className='subtitle bg-primary-opacity'>
                    EDUCATION FOR EVERYONE
                  </span>
                  <h2 className='title'>
                    People like histudy education. <br /> No joking - here’s the
                    proof!
                  </h2> 
                </div>
              </div>
            </div>
          </div>
        </div> */}
        <div className='scroll-animation-wrapper no-overlay mt--100' id='news'>
          <div className='scroll-animation scroll-right-left'>
            {/* <div className='single-column-20 bg-theme-gradient-odd'>
              <div className='rbt-testimonial-box style-2'>
                <div className='inner'>
                  <div className='icons'>
                    <img src={logoUP} alt='Clint Images' />
                  </div>
                  <div className='description'>
                    <p className='subtitle-3'>
                      Educational template, vulputate at sapien sit amet, auctor
                      iaculis lorem. In vel hend rerit nisi. Vestibulum eget
                      risus velit.
                    </p>
                    <div className='clint-info-wrapper'>
                      <div className='thumb'>
                        <img src={smlogo} alt='Clint Images' />
                      </div>
                      <div className='client-info'>
                        <h5 className='title'>
                          Mandy F. Wood, <span>SR Designer</span>
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
            {news.length > 0 &&
              news.map((obj, index) => {
                if (obj.aktiv) {
                  return (
                    <div
                      key={index}
                      className='single-column-20 bg-theme-gradient-odd'
                    >
                      <div className='rbt-testimonial-box style-2'>
                        <div className='inner'>
                          <div className='icons'>
                            <img src={logoUP} alt='Clint Images' />
                          </div>
                          <div className='description'>
                            <p className='subtitle-3'>{obj.detajet}</p>
                            <div className='clint-info-wrapper'>
                              <div className='thumb'>
                                <img
                                  src={`${process.env.REACT_APP_API_BASE_URL_STAGING_DOCS}/${obj.document.docPath}`}
                                  alt='Clint Images'
                                />
                              </div>
                              <div className='client-info'>
                                <h5 className='title'>{obj.titulli}</h5>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }
                return null;
              })}
          </div>
        </div>
      </div>
    </>
  );
};
export default Landing;
