import React, { useEffect, useState } from "react";
import { Alert } from "@mui/material";
import { Select } from "antd";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import CrudProvider from "../../../provider/CrudProvider";
import CreateMagazinePrice from "./CreateMagazinePrice";
import MagazinePrices from "./MagazinePrices";

const SearchMagazine = () => {
  const [data, setData] = useState({
    Form: [{}],
    Faculties: [{}],
    Magazines: [{}],
  });
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
    data.Form.length > 1 &&
    data.Form.map((obj) => {
      return { label: `${obj.pershkrimi}`, value: `${obj.formulariId}` };
    });

  let magazineList =
    data.Magazines &&
    data.Magazines.length > 1 &&
    data.Magazines.map((obj) => {
      return { label: `${obj.revistaPershkrimi}`, value: `${obj.revistaId}` };
    }, this);

  let facultiesList =
    data.Faculties &&
    data.Faculties.length > 1 &&
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
      toast.warning("Zgjedh te gjitha fushat");
    }
  }
  async function handleSubmitCreate(data) {
    await CrudProvider.createItem("RevistaShumaAPI", data).then((res) => {
      if (res !== undefined) {
        if (res.statusCode === 200) {
          toast.success("Te dhenat u regjistruan me sukses");
          setShow(false);
          setShowCreate(false);
        } else if (res.statusCode === 0) {
          toast.warning(res.errorMessages[0]);
        }
      } else {
        toast.error("Probleme me server, ju lutem perseri");
      }
    });
  }
  return (
    <div className='container mt-2'>
      <div className='rbt-card rbt-card-body'>
        <form onSubmit={handleSubmit}>
          <div className='row'>
            <div className='col-lg-3 col-md-2 col-sm-12'>
              <label className='fs-4'>Formularet</label>
              <div className='form-group'>
                <div className='rbt-modern-select bootstrap-select  bg-transparent height-45'>
                  <Select
                    id='forms'
                    options={formList}
                    placeholder='Zgjedhni'
                    style={{ width: "100%" }}
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
              <label className='fs-4'>Revistat</label>
              <div className='form-group'>
                <div className='rbt-modern-select bootstrap-select  bg-transparent height-45'>
                  <Select
                    name='magazines'
                    id='magazine'
                    options={magazineList}
                    placeholder='Zgjedhni'
                    style={{ width: "100%" }}
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
              <label className='fs-4'>Fakultetet</label>
              <div className='form-group'>
                <div className='rbt-modern-select bootstrap-select  bg-transparent height-45'>
                  <Select
                    name='faculties'
                    id='faculty'
                    options={facultiesList}
                    placeholder='Zgjedhni'
                    style={{ width: "130%" }}
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
                Kerko
              </button>
            </div>
            {show === true && (
              <div className='col-lg-12 col-xxl-12 m-0 pt-5 col-sm-12 d-flex justify-content-center align-items-center'>
                {magazine !== null ? (
                  <MagazinePrices data={magazine} />
                ) : (
                  <Alert className='fs-4' severity='warning'>
                    Ska formular me qmim per kete reviste, per te krijuar nje
                    çmimi klikoni
                    <span
                      className='ps-2 fs-3 text-primary text-uppercase'
                      onClick={handleCreate}
                    >
                      ketu
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
