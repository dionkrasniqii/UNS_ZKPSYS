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
    <div className='rbt-card rbt-card-body col-xxl-12  col-lg-12 col-sm-12 mt-2'>
      <h3 className='text-center'>Detajet e publikimit</h3>
      <div className='row mt-3'>
        <div className='col-lg-12 col-sm-12 col-md-10 '>
          <div className='col-lg-7 col-sm-12 col-md-10'>
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
        </div>
        <div className='col-lg-12 col-sm-12 col-md-10 '>
          <div className='col-lg-7 col-sm-12 col-md-10'>
            <div className='form-group'>
              <label>Titulli punimit</label>
              <input
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
        </div>
        <div className='col-lg-12 col-sm-12 col-md-10 '>
          <div className='col-lg-7 col-sm-12 col-md-10'>
            <div className='form-group'>
              <label>DOI</label>
              <input
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
        </div>
        <div className='col-lg-12 col-sm-12 col-md-10 mt-2'>
          <div className='row'>
            <div className='col-lg-1 col-sm-12'>
              <label className='fs-4'>Revista</label>
            </div>
            <div className='col-xxl-4 col-lg-4 col-sm-12'>
              <div className='rbt-modern-select bootstrap-select  bg-transparent height-45'>
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
        </div>
        <div className='col-lg-12 col-sm-12 col-md-10 mt-2'>
          <div className='col-lg-7 col-sm-12 col-md-10'>
            <div className='form-group'>
              <label>Shtepia botuese</label>
              <input
                type='text'
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
        </div>
        <div className='col-lg-12 col-sm-12 col-md-10 '>
          <div className='col-lg-12 col-xxl-12 col-sm-12 col-md-10'>
            <div className='row'>
              <div className='col-lg-7 col-sm-12 col-md-10'>
                <div className='form-group'>
                  <label>Indeksimi në platformën</label>
                  <input
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
              <div className='col-xxl-8 col-lg-8 col-sm-12'>
                <div className=' col-lg-2 col-xxl-2 col-sm-12'>
                  <label className='fs-4'>Impakt faktori (IF)</label>
                </div>
                <div className='col-xxl-4 col-lg-4 col-sm-12'>
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
          </div>
        </div>
        <div className='col-xxl-12 col-lg-10 col-sm-12 mt-4'>
          <div className='row'>
            <div className='col-lg-3 col-sm-12 col-md-10'>
              <div className='col-xxl-12 col-lg-10 col-sm-12'>
                <label className='fs-4'>Data e pranimit</label>
              </div>
              <DatePicker onChange={DataEpranimit} />
            </div>
            <div className='col-lg-3 col-sm-12 col-md-10'>
              <div className='col-xxl-12 col-lg-10 col-sm-12'>
                <label className='fs-4'>Data e publikimit</label>
              </div>
              <DatePicker onChange={DataEpublikimit} />
            </div>
          </div>
          <div className='col-lg-12 col-sm-12 col-md-10 mt-2'>
            <div className='col-lg-7 col-sm-12 col-md-10'>
              <div className='form-group'>
                <label>Linku i publikimit</label>
                <input
                  type='text'
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
export default ThirdForm;
