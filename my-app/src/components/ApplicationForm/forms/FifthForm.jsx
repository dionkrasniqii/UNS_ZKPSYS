import { UploadOutlined } from "@mui/icons-material";
import { Button, Upload } from "antd";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import CrudProvider from "../../../provider/CrudProvider";

const FifthForm = (props) => {
  const [price, setPrice] = useState("");

  // useEffect(() => {
  //   CrudProvider.getMagazinesPrice(
  //     props.applicationDTO.Aplikimi.FormulariId,
  //     props.applicationDTO.AplikimiDetajetPublikimi.RevistaId,
  //     props.applicationDTO.Aplikimi.FakultetiId
  //   ).then((res) => {
  //     setPrice(res.result);
  //   });
  // }, []);
  function handleNextForm() {
    const { NumriLlogarisBankare, Vendi, ShumaKerkuar } =
      props.applicationDTO.Aplikimi;
    const { KonferenceDokumentiId, NjesiAkademikeDokumentiId } =
      props.applicationDTO;
    if (NumriLlogarisBankare && Vendi && ShumaKerkuar) {
      props.submit();
    } else {
      toast.error(
        `Plotesoni te dhenat e kerkuara tek forma "Te dhenat bankare te perfituesit"`
      );
    }
  }
  return (
    <div className='rbt-card col-xxl-8 col-lg-12 col-sm-12 mt-2'>
      <h3 className='text-center'>Te dhenat bankare te perfituesit</h3>
      <div className='row'>
        <div className='col-lg-3 col-sm-12 col-xxl-4'>
          <div className='form-group'>
            <label>Numri i llogarise bankare</label>
            <input
              type='text'
              onChange={(e) => {
                props.setApplicationDTO({
                  ...props.applicationDTO,
                  Aplikimi: {
                    ...props.applicationDTO.Aplikimi,
                    NumriLlogarisBankare: e.target.value,
                  },
                });
              }}
            />
          </div>
        </div>
        <div className='col-lg-3 col-sm-12 col-xxl-4'>
          <div className='form-group'>
            <label>Vendi</label>
            <input
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
        <div className='col-lg-3 col-sm-12 col-xxl-4'>
          <div className='form-group'>
            <label>Shuma e kerkuar</label>
            {price !== "" ? (
              <input type='text' value={price} />
            ) : (
              <input
                type='text'
                onChange={(e) => {
                  props.setApplicationDTO({
                    ...props.applicationDTO,
                    AplikuesiPrezantimi: {
                      ...props.applicationDTO.AplikuesiPrezantimi,
                      Shuma: e.target.value,
                    },
                  });
                }}
              />
            )}
          </div>
        </div>
        <div className='col-xxl-12 col-lg-12 col-sm-12 text-end'>
          <a className='rbt-moderbt-btn' onClick={handleNextForm}>
            <span className='moderbt-btn-text fs-3'>Apliko</span>
            <i className='ps-2'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width={16}
                height={16}
                fill='currentColor'
                className='bi bi-arrow-right'
                viewBox='0 0 16 16'
              >
                <path
                  fillRule='evenodd'
                  d='M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z'
                />
              </svg>
            </i>
          </a>
        </div>
      </div>
    </div>
  );
};
export default FifthForm;
