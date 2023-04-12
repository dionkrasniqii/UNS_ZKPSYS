import { DatePicker, InputNumber, Select } from "antd";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import CrudProvider from "../../../provider/CrudProvider";

const ThirdForm = (props) => {
  const [magazines, setMagazines] = useState([]);

  useEffect(() => {
    CrudProvider.getAll("RevistaAPI").then((res) => {
      setMagazines(res.result);
    });
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
    const {
      PerkatesiaAutorit,
      TitulliPunimit,
      DOI,
      ShtepiaBotuese,
      RevistaId,
      ImpaktFaktori,
      DataPranimit,
      LinkuPublikimit,
      DataPublikimit,
    } = props.applicationDTO.AplikimiDetajetPublikimi;

    if (
      PerkatesiaAutorit &&
      TitulliPunimit &&
      DOI &&
      ShtepiaBotuese &&
      RevistaId &&
      ImpaktFaktori &&
      DataPranimit &&
      LinkuPublikimit &&
      DataPublikimit
    ) {
      props.showForm4(true);
    } else {
      toast.error(
        `Plotesoni te dhenat e kerkuara tek forma "Detajet e publikimit"`
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
              Detajet e publikimit
            </h1>
          </div>
          <div className='col-lg-12 col-sm-12 col-md-10'>
            <div className='form-group'>
              <label>Perkatesia e autorit (Affilation)</label>
              <textarea
                type='text'
                className='mt-3'
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
          <div className='col-lg-4 col-sm-12'>
            <div className='form-group'>
              <label className='pb-5'>Titulli punimit</label>
              <input
                className='mt-3'
                type='text'
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

          <div className='col-lg-4 col-sm-12'>
            <div className='form-group'>
              <label className='pb-5'>DOI</label>
              <input
                className='mt-3'
                type='text'
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
          <div className='col-lg-4 col-sm-12'>
            <div className='form-group'>
              <label>Revista</label>
              <div className='rbt-modern-select bootstrap-select pt-2'>
                <Select
                  type='text'
                  options={options}
                  style={{ width: "100%" }}
                  placeholder='Zgjedhni'
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

          <div className='col-lg-4 col-sm-12 col-md-10'>
            <div className='form-group'>
              <label>Shtepia botuese</label>
              <input
                type='text'
                className='mt-3'
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
          <div className='col-lg-4 col-sm-12 col-md-10'>
            <div className='form-group'>
              <label>Indeksimi në platformën</label>
              <input
                className='mt-3'
                type='text'
                // onChange={(e) => {
                //   props.setApplicationDTO({
                //     ...props.applicationDTO,
                //     AplikimiDetajetPublikimi: {
                //       ...props.applicationDTO.AplikimiDetajetPublikimi,
                //       DOI: e.target.value,
                //     },
                //   });
                // }}
              />
            </div>
          </div>
          <div className='col-lg-4 col-sm-12'>
            <div className='form-group'>
              <label>Impakt faktori (IF)</label>
              <div className='pt-5'>
                <InputNumber
                  min={1}
                  step='.01'
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
          <div className='col-lg-3 col-sm-12 col-md-10'>
            <div className='form-group'>
              <label className=''>Data e pranimit</label>
              <DatePicker className='w-100 mt-5' onChange={DataEpranimit} />
            </div>
          </div>
          <div className='col-lg-3 col-sm-12 col-md-10'>
            <div className='form-group'>
              <label className=''>Data e publikimit</label>
              <DatePicker className='w-100 mt-5' onChange={DataEpublikimit} />
            </div>
          </div>

          <div className='col-lg-6 col-sm-12 col-md-10 mt-2'>
            <div className='form-group'>
              <label>Linku i publikimit</label>
              <input
                type='text'
                className='mt-2'
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
      <div className='col-xxl-12 col-lg-12 col-sm-12 mt-5 text-end'>
        <a
          className='btn btn-danger fs-5 px-5 py-4'
          onClick={handleNextForm}
          type='button'
        >
          Prezantimi në njesinë akademike
        </a>
      </div>
    </div>
  );
};
export default ThirdForm;
