import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import CrudProvider from "../../provider/CrudProvider";

export default function News() {
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

  async function handleDelete(e) {
    await CrudProvider.deleteItemById("NjoftimetAPI", e).then((res) => {
      if (res) {
        if (res.statusCode === 200) {
          CrudProvider.getAll("NjoftimetAPI").then((res) => {
            setNews(res.result);
          });
          toast.success("Te dhenat u fshin me sukses");
        } else if (res.statusCode === 0) {
          toast.error(res.errorMessages[0]);
        }
      } else {
        toast.error("Probleme ne server");
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
                <h1 className="title mb--0">Të gjitha lajmrimet</h1>
              </div>
              <p className="description mt-1">
                Blogu i lajmëve paraqet standarde që njofton të gjithë
                përdoruesit në mënyren sa më të shpejt dhe korrekte.
              </p>
            </div>
            <div className="col-lg-2">
              <Link className="rbt-btn btn-gradient" to={"/news/create"}>
                Krijoni Lajmrimin
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
                      <Link
                        className="transparent-button"
                        to={`/news/edit/${btoa(obj.njoftimiId)}`}
                      >
                        Learn More
                        <i>
                          <svg
                            width="17"
                            height="12"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g stroke="#27374D" fill="none" fill-rule="evenodd">
                              <path d="M10.614 0l5.629 5.629-5.63 5.629"></path>
                              <path
                                stroke-linecap="square"
                                d="M.663 5.572h14.594"
                              ></path>
                            </g>
                          </svg>
                        </i>
                      </Link>
                      <span>
                        {obj.aktiv === true ? (
                          <span
                            className=" fs-5 text-uppercase"
                            style={{ color: "green" }}
                          >
                            Aktiv
                          </span>
                        ) : (
                          <span
                            className=" fs-5 text-uppercase"
                            style={{ color: "red" }}
                          >
                            Jo Aktiv
                          </span>
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
