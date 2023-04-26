import React, { useEffect } from "react";
import { Button, DatePicker, Select, Upload } from "antd";
import { toast } from "react-toastify";
import { UploadOutlined } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import * as Yup from "yup";
import { schemaForm3 } from "./schemas/schemas";

const ThirdForm3 = (props) => {
  const { t } = useTranslation();
  useEffect(() => {
    document.getElementById("thirdForm").scrollIntoView();
  }, []);

  const { handleSubmit, errors, values, handleChange, setFieldValue } =
    useFormik({
      initialValues: {
        pershkrimiProjektit: "",
        permbledhje: "",
        pershkrimiDetajuarProjektit: "",
        rekomandimiPerAplikim: "",
        // cvPublikimi: "",
      },
      validationSchema: schemaForm3,
      onSubmit: (values, actions) => {
        props.showForm4(true);
      },
    });
  return (
    <div className="rbt-card rbt-card-body mt-5 pt--50">
      <form onSubmit={handleSubmit} autoComplete="off">
        <div className="col-xxl-12 col-lg-10 col-sm-12 rbt-border-dashed rbt-radius border-1 px-5 pt-5 position-relative">
          <div className="box">
            <span>2</span>
          </div>
          <div className="row">
            <div className="col-lg-12 mb-4" id="thirdForm">
              <h1 className="page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center my-0">
                Përshkrimi i projektit shkencor/artistik/sportiv
              </h1>
            </div>
            <div className="col-xxl-12 col-lg-12 col-sm-12 mb-2">
              <div className="row">
                <div className="col-xxl-3 col-lg-3 col-sm-12 mt-3">
                  <Upload
                    maxCount="1"
                    name="PershkrimiProjektitDoc"
                    accept=".png, .jpeg, . jpg ,.pdf"
                    className="btn btn-danger btn-raporti w-100"
                    multiple={false}
                    beforeUpload={(file) => {
                      setFieldValue("PershkrimiProjektitDoc", file);
                      props.setApplicationDTO({
                        ...props.applicationDTO,
                        PershkrimiProjektitDoc: file,
                      });
                      return false;
                    }}
                    // fileList={
                    //   values.pershkrimiProjektit
                    //     ? [values.pershkrimiProjektit]
                    //     : []
                    // }
                  >
                    <Button type="text" icon={<UploadOutlined />}>
                      Përshkrimi i projektit
                    </Button>
                  </Upload>
                  {errors.PershkrimiProjektitDoc && (
                    <span className="title color-pink">
                      {errors.PershkrimiProjektitDoc}
                    </span>
                  )}
                </div>
                <div className="col-xxl-3 col-lg-3 col-sm-12 mt-3">
                  <Upload
                    maxCount="1"
                    name="PermbledhjeDoc"
                    accept=".png, .jpeg, . jpg ,.pdf"
                    className="btn btn-danger btn-raporti w-100"
                    multiple={false}
                    beforeUpload={(file) => {
                      setFieldValue("PermbledhjeDoc", file);
                      props.setApplicationDTO({
                        ...props.applicationDTO,
                        PermbledhjeDoc: file,
                      });
                      return false;
                    }}
                    fileList={
                      values.PermbledhjeDoc ? [values.PermbledhjeDoc] : []
                    }
                  >
                    <Button type="text" icon={<UploadOutlined />}>
                      Përmbledhje
                    </Button>
                  </Upload>
                  {errors.PermbledhjeDoc && (
                    <span className="title color-pink">
                      {errors.PermbledhjeDoc}
                    </span>
                  )}
                </div>
                <div className="col-xxl-3 col-lg-3 col-sm-12 mt-3">
                  <Upload
                    maxCount="1"
                    name="PershkrimiDetajuarProjektitDoc"
                    accept=".png, .jpeg, . jpg ,.pdf"
                    className="btn btn-danger btn-raporti w-100"
                    multiple={false}
                    beforeUpload={(file) => {
                      setFieldValue("PershkrimiDetajuarProjektitDoc", file);
                      props.setApplicationDTO({
                        ...props.applicationDTO,
                        PershkrimiDetajuarProjektitDoc: file,
                      });
                      return false;
                    }}
                    fileList={
                      values.PershkrimiDetajuarProjektitDoc
                        ? [values.PershkrimiDetajuarProjektitDoc]
                        : []
                    }
                  >
                    <Button type="text" icon={<UploadOutlined />}>
                      Përshkrimi i detajuar i projektit
                    </Button>
                  </Upload>
                  {errors.PershkrimiDetajuarProjektitDoc && (
                    <span className="title color-pink">
                      {errors.PershkrimiDetajuarProjektitDoc}
                    </span>
                  )}
                </div>
                <div className="col-xxl-3 col-lg-3 col-sm-12 mt-3">
                  <Upload
                    maxCount={2}
                    name="CVPublikimeDoc"
                    accept=".png, .jpeg, . jpg ,.pdf"
                    className="btn btn-danger btn-raporti w-100"
                    multiple
                    beforeUpload={(file) => {
                      const newFileList = [
                        ...(values.CVPublikimeDoc || []),
                        file,
                      ];
                      setFieldValue("CVPublikimeDoc", newFileList);
                      props.setApplicationDTO({
                        ...props.applicationDTO,
                        CVPublikimeDoc: newFileList,
                      });
                      return false;
                    }}
                    // fileList={
                    //   values.CVPublikimeDoc ? [values.CVPublikimeDoc] : []
                    // }
                  >
                    <Button type="text" icon={<UploadOutlined />}>
                      CV dhe Publikimet
                    </Button>
                  </Upload>
                  {errors.CVPublikimeDoc && (
                    <span className="title color-pink">
                      {errors.CVPublikimeDoc}
                    </span>
                  )}
                </div>
                <div className="col-xxl-3 col-lg-3 col-sm-12 mt-3">
                  <Upload
                    maxCount="1"
                    name="RekomandimiPerAplikimDoc"
                    accept=".png, .jpeg, . jpg ,.pdf"
                    className="btn btn-danger btn-raporti w-100"
                    multiple={false}
                    beforeUpload={(file) => {
                      setFieldValue("RekomandimiPerAplikimDoc", file);
                      props.setApplicationDTO({
                        ...props.applicationDTO,
                        RekomandimiPerAplikimDoc: file,
                      });
                      return false;
                    }}
                    fileList={
                      values.RekomandimiPerAplikimDoc
                        ? [values.RekomandimiPerAplikimDoc]
                        : []
                    }
                  >
                    <Button type="text" icon={<UploadOutlined />}>
                      Rekomandimi për aplikim
                    </Button>
                  </Upload>
                  {errors.RekomandimiPerAplikimDoc && (
                    <span className="title color-pink">
                      {errors.RekomandimiPerAplikimDoc}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xxl-12 col-lg-12 col-sm-12 mt-5 text-end">
          <button
            className="btn btn-danger2 fs-5 px-5 py-4"
            // onClick={handleSubmit}
            type="submit"
          >
            {t("BeneficiarysBankDetails")}
          </button>
        </div>
      </form>
    </div>
  );
};
export default ThirdForm3;
