import { Select } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import CrudProvider from "../../../provider/CrudProvider";
import { useTranslation } from "react-i18next";

const SecondForm = (props) => {
  const professors = useSelector((state) => state.professorList.professors);
  const [faculty, setFaculty] = useState({});
  const { t } = useTranslation();
  useEffect(() => {
    CrudProvider.getItemById(
      "GeneralAPIController/GetFakultetiId",
      props.applicationDTO.Aplikimi.FakultetiId
    ).then((res) => {
      if (res) {
        if (res.statusCode === 200) {
          setFaculty(res.result);
        }
      }
    });
  }, []);

  let professorsList =
    professors.length > 0 &&
    professors.map((obj) => {
      return { value: `${obj.ProfesoriID}`, label: `${obj.EmriDheMbiemri}` };
    });

  function handleNextForm() {
    const {
      Aplikimi,
      AutoriKryesorId,
      AutoriKorrespodentId,
      AplikimiBashkeAutorId,
    } = props.applicationDTO;

    if (
      AutoriKryesorId &&
      AutoriKorrespodentId?.length &&
      AplikimiBashkeAutorId?.length
    ) {
      props.showForm3(true);
    } else {
      toast.error(t("FillDataAtForm") + " " + t("RequestApplicant"));
    }
  }

  return (
    <div className='mt-5'>
      <h1 className='page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center my-0 text-uppercase'>
        {t("FirstAnnex")}
      </h1>
      <div className='d-flex mt-1'>
        <a className='fs-5 fw-bold text-danger'>{t("Home")}</a>
        <div className='mx-1 fs-5 fw-bold text-dark'>/</div>
        <div className='breadcrumb-item text-muted fs-5'>{t("FirstAnnex")}</div>
      </div>

      <div className='rbt-card col-xxl-12 col-lg-12 col-sm-12 mt-5'>
        <h1 className='text-center text-uppercase fs-2 my-3 mb-5'>
          {t("ApplicationFormFundingScientificPublication")}
        </h1>
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
                    defaultValue={props.applicationDTO.Aplikimi.Emri}
                    readOnly
                  />
                </div>
              </div>
              <div className='col-lg-3 col-sm-12 col-md-10'>
                <div className='form-group'>
                  <label> {t("Surname")}</label>
                  <input
                    type='text'
                    defaultValue={props.applicationDTO.Aplikimi.Mbiemri}
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
                    defaultValue={props.applicationDTO.ThirrjaShkencoreEmri}
                    readOnly
                  />
                </div>
              </div>
              <div className='col-lg-6 col-sm-12 col-md-10'>
                <div className='form-group'>
                  <label>{t("AcademicCall")}</label>
                  <input
                    type='text'
                    defaultValue={props.applicationDTO.ThirrjaAkademikeEmri}
                    readOnly
                  />
                </div>
              </div>
              <div className='col-lg-4'>
                <div className='form-group'>
                  <label>{t("LeadAuthor")}</label>
                  <div className='rbt-modern-select bootstrap-select pt-2'>
                    <Select
                      showSearch
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
                        props.setApplicationDTO({
                          ...props.applicationDTO,
                          AutoriKryesorId: e,
                        });
                      }}
                      options={professorsList}
                    />
                  </div>
                </div>
              </div>
              <div className='col-lg-4'>
                <div className='form-group'>
                  <label>{t("CorrespondingAuthor")}</label>
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
                      style={{ width: "100%" }}
                      placeholder={t("Choose")}
                      onChange={(e) => {
                        let newArray = [];
                        e.map((obj) => {
                          newArray.push(obj);
                        });
                        props.setApplicationDTO({
                          ...props.applicationDTO,
                          AutoriKorrespodentId: newArray,
                        });
                      }}
                      options={professorsList}
                    />
                  </div>
                </div>
              </div>
              <div className='col-lg-4'>
                <div className='form-group'>
                  <label>{t("Co-authors")}</label>
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
                      style={{ width: "100%" }}
                      placeholder={t("Choose")}
                      onChange={(e) => {
                        // let newArray = [];
                        // e.map((obj) => {
                        //   newArray.push(obj);
                        // });
                        // console.log(newArray);
                        props.setApplicationDTO({
                          ...props.applicationDTO,
                          AplikimiBashkeAutorId: e,
                        });
                      }}
                      options={professorsList}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='col-xxl-12 col-lg-12 col-sm-12 mt-5 text-end'>
          <a
            className='btn btn-danger fs-5 px-5 py-4'
            onClick={handleNextForm}
            type='button'
          >
            {t("PublicationDetails")}
          </a>
        </div>
      </div>
    </div>
  );
};
export default SecondForm;
