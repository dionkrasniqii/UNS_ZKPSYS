import React, { useEffect, useState } from "react";
import { Radio } from "antd";
import { useNavigate, useParams } from "react-router";
import CrudProvider from "../../provider/CrudProvider";
import Encryption from "../../Auth/Encryption";
import { mode } from "crypto-js";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Triangle } from "react-loader-spinner";
import jwtDecode from "jwt-decode";

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
      toast.error("Shqyrto aplikimin");
      return false;
    }
    if (model.StatusiKerkesesId === "2" && model.Verejtje === "") {
      toast.error("Plotosoni verejtjen");
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
          toast.success("Te dhenat e perditsuan me sukses");
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
            {Object.keys(applicant).length > 0 && (
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
                            Prapa
                          </Link>
                        </div>
                        <div className='col-xxl-6 col-lg-6 col-sm-12 mt-2 text-start'>
                          <h2 className='text-uppercase '>
                            Te dhenat e aplikuesit
                          </h2>
                        </div>
                      </div>
                    </div>
                    <div className='col-xxl-12'>
                      <div className='row'>
                        <div className='col-xxl-12 mb-3'>
                          <div className='col-xxl-2 rbt-border-bottom'>
                            <h4 className='text-uppercase'>
                              Parashtruesi kerkeses
                            </h4>
                          </div>
                        </div>
                        <div className='col-xxl-2 col-lg-2'>
                          <div className='form-group'>
                            <label>Emri Profesorit</label>
                            <input
                              type='text'
                              readOnly
                              defaultValue={applicant.emriProfesorit || ""}
                            />
                          </div>
                        </div>
                        <div className='col-xxl-2 col-lg-2'>
                          <div className='form-group'>
                            <label>Mbiemri Profesorit</label>
                            <input
                              type='text'
                              readOnly
                              defaultValue={applicant.mbiemriProfesorit || ""}
                            />
                          </div>
                        </div>
                        <div className='col-xxl-2 col-lg-2'>
                          <div className='form-group'>
                            <label>Thirrja Shkencore</label>
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
                            <label>Thirrja Akademike</label>
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
                            <label>Autore kryesore</label>
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
                        </div>
                        <div className='col-xxl-4 col-lg-4'>
                          <div className='form-group'>
                            <label>Bashke autoret</label>
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
                              Detajet e publikimit
                            </h4>
                          </div>
                        </div>
                        <div className='col-xxl-6 col-lg-6'>
                          <div className='form-group'>
                            <label>Perkatesia autorit</label>
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
                                <label>Titulli punimit</label>
                                <input
                                  type='text'
                                  readOnly
                                  defaultValue={applicant.titulliPunimit || ""}
                                />
                              </div>
                            </div>
                            <div className='col-xxl-4 col-lg-4'>
                              <div className='form-group'>
                                <label>Emri revistes</label>
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
                                <label>Impakt faktori</label>
                                <input
                                  type='text'
                                  readOnly
                                  defaultValue={applicant.impaktFaktori || ""}
                                />
                              </div>
                            </div>
                            <div className='col-xxl-12 col-lg-12'>
                              <div className='form-group'>
                                <label>DOI</label>
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
                            <label>Shtepia botuese</label>
                            <input
                              type='text'
                              readOnly
                              defaultValue={applicant.shtepiaBotuese || ""}
                            />
                          </div>
                        </div>
                        <div className='col-xxl-4 col-lg-4'>
                          <div className='form-group'>
                            <label>Data pranimit</label>
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
                            <label>Data publikimit</label>
                            <input
                              type='text'
                              readOnly
                              defaultValue={
                                new Date(
                                  applicant.dataPublikimit
                                ).toLocaleDateString("en-GB") || ""
                              }
                            />
                          </div>
                        </div>
                        <div className='col-xxl-12'>
                          <div className='row'>
                            <div className='col-xxl-6 col-lg-6'>
                              <div className='form-group'>
                                <label>Indeksimi ne platformen</label>
                                <input
                                  type='text'
                                  readOnly
                                  defaultValue={
                                    applicant.aplikimiDetajetPublikimi
                                      .indeksimNePlateformen || ""
                                  }
                                />
                              </div>
                            </div>
                            <div className='col-xxl-6 col-lg-6'>
                              <div className='form-group'>
                                <label>Linku i publikimit</label>
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
                              Prezantimi ne njesine akademike
                            </h4>
                          </div>
                        </div>
                        <div className='col-xxl-4 col-lg-4'>
                          <div className='form-group'>
                            <label>
                              Eshte prezantuar si aktivitet ne konference:
                            </label>
                            <input
                              type='text'
                              readOnly
                              defaultValue={
                                applicant.konferenc ? "Po" : "Jo" || ""
                              }
                            />
                          </div>
                        </div>
                        <div className='col-xxl-4 col-lg-4'>
                          <div className='form-group'>
                            <label>
                              Eshte prezantuar si aktivitet ne njesine
                              akademike:
                            </label>
                            <input
                              type='text'
                              readOnly
                              defaultValue={
                                applicant.njesiAkademike ? "Po" : "Jo" || ""
                              }
                            />
                          </div>
                        </div>
                        <div className='col-xxl-6 col-lg-6'>
                          <div className='form-group'>
                            <label>Menyra prezantimit</label>
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
                            Raporti Dekanit
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
                                    Raporti Dekanit
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
                                    Mbyll
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
                                Konference
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
                                        Konference
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
                                        Mbylle
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
                                Njesia akademike
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
                                        Konference
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
                                        Mbyll
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
                              Te dhenat bankare te perfituesit
                            </h4>
                          </div>
                        </div>
                        <div className='col-xxl-2 col-lg-2'>
                          <div className='form-group'>
                            <label>Banka</label>
                            <input
                              type='text'
                              readOnly
                              defaultValue={applicant.banka.bankaEmri}
                            />
                          </div>
                        </div>
                        <div className='col-xxl-2 col-lg-2'>
                          <div className='form-group'>
                            <label>Llogaria bankare</label>
                            <input
                              type='text'
                              readOnly
                              defaultValue={applicant.llogariaBankare}
                            />
                          </div>
                        </div>
                        <div className='col-xxl-2 col-lg-2'>
                          <div className='form-group'>
                            <label>Vendi</label>
                            <input
                              type='text'
                              readOnly
                              defaultValue={applicant.vendi}
                            />
                          </div>
                        </div>
                        <div className='col-xxl-2 col-lg-2'>
                          <div className='form-group'>
                            <label>Shuma e kerkuar</label>
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
                            Prapa
                          </Link>
                        </div>
                        <div className='col-xxl-6 col-lg-6 col-sm-12 mt-2 text-start'>
                          <h2 className='text-uppercase '>
                            Te dhenat e aplikuesit
                          </h2>
                        </div>
                      </div>
                    </div>
                    <div className='col-xxl-12'>
                      <div className='row'>
                        <div className='col-xxl-12 mb-3'>
                          <div className='col-xxl-2 rbt-border-bottom'>
                            <h4 className='text-uppercase'>
                              Parashtruesi kerkeses
                            </h4>
                          </div>
                        </div>
                        <div className='col-xxl-2 col-lg-2'>
                          <div className='form-group'>
                            <label>Emri Profesorit</label>
                            <input
                              type='text'
                              readOnly
                              defaultValue={applicant.emriProfesorit || ""}
                            />
                          </div>
                        </div>
                        <div className='col-xxl-2 col-lg-2'>
                          <div className='form-group'>
                            <label>Mbiemri Profesorit</label>
                            <input
                              type='text'
                              readOnly
                              defaultValue={applicant.mbiemriProfesorit || ""}
                            />
                          </div>
                        </div>
                        <div className='col-xxl-2 col-lg-2'>
                          <div className='form-group'>
                            <label>Thirrja Shkencore</label>
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
                            <label>Thirrja Akademike</label>
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
                            <label>Autore kryesore</label>
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
                            <label>Bashke autoret</label>
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
                              Detajet e publikimit
                            </h4>
                          </div>
                        </div>
                        <div className='row'>
                          <div className='col-xxl-4 col-lg-4'>
                            <div className='form-group'>
                              <label>Emërtimi i ngjarjes</label>
                              <input
                                type='text'
                                readOnly
                                defaultValue={applicant.emertimiNgjarjes || ""}
                              />
                            </div>
                          </div>
                          <div className='col-xxl-4 col-lg-4'>
                            <div className='form-group'>
                              <label>Vendi</label>
                              <input
                                type='text'
                                readOnly
                                defaultValue={applicant.vendi || ""}
                              />
                            </div>
                          </div>
                          <div className='col-xxl-4 col-lg-4'>
                            <div className='form-group'>
                              <label>Data publikimit</label>
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
                              <label>Organizatori</label>
                              <input
                                type='text'
                                readOnly
                                defaultValue={applicant.organizatori || ""}
                              />
                            </div>
                          </div>
                          <div className='col-xxl-4 col-lg-4'>
                            <div className='form-group'>
                              <label>Ftesa dhe programi</label>
                              <input
                                type='text'
                                readOnly
                                defaultValue={applicant.ftesaProgrami || ""}
                              />
                            </div>
                          </div>
                          <div className='col-xxl-4 col-lg-4'>
                            <div className='form-group'>
                              <label>Abstrakti</label>
                              <input
                                type='text'
                                readOnly
                                defaultValue={applicant.abstrakti || ""}
                              />
                            </div>
                          </div>
                          <div className='col-xxl-4 col-lg-4'>
                            <div className='form-group'>
                              <label>Titulli punimit</label>
                              <input
                                type='text'
                                readOnly
                                defaultValue={applicant.titulliPunimit || ""}
                              />
                            </div>
                          </div>
                          <div className='col-xxl-4 col-lg-4'>
                            <div className='form-group'>
                              <label>Konfirmimi i pranimit të punimit</label>
                              <input
                                type='text'
                                readOnly
                                defaultValue={
                                  applicant.konfirmimiPranimitPunimit || ""
                                }
                              />
                            </div>
                          </div>
                          <div className='col-xxl-4 col-lg-4'>
                            <div className='form-group'>
                              <label>Autorë e punimit (AFFILIATION)</label>
                              <input
                                type='text'
                                readOnly
                                defaultValue={applicant.autoretPunimit || ""}
                              />
                            </div>
                          </div>
                          <div className='col-xxl-4 col-lg-4'>
                            <div className='form-group'>
                              <label>Foles me kumtesë/poster</label>
                              <input
                                type='text'
                                readOnly
                                defaultValue={
                                  applicant.folesKumtesPoster
                                    ? "Po"
                                    : "Jo" || ""
                                }
                              />
                            </div>
                          </div>
                          <div className='col-xxl-4 col-lg-4'>
                            <div className='form-group'>
                              <label>Ngjarje artistike/sportive</label>
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
                              <label>Kryesues/panelist</label>
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
                                <label>Linku i publikimit</label>
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
                            Raporti Dekanit
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
                                    Raporti Dekanit
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
                                    Mbyll
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
                              Te dhenat bankare te perfituesit
                            </h4>
                          </div>
                        </div>
                        <div className='col-xxl-2 col-lg-2'>
                          <div className='form-group'>
                            <label>Banka</label>
                            <input
                              type='text'
                              readOnly
                              defaultValue={applicant.banka.bankaEmri}
                            />
                          </div>
                        </div>
                        <div className='col-xxl-2 col-lg-2'>
                          <div className='form-group'>
                            <label>Llogaria bankare</label>
                            <input
                              type='text'
                              readOnly
                              defaultValue={applicant.llogariaBankare}
                            />
                          </div>
                        </div>
                        <div className='col-xxl-2 col-lg-2'>
                          <div className='form-group'>
                            <label>Vendi</label>
                            <input
                              type='text'
                              readOnly
                              defaultValue={applicant.vendi}
                            />
                          </div>
                        </div>
                        <div className='col-xxl-2 col-lg-2'>
                          <div className='form-group'>
                            <label>Shuma e kerkuar</label>
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
                      <label>Verejtje</label>
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
                  className='rbt-btn  btn-gradient-submit radius-round btn-sm'
                  onClick={handleSubmit}
                >
                  <span data-text='Vazhdo'>Vazhdo</span>
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
