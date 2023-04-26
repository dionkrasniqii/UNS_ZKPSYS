import { DatePicker, InputNumber, Select } from "antd";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import CrudProvider from "../../../provider/CrudProvider";
import { useTranslation } from "react-i18next";

const ThirdForm = (props) => {
  const [magazines, setMagazines] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    CrudProvider.getAll("RevistaAPI").then((res) => {
      setMagazines(res.result);
    });
    document.getElementById("form3").scrollIntoView();
  }, []);

  let options =
    magazines.length > 0 &&
    magazines.map((obj) => {
      return { value: `${obj.revistaId}`, label: `${obj.revistaPershkrimi}` };
    });

  function DataEpranimit(date, dateString) {
    props.setApplicationDTO({
      ...props.applicationDTO,
      AplikimiDetajetPublikimi: {
        ...props.applicationDTO.AplikimiDetajetPublikimi,
        DataPranimit: dateString,
      },
    });
  }
  function DataEpublikimit(date, dateString) {
    props.setApplicationDTO({
      ...props.applicationDTO,
      AplikimiDetajetPublikimi: {
        ...props.applicationDTO.AplikimiDetajetPublikimi,
        DataPublikimit: dateString,
      },
    });
  }

  useEffect(() => {
    if (props.applicationDTO.AplikimiDetajetPublikimi.RevistaId) {
      CrudProvider.getMagazinesPrice(
        props.applicationDTO.Aplikimi.FormulariId,
        props.applicationDTO.AplikimiDetajetPublikimi.RevistaId,
        props.applicationDTO.Aplikimi.FakultetiId
      ).then((res) => {
        if (res) {
          if (res.statusCode === 200) {
            props.setApplicationDTO({
              ...props.applicationDTO,
              Aplikimi: {
                ...props.applicationDTO.Aplikimi,
                ShumaKerkuar: res.result?.shuma,
              },
            });
          }
        }
      });
    }
  }, [props.applicationDTO.AplikimiDetajetPublikimi.RevistaId]);

  function handleNextForm() {
    props.showForm4(true);
    // toast.error(t("FillDataAtForm") + " " + t("PublicationDetails"));
  }
  return (
    <div className="rbt-card rbt-card-body mt-5 pt--50">
      <div className="col-xxl-12 col-lg-10 col-sm-12 rbt-border-dashed rbt-radius border-1 px-5 pt-5 position-relative">
        <div className="box">
          <span>2</span>
        </div>
        <div className="row">
          <div className="col-lg-12 mb-4">
            <h1
              className="page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center my-0"
              id="form3"
            >
              {t("PublicationDetails")}
            </h1>
          </div>
          <div className="col-lg-12 col-sm-12 col-md-10">
            <div className="form-group">
              <label>{t("AttributionAuthor")}</label>
              <textarea
                type="text"
                className="mt-3"
                onChange={(e) => {
                  props.setApplicationDTO({
                    ...props.applicationDTO,
                    AplikimiDetajetPublikimi: {
                      ...props.applicationDTO.AplikimiDetajetPublikimi,
                      PerkatesiaAutorit: e.target.value,
                    },
                  });
                }}
              />
            </div>
          </div>
          <div className="col-lg-4 col-sm-12">
            <div className="form-group">
              <label className="pb-5">{t("TitleOfPaper")}</label>
              <input
                className="mt-3"
                type="text"
                onChange={(e) => {
                  props.setApplicationDTO({
                    ...props.applicationDTO,
                    AplikimiDetajetPublikimi: {
                      ...props.applicationDTO.AplikimiDetajetPublikimi,
                      TitulliPunimit: e.target.value,
                    },
                  });
                }}
              />
            </div>
          </div>

          <div className="col-lg-4 col-sm-12">
            <div className="form-group">
              <label className="pb-5">{t("DOI")}</label>
              <input
                className="mt-3"
                type="text"
                onChange={(e) => {
                  props.setApplicationDTO({
                    ...props.applicationDTO,
                    AplikimiDetajetPublikimi: {
                      ...props.applicationDTO.AplikimiDetajetPublikimi,
                      DOI: e.target.value,
                    },
                  });
                }}
              />
            </div>
          </div>
          <div className="col-lg-4 col-sm-12">
            <div className="form-group">
              <label>{t("Magazines")}</label>
              <div className="rbt-modern-select bootstrap-select pt-2">
                <Select
                  type="text"
                  options={options}
                  style={{ width: "100%" }}
                  placeholder={t("Choose")}
                  onChange={(e) => {
                    props.setApplicationDTO({
                      ...props.applicationDTO,
                      AplikimiDetajetPublikimi: {
                        ...props.applicationDTO.AplikimiDetajetPublikimi,
                        RevistaId: e,
                      },
                    });
                  }}
                />
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-sm-12 col-md-10">
            <div className="form-group">
              <label>{t("PublishingHouse")}</label>
              <input
                type="text"
                className="mt-3"
                onChange={(e) => {
                  props.setApplicationDTO({
                    ...props.applicationDTO,
                    AplikimiDetajetPublikimi: {
                      ...props.applicationDTO.AplikimiDetajetPublikimi,
                      ShtepiaBotuese: e.target.value,
                    },
                  });
                }}
              />
            </div>
          </div>
          <div className="col-lg-4 col-sm-12 col-md-10">
            <div className="form-group">
              <label>{t("IndexingOnPlatform")}</label>
              <input
                className="mt-3"
                type="text"
                onChange={(e) => {
                  props.setApplicationDTO({
                    ...props.applicationDTO,
                    AplikimiDetajetPublikimi: {
                      ...props.applicationDTO.AplikimiDetajetPublikimi,
                      IndeksimNePlateformen: e.target.value,
                    },
                  });
                }}
              />
            </div>
          </div>
          <div className="col-lg-4 col-sm-12">
            <div className="form-group">
              <label>{t("ImpactFactor")}</label>
              <div className="pt-5">
                <InputNumber
                  min={1}
                  step=".01"
                  style={{ width: "100%" }}
                  onChange={(e) => {
                    props.setApplicationDTO({
                      ...props.applicationDTO,
                      AplikimiDetajetPublikimi: {
                        ...props.applicationDTO.AplikimiDetajetPublikimi,
                        ImpaktFaktori: e,
                      },
                    });
                  }}
                />
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-sm-12 col-md-10">
            <div className="form-group">
              <label className="">{t("DateAcceptance")}</label>
              <DatePicker className="w-100 mt-5" onChange={DataEpranimit} />
            </div>
          </div>
          <div className="col-lg-3 col-sm-12 col-md-10">
            <div className="form-group">
              <label className="">{t("DatePublication")}</label>
              <DatePicker className="w-100 mt-5" onChange={DataEpublikimit} />
            </div>
          </div>

          <div className="col-lg-6 col-sm-12 col-md-10 mt-2">
            <div className="form-group">
              <label>{t("LinkOfPublication")}</label>
              <input
                type="text"
                className="mt-2"
                onChange={(e) => {
                  props.setApplicationDTO({
                    ...props.applicationDTO,
                    AplikimiDetajetPublikimi: {
                      ...props.applicationDTO.AplikimiDetajetPublikimi,
                      LinkuPublikimit: e.target.value,
                    },
                  });
                }}
              />
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
          {t("PresentationAcademicUnit")}
        </a>
      </div>
    </div>
  );
};
export default ThirdForm;
