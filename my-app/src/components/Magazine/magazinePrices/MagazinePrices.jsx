import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import CrudProvider from "../../../provider/CrudProvider";
import { useTranslation } from "react-i18next";

const MagazinePrices = ({ data }) => {
  const navigate = useNavigate();
  const [model, setModel] = useState({
    RevistaShumaId: data.revistaShumaId,
    RevistaId: data.revistaId,
    FormulariId: data.formulariId,
    FakultetiId: data.fakultetiId,
    Shuma: data.shuma,
  });
  const { t } = useTranslation();
  const [edit, setEdit] = useState(false);
  function changePrice() {
    setEdit(true);
  }
  async function handleSubmit() {
    CrudProvider.updateItem("RevistaShumaAPI", JSON.stringify(model)).then(
      (res) => {
        if (res !== undefined) {
          if (res.statusCode) {
            toast.success(t("DataSavedSuccessfully"));
            setEdit(false);
          }
        } else {
          toast.error(t("ServerProblems"));
        }
      }
    );
  }
  // async function handleDelete(e) {
  //   await CrudProvider.deleteItemById("RevistaShumaAPI", e).then((res) => {
  //     if (res !== undefined) {
  //       if (res.statusCode === 200) {
  //         toast.success("Te dhenat u fshin me sukses");
  //       }
  //     } else {
  //       toast.error("Probleme ne server");
  //     }
  //   });
  // }
  return (
    <div className='container'>
      <div className='col-lg-12 col-xxl-12 col-sm-12'>
        <div className='rbt-course-grid-column'>
          <div className='course-grid-3'>
            <div className='rbt-card variation-01 rbt-hover'>
              <div className='rbt-card-body'>
                {/* <div className='col-xxl-12 text-end text-danger pe-4'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width={16}
                  height={16}
                  fill='currentColor'
                  className='bi bi-trash'
                  onClick={(e) => {
                    handleDelete(model.RevistaShumaId);
                  }}
                  viewBox='0 0 16 16'
                >
                  <path d='M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z' />
                  <path
                    fillRule='evenodd'
                    d='M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z'
                  />
                </svg>
              </div> */}
                <h4 className='rbt-card-title'>
                  <a href='course-details.html'>{data.formulari.pershkrimi}</a>
                </h4>
                <p className='rbt-card-text'>
                  {data.revistat.revistaPershkrimi}
                </p>

                <div className='rbt-card-bottom'>
                  {edit === false ? (
                    <>
                      <div className='rbt-price'>
                        <span className='current-price'>{model.Shuma}$</span>
                      </div>
                      <a className='rbt-btn-link' onClick={changePrice}>
                        {t("Edit")}
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width={16}
                          height={16}
                          fill='currentColor'
                          className='ms-2 bi bi-arrow-right'
                          viewBox='0 0 16 16'
                        >
                          <path
                            fillRule='evenodd'
                            d='M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z'
                          />
                        </svg>
                      </a>
                    </>
                  ) : (
                    <div>
                      <div className='form-group'>
                        <label> {t("PutPrice")}</label>
                        <input
                          type='text'
                          className='w-75'
                          defaultValue={model.Shuma}
                          onChange={(e) =>
                            setModel({ ...model, Shuma: e.target.value })
                          }
                        />
                        <a onClick={handleSubmit}>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width={16}
                            height={16}
                            fill='currentColor'
                            className='bi bi-check-lg'
                            viewBox='0 0 16 16'
                          >
                            <path d='M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z' />
                          </svg>
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MagazinePrices;
