import { Select } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import CrudProvider from "../../../provider/CrudProvider";

const SecondForm = (props) => {
  const options = [
    { label: "Grapes 🍇", value: "10" },
    { label: "Mango 🥭", value: "9" },
    { label: "Strawberry 🍓", value: "8" },
    { label: "Strawberry 🍓", value: "2" },
    { label: "Strawberry 🍓", value: "3" },
    { label: "Strawberry 🍓", value: "4" },
    { label: "Strawberry 🍓", value: "5" },
    { label: "Strawberry 🍓", value: "6" },
    { label: "Strawberry 🍓", value: "7" },
  ];
  function handleNextForm() {
    const {
      Aplikimi,
      AutoriKryesorId,
      AutoriKorrespodentId,
      AplikimiBashkeAutorId,
    } = props.applicationDTO;

    if (
      Aplikimi?.Emri &&
      Aplikimi?.Mbiemri &&
      AutoriKryesorId &&
      AutoriKorrespodentId?.length &&
      AplikimiBashkeAutorId?.length
    ) {
      props.showForm3(true);
    } else {
      toast.error(
        `Plotesoni te dhenat e kerkuara tek forma "Parashtruesi i kerkeses"`
      );
    }
  }

  return (
    <div className='rbt-card col-xxl-8  col-xxl-8 col-lg-12 col-sm-12 mt-2'>
      <h3 className='text-center'>Parashtruesi i kerkeses</h3>
      <div className='row'>
        <div className='col-xxl-12 col-lg-10 col-sm-12'>
          <div className='row'>
            <div className='col-lg-3 col-sm-12 col-md-10'>
              <div className='form-group'>
                <label>Emri</label>
                <input
                  type='text'
                  onChange={(e) => {
                    props.setApplicationDTO({
                      ...props.applicationDTO,
                      Aplikimi: {
                        ...props.applicationDTO.Aplikimi,
                        Emri: e.target.value,
                      },
                    });
                  }}
                />
              </div>
            </div>
            <div className='col-lg-3 col-sm-12 col-md-10'>
              <div className='form-group'>
                <label>Mbiemri</label>
                <input
                  type='text'
                  onChange={(e) => {
                    props.setApplicationDTO({
                      ...props.applicationDTO,
                      Aplikimi: {
                        ...props.applicationDTO.Aplikimi,
                        Mbiemri: e.target.value,
                      },
                    });
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className='col-lg-10 col-xxl-12 col-sm-12 col-md-10'>
          <div className='row'>
            <div className='col-lg-2 col-sm-12'>
              <label className='fs-4'>Autor kryesor:</label>
            </div>
            <div className='col-xxl-6 col-lg-10 col-sm-12'>
              <div className='rbt-modern-select bootstrap-select  bg-transparent height-45'>
                <Select
                  showSearch
                  optionFilterProp='children'
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  mode='single'
                  allowClear
                  style={{ width: "100%" }}
                  placeholder='Zgjedhni'
                  onChange={(e) => {
                    props.setApplicationDTO({
                      ...props.applicationDTO,
                      AutoriKryesorId: e,
                    });
                  }}
                  options={options}
                />
              </div>
            </div>
          </div>
        </div>
        <div className='col-lg-10 col-xxl-12 col-sm-12 col-md-10 mt-2'>
          <div className='row'>
            <div className='col-lg-2 col-sm-12'>
              <label className='fs-4'>Autor korrespodent:</label>
            </div>
            <div className='col-xxl-6 col-lg-10 col-sm-12'>
              <div className='rbt-modern-select bootstrap-select  bg-transparent height-45'>
                <Select
                  showSearch
                  maxTagCount='responsive'
                  optionFilterProp='children'
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  mode='multiple'
                  allowClear
                  style={{ width: "100%" }}
                  placeholder='Zgjedhni'
                  onChange={(e) => {
                    let newArray = [];
                    e.map((obj) => {
                      newArray.push(obj);
                    });
                    props.setApplicationDTO({
                      ...props.applicationDTO,
                      AutoriKorrespodentId: newArray,
                    });
                  }}
                  options={options}
                />
              </div>
            </div>
          </div>
        </div>
        <div className='col-lg-10 col-xxl-12 col-sm-12 col-md-10 mt-2'>
          <div className='row'>
            <div className='col-lg-2 col-sm-12'>
              <label className='fs-4'>Bashkautoret:</label>
            </div>
            <div className='col-xxl-6 col-lg-10 col-sm-12'>
              <div className='rbt-modern-select bootstrap-select  bg-transparent height-45'>
                <Select
                  showSearch
                  maxTagCount='responsive'
                  optionFilterProp='children'
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  mode='multiple'
                  allowClear
                  style={{ width: "100%" }}
                  placeholder='Zgjedhni'
                  onChange={(e) => {
                    // let newArray = [];
                    // e.map((obj) => {
                    //   newArray.push(obj);
                    // });
                    // console.log(newArray);
                    props.setApplicationDTO({
                      ...props.applicationDTO,
                      AplikimiBashkeAutorId: e,
                    });
                  }}
                  options={options}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='col-xxl-12 col-lg-10 col-sm-12 mt-5'>
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
export default SecondForm;
