import React, { useEffect, useState } from "react";
import { RotatingTriangles, Triangle } from "react-loader-spinner";
import { useParams } from "react-router";
import CrudProvider from "../../provider/CrudProvider";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function NewsDetails() {
  const { t } = useTranslation();
  const { id } = useParams();
  const decryptedId = atob(id);
  const [news, setNews] = useState({});

  useEffect(() => {
    CrudProvider.getItemById("NjoftimetAPI/GetNjoftimet", decryptedId).then(
      (res) => {
        if (res) {
          if (res.statusCode === 200) {
            setNews(res.result);
          }
        }
      }
    );
  }, []);
  return (
    <div className="container-fluid p-0">
      <div className="rbt-buy-now-area rbt-section-gap bg-gradient-1 header-transperent-spacer px-5"></div>
      <div className="container rbt-buy-now-area top-news-two">
        <div className="rbt-blog-details-area rbt-section-gapBottom breadcrumb-style-max-width pb--0">
          {Object.keys(news).length > 0 ? (
            <div className="blog-content-wrapper rbt-article-content-wrapper">
              <div className="breadcrumb-content-top text-center py-lg-5">
                <h1 class="title">{news.titulli}</h1>
              </div>
              <div className="content">
                <div className="post-thumbnail mb--30 position-relative wp-block-image alignwide figure-div">
                  <figure>
                    <img
                      className="w-100"
                      src={CrudProvider.documentPath(news.document.docPath)}
                      alt="Product Images"
                    />
                  </figure>
                  <div className="row row--30">
                    <div className="col-12 mt-5">
                      <blockquote class="rbt-blockquote">
                        <p className="fs-3 color-body fw-normal">
                          {news.detajet}
                        </p>
                      </blockquote>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="col-xxl-12 d-flex justify-content-center">
              <Triangle height="80" width="80" color="#ff6969" visible={true} />
            </div>
          )}
        </div>
      </div>
      <Link className="rbt-btn-link-reverse" to={"/"}>
        <i>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            fill="currentColor"
            className="bi bi-arrow-left"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
            />
          </svg>
        </i>
        {t("Back")}
      </Link>
    </div>
  );
}
