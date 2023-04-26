import { Button, Checkbox, Select, Upload } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import CrudProvider from "../../../provider/CrudProvider";
import { useTranslation } from "react-i18next";
import Encryption from "../../../Auth/Encryption";
import { useNavigate, useParams } from "react-router";
import ThirdForm from "./ThirdForm";
import FourthForm from "./FourthForm";
import FifthForm from "./FifthForm";
import { UploadOutlined } from "@mui/icons-material";

const SecondForm = () => {
  const { id } = useParams();
  const decryptedId = atob(id);
  const profesor = JSON.parse(
    Encryption.Decrypt(localStorage.getItem("profesor"))
  );
  const [faculty, setFaculty] = useState({});
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [applicationDTO, setApplicationDTO] = useState({
    Aplikimi: {
      FormulariId: decryptedId,
      // DataAplikimit: new Date().toLocaleString(),
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
    AplikimiBashkeAutorId: {
      AplikimiBashkeAutorId: [],
      AutoriHuaj: "",
      Huaj: false,
    },
    AutoriKorrespodentId: {
      AutoriKorrespodentId: [],
      Huaj: false,
      AutoriHuaj: "",
    },
    AutoriKryesorId: {
      AutoriKryesorId: "",
      Huaj: false,
      AutoriHuaj: "",
    },
    BankName: "",
    ThirrjaShkencoreEmri: "",
    ThirrjaAkademikeEmri: "",
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
      IndeksimNePlateformen: "",
    },
    AplikuesiPrezantimi: {
      Konference: false,
      NjesiAkademike: false,
      SqaroMenyrenPrezantimit: "",
    },
    AplikimiDekaniRaportiDocumentId: "",
    KonfirmimiBashkeAutoritDoc: "",
    KonfirmimiAutoritKorrespodentDoc: "",
    KonferenceDokumentiId: "",
    NjesiAkademikeDokumentiId: "",
  });
  const [showForm3, setShowForm3] = useState(false);
  const [showForm4, setShowForm4] = useState(false);
  const [showForm5, setShowForm5] = useState(false);
  const professors = useSelector(
    ({ professorList }) => professorList.professors
  );
  const distinctData = [
    ...new Set(professors.map((professor) => professor.NumriPersonal)),
  ].map((numriPersonal) =>
    professors.find((professor) => professor.NumriPersonal === numriPersonal)
  );
  let professorsList =
    distinctData.length > 0 &&
    distinctData.map(({ ProfesoriID, EmriDheMbiemri }) => ({
      value: `${ProfesoriID}`,
      label: `${EmriDheMbiemri}`,
    }));

  let correspondingAuthors =
    professorsList && applicationDTO.AutoriKryesorId !== ""
      ? professorsList
          .filter(({ value }) => {
            return value !== applicationDTO.AutoriKryesorId;
          })
          .map(({ value, label }) => ({ value, label }))
      : [];
  let coAuthors = correspondingAuthors
    ? correspondingAuthors
        .filter(
          ({ value }) =>
            !applicationDTO.AutoriKorrespodentId.AutoriKorrespodentId.includes(
              value
            )
        )
        .map(({ value, label }) => ({ value, label }))
    : professorsList
        .filter(({ value }) => {
          return value !== applicationDTO.AutoriKryesorId;
        })
        .map(({ value, label }) => ({ value, label }));

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
      setApplicationDTO({
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
  async function handleSubmit() {
    const formData = new FormData();
    Object.keys(applicationDTO).forEach((key) => {
      if (
        key === "Aplikimi" ||
        key === "AplikimiDetajetPublikimi" ||
        key === "AplikuesiPrezantimi" ||
        key === "AutoriKryesorId" ||
        key === "AutoriKorrespodentId" ||
        key === "AplikimiBashkeAutorId"
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
      }
    );
    // window.scrollTo({ top: 0, behavior: "smooth" });
  }

  useEffect(() => {
    CrudProvider.getItemById(
      "GeneralAPIController/GetFakultetiId",
      applicationDTO.Aplikimi.FakultetiId
    ).then((res) => {
      if (res) {
        if (res.statusCode === 200) {
          setFaculty(res.result);
        }
      }
    });
  }, []);

  function handleNextForm() {
    setShowForm3(true);
    // toast.error(t("FillDataAtForm") + " " + t("RequestApplicant"));
  }

  return (
    <div className="col-xxl-12 col-lg-10 col-sm-12 d-flex justify-content-center mt-4 mb-4 ">
      <div className="mt-5">
        <h1 className="page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center my-0 text-uppercase">
          {t("FirstAnnex")}
        </h1>
        <div className="d-flex mt-1">
          <a className="fs-5 fw-bold text-danger">{t("Home")}</a>
          <div className="mx-1 fs-5 fw-bold text-dark">/</div>
          <div className="breadcrumb-item text-muted fs-5">
            {t("FirstAnnex")}
          </div>
        </div>

        <div className="rbt-card col-xxl-12 col-lg-12 col-sm-12 mt-5">
          <h1 className="text-center text-uppercase fs-2 my-3 mb-5">
            {t("ApplicationFormFundingScientificPublication")}
          </h1>
          <div className="row">
            <div className="col-xxl-12 col-lg-10 col-sm-12 rbt-border-dashed rbt-radius border-1 px-5 pt-3 position-relative">
              <div className="box">
                <span>1</span>
              </div>
              <div className="row mt-4 mb-4">
                <div className="col-lg-12 mb-4">
                  <h1 className="page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center my-0">
                    {t("RequestApplicant")}
                  </h1>
                </div>
                <div className="col-lg-3 col-sm-12 col-md-10">
                  <div className="form-group">
                    <label> {t("Name")}</label>
                    <input
                      type="text"
                      defaultValue={applicationDTO.Aplikimi.Emri}
                      readOnly
                    />
                  </div>
                </div>
                <div className="col-lg-3 col-sm-12 col-md-10">
                  <div className="form-group">
                    <label> {t("Surname")}</label>
                    <input
                      type="text"
                      defaultValue={applicationDTO.Aplikimi.Mbiemri}
                      readOnly
                    />
                  </div>
                </div>
                {Object.keys(faculty).length > 0 && (
                  <div className="col-lg-6 col-sm-12 col-md-10">
                    <div className="form-group">
                      <label>{t("AcademicUnit")}</label>
                      <input
                        type="text"
                        defaultValue={faculty.fakultetiPershkrimi}
                        readOnly
                      />
                    </div>
                  </div>
                )}

                <div className="col-lg-6 col-sm-12 col-md-10">
                  <div className="form-group">
                    <label>{t("ScientificCall")}</label>
                    <input
                      type="text"
                      defaultValue={applicationDTO.ThirrjaShkencoreEmri}
                      readOnly
                    />
                  </div>
                </div>
                <div className="col-lg-6 col-sm-12 col-md-10">
                  <div className="form-group">
                    <label>{t("AcademicCall")}</label>
                    <input
                      type="text"
                      defaultValue={applicationDTO.ThirrjaAkademikeEmri}
                      readOnly
                    />
                  </div>
                </div>

                <div className="col-lg-4">
                  <div className="row">
                    {/* <div className='col-xxl-12 col-lg-12 col-sm-12'>
                    <Checkbox
                      onChange={(e) => {
                        setApplicationDTO({
                          ...applicationDTO,
                          AutoriKryesorId: {
                            ...applicationDTO.AutoriKryesorId,
                            Huaj: e.target.checked,
                          },
                        });
                      }}
                    >
                      Autorë të huaj
                    </Checkbox>
                  </div> */}
                    <div className="form-group">
                      <label>{t("LeadAuthor")}</label>
                      {!applicationDTO.AutoriKryesorId.Huaj ? (
                        <div className="rbt-modern-select bootstrap-select pt-2">
                          <Select
                            showSearch
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                              (option?.label ?? "")
                                .toLowerCase()
                                .includes(input.toLowerCase())
                            }
                            mode="single"
                            allowClear
                            style={{ width: "100%" }}
                            placeholder={t("Choose")}
                            onChange={(e) => {
                              setApplicationDTO({
                                ...applicationDTO,
                                AutoriKryesorId: {
                                  ...applicationDTO.AutoriKryesorId,
                                  AutoriKryesorId: e,
                                  AutoriHuaj: 0,
                                },
                                AplikimiBashkeAutorId: {
                                  ...applicationDTO.AplikimiBashkeAutorId,
                                  AplikimiBashkeAutorId: [],
                                },
                                AutoriKorrespodentId: {
                                  ...applicationDTO.AutoriKorrespodentId,
                                  AutoriKorrespodentId: [],
                                },
                              });
                            }}
                            options={professorsList}
                          />
                        </div>
                      ) : (
                        <input
                          type="text"
                          placeholder="...."
                          onChange={(e) => {
                            setApplicationDTO({
                              ...applicationDTO,
                              AutoriKryesorId: {
                                ...applicationDTO.AutoriKryesorId,
                                AutoriHuaj: e.target.value,
                              },
                              AplikimiBashkeAutorId: {
                                ...applicationDTO.AplikimiBashkeAutorId,
                                AplikimiBashkeAutorId: [],
                              },
                              AutoriKorrespodentId: {
                                ...applicationDTO.AutoriKorrespodentId,
                                AutoriKorrespodentId: [],
                              },
                            });
                          }}
                        />
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="row">
                    <div className="col-xxl-12 col-lg-12 col-sm-12">
                      <Checkbox
                        onChange={(e) => {
                          setApplicationDTO({
                            ...applicationDTO,
                            AutoriKorrespodentId: {
                              ...applicationDTO.AutoriKorrespodentId,
                              Huaj: e.target.checked,
                              AutoriHuaj: 0,
                            },
                          });
                        }}
                      >
                        Autorë të huaj
                      </Checkbox>
                    </div>
                    <div className="form-group">
                      <label>{t("CorrespondingAuthor")}</label>
                      {!applicationDTO.AutoriKorrespodentId.Huaj ? (
                        <div className="rbt-modern-select bootstrap-select pt-2">
                          <Select
                            showSearch
                            maxTagCount="responsive"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                              (option?.label ?? "")
                                .toLowerCase()
                                .includes(input.toLowerCase())
                            }
                            mode="multiple"
                            allowClear
                            value={
                              applicationDTO?.AutoriKorrespodentId
                                .AutoriKorrespodentId
                            }
                            style={{ width: "100%" }}
                            placeholder={t("Choose")}
                            onChange={(e) => {
                              setApplicationDTO({
                                ...applicationDTO,
                                AutoriKorrespodentId: {
                                  ...applicationDTO.AutoriKorrespodentId,
                                  AutoriKorrespodentId: e,
                                  AutoriHuaj: 0,
                                },
                              });
                            }}
                            options={correspondingAuthors}
                          />
                        </div>
                      ) : (
                        <input
                          type="text"
                          placeholder="...."
                          onChange={(e) => {
                            setApplicationDTO({
                              ...applicationDTO,
                              AutoriKorrespodentId: {
                                ...applicationDTO.AutoriKorrespodentId,
                                AutoriHuaj: e.target.value,
                                AutoriKorrespodentId: [],
                              },
                            });
                          }}
                        />
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="row">
                    <div className="col-xxl-12 col-lg-12 col-sm-12 ">
                      <Checkbox
                        onChange={(e) => {
                          setApplicationDTO({
                            ...applicationDTO,
                            AplikimiBashkeAutorId: {
                              ...applicationDTO.AplikimiBashkeAutorId,
                              Huaj: e.target.checked,
                            },
                          });
                        }}
                      >
                        Autorë të huaj
                      </Checkbox>
                    </div>
                    <div className="form-group">
                      <label>{t("Co-authors")}</label>
                      {!applicationDTO.AplikimiBashkeAutorId.Huaj ? (
                        <div className="rbt-modern-select bootstrap-select pt-2">
                          <Select
                            showSearch
                            maxTagCount="responsive"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                              (option?.label ?? "")
                                .toLowerCase()
                                .includes(input.toLowerCase())
                            }
                            value={
                              applicationDTO?.AplikimiBashkeAutorId
                                .AplikimiBashkeAutorId
                            }
                            mode="multiple"
                            allowClear
                            style={{ width: "100%" }}
                            placeholder={t("Choose")}
                            onChange={(e) => {
                              setApplicationDTO({
                                ...applicationDTO,
                                AplikimiBashkeAutorId: {
                                  ...applicationDTO.AplikimiBashkeAutorId,
                                  AplikimiBashkeAutorId: e,
                                  AutoriHuaj: 0,
                                },
                              });
                            }}
                            options={coAuthors}
                          />
                        </div>
                      ) : (
                        <input
                          type="text"
                          placeholder="...."
                          onChange={(e) => {
                            setApplicationDTO({
                              ...applicationDTO,
                              AplikimiBashkeAutorId: {
                                ...applicationDTO.AplikimiBashkeAutorId,
                                AutoriHuaj: e.target.value,
                                AplikimiBashkeAutorId: [],
                              },
                            });
                          }}
                        />
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-xxl-12 col-lg-12 col-sm-12">
                  <div className="row">
                    <div className="col-xxl-3 col-lg-3 col-sm-12 mt-3">
                      <Upload
                        maxCount="1"
                        accept=".png, .jpeg, . jpg ,.pdf"
                        className="btn btn-danger btn-raporti w-100"
                        multiple={false}
                        onChange={(e) => {
                          setApplicationDTO({
                            ...applicationDTO,
                            KonfirmimiBashkeAutoritDoc: e.file.originFileObj,
                          });
                        }}
                      >
                        <Button type="text" icon={<UploadOutlined />}>
                          Konfirmimi i bashkautorëve
                        </Button>
                      </Upload>
                    </div>
                    <div className="col-xxl-3 col-lg-3 col-sm-12 mt-3">
                      <Upload
                        maxCount="1"
                        accept=".png, .jpeg, . jpg ,.pdf"
                        className="btn btn-danger btn-raporti w-100"
                        multiple={false}
                        onChange={(e) => {
                          setApplicationDTO({
                            ...applicationDTO,
                            KonfirmimiAutoritKorrespodentDoc:
                              e.file.originFileObj,
                          });
                        }}
                      >
                        <Button type="text" icon={<UploadOutlined />}>
                          Konfirmimi i autorëve përkatës
                        </Button>
                      </Upload>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xxl-12 col-lg-12 col-sm-12 mt-5 text-end">
            <a
              className="btn btn-danger2 fs-5 px-5 py-4"
              onClick={handleNextForm}
              type="button"
            >
              {t("PublicationDetails")}
            </a>
          </div>
        </div>
        <div className="col-xxl-12 col-lg-10 col-sm-12  d-flex justify-content-center mt-4">
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
        <div className="col-xxl-12 col-lg-10 col-sm-12 d-flex justify-content-center mt-4">
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
        <div className="col-xxl-12 col-lg-10 col-sm-12 d-flex justify-content-center mt-4 mb-4 ">
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
export default SecondForm;
