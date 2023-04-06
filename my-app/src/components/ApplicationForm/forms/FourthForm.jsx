import { UploadOutlined } from "@mui/icons-material";
import { Button, Select, Upload } from "antd";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import CrudProvider from "../../../provider/CrudProvider";

const FourthForm = (props) => {
  let options = [
    { value: true, label: "Po" },
    { value: false, label: "Jo" },
  ];

  function handleNextForm() {
    const { Konference, NjesiAkademike, SqaroMenyrenPrezantimit } =
      props.applicationDTO.AplikuesiPrezantimi;
    const { AplikimiDekaniRaportiDocumentId } = props.applicationDTO;
    if (
      Konference != null &&
      NjesiAkademike != null &&
      SqaroMenyrenPrezantimit &&
      AplikimiDekaniRaportiDocumentId
    ) {
      props.showForm5(true);
    } else {
      toast.error(
        `Plotesoni te dhenat e kerkuara tek forma "Prezantimi ne njesine akademike"`
      );
    }
  }
  return (
    <div className='rbt-card  col-xxl-12 col-lg-12 col-sm-12 mt-2'>
      <h3 className='text-center'>
        Prezantimi ne njesine akademike (Bashkangjitë dëshminë)
      </h3>
      <div className='row mt-2'>
        <div className='col-lg-12 col-xxl-12 cl-md-10 col-sm-12'>
          <div className='row'>
            <div className='col-lg-5 col-xxl-5 cl-md-10 col-sm-12'>
              <label className='fs-4'>
                Eshte prezantuar si aktivitet ne konference?
              </label>
              <div className='rbt-modern-select bootstrap-select  bg-transparent height-45'>
                <Select
                  style={{ width: "100%" }}
                  placeholder='Zgjedhni'
                  options={options}
                  onChange={(e) => {
                    props.setApplicationDTO({
                      ...props.applicationDTO,
                      AplikuesiPrezantimi: {
                        ...props.applicationDTO.AplikuesiPrezantimi,
                        Konference: e,
                      },
                    });
                  }}
                />
              </div>
            </div>
            {props.applicationDTO.AplikuesiPrezantimi.Konference === true ? (
              <div className='col-xxl-3 col-lg-4 col-sm-10 mt--20'>
                {/* <label className='fs-4 pe-2'>Dokumenti Konferences</label> */}
                <Upload
                  onChange={(e) => {
                    props.setApplicationDTO({
                      ...props.applicationDTO,
                      KonferenceDokumentiId: e.file.originFileObj,
                    });
                  }}
                >
                  <Button type='button' icon={<UploadOutlined />}>
                    Ngarko dokumentin e konferences
                  </Button>
                </Upload>
              </div>
            ) : (
              <p></p>
            )}
          </div>
        </div>
        <div className='col-lg-12 col-xxl-12 cl-md-10 col-sm-12'>
          <div className='row'>
            <div className='col-lg-5 col-xxl-5 cl-md-10 col-sm-12'>
              <label className='fs-4'>
                Eshte prezantuar si aktivitet ne njesine akademike?
              </label>
              <div className='rbt-modern-select bootstrap-select  bg-transparent height-45'>
                <Select
                  style={{ width: "100%" }}
                  placeholder='Zgjedhni'
                  options={options}
                  onChange={(e) => {
                    props.setApplicationDTO({
                      ...props.applicationDTO,
                      AplikuesiPrezantimi: {
                        ...props.applicationDTO.AplikuesiPrezantimi,
                        NjesiAkademike: e,
                      },
                    });
                  }}
                />
              </div>
            </div>
            {props.applicationDTO.AplikuesiPrezantimi.NjesiAkademike ===
            true ? (
              <div className='col-xxl-3 col-lg-4 col-sm-10 mt--20'>
                {/* <label className='fs-4 pe-2'>Njesia akademike</label> */}
                <Upload
                  onChange={(e) => {
                    props.setApplicationDTO({
                      ...props.applicationDTO,
                      NjesiAkademikeDokumentiId: e.file.originFileObj,
                    });
                  }}
                >
                  <Button type='text' icon={<UploadOutlined />}>
                    Ngarko dokumentin e njësisë akademike
                  </Button>
                </Upload>
              </div>
            ) : (
              <p></p>
            )}
          </div>
        </div>
        <div className='col-xxl-12 col-lg-12 col-sm-10 d-flex align-items-center mt-4'>
          {/* <label className='fs-4 pe-2'>Raporti Dekanit</label> */}
          <Upload
            className='rbt-border-dashed'
            multiple={false}
            onChange={(e) => {
              props.setApplicationDTO({
                ...props.applicationDTO,
                AplikimiDekaniRaportiDocumentId: e.file.originFileObj,
              });
            }}
          >
            <Button type='text' icon={<UploadOutlined />}>
              Raporti Dekanit
            </Button>
          </Upload>
        </div>
        <div className='col-xxl-10 col-lg-10 cl-md-10 col-sm-12'>
          <div className='form-group'>
            <label>Sqaro menyren e prezantimit:</label>
            <textarea
              className='mt-5'
              onChange={(e) => {
                props.setApplicationDTO({
                  ...props.applicationDTO,
                  AplikuesiPrezantimi: {
                    ...props.applicationDTO.AplikuesiPrezantimi,
                    SqaroMenyrenPrezantimit: e.target.value,
                  },
                });
              }}
            />
          </div>
        </div>
      </div>
      <div className='col-xxl-12 col-lg-10 col-sm-12'>
        <ul className='social-icon social-default '>
          <li>
            <a onClick={handleNextForm}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='30'
                height='30'
                fill='currentColor'
                className='bi bi-arrow-down '
                viewBox='0 0 16 16'
              >
                <path
                  fillRule='evenodd'
                  d='M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z'
                />
              </svg>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default FourthForm;
