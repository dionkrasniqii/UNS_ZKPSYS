import React, { useEffect, useState } from "react";
import photo1 from "../../photos/blog-37.jpg";
import photo2 from "../../photos/photo2.jpg";
import photo3 from "../../photos/photo3.png";
import arrowDown from "../../assets/images/icons/arrow-down.png";
import logoUP from "../../assets/images/icons/up.png";
import quoteImg from "../../assets/images/icons/quote.svg";
import smlogo from "../../assets/images/logo/sm-logo.png";
import CrudProvider from "../../provider/CrudProvider";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Footer from "./Footer";

const Landing = () => {
  const [news, setNews] = useState([]);
  const { t } = useTranslation();

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
      <div className="slider-area rbt-banner-9 bg-gradient-2 header-transperent-spacer">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 offset-lg-1 col-xl-6 offset-xl-3">
              <div className="section-title text-center has-section-before-title mb--150 mt--50 mb_lg--100 mb_md--100 mb_sm--100">
                <h2 className="rbt-display-1 theme-gradient fw-bolder rbt-display-v">
                  {t("Office1")} <br /> {t("Office2")}
                </h2>
                <h3 className="title">
                  {t("Office3")} <br />
                  {t("Office4")}
                  <span className="heading-opacity">
                    <br />
                    {t("Office5")}
                  </span>
                </h3>

                <a type="button" onClick={goToNews} className="indicator-icon ">
                  <div className="mouse_scroll">
                    <div className="mouse">
                      <div className="wheel"></div>
                    </div>
                    <div>
                      <span className="m_scroll_arrows unu"></span>
                      <span className="m_scroll_arrows doi"></span>
                      <span className="m_scroll_arrows trei"></span>
                    </div>
                  </div>
                </a>
                <p className="description has-medium-font-size mt--20">
                  {/* Create a complete education website with a lots of demo page
                  and 250+ section blocks to create a unique site. */}
                </p>
                <div className="section-before-title theme-gradient new-big-heading-gradient">
                  53+
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="rbt-testimonial-area bg-color-white rbt-section-gap overflow-hidden">
        <div className="scroll-animation-wrapper no-overlay mt--100" id="news">
          <div className="scroll-animation scroll-right-left">
            {news.length > 0 &&
              news.map((obj, index) => {
                if (obj.aktiv) {
                  return (
                    <Link
                      key={index}
                      to={`/news/details/${btoa(obj.njoftimiId)}`}
                    >
                      <div className="single-column-20 bg-theme-gradient-odd">
                        <div className="rbt-testimonial-box style-2">
                          <div className="inner">
                            <div className="icons">
                              <img src={logoUP} alt="Clint Images" />
                            </div>
                            <div className="description">
                              <p className="subtitle-3"> {obj.titulli} </p>
                              <div className="clint-info-wrapper">
                                <div className="thumb">
                                  <img
                                    src={CrudProvider.documentPath(
                                      obj.document?.docPath
                                    )}
                                    // src={`${process.env.REACT_APP_API_BASE_URL_PRODUCTION_DOCS}/${obj.document.docPath}`}
                                    alt="Clint Images"
                                  />
                                </div>
                                <div className="client-info">
                                  <h5 className="title">{obj.detajet}</h5>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                }
                return null;
              })}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Landing;
