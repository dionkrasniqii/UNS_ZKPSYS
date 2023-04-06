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
    <div className="rbt-card rbt-card-body mt-5 w-100 pt--50 mb--100">
      <div className="col-xxl-12 col-lg-10 col-sm-12 rbt-border-dashed rbt-radius border-1 px-5 pt-5 position-relative">
        <div className="box">
          <span>4</span>
        </div>
        <div className="row">
          <div class="col-lg-12 mb-5">
            <h1 class="page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center my-0">
              Të dhënat bankare të përfituesit - Autorit të parë ose autorit
              korrespodent
            </h1>
          </div>
          <div className="col-lg-6 col-sm-12">
            <div className="form-group">
              <label>Banka</label>
              <input
                className="w-100"
                type="text"
                readOnly
                defaultValue={props.applicationDTO.Aplikimi.BankName}
              />
            </div>
          </div>
          <div className="col-lg-6 col-sm-12">
            <div className="form-group">
              <label>Numri i llogarise bankare</label>
              <input
                className="w-100"
                type="text"
                readOnly
                defaultValue={
                  props.applicationDTO.Aplikimi.NumriLlogarisBankare
                }
              />
            </div>
          </div>
          <div className="col-lg-6 col-sm-12">
            <div className="form-group">
              <label>Vendi</label>
              <input
                className="w-100"
                type="text"
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
          <div className="col-lg-6 col-sm-12">
            <div className="form-group">
              <label>Shuma e kerkuar</label>
              <input
                className="w-100"
                type="text"
                readOnly
                defaultValue={`${props.applicationDTO.Aplikimi.ShumaKerkuar}€`}
              />
            </div>
          </div>
        </div>
      </div>
      {/* <div className="col-lg-12 col-sm-12 text-end mt-5">
        <a className="rbt-moderbt-btn" onClick={handleNextForm}>
          <span className="moderbt-btn-text fs-3">Apliko</span>
          <i className="ps-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={16}
              height={16}
              fill="currentColor"
              className="bi bi-arrow-right"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
              />
            </svg>
          </i>
        </a>
      </div> */}
      <div className="col-xxl-12 col-lg-12 col-sm-12 mt-5 text-end">
        <a
          className="btn btn-dark fs-5 px-5 py-4"
          onClick={handleNextForm}
          type="button"
        >
          Aplikoni
        </a>
      </div>
    </div>
  );
};
export default FifthForm;
