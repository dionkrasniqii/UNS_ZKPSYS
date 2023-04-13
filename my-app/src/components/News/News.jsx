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
    <div className='container-fluid p-0'>
      <div className='rbt-buy-now-area rbt-section-gap bg-gradient-1 header-transperent-spacer px-5'>
        <div className='px--40'>
          <div className='row'>
            <div className='col-lg-10'>
              <div className=' title-wrapper'>
                <h1 className='title mb--0'>Të gjitha lajmrimet</h1>
              </div>
              <p className='description mt-1'>
                Blogu i lajmëve paraqet standarde që njofton të gjithë
                përdoruesit në mënyren sa më të shpejt dhe korrekte.
              </p>
            </div>
            <div className='col-lg-2'>
              <Link className='rbt-btn btn-gradient' to={"/news/create"}>
                Krijo
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className='container rbt-buy-now-area top-news'>
        <div className='row'>
          {news.length > 0 &&
            news.map((obj, index) => (
              <div className='col-lg-4 mb-5' key={index}>
                <div className='rbt-card variation-02 rbt-hover'>
                  <div className='rbt-card-img'>
                    <Link to={`/news/edit/${btoa(obj.njoftimiId)}`}>
                      <img
                        src={CrudProvider.documentPath(obj.document.docPath)}
                        alt='Card image'
                      />
                    </Link>
                  </div>
                  <div className='rbt-card-body'>
                    <h5 className='rbt-card-title'>
                      <Link to={`/news/edit/${btoa(obj.njoftimiId)}`}>
                        {obj.titulli}
                      </Link>
                    </h5>
                    <div className='rbt-card-bottom'>
                      <div className='row'>
                        <div className='col-md-3 col-xxl-3 col-lg-3'>
                          <a
                            onClick={(e) => {
                              handleDelete(obj.njoftimiId);
                            }}
                          >
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              width={16}
                              height={16}
                              fill='red'
                              className='bi bi-trash3'
                              viewBox='0 0 16 16'
                            >
                              <path d='M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z' />
                            </svg>
                          </a>
                        </div>
                        <Link
                          className='transparent-button'
                          to={`/news/edit/${btoa(obj.njoftimiId)}`}
                        >
                          Modifiko
                          <i>
                            <svg
                              width='17'
                              height='12'
                              xmlns='http://www.w3.org/2000/svg'
                            >
                              <g
                                stroke='#27374D'
                                fill='none'
                                fillRule='evenodd'
                              >
                                <path d='M10.614 0l5.629 5.629-5.63 5.629'></path>
                                <path
                                  strokeLinecap='square'
                                  d='M.663 5.572h14.594'
                                ></path>
                              </g>
                            </svg>
                          </i>
                        </Link>
                      </div>
                      <span>
                        {obj.aktiv === true ? (
                          <span
                            className=' fs-5 text-uppercase'
                            style={{ color: "green" }}
                          >
                            Aktiv
                          </span>
                        ) : (
                          <span
                            className=' fs-5 text-uppercase'
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
