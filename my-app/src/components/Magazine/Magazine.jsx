import { Alert, AlertTitle } from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Encryption from "../../Auth/Encryption";
import photo1 from "../../assets/images/icons/counter-03.png";
import CrudProvider from "../../provider/CrudProvider.js";
import { useTranslation } from "react-i18next";
import IconRevista from "../../assets/images/icons/IconeRevista.png";
import ImagesRevista from "../../assets/images/icons/ImageRevista.png";
import { LocalDrink } from "@mui/icons-material";
const Magazine = () => {
  const [data, setData] = useState([]);
  const { t } = useTranslation();
  useEffect(() => {
    CrudProvider.getAll("RevistaAPI").then((res) => {
      setData(res.result);
    });
  }, []);
  async function handleDelete(e) {
    await CrudProvider.deleteItemById("RevistaAPI", e).then((res) => {
      if (res !== undefined) {
        if (res.statusCode === 200) {
          CrudProvider.getAll("RevistaAPI").then((res) => {
            setData(res.result);
          });
          toast.success(t("DataDeletedSuccessfully"));
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
                <h1 className="title mb--0">Të gjitha revistat shkencore</h1>
              </div>
              <p className="description mt-1">
                Revistat shkencore paraqesin artikuj që përfshijnë rezultate të
                reja të kërkimeve shkencore dhe teori mbi fusha të caktuara.
              </p>
            </div>
            <div className="col-lg-2">
              <Link className="rbt-btn btn-gradient" to="/magazine/create">
                Shto revisten
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="container rbt-buy-now-area top-news">
        <div className="row">
          {data.length > 0 ? (
            data.map((obj, index) => (
              <div
                className="col-lg-4 col-xl-4 col-xxl-4 col-md-6 col-sm-6 col-12 mb-5 px-5 pe-auto"
                key={index}
              >
                <div className="service-card service-card-5 service-card-onhover">
                  <div className="inner">
                    <div class="icon">
                      <img src={ImagesRevista} alt="Shape Images" />
                    </div>
                    <div className="content">
                      <h6 className="title">
                        <Link to={`/magazine/edit/${btoa(obj.revistaId)}`}>
                          {" "}
                          {obj.revistaPershkrimi}
                        </Link>
                      </h6>
                      <p className="description">
                        {obj.aktiv === true ? (
                          <span
                            className=" fs-5 text-uppercase"
                            style={{ color: "green" }}
                          >
                            {t("Active")}
                          </span>
                        ) : (
                          <span
                            className=" fs-5 text-uppercase"
                            style={{ color: "red" }}
                          >
                            {t("NotActive")}
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                  <Link
                    class="delete-icon"
                    onClick={(e) => {
                      handleDelete(obj.revistaId);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="white"
                      class="bi bi-trash3"
                      viewBox="0 0 16 16"
                    >
                      <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"></path>
                    </svg>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <Alert severity="info" className="fs-3">
              {t("NoData")}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};
export default Magazine;
