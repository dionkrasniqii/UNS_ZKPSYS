import React, { useState } from "react";
import photo1 from "../../photos/blog-37.jpg";
import photo2 from "../../photos/photo2.jpg";
import photo3 from "../../photos/photo3.png";
import arrowDown from "../../assets/images/icons/arrow-down.png";
import logoUP from "../../assets/images/icons/up.png";
import quoteImg from "../../assets/images/icons/quote.svg";
import smlogo from "../../assets/images/logo/sm-logo.png";

const Landing = () => {
  const pathToPhoto = "../../assets";

  return (
    <>
      <div className="mt--200">
        <div classname="slider-area rbt-banner-9 bg-gradient-2 header-transperent-spacer">
          <div classname="container">
            <div classname="row">
              <div className="col-lg-10 offset-lg-1 col-xl-6 offset-xl-3">
                <div className="section-title text-center has-section-before-title mb--150 mt--50 mb_lg--100 mb_md--100 mb_sm--100">
                  <h2 className="rbt-display-1 theme-gradient fw-bolder rbt-display-v">
                    Zyra për Kërkime dhe <br /> Projekte të Sponzorizuara
                  </h2>
                  <h3 className="title">
                    Departament për Kërkime dhe Projekte <br /> Financuara nga
                    Institucione Akademike dhe OJQ-të.
                    <span className="heading-opacity">
                      <br />
                      Mundësi që ofrojm mbështetje për profesionale dhe
                      shkencore që mundëson financimin për projete të ndryshme.
                    </span>
                  </h3>
                  <div className="indicator-icon ">
                    <img
                      className="edu_bounce_loop"
                      src={arrowDown}
                      alt="arrow down icon"
                    />
                  </div>
                  <p className="description has-medium-font-size mt--20">
                    Create a complete education website with a lots of demo page
                    and 250+ section blocks to create a unique site.
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
          <div className="wrapper">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="section-title text-center mb--10">
                    <span className="subtitle bg-primary-opacity">
                      EDUCATION FOR EVERYONE
                    </span>
                    <h2 className="title">
                      People like histudy education. <br /> No joking - here’s
                      the proof!
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="scroll-animation-wrapper no-overlay mt--50">
            <div className="scroll-animation scroll-right-left">
              {/* Start Single Testimonial  */}
              <div className="single-column-20 bg-theme-gradient-odd">
                <div className="rbt-testimonial-box style-2">
                  <div className="inner">
                    <div className="description">
                      <p className="subtitle-3">
                        After the launch, vulputate at sapien sit amet, auctor
                        iaculis lorem. In vel hend rerit nisi. Vestibulum eget
                        risus velit.
                      </p>
                      <div className="clint-info-wrapper">
                        <div className="thumb">
                          <img src={smlogo} alt="Clint Images" />
                        </div>
                        <div className="client-info">
                          <h5 className="title">
                            Martha Maldonado, <span>CEO</span>
                          </h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* End Single Testimonial  */}
              {/* Start Single Testimonial  */}
              <div className="single-column-20 bg-theme-gradient-odd">
                <div className="rbt-testimonial-box style-2">
                  <div className="inner">
                    <div className="icons">
                      <img src={logoUP} alt="Clint Images" />
                    </div>
                    <div className="description">
                      <p className="subtitle-3">
                        Histudy education, vulputate at sapien sit amet, auctor
                        iaculis lorem. In vel hend rerit nisi. Vestibulum eget
                        risus velit.
                      </p>
                      <div className="clint-info-wrapper">
                        <div className="thumb">
                          <img src={smlogo} alt="Clint Images" />
                        </div>
                        <div className="client-info">
                          <h5 className="title">
                            Michael D., <span>CEO</span>
                          </h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* End Single Testimonial  */}
              {/* Start Single Testimonial  */}
              <div className="single-column-20 bg-theme-gradient-odd">
                <div className="rbt-testimonial-box style-2">
                  <div className="inner">
                    <div className="icons">
                      <img src={logoUP} alt="Clint Images" />
                    </div>
                    <div className="description">
                      <p className="subtitle-3">
                        Our educational, vulputate at sapien sit amet, auctor
                        iaculis lorem. In vel hend rerit nisi. Vestibulum eget
                        risus velit.
                      </p>
                      <div className="clint-info-wrapper">
                        <div className="thumb">
                          <img src={smlogo} alt="Clint Images" />
                        </div>
                        <div className="client-info">
                          <h5 className="title">
                            Valerie J., <span>CEO</span>
                          </h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* End Single Testimonial  */}
              {/* Start Single Testimonial  */}
              <div className="single-column-20 bg-theme-gradient-odd">
                <div className="rbt-testimonial-box style-2">
                  <div className="inner">
                    <div className="icons">
                      <img src={logoUP} alt="Clint Images" />
                    </div>
                    <div className="description">
                      <p className="subtitle-3">
                        People says about, vulputate at sapien sit amet, auctor
                        iaculis lorem. In vel hend rerit nisi. Vestibulum eget
                        risus velit.
                      </p>
                      <div className="clint-info-wrapper">
                        <div className="thumb">
                          <img src={smlogo} alt="Clint Images" />
                        </div>
                        <div className="client-info">
                          <h5 className="title">
                            Hannah R., <span>CEO</span>
                          </h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* End Single Testimonial  */}
              {/* Start Single Testimonial  */}
              <div className="single-column-20 bg-theme-gradient-odd">
                <div className="rbt-testimonial-box style-2">
                  <div className="inner">
                    <div className="icons">
                      <img src={logoUP} alt="Clint Images" />
                    </div>
                    <div className="description">
                      <p className="subtitle-3">
                        Like this histudy, vulputate at sapien sit amet, auctor
                        iaculis lorem. In vel hend rerit nisi. Vestibulum eget
                        risus velit.
                      </p>
                      <div className="clint-info-wrapper">
                        <div className="thumb">
                          <img src={smlogo} alt="Clint Images" />
                        </div>
                        <div className="client-info">
                          <h5 className="title">
                            Pearl B. Hill, <span>Marketing</span>
                          </h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* End Single Testimonial  */}
              {/* Start Single Testimonial  */}
              <div className="single-column-20 bg-theme-gradient-odd">
                <div className="rbt-testimonial-box style-2">
                  <div className="inner">
                    <div className="icons">
                      <img src={logoUP} alt="Clint Images" />
                    </div>
                    <div className="description">
                      <p className="subtitle-3">
                        Educational template, vulputate at sapien sit amet,
                        auctor iaculis lorem. In vel hend rerit nisi. Vestibulum
                        eget risus velit.
                      </p>
                      <div className="clint-info-wrapper">
                        <div className="thumb">
                          <img src={smlogo} alt="Clint Images" />
                        </div>
                        <div className="client-info">
                          <h5 className="title">
                            Mandy F. Wood, <span>SR Designer</span>
                          </h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* End Single Testimonial  */}
              {/* Start Single Testimonial  */}
              <div className="single-column-20 bg-theme-gradient-odd">
                <div className="rbt-testimonial-box style-2">
                  <div className="inner">
                    <div className="icons">
                      <img src={logoUP} alt="Clint Images" />
                    </div>
                    <div className="description">
                      <p className="subtitle-3">
                        Online leaning, vulputate at sapien sit amet, auctor
                        iaculis lorem. In vel hend rerit nisi. Vestibulum eget
                        risus velit.
                      </p>
                      <div className="clint-info-wrapper">
                        <div className="thumb">
                          <img src={smlogo} alt="Clint Images" />
                        </div>
                        <div className="client-info">
                          <h5 className="title">
                            Mildred W. Diaz, <span>Executive</span>
                          </h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* End Single Testimonial  */}
              {/* Start Single Testimonial  */}
              <div className="single-column-20 bg-theme-gradient-odd">
                <div className="rbt-testimonial-box style-2">
                  <div className="inner">
                    <div className="icons">
                      <img src={logoUP} alt="Clint Images" />
                    </div>
                    <div className="description">
                      <p className="subtitle-3">
                        Remote learning, vulputate at sapien sit amet, auctor
                        iaculis lorem. In vel hend rerit nisi. Vestibulum eget
                        risus velit.
                      </p>
                      <div className="clint-info-wrapper">
                        <div className="thumb">
                          <img
                            src="../assets/images/testimonial/client-08.png"
                            alt="Clint Images"
                          />
                        </div>
                        <div className="client-info">
                          <h5 className="title">
                            Christopher, <span>CEO</span>
                          </h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* End Single Testimonial  */}
              {/* Start Single Testimonial  */}
              <div className="single-column-20 bg-theme-gradient-odd">
                <div className="rbt-testimonial-box style-2">
                  <div className="inner">
                    <div className="icons">
                      <img src={logoUP} alt="Clint Images" />
                    </div>
                    <div className="description">
                      <p className="subtitle-3">
                        University managemnet, vulputate at sapien sit amet,
                        auctor iaculis lorem. In vel hend rerit nisi. Vestibulum
                        eget risus velit.
                      </p>
                      <div className="clint-info-wrapper">
                        <div className="thumb">
                          <img
                            src="../assets/images/testimonial/client-06.png"
                            alt="Clint Images"
                          />
                        </div>
                        <div className="client-info">
                          <h5 className="title">
                            Fatima, <span>Child</span>
                          </h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* End Single Testimonial  */}
            </div>
          </div>
          <div className="scroll-animation-wrapper no-overlay mt--30">
            <div className="scroll-animation scroll-left-right">
              {/* Start Single Testimonial  */}
              <div className="single-column-20 bg-theme-gradient-even">
                <div className="rbt-testimonial-box style-2">
                  <div className="inner">
                    <div className="icons">
                      <img src={logoUP} alt="Clint Images" />
                    </div>
                    <div className="description">
                      <p className="subtitle-3">
                        After the launch, vulputate at sapien sit amet, auctor
                        iaculis lorem. In vel hend rerit nisi. Vestibulum eget
                        risus velit.
                      </p>
                      <div className="clint-info-wrapper">
                        <div className="thumb">
                          <img src={smlogo} alt="Clint Images" />
                        </div>
                        <div className="client-info">
                          <h5 className="title">
                            Martha Maldonado, <span>CEO</span>
                          </h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* End Single Testimonial  */}
              {/* Start Single Testimonial  */}
              <div className="single-column-20 bg-theme-gradient-even">
                <div className="rbt-testimonial-box style-2">
                  <div className="inner">
                    <div className="icons">
                      <img src={logoUP} alt="Clint Images" />
                    </div>
                    <div className="description">
                      <p className="subtitle-3">
                        Histudy education, vulputate at sapien sit amet, auctor
                        iaculis lorem. In vel hend rerit nisi. Vestibulum eget
                        risus velit.
                      </p>
                      <div className="clint-info-wrapper">
                        <div className="thumb">
                          <img src={smlogo} alt="Clint Images" />
                        </div>
                        <div className="client-info">
                          <h5 className="title">
                            Michael D., <span>CEO</span>
                          </h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* End Single Testimonial  */}
              {/* Start Single Testimonial  */}
              <div className="single-column-20 bg-theme-gradient-even">
                <div className="rbt-testimonial-box style-2">
                  <div className="inner">
                    <div className="icons">
                      <img src={logoUP} alt="Clint Images" />
                    </div>
                    <div className="description">
                      <p className="subtitle-3">
                        Our educational, vulputate at sapien sit amet, auctor
                        iaculis lorem. In vel hend rerit nisi. Vestibulum eget
                        risus velit.
                      </p>
                      <div className="clint-info-wrapper">
                        <div className="thumb">
                          <img src={smlogo} alt="Clint Images" />
                        </div>
                        <div className="client-info">
                          <h5 className="title">
                            Valerie J., <span>CEO</span>
                          </h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* End Single Testimonial  */}
              {/* Start Single Testimonial  */}
              <div className="single-column-20 bg-theme-gradient-even">
                <div className="rbt-testimonial-box style-2">
                  <div className="inner">
                    <div className="icons">
                      <img src={logoUP} alt="Clint Images" />
                    </div>
                    <div className="description">
                      <p className="subtitle-3">
                        People says about, vulputate at sapien sit amet, auctor
                        iaculis lorem. In vel hend rerit nisi. Vestibulum eget
                        risus velit.
                      </p>
                      <div className="clint-info-wrapper">
                        <div className="thumb">
                          <img src={smlogo} alt="Clint Images" />
                        </div>
                        <div className="client-info">
                          <h5 className="title">
                            Hannah R., <span>CEO</span>
                          </h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* End Single Testimonial  */}
              {/* Start Single Testimonial  */}
              <div className="single-column-20 bg-theme-gradient-even">
                <div className="rbt-testimonial-box style-2">
                  <div className="inner">
                    <div className="icons">
                      <img src={logoUP} alt="Clint Images" />
                    </div>
                    <div className="description">
                      <p className="subtitle-3">
                        Like this histudy, vulputate at sapien sit amet, auctor
                        iaculis lorem. In vel hend rerit nisi. Vestibulum eget
                        risus velit.
                      </p>
                      <div className="clint-info-wrapper">
                        <div className="thumb">
                          <img src={smlogo} alt="Clint Images" />
                        </div>
                        <div className="client-info">
                          <h5 className="title">
                            Pearl B. Hill, <span>Marketing</span>
                          </h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* End Single Testimonial  */}
              {/* Start Single Testimonial  */}
              <div className="single-column-20 bg-theme-gradient-even">
                <div className="rbt-testimonial-box style-2">
                  <div className="inner">
                    <div className="icons">
                      <img src={logoUP} alt="Clint Images" />
                    </div>
                    <div className="description">
                      <p className="subtitle-3">
                        Educational template, vulputate at sapien sit amet,
                        auctor iaculis lorem. In vel hend rerit nisi. Vestibulum
                        eget risus velit.
                      </p>
                      <div className="clint-info-wrapper">
                        <div className="thumb">
                          <img src={smlogo} alt="Clint Images" />
                        </div>
                        <div className="client-info">
                          <h5 className="title">
                            Mandy F. Wood, <span>SR Designer</span>
                          </h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* End Single Testimonial  */}
              {/* Start Single Testimonial  */}
              <div className="single-column-20 bg-theme-gradient-even">
                <div className="rbt-testimonial-box style-2">
                  <div className="inner">
                    <div className="icons">
                      <img src={logoUP} alt="Clint Images" />
                    </div>
                    <div className="description">
                      <p className="subtitle-3">
                        Online leaning, vulputate at sapien sit amet, auctor
                        iaculis lorem. In vel hend rerit nisi. Vestibulum eget
                        risus velit.
                      </p>
                      <div className="clint-info-wrapper">
                        <div className="thumb">
                          <img src={smlogo} alt="Clint Images" />
                        </div>
                        <div className="client-info">
                          <h5 className="title">
                            Mildred W. Diaz, <span>Executive</span>
                          </h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* End Single Testimonial  */}
              {/* Start Single Testimonial  */}
              <div className="single-column-20 bg-theme-gradient-even">
                <div className="rbt-testimonial-box style-2">
                  <div className="inner">
                    <div className="icons">
                      <img src={logoUP} alt="Clint Images" />
                    </div>
                    <div className="description">
                      <p className="subtitle-3">
                        Remote learning, vulputate at sapien sit amet, auctor
                        iaculis lorem. In vel hend rerit nisi. Vestibulum eget
                        risus velit.
                      </p>
                      <div className="clint-info-wrapper">
                        <div className="thumb">
                          <img
                            src="../assets/images/testimonial/client-08.png"
                            alt="Clint Images"
                          />
                        </div>
                        <div className="client-info">
                          <h5 className="title">
                            Christopher, <span>CEO</span>
                          </h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* End Single Testimonial  */}
              {/* Start Single Testimonial  */}
              <div className="single-column-20 bg-theme-gradient-even">
                <div className="rbt-testimonial-box style-2">
                  <div className="inner">
                    <div className="icons">
                      <img src={logoUP} alt="Clint Images" />
                    </div>
                    <div className="description">
                      <p className="subtitle-3">
                        University managemnet, vulputate at sapien sit amet,
                        auctor iaculis lorem. In vel hend rerit nisi. Vestibulum
                        eget risus velit.
                      </p>
                      <div className="clint-info-wrapper">
                        <div className="thumb">
                          <img
                            src="../assets/images/testimonial/client-06.png"
                            alt="Clint Images"
                          />
                        </div>
                        <div className="client-info">
                          <h5 className="title">
                            Fatima, <span>Child</span>
                          </h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* End Single Testimonial  */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Landing;
