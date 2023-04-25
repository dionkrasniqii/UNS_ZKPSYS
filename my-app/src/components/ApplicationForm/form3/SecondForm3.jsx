import React, { useEffect, useState } from "react";
import { Button, Checkbox, Select, Upload } from "antd";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import CrudProvider from "../../../provider/CrudProvider";
import Encryption from "../../../Auth/Encryption";
import { useNavigate, useParams } from "react-router";
import { useTranslation } from "react-i18next";
import { UploadOutlined } from "@mui/icons-material";
import ThirdForm3 from "./ThirdForm3";
import FourthForm3 from "./FourthForm3";
import { schemaForm2 } from "./schemas/schemas";
import { useFormik } from "formik";

const SecondForm3 = () => {
  const { id } = useParams();
  const decryptedId = atob(id);
  const profesor = JSON.parse(
    Encryption.Decrypt(localStorage.getItem("profesor"))
  );
  const { t } = useTranslation();
  const navigate = useNavigate();
  const professors = useSelector((state) => state.professorList.professors);
  const [faculty, setFaculty] = useState({});
  const [applicationDTO, setapplicationDTO] = useState({
    Aplikimi: {
      FormulariId: decryptedId,
      ProfesoriId: profesor.profesoriID,
      Emri: profesor.emri,
      Mbiemri: profesor.mbiemri,
      FakultetiId: profesor.fakultetiID,
      ThirrjaShkencoreId: "",
      ThirrjaAkademikeId: "",
      BankaId: "",
      NumriLlogarisBankare: "",
      ShumaKerkuar: "",
      Vendi: "",
    },
    AutoriKryesor: {
      AutoriKryesorId: "",
      Huaj: false,
      AutoriHuaj: "",
    },
    Bashkeautoret: {
      AplikimiBashkeAutorId: [],
      AutoriHuaj: "",
      Huaj: false,
    },
    ThirrjaAkademikeEmri: "",
    ThirrjaShkencoreEmri: "",
    KonfirmimiAutoritKryesorDoc: "",
    KonfirmimiBashkeAutoritDoc: "",
    CVPublikimeDoc: "",
    RekomandimiPerAplikimDoc: "",
    PershkrimiDetajuarProjektitDoc: "",
    PermbledhjeDoc: "",
    PershkrimiProjektitDoc: "",
  });
  const [showForm3, setShowForm3] = useState(false);
  const [showForm4, setShowForm4] = useState(false);
  useEffect(() => {
    Promise.all([
      CrudProvider.getItemById(
        "GeneralAPIController/GetBankaDetajet",
        profesor.numriPersonal
      ),
      CrudProvider.getItemById(
        "GeneralAPIController/GetProfesoriGrade",
        profesor.profesoriID
      ),
    ]).then((res) => {
      setapplicationDTO({
        ...applicationDTO,
        Aplikimi: {
          ...applicationDTO.Aplikimi,
          BankaId: res[0].BankId,
          NumriLlogarisBankare: res[0].AccountNumber,
          BankName: res[0].BankName,
          ThirrjaAkademikeId: res[1][0].GradaMesimoreID,
          ThirrjaShkencoreId: res[1][0].GradaShkencoreID,
        },
        ThirrjaAkademikeEmri: res[1][0].GradaMesimore,
        ThirrjaShkencoreEmri: res[1][0].GradaShkencore,
      });
    });
  }, []);
  let professorsList =
    professors.length > 0 &&
    professors.map((obj) => {
      return { value: `${obj.ProfesoriID}`, label: `${obj.EmriDheMbiemri}` };
    });

  let coAuthors =
    professorsList &&
    professorsList
      .filter(({ value }) => {
        return value !== applicationDTO.AutoriKryesor.AutoriKryesorId;
      })
      .map(({ value, label }) => ({ value, label }));

  async function handleSubmitData() {
    const formData = new FormData();
    Object.keys(applicationDTO).forEach((key) => {
      if (
        key === "Aplikimi" ||
        key === "AutoriKryesor" ||
        key === "Bashkeautoret"
      ) {
        Object.keys(applicationDTO[key]).forEach((subKey) => {
          if (Array.isArray(applicationDTO[key][subKey])) {
            applicationDTO[key][subKey].forEach((value) => {
              formData.append(`${key}.${subKey}[]`, value.toString());
            });
          } else {
            formData.append(`${key}.${subKey}`, applicationDTO[key][subKey]);
          }
        });
      } else if (key === "CVPublikimeDoc") {
        for (let i = 0; i < applicationDTO[key].length; i++) {
          formData.append(key, applicationDTO[key][i]);
        }
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

    // for (let pos of formData.entries()) {
    //   console.log(pos[0] + " " + pos[1]);
    // }
    await CrudProvider.createItemWithFile(
      "AplikimiAPI/PostApplicationAneks3",
      formData
    ).then((res) => {
      if (res) {
        if (res.statusCode === 200) {
          toast.success(t("DataSavedSuccessfully"));
          navigate("/");
        } else if (res.statusCode === 0) {
          toast.error(t("ServerProblems"));
        } else if (res.statusCode === 409) {
          toast.error(t("YouHaveAppliedWithThisEmail"));
        } else {
          toast.error(t("ServerProblems"));
        }
      }
    });
  }

  const { handleSubmit, errors, values, handleChange, setFieldValue } =
    useFormik({
      initialValues: {
        AutoriKryesorId: "",
        Huaj: "",
        AutoriHuaj: "",
        AplikimiBashkeAutorId: "",
        Huaj2: "",
        AutoriHuaj2: "",
      },
      validationSchema: schemaForm2,
      onSubmit: (values, actions) => {
        setShowForm3(true);
      },
    });
  return (
    <>
      <div className='col-xxl-12 col-lg-10 col-sm-12 d-flex justify-content-center mt-4 mb-4 '>
        <div className='mt-5'>
          <h1 className='page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center my-0 text-uppercase'>
            {/* {t("SecondAnnex")} */}
            Aneksi i tretë
          </h1>
          <div className='d-flex mt-1'>
            <a className='fs-5 fw-bold text-danger'> {t("Home")}</a>
            <div className='mx-1 fs-5 fw-bold text-dark'>/</div>
            <div className='breadcrumb-item text-muted fs-5'>
              {/* {t("SecondAnnex")} */}
              Aneksi i tretë
            </div>
          </div>

          <div className='rbt-card col-xxl-12 col-lg-12 col-sm-12 mt-5'>
            <h1 className='text-center text-uppercase fs-2 my-3 mb-5'>
              {t("Applicant")}
            </h1>
            <form onSubmit={handleSubmit}>
              <div className='row'>
                <div className='col-xxl-12 col-lg-10 col-sm-12 rbt-border-dashed rbt-radius border-1 px-5 pt-3 position-relative'>
                  <div className='box'>
                    <span>1</span>
                  </div>
                  <div className='row mt-4 mb-4'>
                    <div className='col-lg-12 mb-4'>
                      <h1 className='page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center my-0'>
                        {t("RequestApplicant")}
                      </h1>
                    </div>
                    <div className='col-lg-3 col-sm-12 col-md-10'>
                      <div className='form-group'>
                        <label> {t("Name")}</label>
                        <input
                          type='text'
                          defaultValue={applicationDTO.Aplikimi.Emri}
                          readOnly
                        />
                      </div>
                    </div>
                    <div className='col-lg-3 col-sm-12 col-md-10'>
                      <div className='form-group'>
                        <label> {t("Surname")}</label>
                        <input
                          type='text'
                          defaultValue={applicationDTO.Aplikimi.Mbiemri}
                          readOnly
                        />
                      </div>
                    </div>
                    {Object.keys(faculty).length > 0 && (
                      <div className='col-lg-6 col-sm-12 col-md-10'>
                        <div className='form-group'>
                          <label>{t("AcademicUnit")}</label>
                          <input
                            type='text'
                            defaultValue={faculty.fakultetiPershkrimi}
                            readOnly
                          />
                        </div>
                      </div>
                    )}
                    <div className='col-lg-6 col-sm-12 col-md-10'>
                      <div className='form-group'>
                        <label>{t("ScientificCall")}</label>
                        <input
                          type='text'
                          defaultValue={applicationDTO.ThirrjaShkencoreEmri}
                          readOnly
                        />
                      </div>
                    </div>
                    <div className='col-lg-6 col-sm-12 col-md-10'>
                      <div className='form-group'>
                        <label>{t("AcademicCall")}</label>
                        <input
                          type='text'
                          defaultValue={applicationDTO.ThirrjaAkademikeEmri}
                          readOnly
                        />
                      </div>
                    </div>
                    <div className='col-xxl-12 col-lg-12 col-sm-12'>
                      <div className='row'>
                        <div className='col-lg-4'>
                          <div className='row'>
                            <div className='col-xxl-12 col-lg-12 col-sm-12'>
                              <Checkbox
                                name='Huaj'
                                onChange={(e) => {
                                  setapplicationDTO({
                                    ...applicationDTO,
                                    AutoriKryesor: {
                                      ...applicationDTO.AutoriKryesor,
                                      Huaj: e.target.checked,
                                      AutoriKryesorId: null,
                                      AutoriHuaj: null,
                                    },
                                    Bashkeautoret: {
                                      ...applicationDTO.Bashkeautoret,
                                      AplikimiBashkeAutorId: [],
                                    },
                                  });
                                }}
                                defaultChecked={false}
                              >
                                Autorë të huaj
                              </Checkbox>
                            </div>
                            <div className='form-group'>
                              <label>{t("LeadAuthor")}</label>
                              {!applicationDTO.AutoriKryesor.Huaj ? (
                                <div className='rbt-modern-select bootstrap-select pt-2'>
                                  <Select
                                    showSearch
                                    name='AutoriKryesorId'
                                    optionFilterProp='children'
                                    filterOption={(input, option) =>
                                      (option?.label ?? "")
                                        .toLowerCase()
                                        .includes(input.toLowerCase())
                                    }
                                    mode='single'
                                    allowClear
                                    style={{ width: "100%" }}
                                    placeholder={t("Choose")}
                                    onChange={(e) => {
                                      setapplicationDTO({
                                        ...applicationDTO,
                                        AutoriKryesor: {
                                          ...applicationDTO.AutoriKryesor,
                                          AutoriKryesorId: e,
                                          AutoriHuaj: null,
                                        },
                                        Bashkeautoret: {
                                          ...applicationDTO.Bashkeautoret,
                                          AplikimiBashkeAutorId: [],
                                        },
                                      });
                                      setFieldValue("AutoriKryesorId", e);
                                    }}
                                    options={professorsList}
                                    value={
                                      applicationDTO.AutoriKryesor
                                        .AutoriKryesorId || null
                                    }
                                  />
                                  {errors.AutoriKryesor && (
                                    <span className='title color-pink'>
                                      {errors.AutoriKryesorId}
                                    </span>
                                  )}
                                </div>
                              ) : (
                                <input
                                  type='text'
                                  name='AutoriHuaj'
                                  placeholder='....'
                                  onChange={(e) => {
                                    setapplicationDTO({
                                      ...applicationDTO,
                                      AutoriKryesor: {
                                        ...applicationDTO.AutoriKryesor,
                                        AutoriKryesorId: null,
                                        AutoriHuaj: e.target.value,
                                      },
                                      Bashkeautoret: {
                                        ...applicationDTO.Bashkeautoret,
                                        AplikimiBashkeAutorId: [],
                                      },
                                    });
                                    setFieldValue("AutoriHuaj", e.target.value);
                                  }}
                                  value={
                                    applicationDTO.AutoriKryesor.AutoriHuaj ||
                                    ""
                                  }
                                />
                              )}
                              {errors.AutoriHuaj && (
                                <span className='title color-pink'>
                                  {errors.AutoriHuaj && (
                                    <span className='title color-pink'>
                                      {errors.AutoriHuaj}
                                    </span>
                                  )}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className='col-lg-4'>
                          <div className='row'>
                            <div className='col-xxl-12 col-lg-12 col-sm-12'>
                              <Checkbox
                                onChange={(e) => {
                                  setapplicationDTO({
                                    ...applicationDTO,
                                    Bashkeautoret: {
                                      ...applicationDTO.Bashkeautoret,
                                      Huaj: e.target.checked,
                                    },
                                  });
                                }}
                              >
                                Autorë të huaj
                              </Checkbox>
                            </div>
                            <div className='form-group'>
                              <label>{t("Co-authors")}</label>
                              {!applicationDTO.Bashkeautoret.Huaj ? (
                                <div className='rbt-modern-select bootstrap-select pt-2'>
                                  <Select
                                    showSearch
                                    maxTagCount='responsive'
                                    optionFilterProp='children'
                                    filterOption={(input, option) =>
                                      (option?.label ?? "")
                                        .toLowerCase()
                                        .includes(input.toLowerCase())
                                    }
                                    mode='multiple'
                                    allowClear
                                    value={applicationDTO.AplikimiBashkeAutorId}
                                    style={{ width: "100%" }}
                                    placeholder={t("Choose")}
                                    onChange={(e) => {
                                      setapplicationDTO({
                                        ...applicationDTO,
                                        Bashkeautoret: {
                                          ...applicationDTO.Bashkeautoret,
                                          AutoriHuaj: 0,
                                          AplikimiBashkeAutorId: e,
                                        },
                                      });
                                    }}
                                    options={coAuthors}
                                  />
                                </div>
                              ) : (
                                <input
                                  type='text'
                                  placeholder='....'
                                  onChange={(e) => {
                                    setapplicationDTO({
                                      ...applicationDTO,
                                      Bashkeautoret: {
                                        ...applicationDTO.Bashkeautoret,
                                        AplikimiBashkeAutorId: [],
                                        AutoriHuaj: e.target.value,
                                      },
                                    });
                                  }}
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='col-xxl-12 col-lg-12 col-sm-12'>
                      <div className='row'>
                        {profesor &&
                          profesor.profesoriID !=
                            applicationDTO.AutoriKryesor.AutoriKryesorId && (
                            <div className='col-xxl-3 col-lg-3 col-sm-12 mt-3'>
                              <Upload
                                maxCount='1'
                                accept='.png, .jpeg, . jpg ,.pdf'
                                className='btn btn-danger btn-raporti w-100'
                                multiple={false}
                                onChange={(e) => {
                                  setapplicationDTO({
                                    ...applicationDTO,
                                    KonfirmimiAutoritKryesorDoc:
                                      e.file.originFileObj,
                                  });
                                }}
                              >
                                <Button type='text' icon={<UploadOutlined />}>
                                  Konfirmimi i autorit kryesorë
                                </Button>
                              </Upload>
                            </div>
                          )}
                        <div className='col-xxl-3 col-lg-3 col-sm-12 mt-3'>
                          <Upload
                            maxCount='1'
                            accept='.png, .jpeg, . jpg ,.pdf'
                            className='btn btn-danger btn-raporti w-100'
                            multiple={false}
                            onChange={(e) => {
                              setapplicationDTO({
                                ...applicationDTO,
                                KonfirmimiBashkeAutoritDoc:
                                  e.file.originFileObj,
                              });
                            }}
                          >
                            <Button type='text' icon={<UploadOutlined />}>
                              Konfirmimi i bashkautorëve
                            </Button>
                          </Upload>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-xxl-12 col-lg-12 col-sm-12 mt-5 text-end'>
                <button className='btn btn-danger fs-5 px-5 py-4' type='button'>
                  {t("ConferencDetails")}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className='col-xxl-12 col-lg-10 col-sm-12  d-flex justify-content-center mt-4'>
        {showForm3 === true ? (
          <ThirdForm3
            applicationDTO={applicationDTO}
            setApplicationDTO={setapplicationDTO}
            showForm4={setShowForm4}
          />
        ) : null}
      </div>
      <div className='col-xxl-12 col-lg-10 col-sm-12  d-flex justify-content-center mt-4'>
        {showForm4 === true ? (
          <FourthForm3
            applicationDTO={applicationDTO}
            setApplicationDTO={setapplicationDTO}
            submit={handleSubmitData}
            professor={profesor}
            // showForm4={setShowForm4}
          />
        ) : (
          <p></p>
        )}
      </div>
    </>
  );
};
export default SecondForm3;
