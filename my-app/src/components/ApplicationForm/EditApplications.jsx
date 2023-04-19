import React, { useEffect, useState } from "react";
import { Radio } from "antd";
import { useNavigate, useParams } from "react-router";
import CrudProvider from "../../provider/CrudProvider";
import Encryption from "../../Auth/Encryption";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Triangle } from "react-loader-spinner";
import jwtDecode from "jwt-decode";
import { useTranslation } from "react-i18next";

const EditApplications = () => {
  const { id } = useParams();
  const decryptedId = atob(id);
  const [applicant, setApplicant] = useState({});
  const [status, setStatus] = useState([]);
  const user = JSON.parse(Encryption.Decrypt(localStorage.getItem("profesor")));
  const userRole = localStorage.getItem("token")
    ? jwtDecode(localStorage.getItem("token"))
    : null;
  const navigate = useNavigate();
  const [model, setModel] = useState({
    AplikimiShqyrtimiId: "",
    AplikimiId: "",
    StatusiKerkesesId: "",
    UserId: "",
    Verejtje: "",
    Aktiv: true,
  });
  const professorList = useSelector((state) => state.professorList.professors);
  const { t } = useTranslation();
  useEffect(() => {
    Promise.all([
      CrudProvider.getItemById(
        "AplikimiShqyrtimiAPI/GetAplikiminById",
        decryptedId
      ).then((res) => {
        if (res) {
          if (res.statusCode === 200) {
            setApplicant(res.result[0]);
            setModel({
              ...model,
              AplikimiId: `${res.result[0].aplikimiId}`,
              AplikimiShqyrtimiId: `${res.result[0].aplikimiShqyrtimiId}`,
              UserId: `${user.perdoruesiID}`,
            });
          }
        }
      }),
      CrudProvider.getAll("GeneralAPIController/GetStatusiKerkeses").then(
        (res) => {
          if (res) {
            if (res.statusCode === 200) {
              setStatus(res.result);
            }
          }
        }
      ),
    ]);
  }, []);
  const mainAuthor =
    professorList.length > 0 &&
    applicant &&
    professorList.find((obj) => obj.ProfesoriID === applicant.autoreKryesorId);
  const CoAuthors =
    professorList.length > 0 &&
    applicant &&
    applicant.bashkeAutoret?.map((obj) => {
      return professorList.find((res) => res.ProfesoriID === obj.profesoriId);
    });
  const CorrespondingAuthors =
    professorList.length > 0 &&
    applicant &&
    applicant.autoretKorrespodent?.map((obj) => {
      return professorList.find((res) => res.ProfesoriID === obj.profesoriId);
    });
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
  let statusList = status
    .map((obj) => {
      return (userRole?.role === "61" &&
        (obj.statusiKerkesesId === 5 || obj.statusiKerkesesId === 4)) ||
        (userRole?.role === "35" &&
          (obj.statusiKerkesesId === 2 || obj.statusiKerkesesId === 3))
        ? {
            label: `${obj.pershkrimi}`,
            value: `${obj.statusiKerkesesId}`,
          }
        : null;
    })
    .filter((obj) => obj !== null);

  function isModelValid(model) {
    if (model.StatusiKerkesesId === "") {
      toast.error(t("ReviewApplication"));
      return false;
    }
    if (model.StatusiKerkesesId === "2" && model.Verejtje === "") {
      toast.error(t("CompleteNotice"));
      return false;
    }
    return true;
  }
  async function handleSubmit(event) {
    event.preventDefault();
    if (!isModelValid(model)) {
      return;
    }
    await CrudProvider.updateItem(
      "AplikimiShqyrtimiAPI",
      JSON.stringify(model)
    ).then((res) => {
      if (res) {
        if (res.statusCode === 200) {
          toast.success(t("DataUpdatedSuccessfully"));
          navigate("/application/index");
        }
      }
    });
  }
  return (
    <div className='container mt-5'>
      {professorList.length > 0 ? (
        <div className='rbt-card'>
          <div className='rbt-card-body border-bottom'>
            {applicant && Object.keys(applicant).length > 0 && (
              <div className='row'>
                {applicant.formulari.formulariId === 1 ? (
                  // Forma 1-----------------------
                  <div>
                    <div className='col-xxl-12 col-lg-12 col-sm-12  mb-5 rbt-border-bottom'>
                      <div className='row'>
                        <div className='col-xxl-4 col-lg-4  text-start'>
                          <Link
                            className='rbt-btn-link-reverse'
                            to={"/application/index"}
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
                          <h2 className='text-uppercase '>
                            {t("DataOfApplicant")}
                          </h2>
                        </div>
                      </div>
                    </div>
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
                            <label> {t("ProfessorName")}</label>
                            <input
                              type='text'
                              readOnly
                              defaultValue={applicant.emriProfesorit || ""}
                            />
                          </div>
                        </div>
                        <div className='col-xxl-2 col-lg-2'>
                          <div className='form-group'>
                            <label>{t("ProfessorSurname")}</label>
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
                            <label>{t("LeadAuthor")}</label>
                            <input
                              type='text'
                              readOnly
                              defaultValue={
                                mainAuthor && mainAuthor.EmriDheMbiemri
                              }
                            />
                          </div>
                        </div>
                        <div className='col-xxl-4 col-lg-4'>
                          <div className='form-group'>
                            <label>{t("CorrespondingAuthor")}</label>
                            <input
                              type='text'
                              readOnly
                              defaultValue={
                                CorrespondingAuthors.map(
                                  (obj) => obj.EmriDheMbiemri
                                ) || ""
                              }
                            />
                          </div>
                        </div>
                        <div className='col-xxl-4 col-lg-4'>
                          <div className='form-group'>
                            <label>{t("Co-authors")}</label>
                            <input
                              type='text'
                              readOnly
                              defaultValue={
                                CoAuthors.map((obj) => obj.EmriDheMbiemri) || ""
                              }
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
                            <label>{t("AttributionAuthor")}</label>
                            <textarea
                              className='mt-4'
                              type='text'
                              readOnly
                              defaultValue={applicant.perkatesiaAutorit || ""}
                            />
                          </div>
                        </div>
                        <div className='col-xxl-6 col-lg-6 mt-4'>
                          <div className='row'>
                            <div className='col-xxl-4 col-lg-4'>
                              <div className='form-group'>
                                <label>{t("TitleOfPaper")}</label>
                                <input
                                  type='text'
                                  readOnly
                                  defaultValue={applicant.titulliPunimit || ""}
                                />
                              </div>
                            </div>
                            <div className='col-xxl-4 col-lg-4'>
                              <div className='form-group'>
                                <label>{t("NameOfMagazine")}</label>
                                <input
                                  type='text'
                                  readOnly
                                  defaultValue={
                                    applicant.revista.revistaPershkrimi || ""
                                  }
                                />
                              </div>
                            </div>
                            <div className='col-xxl-4 col-lg-4'>
                              <div className='form-group'>
                                <label>{t("ImpactFactor")}</label>
                                <input
                                  type='text'
                                  readOnly
                                  defaultValue={applicant.impaktFaktori || ""}
                                />
                              </div>
                            </div>
                            <div className='col-xxl-12 col-lg-12'>
                              <div className='form-group'>
                                <label>{t("DOI")}</label>
                                <input
                                  type='text'
                                  readOnly
                                  defaultValue={applicant.doi || ""}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className='col-xxl-4 col-lg-4'>
                          <div className='form-group'>
                            <label>{t("PublishingHouse")}</label>
                            <input
                              type='text'
                              readOnly
                              defaultValue={applicant.shtepiaBotuese || ""}
                            />
                          </div>
                        </div>
                        <div className='col-xxl-4 col-lg-4'>
                          <div className='form-group'>
                            <label>{t("DateAcceptance")}</label>
                            <input
                              type='text'
                              readOnly
                              defaultValue={
                                new Date(
                                  applicant.dataPranimit
                                ).toLocaleDateString("en-GB") || ""
                              }
                            />
                          </div>
                        </div>
                        <div className='col-xxl-4 col-lg-4'>
                          <div className='form-group'>
                            <label>{t("DatePublication")}</label>
                            <input
                              type='text'
                              readOnly
                              defaultValue={
                                new Date(
                                  applicant.aplikimiDetajetPublikimi?.dataPublikimit
                                ).toLocaleDateString("en-GB") || ""
                              }
                            />
                          </div>
                        </div>
                        <div className='col-xxl-12'>
                          <div className='row'>
                            <div className='col-xxl-6 col-lg-6'>
                              <div className='form-group'>
                                <label>{t("IndexingOnPlatform")}</label>
                                <input
                                  type='text'
                                  readOnly
                                  defaultValue={
                                    applicant.aplikimiDetajetPublikimi
                                      ?.indeksimNePlateformen || ""
                                  }
                                />
                              </div>
                            </div>
                            <div className='col-xxl-6 col-lg-6'>
                              <div className='form-group'>
                                <label>{t("LinkOfPublication")}</label>
                                <input
                                  type='text'
                                  readOnly
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
                            <input
                              type='text'
                              readOnly
                              defaultValue={
                                applicant.konferenc ? t("Yes") : t("No") || ""
                              }
                            />
                          </div>
                        </div>
                        <div className='col-xxl-4 col-lg-4'>
                          <div className='form-group'>
                            <label>{t("IsPresentedOnAcademic")}</label>
                            <input
                              type='text'
                              readOnly
                              defaultValue={
                                applicant.njesiAkademike
                                  ? t("Yes")
                                  : t("No") || ""
                              }
                            />
                          </div>
                        </div>
                        <div className='col-xxl-6 col-lg-6'>
                          <div className='form-group'>
                            <label>{t("ReportMode")}</label>
                            <textarea
                              className='mt-4'
                              readOnly
                              defaultValue={applicant.menyraPrezantimit}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='col-xxl-12 mb-5'>
                      <div className='row'>
                        <div className='col-xxl-12 mb-3'>
                          <div className='col-xxl-2 rbt-border-bottom'>
                            <h4 className='text-uppercase'>{t("Documents")}</h4>
                          </div>
                        </div>
                        <div className='col-xxl-2 col-lg-2'>
                          {/* <img
                      src={`${process.env.REACT_APP_API_BASE_URL_LOCAL_DOCS}/${applicant.raportiDekanitPath}`}
                    /> */}
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
                        </div>
                        <div className='col-xxl-2 col-lg-2'>
                          <button
                            type='button'
                            className='btn btn-primary btn-lg'
                            data-bs-toggle='modal'
                            data-bs-target='#exampleModal_Autorpërkatës'
                          >
                            Konfirmimi autorëve përkatës
                          </button>
                          <div
                            className='modal fade'
                            id='exampleModal_Autorpërkatës'
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
                                    Konfirmimi autorëve përkatës
                                  </h5>
                                  <button
                                    type='button'
                                    className='btn-close'
                                    data-bs-dismiss='modal'
                                    aria-label='Close'
                                  ></button>
                                </div>
                                <div className='modal-body'>
                                  {checkIsPDf(
                                    applicant.konfirmimiAutoritKorrespodentPath
                                  ) == true ? (
                                    <iframe
                                      src={CrudProvider.documentPath(
                                        applicant.konfirmimiAutoritKorrespodentPath
                                      )}
                                      width='800px'
                                      height='800px'
                                    ></iframe>
                                  ) : (
                                    <img
                                      width='800px'
                                      height='800px'
                                      src={CrudProvider.documentPath(
                                        applicant.konfirmimiAutoritKorrespodentPath
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
                        </div>
                        <div className='col-xxl-2 col-lg-2'>
                          <button
                            type='button'
                            className='btn btn-primary btn-lg'
                            data-bs-toggle='modal'
                            data-bs-target='#exampleModal_BashkAutorë'
                          >
                            Konfirmimi i bashkautorëve
                          </button>
                          <div
                            className='modal fade'
                            id='exampleModal_BashkAutorë'
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
                                    Konfirmimi i bashkautorëve
                                  </h5>
                                  <button
                                    type='button'
                                    className='btn-close'
                                    data-bs-dismiss='modal'
                                    aria-label='Close'
                                  ></button>
                                </div>
                                <div className='modal-body'>
                                  {checkIsPDf(
                                    applicant.konfirmimiBashkeAutoritPath
                                  ) == true ? (
                                    <iframe
                                      src={CrudProvider.documentPath(
                                        applicant.konfirmimiBashkeAutoritPath
                                      )}
                                      width='800px'
                                      height='800px'
                                    ></iframe>
                                  ) : (
                                    <img
                                      width='800px'
                                      height='800px'
                                      src={CrudProvider.documentPath(
                                        applicant.konfirmimiBashkeAutoritPath
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
                                        aria-label={t("Close")}
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
                                      {checkIsPDf(
                                        applicant.njesiaAkademikeDoc
                                      ) == true ? (
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
                        <div className='col-xxl-12 mb-3'>
                          <div className='col-xxl-2 rbt-border-bottom'>
                            <h4 className='text-uppercase'>
                              {t("BeneficiarysBankDetails")}
                            </h4>
                          </div>
                        </div>
                        <div className='col-xxl-2 col-lg-2'>
                          <div className='form-group'>
                            <label>{t("Bank")}</label>
                            <input
                              type='text'
                              readOnly
                              defaultValue={applicant.banka.bankaEmri}
                            />
                          </div>
                        </div>
                        <div className='col-xxl-2 col-lg-2'>
                          <div className='form-group'>
                            <label>{t("BankAccount")}</label>
                            <input
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
                ) : (
                  // Forma 2--------------------------------
                  <div>
                    <div className='col-xxl-12 col-lg-12 col-sm-12  mb-5 rbt-border-bottom'>
                      <div className='row'>
                        <div className='col-xxl-4 col-lg-4  text-start'>
                          <Link
                            className='rbt-btn-link-reverse'
                            to={"/application/index"}
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
                          <h2 className='text-uppercase '>
                            {t("DataOfApplicant")}
                          </h2>
                        </div>
                      </div>
                    </div>
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
                            <label>{t("ProfessorSurname")}</label>
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
                            <label>{t("LeadAuthor")}</label>
                            <input
                              type='text'
                              readOnly
                              defaultValue={
                                mainAuthor && mainAuthor.EmriDheMbiemri
                              }
                            />
                          </div>
                        </div>
                        {/* <div className='col-xxl-4 col-lg-4'>
                          <div className='form-group'>
                            <label>Autore korrespodent</label>
                            <input
                              type='text'
                              readOnly
                              defaultValue={
                                CorrespondingAuthors.map(
                                  (obj) => obj.EmriDheMbiemri
                                ) || ""
                                }
                            />
                          </div>
                        </div> */}
                        <div className='col-xxl-4 col-lg-4'>
                          <div className='form-group'>
                            <label>{t("Co-authors")}</label>
                            <input
                              type='text'
                              readOnly
                              defaultValue={
                                CoAuthors.map((obj) => obj.EmriDheMbiemri) || ""
                              }
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
                        <div className='row'>
                          <div className='col-xxl-4 col-lg-4'>
                            <div className='form-group'>
                              <label>{t("NameOfEvent")}</label>
                              <input
                                type='text'
                                readOnly
                                defaultValue={applicant.emertimiNgjarjes || ""}
                              />
                            </div>
                          </div>
                          <div className='col-xxl-4 col-lg-4'>
                            <div className='form-group'>
                              <label>{t("CountryOfEvent")}</label>
                              <input
                                type='text'
                                readOnly
                                defaultValue={applicant.vendiNgjarjes || ""}
                              />
                            </div>
                          </div>
                          <div className='col-xxl-4 col-lg-4'>
                            <div className='form-group'>
                              <label>{t("DatePublication")}</label>
                              <input
                                type='text'
                                readOnly
                                defaultValue={
                                  new Date(
                                    applicant.dataNgjarjes
                                  ).toLocaleDateString("en-GB") || ""
                                }
                              />
                            </div>
                          </div>
                          <div className='col-xxl-4 col-lg-4'>
                            <div className='form-group'>
                              <label>{t("Organizer")}</label>
                              <input
                                type='text'
                                readOnly
                                defaultValue={applicant.organizatori || ""}
                              />
                            </div>
                          </div>
                          <div className='col-xxl-4 col-lg-4'>
                            <div className='form-group'>
                              <label>{t("TitleOfPaper")}</label>
                              <input
                                type='text'
                                readOnly
                                defaultValue={applicant.titulliPunimit || ""}
                              />
                            </div>
                          </div>
                          <div className='col-xxl-4 col-lg-4'>
                            <div className='form-group'>
                              <label>{t("AuthorsOfPaper")}</label>
                              <input
                                type='text'
                                readOnly
                                defaultValue={applicant.autoretPunimit || ""}
                              />
                            </div>
                          </div>
                          <div className='col-xxl-4 col-lg-4'>
                            <div className='form-group'>
                              <label>{t("SpeakerWithMessagePoster")}</label>
                              <input
                                type='text'
                                readOnly
                                defaultValue={
                                  applicant.folesKumtesPoster
                                    ? t("Yes")
                                    : t("No") || ""
                                }
                              />
                            </div>
                          </div>
                          <div className='col-xxl-4 col-lg-4'>
                            <div className='form-group'>
                              <label>{t("ArtisticSportingEvents")}</label>
                              <input
                                type='text'
                                readOnly
                                defaultValue={
                                  applicant.ngjarjeArtistikeSportive
                                    ? "Po"
                                    : "Jo" || ""
                                }
                              />
                            </div>
                          </div>
                          <div className='col-xxl-4 col-lg-4'>
                            <div className='form-group'>
                              <label>{t("ChairPanelist")}</label>
                              <input
                                type='text'
                                readOnly
                                defaultValue={applicant.kryesusPanelist || ""}
                              />
                            </div>
                          </div>
                        </div>
                        <div className='col-xxl-12'>
                          <div className='row'>
                            <div className='col-xxl-6 col-lg-6'>
                              <div className='form-group'>
                                <label>{t("LinkOfPublication")}</label>
                                <input
                                  type='text'
                                  readOnly
                                  defaultValue={applicant.linkuPublikimit || ""}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='col-xxl-12 mb-5'>
                      <div className='row'>
                        <div className='col-xxl-12 mb-3'>
                          <div className='col-xxl-2 rbt-border-bottom'>
                            <h4 className='text-uppercase'>Dokumente</h4>
                          </div>
                        </div>
                        <div className='col-xxl-2 col-lg-2'>
                          {/* <img
                      src={`${process.env.REACT_APP_API_BASE_URL_LOCAL_DOCS}/${applicant.raportiDekanitPath}`}
                    /> */}
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
                        </div>
                        <div className='col-xxl-2 col-lg-2'>
                          <button
                            type='button'
                            className='btn btn-primary btn-lg'
                            data-bs-toggle='modal'
                            data-bs-target='#exampleModal_AutorKryesor'
                          >
                            Konfirmimi autorit kryesorë
                          </button>
                          <div
                            className='modal fade'
                            id='exampleModal_AutorKryesor'
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
                                    Konfirmimi autorëve përkatës
                                  </h5>
                                  <button
                                    type='button'
                                    className='btn-close'
                                    data-bs-dismiss='modal'
                                    aria-label='Close'
                                  ></button>
                                </div>
                                <div className='modal-body'>
                                  {checkIsPDf(
                                    applicant.konfirmimiAutoritKryesorPath
                                  ) == true ? (
                                    <iframe
                                      src={CrudProvider.documentPath(
                                        applicant.konfirmimiAutoritKryesorPath
                                      )}
                                      width='800px'
                                      height='800px'
                                    ></iframe>
                                  ) : (
                                    <img
                                      width='800px'
                                      height='800px'
                                      src={CrudProvider.documentPath(
                                        applicant.konfirmimiAutoritKryesorPath
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
                        </div>
                        <div className='col-xxl-2 col-lg-2'>
                          <button
                            type='button'
                            className='btn btn-primary btn-lg'
                            data-bs-toggle='modal'
                            data-bs-target='#exampleModal_BashkAutorë'
                          >
                            Konfirmimi i bashkautorëve
                          </button>
                          <div
                            className='modal fade'
                            id='exampleModal_BashkAutorë'
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
                                    Konfirmimi i bashkautorëve
                                  </h5>
                                  <button
                                    type='button'
                                    className='btn-close'
                                    data-bs-dismiss='modal'
                                    aria-label='Close'
                                  ></button>
                                </div>
                                <div className='modal-body'>
                                  {checkIsPDf(
                                    applicant.konfirmimiBashkeAutoritPath
                                  ) == true ? (
                                    <iframe
                                      src={CrudProvider.documentPath(
                                        applicant.konfirmimiBashkeAutoritPath
                                      )}
                                      width='800px'
                                      height='800px'
                                    ></iframe>
                                  ) : (
                                    <img
                                      width='800px'
                                      height='800px'
                                      src={CrudProvider.documentPath(
                                        applicant.konfirmimiBashkeAutoritPath
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
                        </div>
                        <div className='col-xxl-2 col-lg-2'>
                          <button
                            type='button'
                            className='btn btn-primary btn-lg'
                            data-bs-toggle='modal'
                            data-bs-target='#exampleModal_FtesaDheProgrami'
                          >
                            {t("InvitationAndProgram")}
                          </button>
                          <div
                            className='modal fade'
                            id='exampleModal_FtesaDheProgrami'
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
                                    {t("InvitationAndProgram")}
                                  </h5>
                                  <button
                                    type='button'
                                    className='btn-close'
                                    data-bs-dismiss='modal'
                                    aria-label='Close'
                                  ></button>
                                </div>
                                <div className='modal-body'>
                                  {checkIsPDf(applicant.ftesaProgrami) ==
                                  true ? (
                                    <iframe
                                      src={CrudProvider.documentPath(
                                        applicant.ftesaProgrami
                                      )}
                                      width='800px'
                                      height='800px'
                                    ></iframe>
                                  ) : (
                                    <img
                                      width='800px'
                                      height='800px'
                                      src={CrudProvider.documentPath(
                                        applicant.ftesaProgrami
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
                        </div>
                        <div className='col-xxl-2 col-lg-2'>
                          <button
                            type='button'
                            className='btn btn-primary btn-lg'
                            data-bs-toggle='modal'
                            data-bs-target='#exampleModal_Abstrakti'
                          >
                            {t("TheAbstract")}
                          </button>
                          <div
                            className='modal fade'
                            id='exampleModal_Abstrakti'
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
                                    {t("TheAbstract")}
                                  </h5>
                                  <button
                                    type='button'
                                    className='btn-close'
                                    data-bs-dismiss='modal'
                                    aria-label='Close'
                                  ></button>
                                </div>
                                <div className='modal-body'>
                                  {checkIsPDf(applicant.abstrakti) == true ? (
                                    <iframe
                                      src={CrudProvider.documentPath(
                                        applicant.abstrakti
                                      )}
                                      width='800px'
                                      height='800px'
                                    ></iframe>
                                  ) : (
                                    <img
                                      width='800px'
                                      height='800px'
                                      src={CrudProvider.documentPath(
                                        applicant.abstrakti
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
                        </div>
                        <div className='col-xxl-2 col-lg-2'>
                          <button
                            type='button'
                            className='btn btn-primary btn-lg'
                            data-bs-toggle='modal'
                            data-bs-target='#exampleModal_KonfirmimiPunimit'
                          >
                            {t("ConfirmationOfAcceptanceWork")}
                          </button>
                          <div
                            className='modal fade'
                            id='exampleModal_KonfirmimiPunimit'
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
                                    {t("ConfirmationOfAcceptanceWork")}
                                  </h5>
                                  <button
                                    type='button'
                                    className='btn-close'
                                    data-bs-dismiss='modal'
                                    aria-label='Close'
                                  ></button>
                                </div>
                                <div className='modal-body'>
                                  {checkIsPDf(
                                    applicant.konfirmimiPranimitPunimit
                                  ) == true ? (
                                    <iframe
                                      src={CrudProvider.documentPath(
                                        applicant.konfirmimiPranimitPunimit
                                      )}
                                      width='800px'
                                      height='800px'
                                    ></iframe>
                                  ) : (
                                    <img
                                      width='800px'
                                      height='800px'
                                      src={CrudProvider.documentPath(
                                        applicant.konfirmimiPranimitPunimit
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
                )}
              </div>
            )}
          </div>
          <div className='col-xxl-12 mt-3'>
            <div className='row d-flex justify-content-end'>
              <div className='col-xxl-3 col-lg-3 d-flex align-items-center'>
                <Radio.Group
                  options={statusList}
                  onChange={(e) => {
                    setModel({ ...model, StatusiKerkesesId: e.target.value });
                  }}
                  optionType='button'
                  buttonStyle='solid'
                />
              </div>
              {model.StatusiKerkesesId == 2 && (
                <div className='col-xxl-3 col-lg-3'>
                  <div className='rbt-card-body'>
                    <div className='form-group'>
                      <label>{t("Remark")}</label>
                      <textarea
                        className='mt-4'
                        onChange={(e) => {
                          setModel({ ...model, Verejtje: e.target.value });
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}
              <div className='col-xxl-2 col-lg-2 d-flex align-items-center'>
                <button
                  className='rbt-btn  btn-primary radius-round btn-sm'
                  onClick={handleSubmit}
                >
                  <span data-text='Vazhdo'>{t("Save")}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className='d-flex justify-content-center align-items-center'>
          <Triangle height='80' width='80' color='#ff6969' visible={true} />
        </div>
      )}
    </div>
  );
};
export default EditApplications;
