import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import CrudProvider from "../../provider/CrudProvider";
import { useTranslation } from "react-i18next";

export default function News() {
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

  async function handleDelete(e) {
    await CrudProvider.deleteItemById("NjoftimetAPI", e).then((res) => {
      if (res) {
        if (res.statusCode === 200) {
          CrudProvider.getAll("NjoftimetAPI").then((res) => {
            setNews(res.result);
          });
          toast.success(t("DataDeletedSuccessfully"));
        } else if (res.statusCode === 0) {
          toast.error(res.errorMessages[0]);
        }
      } else {
        toast.error(t("ServerProblems"));
      }
    });
  }

  return (
    <div className="container-fluid p-0">
      <div className="rbt-buy-now-area rbt-section-gap bg-gradient-1 header-transperent-spacer px-5">
        <div className="px--40">
          <div className="row">
            <div className="col-lg-10">
              <div className=" title-wrapper">
                <h1 className="title mb--0">{t("AllNews")}</h1>
              </div>
              <p className="description mt-1">{t("NewsDesc")}</p>
            </div>
            <div className="col-lg-2">
              <Link className="rbt-btn btn-gradient" to={"/news/create"}>
                {t("Add")}
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="container rbt-buy-now-area top-news">
        <div className="row">
          {news.length > 0 &&
            news.map((obj, index) => (
              <div className="col-lg-4 mb-5" key={index}>
                <div className="rbt-card variation-02 rbt-hover">
                  <div className="rbt-card-img">
                    <Link to={`/news/edit/${btoa(obj.njoftimiId)}`}>
                      <img
                        src={CrudProvider.documentPath(obj.document.docPath)}
                        alt="Card image"
                      />
                    </Link>
                  </div>
                  <div className="rbt-card-body">
                    <h5 className="rbt-card-title">
                      <Link to={`/news/edit/${btoa(obj.njoftimiId)}`}>
                        {obj.titulli}
                      </Link>
                    </h5>
                    <div className="rbt-card-bottom">
                      <div className="row">
                        <div className="col-md-12 col-xxl-12 col-lg-12">
                          <div className="d-flex justify-content-end align-items-baseline">
                            <a
                              className="delete-button"
                              onClick={(e) => {
                                handleDelete(obj.njoftimiId);
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="white"
                                className="bi bi-trash3"
                                viewBox="0 0 16 16"
                              >
                                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                              </svg>
                            </a>
                          </div>
                          <Link
                            className="transparent-button"
                            to={`/news/edit/${btoa(obj.njoftimiId)}`}
                          >
                            {t("Edit")}
                            <i>
                              <svg
                                width="17"
                                height="12"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g
                                  stroke="#27374D"
                                  fill="none"
                                  fillRule="evenodd"
                                >
                                  <path d="M10.614 0l5.629 5.629-5.63 5.629"></path>
                                  <path
                                    strokeLinecap="square"
                                    d="M.663 5.572h14.594"
                                  ></path>
                                </g>
                              </svg>
                            </i>
                          </Link>
                        </div>
                      </div>
                      <span>
                        {obj.aktiv === true ? (
                          <div className="bg-active-text-green">
                            <span className=" fs-5 text-uppercase active-text">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                class="bi bi-patch-check-fill"
                                viewBox="0 0 16 16"
                              >
                                <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708z" />
                              </svg>
                            </span>
                          </div>
                        ) : (
                          <div className="bg-active-text-red">
                            <span className=" fs-5 text-uppercase nonActive-text">
                              {t("NotActive")}
                            </span>
                          </div>
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
