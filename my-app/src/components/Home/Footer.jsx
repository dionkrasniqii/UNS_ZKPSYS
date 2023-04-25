import React, { Component } from "react";
import { Link } from "react-router-dom";

class Footer extends Component {
  render() {
    const currentYear = new Date().getFullYear();
    return (
      <footer className="rbt-footer footer-style-1">
        {/* <div className="copyright-area copyright-style-1 ptb--20 ">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-12">
                <p className="rbt-link-hover text-center text-lg-center m-0">
                  Copyright © {currentYear}{" "}
                  <a href="https://uni-pr.edu/">| Universiteti i Prishtinës </a>
                  | All Rights Reserved
                </p>
              </div>
            </div>
          </div>
        </div> */}

        <div class="copyright-area copyright-style-1 ptb--20 bg-theme-gradient">
          <div class="container">
            <div class="row align-items-center">
              <div class="col-12">
                <p class="rbt-link-hover text-center color-white-off">
                  Copyright © {currentYear} |{" "}
                  <Link to="/" class="color-white">
                    Universiteti i Prishtinës
                  </Link>{" "}
                  | All Rights Reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}
export default Footer;
