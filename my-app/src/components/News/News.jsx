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
    <div className='container mt-5'>
      <div className='row'>
        <div className='col-lg-12'>
          <div className='row'>
            <div className='col-lg-10 col-sm-12 d-flex justify-content-start'>
              <span className='fs-1'>Lajmet</span>
            </div>
            <div className='col-lg-2 col-sm-12 d-flex justify-content-end'>
              <Link
                className='rbt-btn btn-sm btn-border radius-round'
                to={"/news/create"}
              >
                Shto
              </Link>
            </div>
          </div>
        </div>

        {news.length > 0 &&
          news.map((obj, index) => (
            <div
              className='col-lg-4 col-md-6 mt--20 px-2 col-sm-6 col-12'
              key={index}
            >
              <div className='rbt-cat-box rbt-cat-box-1 variation-2 text-center'>
                <div className='inner'>
                  <div className='row'>
                    <div className='col-lg-10'>
                      <div className='icons'>
                        <img
                          src={CrudProvider.documentPath(obj.document.docPath)}
                          alt='Icons Images'
                        />
                      </div>
                      <div className='content'>
                        <div className=''>
                          <span className='rbt-card-title fs-3'>
                            {obj.titulli}
                          </span>
                        </div>
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
                      </div>
                    </div>
                    <div className='col-md-2'>
                      <div className='row'>
                        <div className='d-flex justify-content-center align-items-center'>
                          <div className='col-md-1 text-end text-danger pe-4'>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              width={16}
                              height={16}
                              fill='currentColor'
                              className='bi bi-trash'
                              onClick={(e) => {
                                handleDelete(obj.njoftimiId);
                              }}
                              viewBox='0 0 16 16'
                            >
                              <path d='M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z' />
                              <path
                                fillRule='evenodd'
                                d='M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z'
                              />
                            </svg>
                          </div>
                          <div className='col-md-1'>
                            <Link
                              className='transparent-button ps-1'
                              to={`/news/edit/${btoa(obj.njoftimiId)}`}
                            >
                              <svg
                                width={17}
                                height={12}
                                xmlns='http://www.w3.org/2000/svg'
                              >
                                <g
                                  stroke='#27374D'
                                  fill='none'
                                  fillRule='evenodd'
                                >
                                  <path d='M10.614 0l5.629 5.629-5.63 5.629' />
                                  <path
                                    strokeLinecap='square'
                                    d='M.663 5.572h14.594'
                                  />
                                </g>
                              </svg>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
