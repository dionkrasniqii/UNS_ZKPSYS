import React, { useEffect, useState } from "react";
import { RotatingTriangles, Triangle } from "react-loader-spinner";
import { useParams } from "react-router";
import CrudProvider from "../../provider/CrudProvider";

export default function NewsDetails() {
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
        {Object.keys(news).length > 0 ? (
          <div className='row g-5 row--30 align-items-center'>
            <div className='col-lg-6'>
              <div className='thumbnail'>
                <img
                  className='w-100 radius-10'
                  src={CrudProvider.documentPath(news.document?.docPath)}
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
