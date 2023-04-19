import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const FourthForm = (props) => {
  const { t } = useTranslation();
  const professoriID = props.professor.profesoriID;
  const leadAuthorId = props.applicationDTO.AutoriKryesorId;
  useEffect(() => {
    document.getElementById("bankDetails").scrollIntoView();
  }, []);
  useEffect(() => {
    professoriID == leadAuthorId
      ? props.setApplicationDTO({
          ...props.applicationDTO,
          Aplikimi: {
            ...props.applicationDTO.Aplikimi,
            ShumaKerkuar: 600,
          },
        })
      : props.setApplicationDTO({
          ...props.applicationDTO,
          Aplikimi: {
            ...props.applicationDTO.Aplikimi,
            ShumaKerkuar: 300,
          },
        });
  }, [leadAuthorId]);

  const amountRequested = props.applicationDTO.Aplikimi.ShumaKerkuar;

  function Submit() {
    const { NumriLlogarisBankare, Vendi, ShumaKerkuar } =
      props.applicationDTO.Aplikimi;
    const { KonferenceDokumentiId, NjesiAkademikeDokumentiId } =
      props.applicationDTO;
    if (NumriLlogarisBankare && Vendi && ShumaKerkuar) {
      props.submit();
    } else {
      toast.error(t("FillDataAtForm") + " " + t("BeneficiarysBankDetails"));
    }
  }

  return (
    <div className='rbt-card rbt-card-body mt-5 w-100 pt--50 mb--100'>
      <div className='col-xxl-12 col-lg-10 col-sm-12 rbt-border-dashed rbt-radius border-1 px-5 pt-5 position-relative'>
        <div className='box'>
          <span>4</span>
        </div>
        <div className='row'>
          <div className='col-lg-12 mb-5'>
            <h1
              className='page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center my-0'
              id='bankDetails'
            >
              {t("BeneficiarysBankDetails")}
            </h1>
          </div>
          <div className='col-lg-6 col-sm-12'>
            <div className='form-group'>
              <label> {t("Bank")}</label>
              <input
                className='w-100'
                type='text'
                readOnly
                defaultValue={props.applicationDTO.Aplikimi.BankName}
              />
            </div>
          </div>
          <div className='col-lg-6 col-sm-12'>
            <div className='form-group'>
              <label> {t("BankAccount")}</label>
              <input
                className='w-100'
                type='text'
                readOnly
                defaultValue={
                  props.applicationDTO.Aplikimi.NumriLlogarisBankare
                }
              />
            </div>
          </div>
          <div className='col-lg-6 col-sm-12'>
            <div className='form-group'>
              <label> {t("Country")}</label>
              <input
                className='w-100'
                type='text'
                onChange={(e) => {
                  props.setApplicationDTO({
                    ...props.applicationDTO,
                    Aplikimi: {
                      ...props.applicationDTO.Aplikimi,
                      Vendi: e.target.value,
                    },
                  });
                }}
              />
            </div>
          </div>
          <div className='col-lg-6 col-sm-12'>
            <div className='form-group'>
              <label> {t("AmountRequested")}</label>
              <input
                max='600'
                className='w-100'
                type='number'
                readOnly
                defaultValue={amountRequested}
              />
            </div>
          </div>
        </div>
      </div>
      <div className='col-xxl-12 col-lg-12 col-sm-12 mt-5 text-end'>
        <a
          className='btn btn-dark fs-5 px-5 py-4'
          type='button'
          onClick={Submit}
        >
          {t("Apply")}
        </a>
      </div>
    </div>
  );
};
export default FourthForm;
