import { UploadOutlined } from "@mui/icons-material";
import { Button, Upload } from "antd";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import CrudProvider from "../../../provider/CrudProvider";

const FifthForm = (props) => {
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
    <div className='rbt-card col-xxl-12 col-lg-12 col-sm-12 mt-2'>
      <h3 className='title'>
        Te dhenat bankare te perfituesit - autorit të parë ose autorit
        korrespodent
      </h3>
      <div className='row'>
        <div className='col-lg-2 col-sm-12 col-xxl-2'>
          <div className='form-group'>
            <label>Banka</label>
            <input
              type='text'
              readOnly
              defaultValue={props.applicationDTO.Aplikimi.BankName}
            />
          </div>
        </div>
        <div className='col-lg-3 col-sm-12 col-xxl-4'>
          <div className='form-group'>
            <label>Numri i llogarise bankare</label>
            <input
              type='text'
              readOnly
              defaultValue={props.applicationDTO.Aplikimi.NumriLlogarisBankare}
            />
          </div>
        </div>
        <div className='col-lg-3 col-sm-12 col-xxl-3'>
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
        <div className='col-lg-2 col-sm-12 col-xxl-2'>
          <div className='form-group'>
            <label>Shuma e kerkuar</label>
            <input
              type='text'
              readOnly
              defaultValue={`${props.applicationDTO.Aplikimi.ShumaKerkuar}€`}
            />
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
