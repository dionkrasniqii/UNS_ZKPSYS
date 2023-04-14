import React, { useEffect, useState } from "react";
import { useNavigate, useNavigation } from "react-router";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import CrudProvider from "../../provider/CrudProvider";
import { useTranslation } from "react-i18next";

const CreateMagazine = () => {
  const [model, setModel] = useState({
    RevistaPershkrimi: "",
    Aktiv: false,
  });
  const navigate = useNavigate();
  const { t } = useTranslation();
  async function handleSubmit(data) {
    data.preventDefault();
    await CrudProvider.createItem("RevistaAPI", JSON.stringify(model)).then(
      (res) => {
        if (res !== undefined) {
          if (res.statusCode === 200) {
            toast.success(t("Active"));
            navigate("/magazine/index");
          } else {
            toast.error(t("ServerProblems"));
          }
        } else {
          toast.error(t("ServerProblems"));
        }
      }
    );
  }
  return (
    <div className='container'>
      <span className='fs-1'> {t("MagazineDetails")}</span>
      <form onSubmit={handleSubmit}>
        <div className='row row--10 mt--10'>
          <div className='col-lg-4 col-md-4 col-sm-12 col-12'>
            <label className='fs-5' htmlFor='RevistaPershkrimi'>
              {t("Description")}
            </label>
            <div className='form-group'>
              <input
                name='RevistaPershkrimi'
                type='text'
                onChange={(e) =>
                  setModel({ ...model, RevistaPershkrimi: e.target.value })
                }
              />
            </div>
          </div>
          <div className='col-lg-6 d-flex align-items-center'>
            <p className='comment-form-cookies-consent'>
              <input
                id='Aktiv'
                name='Aktiv'
                type='checkbox'
                onChange={(e) =>
                  setModel({ ...model, Aktiv: e.target.checked })
                }
              />
              <label htmlFor='Aktiv'> {t("Active")}</label>
            </p>
          </div>
          <div className='col-lg-12'>
            <div className='row'>
              <div className='col-lg-1 col-sm-12 d-flex justify-content-start'>
                <button
                  className='rbt-btn btn-primary  radius-round btn-sm'
                  type='submit'
                >
                  <span className='btn-text'> {t("Save")}</span>
                  {/* <i className='feather-arrow-right'></i> */}
                  <span className='btn-icon'></span>
                </button>
                <Link
                  className='rbt-btn btn-danger btn-sm radius-round'
                  to={"/magazine/index"}
                >
                  {t("Back")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
export default CreateMagazine;
