import React, { useState, useEffect } from "react";
import CrudProvider from "../../../provider/CrudProvider";
import { useNavigate, useParams } from "react-router";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Button, DatePicker, Select, Upload } from "antd";
import { Link } from "react-router-dom";
import { UploadOutlined } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

export default function ApplicationEditProfessorForm1() {
  const { id } = useParams();
  const decryptedId = atob(id);
  const { t } = useTranslation();
  const [applicant, setApplicant] = useState({});
  const [revistat, setRevistat] = useState([]);
  const navigate = useNavigate();
  const professorList = useSelector((state) => state.professorList.professors);
  const [newModel, setModel] = useState({
    AplikimiId: "",
    AutorKryesoreId: "",
    AutorKorrespodentId: [],
    BashkautoretId: [],
    PerkatesiaAutorit: "",
    TitulliPunimit: "",
    RevistaId: "",
    ImpaktFaktori: "",
    DOI: "",
    ShtepiaBotuese: "",
    DataPranimit: "",
    DataPublikimit: "",
    LinkuPublikimit: "",
    Konferenc: "",
    NjesiAkademike: "",
    RaportiDekanit: "",
    KonferencDoc: "",
    IndeksimiNePlatforme: "",
    NjesiaAkademikeDoc: "",
    BankaId: "",
    Vendi: "",
    LlogariaBankare: "",
    SqaroMenyrenPrezantimit: "",
    ChangeDekaniDoc: false,
    ChangeKonferencDoc: false,
    ChangeNjesiaAkademikeDoc: false,
  });

  useEffect(() => {
    Promise.all([
      CrudProvider.getItemById(
        "AplikimiShqyrtimiAPI/GetAplikiminById",
        decryptedId
      ).then((res) => {
        if (res) {
          if (res.statusCode === 200) {
            const obj = res.result[0];
            setApplicant(obj);
            setModel({
              ...newModel,
              AplikimiId: obj.aplikimiId,
              AutorKryesoreId: obj.autoreKryesorId,
              AutorKorrespodentId: Object.values(obj.autoretKorrespodent).map(
                (obj) => {
                  return obj.profesoriId;
                }
              ),
              BashkautoretId: Object.values(obj.bashkeAutoret).map((obj) => {
                return obj.profesoriId;
              }),
              RevistaId: obj.revista.revistaId,
              BankaId: obj.banka.bankaId,
              TitulliPunimit: obj.titulliPunimit,
              ImpaktFaktori: obj.impaktFaktori,
              DOI: obj.doi,
              ShtepiaBotuese: obj.shtepiaBotuese,
              DataPranimit: obj.dataPranimit,
              DataPublikimit: obj.aplikimiDetajetPublikimi?.dataPublikimit,
              LinkuPublikimit: obj.linkuPublikimit,
              Konferenc: obj.konferenc,
              KonferencDoc: obj.konferencDoc,
              RaportiDekanit: obj.raportiDekanitPath,
              NjesiAkademike: obj.njesiAkademike,
              Vendi: obj.vendi,
              IndeksimiNePlatforme:
                obj.aplikimiDetajetPublikimi?.indeksimNePlateformen,
              NjesiaAkademikeDoc: obj.njesiaAkademikeDoc,
              LlogariaBankare: obj.llogariaBankare,
              SqaroMenyrenPrezantimit: obj.menyraPrezantimit,
              PerkatesiaAutorit: obj.aplikimiDetajetPublikimi?.linkuPublikimit,
            });
          }
        }
      }),
      CrudProvider.getAll("RevistaAPI").then((res) => {
        if (res) {
          if (res.statusCode === 200) {
            setRevistat(res.result);
          }
        }
      }),
    ]);
  }, [id]);

  const mainAuthor =
    professorList.length > 0 &&
    applicant &&
    professorList.find((obj) => obj.ProfesoriID === applicant.autoreKryesorId);

  const CoAuthors =
    professorList.length > 0 &&
    applicant &&
    applicant.bashkeAutoret?.map((obj) => {
      const professor = professorList.find(
        (res) => res.ProfesoriID === obj.profesoriId
      );
      return {
        value: `${professor.ProfesoriID}`,
        label: `${professor.EmriDheMbiemri}`,
      };
    });

  const CorrespondingAuthors =
    professorList.length > 0 &&
    applicant &&
    applicant.autoretKorrespodent?.map((obj) => {
      const professor = professorList.find(
        (res) => res.ProfesoriID === obj.profesoriId
      );
      return {
        value: `${professor.ProfesoriID}`,
        label: `${professor.EmriDheMbiemri}`,
      };
    });

  let options =
    professorList.length > 0 &&
    professorList.map((obj) => {
      return {
        value: `${obj.ProfesoriID}`,
        label: `${obj.EmriDheMbiemri}`,
      };
    });

  function DataEpranimit(date, dateString) {
    setModel({
      ...newModel,
      DataPranimit: dateString,
    });
  }
  function DataEpublikimit(date, dateString) {
    setModel({
      ...newModel,
      DataPublikimits: dateString,
    });
  }

  let revistatList =
    revistat.length > 0 &&
    revistat.map((obj) => {
      return {
        value: `${obj.revistaId}`,
        label: `${obj.revistaPershkrimi}`,
      };
    });

  let optionsTrueFalse = [
    { value: true, label: "Po" },
    { value: false, label: "Jo" },
  ];

  function checkIsPDf(event) {
    if (event) {
      let parts = event.split(".");
      let rest = parts.slice(-1)[0];
      if (rest == "pdf") {
        return true;
      } else {
        return false;
      }
    }
  }
  async function handleSubmit(event) {
    event.preventDefault();
    let model = new FormData();
    Object.keys(newModel).forEach((key) => {
      if (key === "AutorKorrespodentId" || key === "BashkautoretId") {
        newModel[key].forEach((value) => {
          model.append(`${key}[]`, value.toString());
        });
      } else {
        model.append(key, newModel[key]);
      }
    });
    // for (let pair of model.entries()) {
    //   console.log(pair[0] + ", " + pair[1]);
    // }
    await CrudProvider.updateItemWithFile("AplikimiAPI", model).then((res) => {
      if (res) {
        if (res.statusCode === 200) {
          toast.success("Te dhenat u perditesuan me sukses");
          navigate("/myapplications/search");
        }
      }
    });
  }
  return (
    <div className='rbt-card mt-2'>
      {Object.keys(applicant).length > 0 && (
        <form onSubmit={handleSubmit}>
          <div className='rbt-card-body border-bottom'>
            <div className='row'>
              <div className='col-xxl-12 col-lg-12 col-sm-12  mb-5 rbt-border-bottom'>
                <div className='row'>
                  <div className='col-xxl-4 col-lg-4  text-start'>
                    <Link
                      className='rbt-btn-link-reverse'
                      to={"/myapplications/search"}
                    >
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
                  <div className='col-xxl-6 col-lg-6 col-sm-12 mt-2 text-start'>
                    <h2 className='text-uppercase '> {t("DataOfApplicant")}</h2>
                  </div>
                </div>
              </div>
              {applicant.aplikimiShqyrtimi.verejtje !== null && (
                <div className='col-xxl-12'>
                  <div className='row'>
                    <div className='col-xxl-12 mb-3'>
                      <div className='col-xxl-2 rbt-border-bottom'>
                        <h4 className='text-uppercase text-danger'>
                          {t("Remark")}
                        </h4>
                      </div>
                    </div>
                    <div className='col-xxl-12 col-lg-12'>
                      <div className='form-group'>
                        <label>Verejtja</label>
                        <textarea
                          className='mt-4'
                          type='text'
                          readOnly
                          defaultValue={
                            applicant.aplikimiShqyrtimi?.verejtje || ""
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div className='col-xxl-12'>
                <div className='row'>
                  <div className='col-xxl-12 mb-3'>
                    <div className='col-xxl-2 rbt-border-bottom'>
                      <h4 className='text-uppercase'>
                        {t("RequestApplicant")}
                      </h4>
                    </div>
                  </div>
                  <div className='col-xxl-2 col-lg-2'>
                    <div className='form-group'>
                      <label>{t("ProfessorName")}</label>
                      <input
                        type='text'
                        readOnly
                        defaultValue={applicant.emriProfesorit || ""}
                      />
                    </div>
                  </div>
                  <div className='col-xxl-2 col-lg-2'>
                    <div className='form-group'>
                      <label> {t("ProfessorSurname")}</label>
                      <input
                        type='text'
                        readOnly
                        defaultValue={applicant.mbiemriProfesorit || ""}
                      />
                    </div>
                  </div>
                  <div className='col-xxl-2 col-lg-2'>
                    <div className='form-group'>
                      <label>{t("ScientificCall")}</label>
                      <input
                        type='text'
                        readOnly
                        defaultValue={
                          applicant.thirrjaShkencore.pershkrimi || ""
                        }
                      />
                    </div>
                  </div>
                  <div className='col-xxl-2 col-lg-2'>
                    <div className='form-group'>
                      <label>{t("AcademicCall")}</label>
                      <input
                        type='text'
                        readOnly
                        defaultValue={
                          applicant.thirrjaAkademike.pershkrimi || ""
                        }
                      />
                    </div>
                  </div>
                  <div className='col-xxl-2 col-lg-2'>
                    <div className='form-group'>
                      <label>
                        {t("LeadAuthor")}
                        <span className='text-danger'>*</span>
                      </label>
                      <Select
                        name='autorKryesor'
                        placeholder='Zgjedhni'
                        defaultValue={mainAuthor.EmriDheMbiemri}
                        style={{ width: "100%" }}
                        onChange={(e) => {
                          setModel({
                            ...newModel,
                            AutorKryesoreId: e,
                          });
                        }}
                        options={options}
                      />
                    </div>
                  </div>
                  <div className='col-xxl-4 col-lg-4'>
                    <div className='form-group'>
                      <label>
                        {t("CorrespondingAuthor")}
                        <span className='text-danger'>*</span>
                      </label>
                      <Select
                        placeholder='Zgjedhni'
                        style={{ width: "100%" }}
                        mode='multiple'
                        defaultValue={CorrespondingAuthors}
                        onChange={(e) => {
                          setModel({
                            ...newModel,
                            AutorKorrespodentId: e,
                          });
                        }}
                        options={options}
                      />
                    </div>
                  </div>
                  <div className='col-xxl-4 col-lg-4'>
                    <div className='form-group'>
                      <label>
                        {t("Co-authors")}
                        <span className='text-danger'>*</span>
                      </label>
                      <Select
                        placeholder='Zgjedhni'
                        style={{ width: "100%" }}
                        mode='multiple'
                        maxTagCount='responsive'
                        defaultValue={CoAuthors}
                        onChange={(e) => {
                          setModel({
                            ...newModel,
                            BashkautoretId: e,
                          });
                        }}
                        options={options}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-xxl-12'>
                <div className='row'>
                  <div className='col-xxl-12 mb-3'>
                    <div className='col-xxl-2 rbt-border-bottom'>
                      <h4 className='text-uppercase'>
                        {t("PublicationDetails")}
                      </h4>
                    </div>
                  </div>
                  <div className='col-xxl-6 col-lg-6'>
                    <div className='form-group'>
                      <label> {t("AttributionAuthor")}</label>
                      <textarea
                        name='perkatesiaautorit'
                        className='mt-4'
                        type='text'
                        onChange={(e) => {
                          setModel({
                            ...newModel,
                            PerkatesiaAutorit: e.target.value,
                          });
                        }}
                        defaultValue={applicant.perkatesiaAutorit || ""}
                      />
                    </div>
                  </div>
                  <div className='col-xxl-6 col-lg-6 mt-4'>
                    <div className='row'>
                      <div className='col-xxl-4 col-lg-4'>
                        <div className='form-group'>
                          <label> {t("TitleOfPaper")}</label>
                          <input
                            name='titulliPunimit'
                            type='text'
                            onChange={(e) => {
                              setModel({
                                ...newModel,
                                TitulliPunimit: e.target.value,
                              });
                            }}
                            defaultValue={applicant.titulliPunimit || ""}
                          />
                        </div>
                      </div>
                      <div className='col-xxl-4 col-lg-4'>
                        <div className='form-group'>
                          <label>
                            {t("NameOfMagazine")}
                            <span className='text-danger'>*</span>
                          </label>
                          <Select
                            mode='single'
                            placeholder='Zgjedhni'
                            style={{ width: "100%" }}
                            readOnly
                            defaultValue={applicant.revista.revistaPershkrimi}
                            options={revistatList}
                            onChange={(e) => {
                              setModel({
                                ...newModel,
                                RevistaId: e,
                              });
                            }}
                          />
                        </div>
                      </div>
                      <div className='col-xxl-4 col-lg-4'>
                        <div className='form-group'>
                          <label> {t("ImpactFactor")}</label>
                          <input
                            name='impaktFaktori'
                            type='number'
                            onChange={(e) => {
                              setModel({
                                ...newModel,
                                ImpaktFaktori: e.target.value,
                              });
                            }}
                            defaultValue={applicant.impaktFaktori || ""}
                          />
                        </div>
                      </div>
                      <div className='col-xxl-12 col-lg-12'>
                        <div className='form-group'>
                          <label> {t("DOI")}</label>
                          <input
                            name='DOI'
                            type='text'
                            defaultValue={applicant.doi || ""}
                            onChange={(e) => {
                              setModel({
                                ...newModel,
                                DOI: e.target.value,
                              });
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='col-xxl-4 col-lg-4'>
                    <div className='form-group'>
                      <label> {t("PublishingHouse")}</label>
                      <input
                        name='shtepiaBotuese'
                        type='text'
                        defaultValue={applicant.shtepiaBotuese || ""}
                      />
                    </div>
                  </div>
                  <div className='col-xxl-4 col-lg-4'>
                    <div className='form-group'>
                      <label>
                        {t("DateAcceptance")}
                        <span className='text-danger'>*</span>
                      </label>
                      <DatePicker
                        style={{ width: "100%" }}
                        name='datapranimit'
                        onChange={DataEpranimit}
                      />
                    </div>
                  </div>
                  <div className='col-xxl-4 col-lg-4'>
                    <div className='form-group'>
                      <label>
                        {t("DatePublication")}
                        <span className='text-danger'>*</span>
                      </label>
                      <DatePicker
                        style={{ width: "100%" }}
                        name='datapublikimit'
                        onChange={DataEpublikimit}
                      />
                    </div>
                  </div>
                  <div className='col-xxl-12'>
                    <div className='row'>
                      <div className='col-xxl-6 col-lg-6'>
                        <div className='form-group'>
                          <label> {t("IndexingOnPlatform")}</label>
                          <input
                            type='text'
                            onChange={(e) => {
                              setModel({
                                ...newModel,
                                IndeksimiNePlatforme: e.target.value,
                              });
                            }}
                            defaultValue={
                              applicant.aplikimiDetajetPublikimi
                                .indeksimNePlateformen || ""
                            }
                          />
                        </div>
                      </div>
                      <div className='col-xxl-6 col-lg-6'>
                        <div className='form-group'>
                          <label>{t("LinkOfPublication")}</label>
                          <input
                            name='linkuPublikimit'
                            type='text'
                            onChange={(e) => {
                              setModel({
                                ...newModel,
                                LinkuPublikimit: e.target.value,
                              });
                            }}
                            defaultValue={applicant.linkuPublikimit || ""}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-xxl-12'>
                <div className='row'>
                  <div className='col-xxl-12 mb-3'>
                    <div className='col-xxl-2 rbt-border-bottom'>
                      <h4 className='text-uppercase'>
                        {t("PresentationAcademicUnit")}
                      </h4>
                    </div>
                  </div>
                  <div className='col-xxl-4 col-lg-4'>
                    <div className='form-group'>
                      <label>{t("IsPresentedOnKonferenc")}</label>
                      <Select
                        placeholder='Zgjedhni'
                        style={{ width: "80%" }}
                        options={optionsTrueFalse}
                        onChange={(e) => {
                          setModel({
                            ...newModel,
                            Konferenc: e,
                          });
                        }}
                        defaultValue={applicant.konferenc ? "Po" : "Jo" || ""}
                      />
                    </div>
                  </div>
                  <div className='col-xxl-4 col-lg-4'>
                    <div className='form-group'>
                      <label>{t("IsPresentedOnAcademic")}</label>
                      <Select
                        placeholder='Zgjedhni'
                        style={{ width: "80%" }}
                        options={optionsTrueFalse}
                        onChange={(e) => {
                          setModel({
                            ...newModel,
                            NjesiAkademike: e,
                          });
                        }}
                        defaultValue={
                          applicant.njesiAkademike ? "Po" : "Jo" || ""
                        }
                      />
                    </div>
                  </div>
                  <div className='col-xxl-6 col-lg-6'>
                    <div className='form-group'>
                      <label> {t("ReportMode")}</label>
                      <textarea
                        className='mt-4'
                        onChange={(e) => {
                          setModel({
                            ...newModel,
                            SqaroMenyrenPrezantimit: e.target.value,
                          });
                        }}
                        defaultValue={applicant.menyraPrezantimit}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-xxl-12 mb-5'>
                <div className='row'>
                  <div className='col-xxl-12'>
                    <div className='row'>
                      <div className='col-xxl-12 mb-3'>
                        <div className='col-xxl-2 rbt-border-bottom'>
                          <h4 className='text-uppercase'>{t("Documents")}</h4>
                        </div>
                      </div>
                      <div className='col-xxl-2 col-lg-2'>
                        {/* Raporti Dekanit */}
                        <>
                          <button
                            type='button'
                            className='btn btn-primary btn-lg'
                            data-bs-toggle='modal'
                            data-bs-target='#exampleModal_RaportiDekanit'
                          >
                            {t("DeanReport")}
                          </button>

                          <div
                            className='modal fade'
                            id='exampleModal_RaportiDekanit'
                            tabIndex='-1'
                            aria-labelledby='exampleModalLabel'
                            aria-hidden='true'
                          >
                            <div className='modal-dialog'>
                              <div className='modal-content'>
                                <div className='modal-header'>
                                  <h5
                                    className='modal-title'
                                    id='exampleModalLabel'
                                  >
                                    {t("DeanReport")}
                                  </h5>
                                  <button
                                    type='button'
                                    className='btn-close'
                                    data-bs-dismiss='modal'
                                    aria-label='Close'
                                  ></button>
                                </div>
                                <div className='modal-body'>
                                  {checkIsPDf(applicant.raportiDekanitPath) ==
                                  true ? (
                                    <iframe
                                      src={CrudProvider.documentPath(
                                        applicant.raportiDekanitPath
                                      )}
                                      width='800px'
                                      height='800px'
                                    ></iframe>
                                  ) : (
                                    <img
                                      width='800px'
                                      height='800px'
                                      src={CrudProvider.documentPath(
                                        applicant.raportiDekanitPath
                                      )}
                                    ></img>
                                  )}
                                </div>
                                <div className='modal-footer'>
                                  <button
                                    type='button'
                                    className='btn btn-primary btn-lg'
                                    data-bs-dismiss='modal'
                                  >
                                    {t("Close")}
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      </div>

                      <div className='col-xxl-2 col-lg-2'>
                        {applicant.konferenc && (
                          <>
                            <button
                              type='button'
                              className='btn btn-primary btn-lg'
                              data-bs-toggle='modal'
                              data-bs-target='#exampleModal_Konferenc'
                            >
                              {t("Conference")}
                            </button>
                            <div
                              className='modal fade'
                              id='exampleModal_Konferenc'
                              tabIndex='-1'
                              aria-labelledby='exampleModalLabel'
                              aria-hidden='true'
                            >
                              <div className='modal-dialog'>
                                <div className='modal-content'>
                                  <div className='modal-header'>
                                    <h5
                                      className='modal-title'
                                      id='exampleModalLabel'
                                    >
                                      {t("Conference")}
                                    </h5>
                                    <button
                                      type='button'
                                      className='btn-close'
                                      data-bs-dismiss='modal'
                                      aria-label='Close'
                                    ></button>
                                  </div>
                                  <div className='modal-body'>
                                    {checkIsPDf(applicant.konferencDoc) ==
                                    true ? (
                                      <iframe
                                        src={CrudProvider.documentPath(
                                          applicant.konferencDoc
                                        )}
                                        width='1000px'
                                        height='1000px'
                                      ></iframe>
                                    ) : (
                                      <img
                                        width='1000px'
                                        height='1000px'
                                        src={CrudProvider.documentPath(
                                          applicant.konferencDoc
                                        )}
                                      ></img>
                                    )}
                                  </div>
                                  <div className='modal-footer'>
                                    <button
                                      type='button'
                                      className='btn btn-primary btn-lg'
                                      data-bs-dismiss='modal'
                                    >
                                      {t("Close")}
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                      <div className='col-xxl-2 col-lg-2'>
                        {applicant.njesiAkademike && (
                          <>
                            <button
                              type='button'
                              className='btn btn-primary btn-lg'
                              data-bs-toggle='modal'
                              data-bs-target='#exampleModal_NjesiAkademike'
                            >
                              {t("AcademicUnit")}
                            </button>
                            <div
                              className='modal fade'
                              id='exampleModal_NjesiAkademike'
                              tabIndex='-1'
                              aria-labelledby='exampleModalLabel'
                              aria-hidden='true'
                            >
                              <div className='modal-dialog'>
                                <div className='modal-content'>
                                  <div className='modal-header'>
                                    <h5
                                      className='modal-title'
                                      id='exampleModalLabel'
                                    >
                                      {t("AcademicUnit")}
                                    </h5>
                                    <button
                                      type='button'
                                      className='btn-close'
                                      data-bs-dismiss='modal'
                                      aria-label='Close'
                                    ></button>
                                  </div>
                                  <div className='modal-body'>
                                    {checkIsPDf(applicant.njesiaAkademikeDoc) ==
                                    true ? (
                                      <iframe
                                        src={CrudProvider.documentPath(
                                          applicant.njesiaAkademikeDoc
                                        )}
                                        width='800px'
                                        height='800px'
                                      ></iframe>
                                    ) : (
                                      <img
                                        width='800px'
                                        height='800px'
                                        src={CrudProvider.documentPath(
                                          applicant.njesiaAkademikeDoc
                                        )}
                                      ></img>
                                    )}
                                  </div>
                                  <div className='modal-footer'>
                                    <button
                                      type='button'
                                      className='btn btn-primary btn-lg'
                                      data-bs-dismiss='modal'
                                    >
                                      {t("Close")}
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className='col-xxl-12'>
                    <div className='row'>
                      <div className='col-xxl-2 col-lg-2 col-sm-10'>
                        <div className='form-group'>
                          {/* <label>Raporti i dekanit i ri</label> */}
                          <Upload
                            maxCount='1'
                            accept='.png, .jpeg, . jpg ,.pdf'
                            onChange={(e) => {
                              setModel({
                                ...newModel,
                                RaportiDekanit: e.file.originFileObj,
                                ChangeDekaniDoc: true,
                              });
                            }}
                          >
                            <Button type='text' icon={<UploadOutlined />}>
                              {t("Upload")}
                            </Button>
                          </Upload>
                        </div>
                      </div>
                      {newModel.Konferenc && (
                        <div className='col-xxl-2 col-lg-2 col-sm-10'>
                          <div className='form-group'>
                            <Upload
                              onChange={(e) => {
                                setModel({
                                  ...newModel,
                                  KonferencDoc: e.file.originFileObj,
                                  ChangeKonferencDoc: true,
                                });
                              }}
                            >
                              <Button type='text' icon={<UploadOutlined />}>
                                {t("Upload")}
                              </Button>
                            </Upload>
                          </div>
                        </div>
                      )}
                      {newModel.NjesiAkademike && (
                        <div className='col-xxl-2 col-lg-2 col-sm-10'>
                          <div className='form-group'>
                            <Upload
                              onChange={(e) => {
                                setModel({
                                  ...newModel,
                                  NjesiaAkademikeDoc: e.file.originFileObj,
                                  ChangeNjesiaAkademikeDoc: true,
                                });
                              }}
                            >
                              <Button type='text' icon={<UploadOutlined />}>
                                {t("Upload")}
                              </Button>
                            </Upload>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-xxl-12'>
                <div className='row'>
                  <div className='col-xxl-12 mb-3'>
                    <div className='col-xxl-2 rbt-border-bottom'>
                      <h4 className='text-uppercase'>
                        {t("BeneficiarysBankDetails")}
                      </h4>
                    </div>
                  </div>
                  <div className='col-xxl-2 col-lg-2'>
                    <div className='form-group'>
                      <label> {t("Bank")}</label>
                      <input
                        name='llogariaBankare'
                        type='text'
                        readOnly
                        defaultValue={applicant.banka.bankaEmri}
                      />
                    </div>
                  </div>
                  <div className='col-xxl-2 col-lg-2'>
                    <div className='form-group'>
                      <label> {t("BankAccount")}</label>
                      <input
                        name='llogariaBankare'
                        type='text'
                        readOnly
                        defaultValue={applicant.llogariaBankare}
                      />
                    </div>
                  </div>
                  <div className='col-xxl-2 col-lg-2'>
                    <div className='form-group'>
                      <label>{t("Country")}</label>
                      <input
                        name='vendi'
                        type='text'
                        readOnly
                        defaultValue={applicant.vendi}
                      />
                    </div>
                  </div>
                  <div className='col-xxl-2 col-lg-2'>
                    <div className='form-group'>
                      <label>{t("AmountRequested")}</label>
                      <input
                        type='text'
                        readOnly
                        defaultValue={`${applicant.shumaKerkuar} €`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-xxl-12 mt-3'>
            <div className='row d-flex justify-content-end'>
              <div className='col-xxl-2 col-lg-2 d-flex align-items-center'>
                <button
                  className='rbt-btn  btn-gradient-submit radius-round btn-sm'
                  type='submit'
                >
                  <span data-text='Vazhdo'>{t("Save")}</span>
                </button>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
