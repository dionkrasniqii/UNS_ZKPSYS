import { width } from "@mui/system";
import { Select } from "antd";
import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CrudProvider from "../../provider/CrudProvider";
import ApplicationsList from "./ApplicationsList";

const Applications = () => {
  const [faculties, setFaculties] = useState([]);
  const [data, setData] = useState([]);
  const user = localStorage.getItem("token")
    ? jwtDecode(localStorage.getItem("token"))
    : null;
  let selectVal = sessionStorage.getItem("selectVal");

  useEffect(() => {
    CrudProvider.getAll("GeneralAPIController/GetFaculties").then((res) => {
      if (res) {
        if (res.statusCode === 200) {
          setFaculties(res.result);
        }
      }
    });
  }, []);

  useEffect(() => {
    if (selectVal) {
      Submit(selectVal);
    }
  }, []);

  let facultiesList =
    faculties.length > 0 &&
    faculties.map((obj, index) => {
      return {
        label: `${obj.fakultetiPershkrimi}`,
        value: `${obj.fakultetiId}`,
      };
    });

  function saveSelectValueOnSessionStorage(value) {
    sessionStorage.setItem("selectVal", value);
  }
  async function Submit(data) {
    {
      user?.role === "61"
        ? await CrudProvider.getItemById(
            "AplikimiShqyrtimiAPI/GetAplikimetFinal",
            data
          ).then((res) => {
            if (res) {
              if (res.statusCode === 200) {
                setData(res.result);
              }
            }
          })
        : await CrudProvider.getItemById(
            "AplikimiShqyrtimiAPI/GetAplikimet",
            data
          ).then((res) => {
            if (res) {
              if (res.statusCode === 200) {
                setData(res.result);
              }
            }
          });
    }
  }
  return (
    <div className='container mt-5'>
      <div className='rbt-card rbt-card-body'>
        <div className='col-lg-3 col-sm-12 d-flex justify-content-end'>
          <Select
            placeholder='Zgjedhni fakultetin'
            style={{ width: "100%" }}
            mode='single'
            options={facultiesList}
            defaultValue={selectVal}
            onChange={(e) => {
              Submit(e);
              saveSelectValueOnSessionStorage(e);
            }}
          />
        </div>
      </div>
      <div className='rbt-card rbt-card-body  mt-3'>
        <ApplicationsList data={data} />
      </div>
    </div>
  );
};
export default Applications;
