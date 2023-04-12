import { DatePicker, InputNumber, Select } from "antd";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import CrudProvider from "../../../provider/CrudProvider";

const ThirdForm = (props) => {
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
    { value: true, label: "Po" },
    { value: false, label: "Jo" },
  ];
  function handleNextForm() {
    const {
      EmertimiNgjarjes,
      VendiNgjarjes,
      DataNgjarjes,
      Organizatori,
      FtesaProgrami,
      TitulliPunimit,
      Abstrakti,
      KonfirmimiPranimitPunimit,
      AutoretPunimit,
      FolesKumtesPoster,
      NgjarjeArtistikeSportive,
      KryesusPanelist,
      LinkuPublikimit,
    } = props.applicationDTO.aplikimiDetajetAneks2;

    if (
      EmertimiNgjarjes &&
      TitulliPunimit &&
      VendiNgjarjes &&
      DataNgjarjes &&
      LinkuPublikimit &&
      Organizatori &&
      FtesaProgrami &&
      Abstrakti &&
      KonfirmimiPranimitPunimit &&
      AutoretPunimit &&
      // FolesKumtesPoster &&
      // NgjarjeArtistikeSportive &&
      KryesusPanelist
    ) {
      props.showForm4(true);
    } else {
      toast.error(
        `Plotesoni te dhenat e kerkuara tek forma "Detajet e konferences,simpoziumit ose aktivitetit shkencor,artistik dhe sportiv"`
      );
    }
  }
  return (
    <div className='rbt-card rbt-card-body mt-5 pt--50'>
      <div className='col-xxl-12 col-lg-10 col-sm-12 rbt-border-dashed rbt-radius border-1 px-5 pt-5 position-relative'>
        <div className='box'>
          <span>2</span>
        </div>
        <div className='row'>
          <div className='col-lg-12 mb-4'>
            <h1 className='page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center my-0'>
              Detajet e konferences,simpoziumit ose aktivitetit
              shkencor,artistik dhe sportiv
            </h1>
          </div>

          <div className='col-lg-4 col-sm-12'>
            <div className='form-group'>
              <label className='pb-5'>Emërtimi i ngjarjes</label>
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
              <label>Vendi</label>
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
              <label className=''>Data</label>
              <DatePicker className='w-100 mt-5' onChange={DataEpranimit} />
            </div>
          </div>
          <div className='col-lg-4 col-sm-12'>
            <div className='form-group'>
              <label className='pb-5'>Organizatori</label>
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
              <label className='pb-5'>Ftesa dhe programi</label>
              <input
                className='mt-3'
                type='text'
                onChange={(e) => {
                  props.setApplicationDTO({
                    ...props.applicationDTO,
                    aplikimiDetajetAneks2: {
                      ...props.applicationDTO.aplikimiDetajetAneks2,
                      FtesaProgrami: e.target.value,
                    },
                  });
                }}
              />
            </div>
          </div>
          <div className='col-lg-4 col-sm-12'>
            <div className='form-group'>
              <label className='pb-5'>Abstrakti</label>
              <input
                className='mt-3'
                type='text'
                onChange={(e) => {
                  props.setApplicationDTO({
                    ...props.applicationDTO,
                    aplikimiDetajetAneks2: {
                      ...props.applicationDTO.aplikimiDetajetAneks2,
                      Abstrakti: e.target.value,
                    },
                  });
                }}
              />
            </div>
          </div>
          <div className='col-lg-4 col-sm-12'>
            <div className='form-group'>
              <label className='pb-5'>Titulli punimit</label>
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
              <label className='pb-5'>Konfirmimi i pranimit te punimit</label>
              <input
                className='mt-3'
                type='text'
                onChange={(e) => {
                  props.setApplicationDTO({
                    ...props.applicationDTO,
                    aplikimiDetajetAneks2: {
                      ...props.applicationDTO.aplikimiDetajetAneks2,
                      KonfirmimiPranimitPunimit: e.target.value,
                    },
                  });
                }}
              />
            </div>
          </div>
          <div className='col-lg-4 col-sm-12'>
            <div className='form-group'>
              <label className='pb-5'>Autoret e punimit (AFFILIATION)</label>
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
              <label className=''>Foles me kumtesë/poster</label>
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
              <label className=''>Ngjarje artistike/sportive</label>
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
              <label className='pb-5'>Kryesues/panelist</label>
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
              <label className='pb-5'>Linku publikimit te ngjarjes</label>
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
        </div>
      </div>
      <div className='col-xxl-12 col-lg-12 col-sm-12 mt-5 text-end'>
        <a
          className='btn btn-danger fs-5 px-5 py-4'
          onClick={handleNextForm}
          type='button'
        >
          Të dhënat bankare
        </a>
      </div>
    </div>
  );
};
export default ThirdForm;
