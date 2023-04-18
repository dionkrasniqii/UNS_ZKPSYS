import React, { useEffect, useState } from "react";
import { Alert } from "@mui/material";
import { Select } from "antd";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import CrudProvider from "../../../provider/CrudProvider";
import CreateMagazinePrice from "./CreateMagazinePrice";
import MagazinePrices from "./MagazinePrices";
import { useTranslation } from "react-i18next";

const SearchMagazine = () => {
  const [data, setData] = useState({
    Form: [{}],
    Faculties: [{}],
    Magazines: [{}],
  });
  const { t } = useTranslation();
  const [magazine, setMagazine] = useState({});
  const [show, setShow] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [newModel, setNewModel] = useState({
    RevistaId: "",
    FormulariId: "",
    FakultetiId: "",
  });
  const [text, setText] = useState("");
  const navigate = useNavigate();

  let magazineName = document.getElementById("magazine");

  if (magazineName !== null) {
    magazineName.addEventListener("change", (event) => {
      var text = magazineName.options[magazineName.selectedIndex].text;
      setText(text);
    });
  }

  function handleCreate() {
    setShowCreate(true);
    setShow(false);
  }

  useEffect(() => {
    Promise.all([
      CrudProvider.getAll("FormulariAPI"),
      CrudProvider.getAll("GeneralAPIController/GetFaculties"),
      CrudProvider.getAll("RevistaAPI"),
    ]).then((res) => {
      setData({
        Form: res[0]?.result,
        Faculties: res[1]?.result,
        Magazines: res[2]?.result,
      });
    });
  }, []);

  let formList =
    data.Form &&
    data.Form.length > 0 &&
    data.Form.map((obj) => {
      return { label: `${obj.pershkrimi}`, value: `${obj.formulariId}` };
    });

  let magazineList =
    data.Magazines &&
    data.Magazines.length > 0 &&
    data.Magazines.map((obj) => {
      return { label: `${obj.revistaPershkrimi}`, value: `${obj.revistaId}` };
    }, this);

  let facultiesList =
    data.Faculties &&
    data.Faculties.length > 0 &&
    data.Faculties.map((obj) => {
      return {
        label: `${obj.fakultetiPershkrimi}`,
        value: `${obj.fakultetiId}`,
      };
    }, this);

  async function handleSubmit(data) {
    data.preventDefault();
    if (newModel) {
      const res = await CrudProvider.getMagazinesPrice(
        newModel.FormulariId,
        newModel.RevistaId,
        newModel.FakultetiId
      ).then((res) => {
        if (res) {
          if (res.statusCode === 200) {
            setMagazine(res.result);
            setShow(true);
          }
        }
      });
    } else {
      toast.warning(t("FillAllFields"));
    }
  }
  async function handleSubmitCreate(data) {
    await CrudProvider.createItem("RevistaShumaAPI", data).then((res) => {
      if (res !== undefined) {
        if (res.statusCode === 200) {
          toast.success(t("DataSavedSuccessfully"));
          setShow(false);
          setShowCreate(false);
        } else if (res.statusCode === 0) {
          toast.warning(res.errorMessages[0]);
        }
      } else {
        toast.error(t("ServerProblems"));
      }
    });
  }
  return (
    <div className='container mt-2'>
      <div className='rbt-card rbt-card-body'>
        <form onSubmit={handleSubmit}>
          <div className='row'>
            <div className='col-lg-3 col-md-2 col-sm-12'>
              <label className='fs-4'>{t("Forms")}</label>
              <div className='form-group'>
                <div className='rbt-modern-select bootstrap-select  bg-transparent height-45'>
                  <Select
                    id='forms'
                    options={formList}
                    placeholder={t("Choose")}
                    style={{ width: "100%" }}
                    showSearch
                    optionFilterProp='children'
                    filterOption={(input, option) =>
                      (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    onChange={(e) => {
                      setShow(false);
                      setShowCreate(false);
                      setNewModel({
                        ...newModel,
                        FormulariId: e,
                      });
                    }}
                  />
                </div>
              </div>
            </div>
            <div className='col-lg-3 ps-3 col-md-2 col-sm-12'>
              <label className='fs-4'>{t("Magazines")}</label>
              <div className='form-group'>
                <div className='rbt-modern-select bootstrap-select  bg-transparent height-45'>
                  <Select
                    name='magazines'
                    id='magazine'
                    options={magazineList}
                    placeholder={t("Choose")}
                    style={{ width: "100%" }}
                    showSearch
                    optionFilterProp='children'
                    filterOption={(input, option) =>
                      (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    onChange={(e) => {
                      setShow(false);
                      setShowCreate(false);
                      setNewModel({
                        ...newModel,
                        RevistaId: e,
                      });
                    }}
                  />
                </div>
              </div>
            </div>
            <div className='col-lg-3 col-md-2 ps-4 col-sm-12'>
              <label className='fs-4'>{t("Faculties")}</label>
              <div className='form-group'>
                <div className='rbt-modern-select bootstrap-select  bg-transparent height-45'>
                  <Select
                    name='faculties'
                    id='faculty'
                    options={facultiesList}
                    placeholder={t("Choose")}
                    style={{ width: "130%" }}
                    showSearch
                    optionFilterProp='children'
                    filterOption={(input, option) =>
                      (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    onChange={(e) => {
                      setShow(false);
                      setShowCreate(false);
                      setNewModel({
                        ...newModel,
                        FakultetiId: e,
                      });
                    }}
                  />
                </div>
              </div>
            </div>
            <div className='col-lg-2 col-sm-12 mt-5 text-end'>
              <button
                className='rbt-btn btn-sm btn-border radius-round mt-2'
                type='submit'
                onClick={(e) => {
                  setShowCreate(false);
                }}
              >
                {t("Search")}
              </button>
            </div>
            {show === true && (
              <div className='col-lg-12 col-xxl-12 m-0 pt-5 col-sm-12 d-flex justify-content-center align-items-center'>
                {magazine !== null ? (
                  <MagazinePrices data={magazine} />
                ) : (
                  <Alert className='fs-4' severity='warning'>
                    {t("NoPriceMagazineDescription")}
                    <span
                      className='ps-2 fs-3 text-primary text-uppercase'
                      onClick={handleCreate}
                    >
                      {t("Here")}
                    </span>
                  </Alert>
                )}
              </div>
            )}
            {showCreate === true && (
              <div className='col-lg-12 col-xxl-12 m-0 pt-5 col-sm-12 d-flex justify-content-center align-items-center'>
                <CreateMagazinePrice
                  data={newModel}
                  saveData={handleSubmitCreate}
                  setModel={setNewModel}
                  newModel={newModel}
                  magazineName={text}
                />
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
export default SearchMagazine;
