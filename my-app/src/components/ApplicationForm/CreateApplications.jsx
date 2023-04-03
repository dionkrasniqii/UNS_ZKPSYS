import { Select } from "antd";
import axios from "axios";
import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Encryption from "../../Auth/Encryption";
import CrudProvider from "../../provider/CrudProvider";
import FifthForm from "./forms/FifthForm";
import FourthForm from "./forms/FourthForm";
import SecondForm from "./forms/SecondForm";
import ThirdForm from "./forms/ThirdForm";

const CreateApplications = () => {
  const profesor = JSON.parse(
    Encryption.Decrypt(localStorage.getItem("profesor"))
  );
  const [forms, setForms] = useState([]);
  const [academicCalls, setAcademicCalls] = useState([]);
  const [scientificCalls, setScientificCalls] = useState([]);
  const [banks, setBanks] = useState([]);
  const [formId, setFormId] = useState("");
  const [academicCallId, setAcademicCallId] = useState("");
  const [scientificCallId, setScientificCallId] = useState("");
  const [bankID, setBankID] = useState("");
  const [applicationDTO, setApplicationDTO] = useState({
    Aplikimi: {
      FormulariId: "",
      DataAplikimit: new Date().toLocaleString(),
      ProfesoriId: profesor.profesoriID,
      Emri: "",
      Mbiemri: "",
      FakultetiId: profesor.fakultetiID,
      ThirrjaShkencoreId: "",
      ThirrjaAkademikeId: "",
      BankaId: "",
      NumriLlogarisBankare: "",
      // ME KALU  NE DINAMIKE MASNEJ
      ShumaKerkuar: "250",
      Vendi: "",
    },
    AutoriKryesorId: "",
    AplikimiDetajetPublikimi: {
      PerkatesiaAutorit: "",
      TitulliPunimit: "",
      DOI: "",
      ShtepiaBotuese: "",
      RevistaId: "",
      ImpaktFaktori: "",
      DataPranimit: "",
      LinkuPublikimit: "",
      DataPublikimit: "",
    },
    AplikuesiPrezantimi: {
      Konference: false,
      NjesiAkademike: false,
      SqaroMenyrenPrezantimit: "",
    },
    AplikimiDekaniRaportiDocumentId: "",
    KonferenceDokumentiId: "",
    NjesiAkademikeDokumentiId: "",
    AplikimiBashkeAutorId: [],
    AutoriKorrespodentId: [],
  });
  const [showForm1, setShowForm1] = useState(false);
  const [showForm3, setShowForm3] = useState(false);
  const [showForm4, setShowForm4] = useState(false);
  const [showForm5, setShowForm5] = useState(false);

  useEffect(() => {
    Promise.all([
      CrudProvider.getAll("FormulariAPI"),
      CrudProvider.getAll("GeneralAPIController/GetBanka"),
      CrudProvider.getAll("GeneralAPIController/GetThirrjaShkencore"),
      CrudProvider.getAll("GeneralAPIController/GetThirrjaAkademike"),
    ]).then((responses) => {
      setForms(responses[0].result);
      setBanks(responses[1].result);
      setScientificCalls(responses[2].result);
      setAcademicCalls(responses[3].result);
    });
  }, []);

  let formList =
    forms.length > 0 &&
    forms.map((obj, index) => {
      return { label: `${obj.pershkrimi}`, value: `${obj.formulariId}` };
    });

  let bankList =
    banks.length > 0 &&
    banks.map((obj, index) => {
      return { label: `${obj.bankaEmri}`, value: `${obj.bankaId}` };
    });

  let academicCallsList =
    academicCalls.length > 0 &&
    academicCalls.map((obj, index) => {
      return {
        label: `${obj.pershkrimi}`,
        value: `${obj.thirrjaAkademikeId}`,
      };
    });

  let scientificCallsList =
    scientificCalls.length > 0 &&
    scientificCalls.map((obj, index) => {
      return {
        label: `${obj.pershkrimi}`,
        value: `${obj.thirrjaShkencoreId}`,
      };
    });

  function firstChanges(data) {
    data.preventDefault();
    if (
      formId != 0 &&
      academicCallId != 0 &&
      scientificCallId != 0 &&
      bankID != 0
    ) {
      setApplicationDTO({
        ...applicationDTO,
        Aplikimi: {
          ...applicationDTO.Aplikimi,
          FormulariId: formId,
          ThirrjaAkademikeId: academicCallId,
          ThirrjaShkencoreId: scientificCallId,
          BankaId: bankID,
        },
      });
      setShowForm1(true);
    } else {
      toast.warning("Mbushni fushat e kerkuara");
    }
  }
  async function handleSubmit() {
    const formData = new FormData();
    Object.keys(applicationDTO).forEach((key) => {
      if (
        key === "Aplikimi" ||
        key === "AplikimiDetajetPublikimi" ||
        key === "AplikuesiPrezantimi"
      ) {
        Object.keys(applicationDTO[key]).forEach((subKey) => {
          formData.append(`${key}.${subKey}`, applicationDTO[key][subKey]);
        });
      } else if (
        typeof applicationDTO[key] === "object" &&
        applicationDTO[key] !== null &&
        applicationDTO[key].constructor === Array
      ) {
        applicationDTO[key].forEach((value) => {
          formData.append(`${key}[]`, value.toString());
        });
      } else {
        formData.append(key, applicationDTO[key]);
      }
    });
    await CrudProvider.createItemWithFile("AplikimiAPI", formData).then(
      (res) => {
        if (res !== undefined) {
          if (res.statusCode === 200) {
            toast.success("Aplikimi u regjistrua me sukses");
          } else if (res.statusCode === 0) {
            toast.error("Probleme ne server ju lutemi provoni perseri");
          } else if (res.statusCode === 409) {
            toast.error("Ju keni aplikuar me heret me kete email");
          } else {
            toast.error("Probleme ne server ju lutemi provoni perseri");
          }
        }
      }
    );
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className='container mt-5'>
      <div className='rbt-card mb-4 col-xxl-12 col-lg-12 col-sm-12'>
        <form onSubmit={firstChanges} id='applyForm'>
          <div className='row'>
            <div className='col-lg-2 col-md-10 col-sm-12'>
              <label className='fs-4'>Formularet</label>
              <div className='rbt-modern-select bootstrap-select  bg-transparent height-45'>
                <Select
                  id='forms'
                  options={formList}
                  placeholder='Zgjedhni'
                  style={{ width: "100%" }}
                  onChange={(e) => {
                    setApplicationDTO({
                      ...applicationDTO,
                      Aplikimi: {
                        ...applicationDTO.Aplikimi,
                        FormulariId: e,
                      },
                    });
                    setFormId(e);
                  }}
                />
              </div>
            </div>
            <div className='col-lg-3 col-md-10 col-sm-12'>
              <label className='fs-4'>Thirrja akademike</label>
              <div className='rbt-modern-select bootstrap-select  bg-transparent height-45'>
                <Select
                  name='academicCall'
                  options={academicCallsList}
                  style={{ width: "100%" }}
                  placeholder='Zgjedhni'
                  onChange={(e) => {
                    setApplicationDTO({
                      ...applicationDTO,
                      Aplikimi: {
                        ...applicationDTO.Aplikimi,
                        ThirrjaAkademikeId: e,
                      },
                    });
                    setAcademicCallId(e);
                  }}
                />
              </div>
            </div>
            <div className='col-lg-3 col-md-10 col-sm-12'>
              <label className='fs-4'>Thirrja shkencore</label>
              <div className='rbt-modern-select bootstrap-select  bg-transparent height-45'>
                <Select
                  name='scientificCall'
                  options={scientificCallsList}
                  placeholder='Zgjedhni'
                  style={{ width: "100%" }}
                  onChange={(e) => {
                    setApplicationDTO({
                      ...applicationDTO,
                      Aplikimi: {
                        ...applicationDTO.Aplikimi,
                        ThirrjaShkencoreId: e,
                      },
                    });
                    setScientificCallId(e);
                  }}
                />
              </div>
            </div>
            <div className='col-lg-2 col-md-10 col-sm-12'>
              <label className='fs-4'>Banka</label>
              <div className='rbt-modern-select bootstrap-select  bg-transparent height-45'>
                <Select
                  name='bank'
                  placeholder='Zgjedhni'
                  options={bankList}
                  style={{ width: "100%" }}
                  onChange={(e) => {
                    setApplicationDTO({
                      ...applicationDTO,
                      Aplikimi: {
                        ...applicationDTO.Aplikimi,
                        BankaId: e,
                      },
                    });
                    setBankID(e);
                  }}
                />
              </div>
            </div>
            <div className='col-xl-2 col-md-10 col-sm-12 d-flex align-items-center mt-4'>
              <button
                className='rbt-btn btn-sm btn-border radius-round '
                // to={"/magazine/create"}
                type='submit'
              >
                Vazhdo
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className='col-xxl-12'>
        <div className='col-xxl-12 col-lg-10 col-sm-12 d-flex justify-content-center'>
          {showForm1 === true ? (
            <SecondForm
              applicationDTO={applicationDTO}
              setApplicationDTO={setApplicationDTO}
              showForm3={setShowForm3}
            />
          ) : (
            <p></p>
          )}
        </div>
        <div className='col-xxl-12 col-lg-10 col-sm-12  d-flex justify-content-center mt-4'>
          {showForm3 === true ? (
            <ThirdForm
              applicationDTO={applicationDTO}
              setApplicationDTO={setApplicationDTO}
              showForm4={setShowForm4}
            />
          ) : (
            <p></p>
          )}
        </div>
        <div className='col-xxl-12 col-lg-10 col-sm-12 d-flex justify-content-center mt-4'>
          {showForm4 === true ? (
            <FourthForm
              applicationDTO={applicationDTO}
              setApplicationDTO={setApplicationDTO}
              showForm5={setShowForm5}
            />
          ) : (
            <p></p>
          )}
        </div>
        <div className='col-xxl-12 col-lg-10 col-sm-12 d-flex justify-content-center mt-4 mb-4 '>
          {showForm5 === true ? (
            <FifthForm
              applicationDTO={applicationDTO}
              setApplicationDTO={setApplicationDTO}
              showForm5={setShowForm5}
              submit={handleSubmit}
            />
          ) : (
            <p></p>
          )}
        </div>
      </div>
    </div>
  );
};
export default CreateApplications;
