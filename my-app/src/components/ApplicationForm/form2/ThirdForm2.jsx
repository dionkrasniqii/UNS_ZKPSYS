import React, { useEffect } from "react";
import { Button, DatePicker, Select, Upload } from "antd";
import { toast } from "react-toastify";
import { UploadOutlined } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

const ThirdForm = (props) => {
  const { t } = useTranslation();

  useEffect(() => {
    document.getElementById("thirdForm").scrollIntoView();
  }, []);

  function DataEpranimit(date, dateString) {
    props.setApplicationDTO({
      ...props.applicationDTO,
      aplikimiDetajetAneks2: {
        ...props.applicationDTO.aplikimiDetajetAneks2,
        DataNgjarjes: dateString,
      },
    });
  }
  let options = [
    { value: true, label: t("Yes") },
    { value: false, label: t("No") },
  ];
  function handleNextForm() {
    props.showForm4(true);
    // toast.error(t("FillDataAtForm") + " " + t("DetailsConferenc2"));
  }
  return (
    <div className='rbt-card rbt-card-body mt-5 pt--50'>
      <div className='col-xxl-12 col-lg-10 col-sm-12 rbt-border-dashed rbt-radius border-1 px-5 pt-5 position-relative'>
        <div className='box'>
          <span>2</span>
        </div>
        <div className='row'>
          <div className='col-lg-12 mb-4' id='thirdForm'>
            <h1 className='page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center my-0'>
              {t("DetailsConferenc2")}
            </h1>
          </div>
          <div className='col-lg-4 col-sm-12'>
            <div className='form-group'>
              <label className='pb-5'> {t("NameOfEvent")}</label>
              <input
                className='mt-3'
                type='text'
                onChange={(e) => {
                  props.setApplicationDTO({
                    ...props.applicationDTO,
                    aplikimiDetajetAneks2: {
                      ...props.applicationDTO.aplikimiDetajetAneks2,
                      EmertimiNgjarjes: e.target.value,
                    },
                  });
                }}
              />
            </div>
          </div>
          <div className='col-lg-4 col-sm-12 col-md-10'>
            <div className='form-group'>
              <label> {t("Country")}</label>
              <input
                type='text'
                className='mt-3'
                onChange={(e) => {
                  props.setApplicationDTO({
                    ...props.applicationDTO,
                    aplikimiDetajetAneks2: {
                      ...props.applicationDTO.aplikimiDetajetAneks2,
                      VendiNgjarjes: e.target.value,
                    },
                  });
                }}
              />
            </div>
          </div>
          <div className='col-lg-4 col-sm-12 col-md-10'>
            <div className='form-group'>
              <label className=''> {t("Date")}</label>
              <DatePicker className='w-100 mt-5' onChange={DataEpranimit} />
            </div>
          </div>
          <div className='col-lg-4 col-sm-12'>
            <div className='form-group'>
              <label className='pb-5'>{t("Organizer")}</label>
              <input
                className='mt-3'
                type='text'
                onChange={(e) => {
                  props.setApplicationDTO({
                    ...props.applicationDTO,
                    aplikimiDetajetAneks2: {
                      ...props.applicationDTO.aplikimiDetajetAneks2,
                      Organizatori: e.target.value,
                    },
                  });
                }}
              />
            </div>
          </div>
          <div className='col-lg-4 col-sm-12'>
            <div className='form-group'>
              <label className='pb-5'>{t("TitleOfPaper")}</label>
              <input
                className='mt-3'
                type='text'
                onChange={(e) => {
                  props.setApplicationDTO({
                    ...props.applicationDTO,
                    aplikimiDetajetAneks2: {
                      ...props.applicationDTO.aplikimiDetajetAneks2,
                      TitulliPunimit: e.target.value,
                    },
                  });
                }}
              />
            </div>
          </div>
          <div className='col-lg-4 col-sm-12'>
            <div className='form-group'>
              <label className='pb-5'>{t("AuthorsOfPaper")}</label>
              <input
                className='mt-3'
                type='text'
                onChange={(e) => {
                  props.setApplicationDTO({
                    ...props.applicationDTO,
                    aplikimiDetajetAneks2: {
                      ...props.applicationDTO.aplikimiDetajetAneks2,
                      AutoretPunimit: e.target.value,
                    },
                  });
                }}
              />
            </div>
          </div>
          <div className='col-lg-3 col-sm-12'>
            <div className='form-group'>
              <label className=''>{t("SpeakerWithMessagePoster")}</label>
              <div className='rbt-modern-select bootstrap-select pt-2'>
                <Select
                  style={{ width: "100%" }}
                  placeholder='Zgjedhni'
                  options={options}
                  onChange={(e) => {
                    props.setApplicationDTO({
                      ...props.applicationDTO,
                      aplikimiDetajetAneks2: {
                        ...props.applicationDTO.aplikimiDetajetAneks2,
                        FolesKumtesPoster: e,
                      },
                    });
                  }}
                />
              </div>
            </div>
          </div>
          <div className='col-lg-3 col-sm-12'>
            <div className='form-group'>
              <label className=''>{t("ArtisticSportingEvents")}</label>
              <div className='rbt-modern-select bootstrap-select pt-2'>
                <Select
                  style={{ width: "100%" }}
                  placeholder='Zgjedhni'
                  options={options}
                  onChange={(e) => {
                    props.setApplicationDTO({
                      ...props.applicationDTO,
                      aplikimiDetajetAneks2: {
                        ...props.applicationDTO.aplikimiDetajetAneks2,
                        NgjarjeArtistikeSportive: e,
                      },
                    });
                  }}
                />
              </div>
            </div>
          </div>
          <div className='col-lg-4 col-sm-12'>
            <div className='form-group'>
              <label className='pb-5'>{t("ChairPanelist")}</label>
              <input
                className='mt-3'
                type='text'
                onChange={(e) => {
                  props.setApplicationDTO({
                    ...props.applicationDTO,
                    aplikimiDetajetAneks2: {
                      ...props.applicationDTO.aplikimiDetajetAneks2,
                      KryesusPanelist: e.target.value,
                    },
                  });
                }}
              />
            </div>
          </div>
          <div className='col-lg-4 col-sm-12'>
            <div className='form-group'>
              <label className='pb-5'>{t("LinkOfPublication")}</label>
              <input
                className='mt-3'
                type='text'
                onChange={(e) => {
                  props.setApplicationDTO({
                    ...props.applicationDTO,
                    aplikimiDetajetAneks2: {
                      ...props.applicationDTO.aplikimiDetajetAneks2,
                      LinkuPublikimit: e.target.value,
                    },
                  });
                }}
              />
            </div>
          </div>
          <div className='col-lg-12 mb-4'>
            <h1 className='page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center my-0'>
              {t("Documents")}
            </h1>
          </div>
          <div className='col-xxl-12 col-lg-12 col-sm-12 mb-2'>
            <div className='row'>
              <div className='col-xxl-3 col-lg-3 col-sm-12 mt-3'>
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
              <div className='col-xxl-3 col-lg-3 col-sm-12 mt-3'>
                <Upload
                  maxCount='1'
                  accept='.png, .jpeg, . jpg ,.pdf'
                  className='btn btn-danger btn-raporti w-100'
                  multiple={false}
                  onChange={(e) => {
                    props.setApplicationDTO({
                      ...props.applicationDTO,
                      FtesaProgramiDoc: e.file.originFileObj,
                    });
                  }}
                >
                  <Button type='text' icon={<UploadOutlined />}>
                    {t("InvitationAndProgram")}
                  </Button>
                </Upload>
              </div>
              <div className='col-xxl-3 col-lg-3 col-sm-12 mt-3'>
                <Upload
                  maxCount='1'
                  accept='.png, .jpeg, . jpg ,.pdf'
                  className='btn btn-danger btn-raporti w-100'
                  multiple={false}
                  onChange={(e) => {
                    props.setApplicationDTO({
                      ...props.applicationDTO,

                      AbstraktiDoc: e.file.originFileObj,
                    });
                  }}
                >
                  <Button type='text' icon={<UploadOutlined />}>
                    {t("TheAbstract")}
                  </Button>
                </Upload>
              </div>
              <div className='col-xxl-3 col-lg-3 col-sm-12 mt-3'>
                <Upload
                  maxCount='1'
                  accept='.png, .jpeg, . jpg ,.pdf'
                  className='btn btn-danger btn-raporti w-100'
                  multiple={false}
                  onChange={(e) => {
                    props.setApplicationDTO({
                      ...props.applicationDTO,
                      KonfirmimiPranimitPunimitDoc: e.file.originFileObj,
                    });
                  }}
                >
                  <Button type='text' icon={<UploadOutlined />}>
                    {t("ConfirmationOfAcceptanceWork")}
                  </Button>
                </Upload>
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
          {t("BeneficiarysBankDetails")}
        </a>
      </div>
    </div>
  );
};
export default ThirdForm;
