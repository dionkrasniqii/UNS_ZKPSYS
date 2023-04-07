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
    <div className="rbt-card rbt-card-body mt-5 w-100 pt--50">
      <div className="col-xxl-12 col-lg-10 col-sm-12 rbt-border-dashed rbt-radius border-1 px-5 pt-5 position-relative">
        <div className="box">
          <span>3</span>
        </div>
        <div className="row mb-5">
          <div class="col-lg-12 mb-4">
            <h1 class="page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center my-0">
              Prezantimi ne njesine akademike (Bashkangjitë dëshminë)
            </h1>
          </div>

          <div className="col-lg-3 col-sm-12 col-md-10">
            <div className="form-group">
              <label className="">
                Eshte prezantuar si aktivitet ne konference?
              </label>
              <div className="rbt-modern-select bootstrap-select pt-2">
                <Select
                  style={{ width: "100%" }}
                  placeholder="Zgjedhni"
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
          <div className="col-lg-3 col-sm-12 col-md-10">
            <div className="form-group">
              <label className="">
                Eshte prezantuar si aktivitet ne njesine akademike?
              </label>
              <div className="rbt-modern-select bootstrap-select pt-2">
                <Select
                  style={{ width: "100%" }}
                  placeholder="Zgjedhni"
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
          <div className="col-lg-3 col-sm-12 col-md-10">
            <div className="form-group">
              <label className="">
                Eshte prezantuar si aktivitet ne njesine akademike?
              </label>
              <div className="rbt-modern-select bootstrap-select pt-2">
                <Select
                  style={{ width: "100%" }}
                  placeholder="Zgjedhni"
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
          <div className="col-xxl-12 col-lg-10 cl-md-10 col-sm-12">
            <div className="form-group">
              <label>Sqaro menyren e prezantimit:</label>
              <textarea
                className="mt-5"
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
          <div className="col-xxl-3 col-sm-12 pb-5">
            {/* <label className='fs-4 pe-2'>Raporti Dekanit</label> */}
            <Upload
              className="btn btn-danger btn-raporti w-100"
              multiple={false}
              onChange={(e) => {
                props.setApplicationDTO({
                  ...props.applicationDTO,
                  AplikimiDekaniRaportiDocumentId: e.file.originFileObj,
                });
              }}
            >
              <Button type="text" icon={<UploadOutlined />}>
                Ngarkoni Raporti e Dekanit
              </Button>
            </Upload>
          </div>
        </div>
      </div>
      <div className="col-xxl-12 col-lg-12 col-sm-12 mt-5 text-end">
        <a
          className="btn btn-danger fs-5 px-5 py-4"
          onClick={handleNextForm}
          type="button"
        >
          Të dhënat bankare
        </a>
      </div>
    </div>
  );
};
export default FourthForm;
