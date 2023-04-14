import { UploadOutlined } from "@mui/icons-material";
import { Button, Select, Upload } from "antd";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import CrudProvider from "../../../provider/CrudProvider";
import { useTranslation } from "react-i18next";

const FourthForm = (props) => {
  const { t } = useTranslation();

  let options = [
    { value: true, label: t("Yes") },
    { value: false, label: t("No") },
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
      toast.error(t("FillDataAtForm") + " " + t("PresentationAcademicUnit"));
    }
  }
  return (
    <div className='rbt-card rbt-card-body mt-5 w-100 pt--50'>
      <div className='col-xxl-12 col-lg-10 col-sm-12 rbt-border-dashed rbt-radius border-1 px-5 pt-5 position-relative'>
        <div className='box'>
          <span>3</span>
        </div>
        <div className='row mb-5'>
          <div className='col-lg-12 mb-4'>
            <h1 className='page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center my-0'>
              {t("PresentationAcademicUnit")} ({t("AttachTestimony")})
            </h1>
          </div>

          <div className='col-lg-3 col-sm-12'>
            <div className='form-group'>
              <label className=''>{t("IsPresentedOnKonferenc")}</label>
              <div className='rbt-modern-select bootstrap-select pt-2'>
                <Select
                  style={{ width: "100%" }}
                  placeholder={t("Choose")}
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
          </div>
          {props.applicationDTO.AplikuesiPrezantimi.Konference === true ? (
            <div className='col-lg-2 col-xxl-2 col-sm-10 mt--20'>
              <Upload
                maxCount='1'
                accept='.png, .jpeg, . jpg ,.pdf'
                onChange={(e) => {
                  props.setApplicationDTO({
                    ...props.applicationDTO,
                    KonferenceDokumentiId: e.file.originFileObj,
                  });
                }}
              >
                <Button type='button' icon={<UploadOutlined />}>
                  {t("Upload")}
                </Button>
              </Upload>
            </div>
          ) : null}
          <div className='col-lg-3 col-sm-12'>
            <div className='form-group'>
              <label className=''>{t("IsPresentedOnAcademic")}</label>
              <div className='rbt-modern-select bootstrap-select pt-2'>
                <Select
                  style={{ width: "100%" }}
                  placeholder={t("Choose")}
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
          </div>
          {props.applicationDTO.AplikuesiPrezantimi.NjesiAkademike === true ? (
            <div className='col-lg-2 col-xxl-2 col-sm-10 mt--20'>
              <Upload
                maxCount='1'
                accept='.png, .jpeg, . jpg ,.pdf'
                onChange={(e) => {
                  props.setApplicationDTO({
                    ...props.applicationDTO,
                    NjesiAkademikeDokumentiId: e.file.originFileObj,
                  });
                }}
              >
                <Button type='button' icon={<UploadOutlined />}>
                  {t("Upload")}
                </Button>
              </Upload>
            </div>
          ) : null}
          <div className='col-xxl-12 col-lg-10 cl-md-10 col-sm-12'>
            <div className='form-group'>
              <label> {t("ReportMode")}</label>
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
          <div className='col-xxl-3 col-sm-12 pb-5'>
            <Upload
              maxCount='1'
              accept='.png, .jpeg, . jpg ,.pdf'
              className='btn btn-danger btn-raporti w-100'
              multiple={false}
              onChange={(e) => {
                props.setApplicationDTO({
                  ...props.applicationDTO,
                  AplikimiDekaniRaportiDocumentId: e.file.originFileObj,
                });
              }}
            >
              <Button type='text' icon={<UploadOutlined />}>
                {t("DeanReport")}
              </Button>
            </Upload>
          </div>
        </div>
      </div>
      <div className='col-xxl-12 col-lg-12 col-sm-12 mt-5 text-end'>
        <a
          className='btn btn-danger fs-5 px-5 py-4'
          onClick={handleNextForm}
          type='button'
        >
          {t("BeneficiarysBankDetails")}
        </a>
      </div>
    </div>
  );
};
export default FourthForm;
