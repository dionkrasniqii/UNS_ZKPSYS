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
    <div className='rbt-single-product-area rbt-single-product rbt-section-gap'>
      <div className='container'>
        <div className='col-xxl-12 col-lg-12 text-start ps-4 mb-2'>
          <Link className='rbt-btn-link-reverse' to={"/"}>
            <i>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width={16}
                height={16}
                fill='currentColor'
                className='bi bi-arrow-left'
                viewBox='0 0 16 16'
              >
                <path
                  fillRule='evenodd'
                  d='M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z'
                />
              </svg>
            </i>
            {t("Back")}
          </Link>
        </div>
        {Object.keys(news).length > 0 ? (
          <div className='row g-5 row--30 align-items-center'>
            <div className='col-lg-6'>
              <div className='thumbnail'>
                <img
                  className='w-100 radius-10'
                  src={CrudProvider.documentPath(news.document.docPath)}
                  alt='Product Images'
                />
              </div>
            </div>
            <div className='col-lg-6'>
              <div className='content'>
                <h2 className='title mt--10 mb--10'>{news.titulli}</h2>
                <p className='mt--20'>{news.detajet}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className='col-xxl-12 d-flex justify-content-center'>
            <Triangle height='80' width='80' color='#ff6969' visible={true} />
          </div>
        )}
      </div>
    </div>
  );
}
