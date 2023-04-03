import React, { useState } from "react";
import photo1 from "../../photos/blog-37.jpg";
import photo2 from "../../photos/photo2.jpg";
import photo3 from "../../photos/photo3.png";

const Landing = () => {
  return (
    <>
      <div
        className='slider-area rbt-banner-9 bg-gradient-2 header-transperent-spacer'
        style={{ paddingTop: 80 }}
      >
        <div className='container'>
          <div className='row'>
            <div className='col-lg-10 offset-lg-1'>
              <div className='inner text-center ptb--80'>
                <h2 className='title theme-sems rbt-display-1'>
                  A Complete Guide to Web Development.
                </h2>
                <p className='description'>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  perferendis, maiores?
                </p>
                <div className='rbt-single-course-meta text-center mt--20'>
                  <div className='enroll-btn mt--15'>
                    <a className='rbt-btn btn-sems hover-icon-reverse' href='#'>
                      <span className='icon-reverse-wrapper'>
                        <span className='btn-text'>Enrol Course Now</span>
                        <span className='btn-icon mb-1'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='16'
                            height='16'
                            fill='currentColor'
                            class='bi bi-arrow-right'
                            viewBox='0 0 16 16'
                          >
                            <path
                              fillRule='evenodd'
                              d='M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z'
                            />
                          </svg>
                        </span>
                        <span className='btn-icon mb-1'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='16'
                            height='16'
                            fill='currentColor'
                            class='bi bi-arrow-right'
                            viewBox='0 0 16 16'
                          >
                            <path
                              fillRule='evenodd'
                              d='M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z'
                            />
                          </svg>
                        </span>
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='rbt-testimonial-area bg-color-white rbt-section-gap overflow-hidden'>
        <div className='scroll-animation-wrapper no-overlay mt--50'>
          <div className='scroll-animation scroll-right-left'>
            {/* Start Single Testimonial  */}
            <div className='single-column-20 bg-theme-gradient-odd'>
              <div className='rbt-testimonial-box style-2'>
                <div className='inner'>
                  <div className='icons'>
                    <img
                      src='assets/images/icons/facebook.png'
                      alt='Clint Images'
                    />
                  </div>
                  <div className='description'>
                    <p className='subtitle-3'>
                      After the launch, vulputate at sapien sit amet, auctor
                      iaculis lorem. In vel hend rerit nisi. Vestibulum eget
                      risus velit.
                    </p>
                    <div className='clint-info-wrapper'>
                      <div className='thumb'>
                        <img
                          src='assets/images/testimonial/client-01.png'
                          alt='Clint Images'
                        />
                      </div>
                      <div className='client-info'>
                        <h5 className='title'>
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
            <div className='single-column-20 bg-theme-gradient-odd'>
              <div className='rbt-testimonial-box style-2'>
                <div className='inner'>
                  <div className='icons'>
                    <img
                      src='assets/images/icons/google.png'
                      alt='Clint Images'
                    />
                  </div>
                  <div className='description'>
                    <p className='subtitle-3'>
                      Histudy education, vulputate at sapien sit amet, auctor
                      iaculis lorem. In vel hend rerit nisi. Vestibulum eget
                      risus velit.
                    </p>
                    <div className='clint-info-wrapper'>
                      <div className='thumb'>
                        <img
                          src='assets/images/testimonial/client-02.png'
                          alt='Clint Images'
                        />
                      </div>
                      <div className='client-info'>
                        <h5 className='title'>
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
            <div className='single-column-20 bg-theme-gradient-odd'>
              <div className='rbt-testimonial-box style-2'>
                <div className='inner'>
                  <div className='icons'>
                    <img
                      src='assets/images/icons/yelp.png'
                      alt='Clint Images'
                    />
                  </div>
                  <div className='description'>
                    <p className='subtitle-3'>
                      Our educational, vulputate at sapien sit amet, auctor
                      iaculis lorem. In vel hend rerit nisi. Vestibulum eget
                      risus velit.
                    </p>
                    <div className='clint-info-wrapper'>
                      <div className='thumb'>
                        <img
                          src='assets/images/testimonial/client-03.png'
                          alt='Clint Images'
                        />
                      </div>
                      <div className='client-info'>
                        <h5 className='title'>
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
            <div className='single-column-20 bg-theme-gradient-odd'>
              <div className='rbt-testimonial-box style-2'>
                <div className='inner'>
                  <div className='icons'>
                    <img
                      src='assets/images/icons/facebook.png'
                      alt='Clint Images'
                    />
                  </div>
                  <div className='description'>
                    <p className='subtitle-3'>
                      People says about, vulputate at sapien sit amet, auctor
                      iaculis lorem. In vel hend rerit nisi. Vestibulum eget
                      risus velit.
                    </p>
                    <div className='clint-info-wrapper'>
                      <div className='thumb'>
                        <img
                          src='assets/images/testimonial/client-04.png'
                          alt='Clint Images'
                        />
                      </div>
                      <div className='client-info'>
                        <h5 className='title'>
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
            <div className='single-column-20 bg-theme-gradient-odd'>
              <div className='rbt-testimonial-box style-2'>
                <div className='inner'>
                  <div className='icons'>
                    <img
                      src='assets/images/icons/bing.png'
                      alt='Clint Images'
                    />
                  </div>
                  <div className='description'>
                    <p className='subtitle-3'>
                      Like this histudy, vulputate at sapien sit amet, auctor
                      iaculis lorem. In vel hend rerit nisi. Vestibulum eget
                      risus velit.
                    </p>
                    <div className='clint-info-wrapper'>
                      <div className='thumb'>
                        <img
                          src='assets/images/testimonial/client-05.png'
                          alt='Clint Images'
                        />
                      </div>
                      <div className='client-info'>
                        <h5 className='title'>
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
            <div className='single-column-20 bg-theme-gradient-odd'>
              <div className='rbt-testimonial-box style-2'>
                <div className='inner'>
                  <div className='icons'>
                    <img
                      src='assets/images/icons/facebook.png'
                      alt='Clint Images'
                    />
                  </div>
                  <div className='description'>
                    <p className='subtitle-3'>
                      Educational template, vulputate at sapien sit amet, auctor
                      iaculis lorem. In vel hend rerit nisi. Vestibulum eget
                      risus velit.
                    </p>
                    <div className='clint-info-wrapper'>
                      <div className='thumb'>
                        <img
                          src='assets/images/testimonial/client-01.png'
                          alt='Clint Images'
                        />
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
            </div>
            {/* End Single Testimonial  */}
            {/* Start Single Testimonial  */}
            <div className='single-column-20 bg-theme-gradient-odd'>
              <div className='rbt-testimonial-box style-2'>
                <div className='inner'>
                  <div className='icons'>
                    <img
                      src='assets/images/icons/hubs.png'
                      alt='Clint Images'
                    />
                  </div>
                  <div className='description'>
                    <p className='subtitle-3'>
                      Online leaning, vulputate at sapien sit amet, auctor
                      iaculis lorem. In vel hend rerit nisi. Vestibulum eget
                      risus velit.
                    </p>
                    <div className='clint-info-wrapper'>
                      <div className='thumb'>
                        <img
                          src='assets/images/testimonial/client-07.png'
                          alt='Clint Images'
                        />
                      </div>
                      <div className='client-info'>
                        <h5 className='title'>
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
            <div className='single-column-20 bg-theme-gradient-odd'>
              <div className='rbt-testimonial-box style-2'>
                <div className='inner'>
                  <div className='icons'>
                    <img
                      src='assets/images/icons/bing.png'
                      alt='Clint Images'
                    />
                  </div>
                  <div className='description'>
                    <p className='subtitle-3'>
                      Remote learning, vulputate at sapien sit amet, auctor
                      iaculis lorem. In vel hend rerit nisi. Vestibulum eget
                      risus velit.
                    </p>
                    <div className='clint-info-wrapper'>
                      <div className='thumb'>
                        <img
                          src='assets/images/testimonial/client-08.png'
                          alt='Clint Images'
                        />
                      </div>
                      <div className='client-info'>
                        <h5 className='title'>
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
            <div className='single-column-20 bg-theme-gradient-odd'>
              <div className='rbt-testimonial-box style-2'>
                <div className='inner'>
                  <div className='icons'>
                    <img
                      src='assets/images/icons/yelp.png'
                      alt='Clint Images'
                    />
                  </div>
                  <div className='description'>
                    <p className='subtitle-3'>
                      University managemnet, vulputate at sapien sit amet,
                      auctor iaculis lorem. In vel hend rerit nisi. Vestibulum
                      eget risus velit.
                    </p>
                    <div className='clint-info-wrapper'>
                      <div className='thumb'>
                        <img
                          src='assets/images/testimonial/client-06.png'
                          alt='Clint Images'
                        />
                      </div>
                      <div className='client-info'>
                        <h5 className='title'>
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
        <div className='scroll-animation-wrapper no-overlay mt--30'>
          <div className='scroll-animation scroll-left-right'>
            {/* Start Single Testimonial  */}
            <div className='single-column-20 bg-theme-gradient-even'>
              <div className='rbt-testimonial-box style-2'>
                <div className='inner'>
                  <div className='icons'>
                    <img
                      src='assets/images/icons/facebook.png'
                      alt='Clint Images'
                    />
                  </div>
                  <div className='description'>
                    <p className='subtitle-3'>
                      After the launch, vulputate at sapien sit amet, auctor
                      iaculis lorem. In vel hend rerit nisi. Vestibulum eget
                      risus velit.
                    </p>
                    <div className='clint-info-wrapper'>
                      <div className='thumb'>
                        <img
                          src='assets/images/testimonial/client-01.png'
                          alt='Clint Images'
                        />
                      </div>
                      <div className='client-info'>
                        <h5 className='title'>
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
            <div className='single-column-20 bg-theme-gradient-even'>
              <div className='rbt-testimonial-box style-2'>
                <div className='inner'>
                  <div className='icons'>
                    <img
                      src='assets/images/icons/google.png'
                      alt='Clint Images'
                    />
                  </div>
                  <div className='description'>
                    <p className='subtitle-3'>
                      Histudy education, vulputate at sapien sit amet, auctor
                      iaculis lorem. In vel hend rerit nisi. Vestibulum eget
                      risus velit.
                    </p>
                    <div className='clint-info-wrapper'>
                      <div className='thumb'>
                        <img
                          src='assets/images/testimonial/client-02.png'
                          alt='Clint Images'
                        />
                      </div>
                      <div className='client-info'>
                        <h5 className='title'>
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
            <div className='single-column-20 bg-theme-gradient-even'>
              <div className='rbt-testimonial-box style-2'>
                <div className='inner'>
                  <div className='icons'>
                    <img
                      src='assets/images/icons/yelp.png'
                      alt='Clint Images'
                    />
                  </div>
                  <div className='description'>
                    <p className='subtitle-3'>
                      Our educational, vulputate at sapien sit amet, auctor
                      iaculis lorem. In vel hend rerit nisi. Vestibulum eget
                      risus velit.
                    </p>
                    <div className='clint-info-wrapper'>
                      <div className='thumb'>
                        <img
                          src='assets/images/testimonial/client-03.png'
                          alt='Clint Images'
                        />
                      </div>
                      <div className='client-info'>
                        <h5 className='title'>
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
            <div className='single-column-20 bg-theme-gradient-even'>
              <div className='rbt-testimonial-box style-2'>
                <div className='inner'>
                  <div className='icons'>
                    <img
                      src='assets/images/icons/bing.png'
                      alt='Clint Images'
                    />
                  </div>
                  <div className='description'>
                    <p className='subtitle-3'>
                      People says about, vulputate at sapien sit amet, auctor
                      iaculis lorem. In vel hend rerit nisi. Vestibulum eget
                      risus velit.
                    </p>
                    <div className='clint-info-wrapper'>
                      <div className='thumb'>
                        <img
                          src='assets/images/testimonial/client-04.png'
                          alt='Clint Images'
                        />
                      </div>
                      <div className='client-info'>
                        <h5 className='title'>
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
            <div className='single-column-20 bg-theme-gradient-even'>
              <div className='rbt-testimonial-box style-2'>
                <div className='inner'>
                  <div className='icons'>
                    <img
                      src='assets/images/icons/hubs.png'
                      alt='Clint Images'
                    />
                  </div>
                  <div className='description'>
                    <p className='subtitle-3'>
                      Like this histudy, vulputate at sapien sit amet, auctor
                      iaculis lorem. In vel hend rerit nisi. Vestibulum eget
                      risus velit.
                    </p>
                    <div className='clint-info-wrapper'>
                      <div className='thumb'>
                        <img
                          src='assets/images/testimonial/client-05.png'
                          alt='Clint Images'
                        />
                      </div>
                      <div className='client-info'>
                        <h5 className='title'>
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
            <div className='single-column-20 bg-theme-gradient-even'>
              <div className='rbt-testimonial-box style-2'>
                <div className='inner'>
                  <div className='icons'>
                    <img
                      src='assets/images/icons/yelp.png'
                      alt='Clint Images'
                    />
                  </div>
                  <div className='description'>
                    <p className='subtitle-3'>
                      Educational template, vulputate at sapien sit amet, auctor
                      iaculis lorem. In vel hend rerit nisi. Vestibulum eget
                      risus velit.
                    </p>
                    <div className='clint-info-wrapper'>
                      <div className='thumb'>
                        <img
                          src='assets/images/testimonial/client-01.png'
                          alt='Clint Images'
                        />
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
            </div>
            {/* End Single Testimonial  */}
            {/* Start Single Testimonial  */}
            <div className='single-column-20 bg-theme-gradient-even'>
              <div className='rbt-testimonial-box style-2'>
                <div className='inner'>
                  <div className='icons'>
                    <img
                      src='assets/images/icons/bing.png'
                      alt='Clint Images'
                    />
                  </div>
                  <div className='description'>
                    <p className='subtitle-3'>
                      Online leaning, vulputate at sapien sit amet, auctor
                      iaculis lorem. In vel hend rerit nisi. Vestibulum eget
                      risus velit.
                    </p>
                    <div className='clint-info-wrapper'>
                      <div className='thumb'>
                        <img
                          src='assets/images/testimonial/client-07.png'
                          alt='Clint Images'
                        />
                      </div>
                      <div className='client-info'>
                        <h5 className='title'>
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
            <div className='single-column-20 bg-theme-gradient-even'>
              <div className='rbt-testimonial-box style-2'>
                <div className='inner'>
                  <div className='icons'>
                    <img
                      src='assets/images/icons/facebook.png'
                      alt='Clint Images'
                    />
                  </div>
                  <div className='description'>
                    <p className='subtitle-3'>
                      Remote learning, vulputate at sapien sit amet, auctor
                      iaculis lorem. In vel hend rerit nisi. Vestibulum eget
                      risus velit.
                    </p>
                    <div className='clint-info-wrapper'>
                      <div className='thumb'>
                        <img
                          src='assets/images/testimonial/client-08.png'
                          alt='Clint Images'
                        />
                      </div>
                      <div className='client-info'>
                        <h5 className='title'>
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
            <div className='single-column-20 bg-theme-gradient-even'>
              <div className='rbt-testimonial-box style-2'>
                <div className='inner'>
                  <div className='icons'>
                    <img
                      src='assets/images/icons/yelp.png'
                      alt='Clint Images'
                    />
                  </div>
                  <div className='description'>
                    <p className='subtitle-3'>
                      University managemnet, vulputate at sapien sit amet,
                      auctor iaculis lorem. In vel hend rerit nisi. Vestibulum
                      eget risus velit.
                    </p>
                    <div className='clint-info-wrapper'>
                      <div className='thumb'>
                        <img
                          src='assets/images/testimonial/client-06.png'
                          alt='Clint Images'
                        />
                      </div>
                      <div className='client-info'>
                        <h5 className='title'>
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
    </>
  );
};
export default Landing;
